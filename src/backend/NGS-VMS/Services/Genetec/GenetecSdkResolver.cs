using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using Microsoft.Win32;
namespace NGS_VMS.Services;

public static class GenetecSdkResolver
{
    private static string? s_probingPath;

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

    private static Assembly? OnAssemblyResolve(object? sender, ResolveEventArgs args)
    {
        if (string.IsNullOrWhiteSpace(s_probingPath))
            return null;

        var requested = new AssemblyName(args.Name).Name;
        if (requested == null)
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
            // swallow – let CLR continue probing
        }

        return null;
    }

    private static string? GetProbingPath()
    {
        // 1️⃣ Environment variable (preferred)
        var sdkFolder = Environment.GetEnvironmentVariable("GSC_SDK");
        if (!string.IsNullOrWhiteSpace(sdkFolder) && Directory.Exists(sdkFolder))
            return sdkFolder;

        // 2️⃣ Registry fallback
        return GetInstallationFolders()
            .OrderBy(t => t.Version)
            .Select(t => t.Folder)
            .LastOrDefault(Directory.Exists);

        static IEnumerable<(Version Version, string Folder)> GetInstallationFolders()
        {
            foreach (var root in new[]
            {
                @"SOFTWARE\Genetec\Security Center\",
                @"SOFTWARE\Wow6432Node\Genetec\Security Center\"
            })
            {
                using var key = Registry.LocalMachine.OpenSubKey(root);
                if (key == null) continue;

                foreach (var name in key.GetSubKeyNames())
                {
                    if (!Version.TryParse(name, out var version))
                        continue;

                    using var subKey = key.OpenSubKey(name);
                    if (subKey == null) continue;

                    if (subKey.GetValue("Installation Path") is string path)
                        yield return (version, path);
                    else if (subKey.GetValue("InstallDir") is string dir)
                        yield return (version, dir);
                }
            }
        }
    }
}
