using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using Microsoft.Win32;
namespace NGS_VMS.Services;


public static class GenetecSdkResolver
{
    private static string s_probingPath = string.Empty;
    public static void Initialize()
    {
        AppDomain.CurrentDomain.AssemblyResolve += OnAssemblyResolve;
        s_probingPath = GetProbingPath();
    }
    private static string? GetProbingPath()
    {
        string? sdkFolder = Environment.GetEnvironmentVariable("GSC_SDK");
        return Directory.Exists(sdkFolder)
        ? sdkFolder
        : GetInstallationFolders().OrderBy(t => t.Version).Where(t => Directory.Exists(t.Folder)).Select(t => t.Folder).LastOrDefault();
        IEnumerable<(Version Version, string Folder)> GetInstallationFolders()
        {
            foreach (var root in new[] { @"SOFTWARE\Genetec\Security Center\", @"SOFTWARE\Wow6432Node\Genetec\Security Center\" })
            {
                using (RegistryKey key = Registry.LocalMachine.OpenSubKey(root))
                {
                    if (key is null)
                    {
                        continue;
                    }
                    foreach (var name in key.GetSubKeyNames())
                    {
                        if (Version.TryParse(name, out Version version))
                        {
                            using RegistryKey subKey = key.OpenSubKey(name);
                            if (subKey is null)
                            {
                                continue;
                            }
                            if (subKey.GetValue("Installation Path") is string path)
                            {
                                yield return (version, path);
                            }
                            else if (subKey.GetValue("InstallDir") is string dir)
                            {
                                yield return (version, dir);
                            }
                        }
                    }
                }
            }
        }
    }
    private static Assembly? OnAssemblyResolve(object? sender, ResolveEventArgs? args)
    {
        foreach (var assemblyFile in GetAssemblyPaths(s_probingPath).Where(File.Exists))
        {
            try
            {
                return Assembly.LoadFile(assemblyFile);
            }
            catch
            {
            }
        }
        return null;

        IEnumerable<string> GetAssemblyPaths(string probingPath)
        {
            var assemblyName = new AssemblyName(args.Name);
            yield return Path.Combine(probingPath, $"{assemblyName.Name}.dll");
            yield return Path.Combine(probingPath, $"{assemblyName.Name}.exe");
        }
    }
}