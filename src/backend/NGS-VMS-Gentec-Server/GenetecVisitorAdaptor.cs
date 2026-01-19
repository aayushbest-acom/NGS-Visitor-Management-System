using Genetec.Sdk;
using Genetec.Sdk.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace NGS_VMS_Gentec_Server
{
    internal class GenetecVisitorAdaptor
    {
        private readonly Engine _engine;
        public GenetecVisitorAdaptor(GenetecConnection connection)
        {
            _engine = connection.Engine;
        }


        public Genetec.Sdk.Entities.Visitor AddVisitor(NGS_VMS_Gentec_Server.Models.Visitor visitor)
        {
            Console.WriteLine("Inside AddVisitor!");
            _engine.TransactionManager.CreateTransaction();
            var genetecVisitorEntity = _engine.CreateEntity(visitor.Name, EntityType.Visitor) as Visitor;
            genetecVisitorEntity.Name = visitor.Name;
            genetecVisitorEntity.Arrival = visitor.CheckedInAt;
            genetecVisitorEntity.Departure = visitor.CheckedOutAt;
            genetecVisitorEntity.Description = visitor.Purpose;
            genetecVisitorEntity.EmailAddress = visitor.Email;
            genetecVisitorEntity.Escort = new Guid(visitor.HostStaff.ToString());
            _engine.TransactionManager.CommitTransaction(true);
            return genetecVisitorEntity; 
            
        }
    }
}
