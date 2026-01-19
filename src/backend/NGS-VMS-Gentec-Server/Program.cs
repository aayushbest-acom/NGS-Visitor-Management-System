using NGS_VMS_Gentec_Server.Models;
using NGS_VMS_Gentec_Server.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NGS_VMS_Gentec_Server
{
    internal class Program
    {
        static void Main(string[] args)
        {
            GenetecConnection genetecConnection = new GenetecConnection();
            Console.WriteLine("Initialized Genetec");

            GenetecVisitorAdaptor genetecVisitorAdaptor = new GenetecVisitorAdaptor(genetecConnection);
            Console.WriteLine("Initialized Adaptor");

            GenetecVisitorService genetecVisitorService = new GenetecVisitorService(genetecVisitorAdaptor);
            Console.WriteLine("Initialized Genetec Service");

            var visitor = new Visitor
            {
                Name = "John Doe",
                Email = "john.doe@example.com",
                NationalId = "A123456789",
                PhoneNumber = "+1-555-123-4567",
                Company = "Acme Corporation",

                HostStaff = new Profile
                {
                    Name = "Sarah Johnson",
                    Designation = "Senior Manager",
                    Department = "Operations",
                    Email = "sarah.johnson@company.com"
                },

                Purpose = "Project Discussion Meeting",
                VehicleNumber = "ABC-1234",
                VisitStatus = "CheckedIn",
                ScheduledAt = DateTime.Now.AddHours(-1),
                CheckedInAt = DateTime.Now.AddMinutes(-30),
                CheckedOutAt = DateTime.MinValue, // Not checked out yet

                ScheduledBy = new Profile
                {
                    Name = "Michael Brown",
                    Designation = "HR Executive",
                    Department = "Human Resources",
                    Email = "michael.brown@company.com"
                },

                CurrentLocation = new PremiseLocation
                {
                    Name = "Main Office - Floor 3",
                    IsRestrictedArea = false
                },

                Access = "Visitor Pass - Floor 3 Only"
            };

            Console.WriteLine("Sample Object for Visitor is created!");

            genetecVisitorService.RegisterVisitor(visitor);
            Console.WriteLine("Process ended Successfully!");


        }
    }
}
