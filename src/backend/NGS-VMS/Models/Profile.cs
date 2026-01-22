using Microsoft.AspNetCore.Identity;
using NGS_VMS.Models;

namespace NGS_VMS
{

    public class Profile
    {
        public Guid Id { set; get; }
        public string Name { set; get; } = string.Empty;
        public string Designation { set; get; } = string.Empty;

        public string Department { set; get; } = string.Empty;

        public string Email { set; get; } = string.Empty;

        public string Phone { set; get; } = string.Empty;

        public Role Role { set; get; } = Role.NONE;
        public Profile()
        {

        }
    }
}