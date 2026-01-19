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
            Console.WriteLine("Loading Configuration Settings:\n");
            var serverIPAddr = configuration["Genetec:ServerIPAddress"];
            var username = configuration["Genetec:Username"];
            var password = configuration["Genetec:Password"];
            Console.WriteLine($"Server IP Address: {serverIPAddr}\nUsername:{username}\nPassword:{password}");
            Engine = new Engine();
            Console.WriteLine("Initialized Engine...\nNow Login...");
            Engine.LogOn(serverIPAddr,username,password);
            Engine.LogonStatusChanged += Engine_LogonStatusChanged;
            Engine.LoggedOn += Engine_LoggedOnChanged;
            Engine.LogonFailed += Engine_LogonFailedChanged;


        }

        private void Engine_LogonFailedChanged(object sender, LogonFailedEventArgs e)
        {
            Console.WriteLine("Inside Logged On Failed Delegate!");
            if(e != null)
            {
                Console.WriteLine("Logged Failed Reason:" + e.SdkException.Message);

            }
        }

        private void Engine_LoggedOnChanged(object sender, LoggedOnEventArgs e)
        {
            Console.WriteLine("Iniside Logged On Delegate");
            if(e != null)
            {
                Console.WriteLine("Logged Server Name:" + e.ServerName);

            }
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
