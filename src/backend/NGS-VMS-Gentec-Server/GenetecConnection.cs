using Genetec.Sdk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;

namespace NGS_VMS_Gentec_Server
{
    internal class GenetecConnection
    {
        public Engine Engine { get; }
        public GenetecConnection()
        {
            GenetecSdkResolver.Initialize();
            var configuration = ConfigurationManager.AppSettings;
            Engine = new Engine();
            Engine.LogOn(configuration["Genetec:ServerIPAddress"],
                               configuration["Genetec:Username"],
                                configuration["Genetec:Password"]);
            Engine.LogonStatusChanged += Engine_LogonStatusChanged;
        }

        private void Engine_LogonStatusChanged(object sender, LogonStatusChangedEventArgs e)
        {
            if (e != null)
            {
                Console.WriteLine(e.Status);
            }
        }
    }
}
