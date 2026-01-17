using System;
using Genetec.Sdk;

namespace NGS_VMS.Services.Genetec;

public class GenetecConnection
{
    public Engine Engine { get; }
    public GenetecConnection(IConfiguration configuration)
    {
        // GenetecSdkResolver.Initialize();
        Engine = new Engine();
        Engine.LogOn(configuration["Genetec:ServerIPAddress"],
                           configuration["Genetec:Username"],
                            configuration["Genetec:Password"]);
        Engine.LogonStatusChanged += Engine_LogonStatusChanged;
    }

    private void Engine_LogonStatusChanged(object? sender, LogonStatusChangedEventArgs? e)
    {
        if (e is not null)
        {
            Console.WriteLine(e.Status);
        }
    }


}
