using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NGS_VMS_Gentec_Server.Models
{
    internal class Profile
    {
        public string Name { set; get; } = default;
        public string Designation { set; get; } = default;

        public string Department { set; get; } = default;

        public string Email { set; get; } = default;
    }
}
