using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using Microsoft.Win32;

namespace NGS_VMS_Gentec_Server
{
    internal static class GenetecSdkResolver
    {
        private static string s_probingPath;

        public static void Initialize()
        {
            s_probingPath = GetProbingPath();

            if (string.IsNullOrWhiteSpace(s_probingPath) || !Directory.Exists(s_probingPath))
            {
                throw new InvalidOperationException(
                    "Genetec SDK installation not found. " +
                    "Set GSC_SDK environment variable or install Security Center SDK.");
            }

            AppDomain.CurrentDomain.AssemblyResolve += OnAssemblyResolve;
        }

        private static Assembly OnAssemblyResolve(object sender, ResolveEventArgs args)
        {
            if (string.IsNullOrWhiteSpace(s_probingPath))
                return null;

            var requested = new AssemblyName(args.Name).Name;
            if (string.IsNullOrEmpty(requested))
                return null;

            var dllPath = Path.Combine(s_probingPath, requested + ".dll");
            var exePath = Path.Combine(s_probingPath, requested + ".exe");

            try
            {
                if (File.Exists(dllPath))
                    return Assembly.LoadFrom(dllPath);

                if (File.Exists(exePath))
                    return Assembly.LoadFrom(exePath);
            }
            catch
            {
                // Swallow – let CLR continue probing
            }

            return null;
        }

        private static string GetProbingPath()
        {
            // 1️⃣ Environment variable (preferred)
            var sdkFolder = Environment.GetEnvironmentVariable("GSC_SDK");
            if (!string.IsNullOrWhiteSpace(sdkFolder) && Directory.Exists(sdkFolder))
                return sdkFolder;

            // 2️⃣ Registry fallback
            return GetInstallationFolders()
            .OrderBy(t => t.Item1)
            .Select(t => t.Item2)
            .LastOrDefault(Directory.Exists);


        }

        private static IEnumerable<Tuple<Version, string>> GetInstallationFolders()
        {
            foreach (var root in new[]
            {
                @"SOFTWARE\Genetec\Security Center\",
                @"SOFTWARE\Wow6432Node\Genetec\Security Center\"
            })
            {
                using (var key = Registry.LocalMachine.OpenSubKey(root))
                {
                    if (key == null)
                        continue;

                    foreach (var name in key.GetSubKeyNames())
                    {
                        Version version;
                        if (!Version.TryParse(name, out version))
                            continue;

                        using (var subKey = key.OpenSubKey(name))
                        {
                            if (subKey == null)
                                continue;

                            var path = subKey.GetValue("Installation Path") as string
                                       ?? subKey.GetValue("InstallDir") as string;

                            if (!string.IsNullOrWhiteSpace(path))
                                yield return Tuple.Create(version, path);
                        }
                    }
                }
            }
        }
    }
}
