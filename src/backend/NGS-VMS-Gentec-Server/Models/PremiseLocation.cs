using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NGS_VMS_Gentec_Server.Models
{
    internal class PremiseLocation
    {
        public string Name { set; get; } = default;

        public bool IsRestrictedArea { set; get; } = default;
    }
}
