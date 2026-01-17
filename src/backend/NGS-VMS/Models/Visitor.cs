namespace NGS_VMS
{

    public class Visitor
    {
        public string Name { set; get; } = null!;
        public string Email { set; get; } = null!;

        public string NationalId { set; get; } = null!;

        public string PhoneNumber { set; get; } = null!;

        public string? Company { set; get; }

        public Profile HostStaff { set; get; } = null!;

        public string Purpose { set; get; } = null!;

        public string? VehicleNumber { set; get; } = null!;

        public string VisitStatus { set; get; } = null!;

        public DateTime? ScheduledAt { set; get; }

        public DateTime CheckedInAt { set; get; }

        public DateTime CheckedOutAt { set; get; }

        public Profile ScheduledBy { set; get; } = null!;

        public PremiseLocation CurrentLocation { set; get; } = null!;

        public string Access { set; get; } = null!;

    }
}