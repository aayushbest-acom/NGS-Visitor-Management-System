using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NGS_VMS_Gentec_Server.Models
{
    internal class Visitor
    {
        public string Name { set; get; } = default;
        public string Email { set; get; } = default;

        public string NationalId { set; get; } = default;

        public string PhoneNumber { set; get; } = default;

        public string Company { set; get; }

        public Profile HostStaff { set; get; } = default;

        public string Purpose { set; get; } = default;

        public string VehicleNumber { set; get; } = default;

        public string VisitStatus { set; get; } = default;

        public DateTime? ScheduledAt { set; get; }

        public DateTime CheckedInAt { set; get; }

        public DateTime CheckedOutAt { set; get; }

        public Profile ScheduledBy { set; get; } = default;

        public PremiseLocation CurrentLocation { set; get; } = default;

        public string Access { set; get; } = default;
    }
}
