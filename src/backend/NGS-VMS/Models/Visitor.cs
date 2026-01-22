using NGS_VMS.Models;

namespace NGS_VMS
{

    public class Visitor
    {
        public Guid Id { set; get; }
        public string Name { set; get; } = null!;
        public string Email { set; get; } = null!;

        public string NationalId { set; get; } = null!;

        public string PhoneNumber { set; get; } = null!;

        public string? Company { set; get; }

        public Guid HostStaffId { set; get; }

        public string Purpose { set; get; } = null!;

        public string? VehicleNumber { set; get; } = null!;

        public VisitStatus VisitStatus { set; get; }

        public DateTime CheckedInAt { set; get; }

        public DateTime CheckedOutAt { set; get; }

        public string? PassNumber { set; get; }

        public string? SpecialInstructions { set; get; }

        public Visitor()
        {

        }
        public override string ToString()
        {
            return $"""
    Visitor:
      Id                : {Id}
      Name              : {Name}
      Email             : {Email}
      NationalId        : {NationalId}
      PhoneNumber       : {PhoneNumber}
      Company           : {Company ?? "NULL"}
      Purpose           : {Purpose}
      VehicleNumber     : {VehicleNumber ?? "NULL"}
      VisitStatus       : {VisitStatus}

      CheckedInAt       : {CheckedInAt:O}
      CheckedOutAt      : {CheckedOutAt:O}

      HostStaffId       : {HostStaffId}

      PassNumber:       : {PassNumber}
      SpecialInstructions: {SpecialInstructions}
    """;
        }

    }
}