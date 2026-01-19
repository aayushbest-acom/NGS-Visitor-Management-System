using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NGS_VMS_Gentec_Server.Services
{
    internal class GenetecVisitorService
    {
        private readonly GenetecVisitorAdaptor _visitorAdaptor;
        public GenetecVisitorService(GenetecVisitorAdaptor adaptor)
        {
            _visitorAdaptor = adaptor;
        }
        public void RegisterVisitor(NGS_VMS_Gentec_Server.Models.Visitor visitor)
        {
            var genetecVisitor = _visitorAdaptor.AddVisitor(visitor);
            Console.WriteLine("Visitor Registered Successfully: " + genetecVisitor.ToString());
        }
    }
}
