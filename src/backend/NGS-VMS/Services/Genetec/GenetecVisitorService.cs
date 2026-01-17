using System;

namespace NGS_VMS.Services.Genetec;

public class GenetecVisitorService
{
    private readonly GenetecVisitorAdaptor _visitorAdaptor;
    public GenetecVisitorService(GenetecVisitorAdaptor adaptor)
    {
        _visitorAdaptor = adaptor;
    }
    public void RegisterVisitor(Visitor visitor)
    {
        _visitorAdaptor.CreateCardHolder(visitor);

    }
}
