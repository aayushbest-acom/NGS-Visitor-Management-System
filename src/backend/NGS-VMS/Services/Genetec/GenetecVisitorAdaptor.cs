using System;
using Genetec.Sdk;
using Genetec.Sdk.Entities;

namespace NGS_VMS.Services.Genetec;

public class GenetecVisitorAdaptor
{
    private Engine _engine;
    public GenetecVisitorAdaptor(GenetecConnection connection)
    {
        _engine = connection.Engine;
    }


    public Cardholder CreateCardHolder(Visitor visitor)
    {
        _engine.TransactionManager.CreateTransaction();
        var cardHolder = _engine.CreateEntity("Visitor", EntityType.Cardholder) as Cardholder;
        if (cardHolder is null)
        {
            throw new ArgumentNullException("CardHolder entity can\'t be created!");
        }
        cardHolder.FirstName = visitor.Name;
        cardHolder.EmailAddress = visitor.Email;
        cardHolder.MobilePhoneNumber = visitor.PhoneNumber;
        cardHolder.Description = visitor.Purpose;
        // cardHolder.ActivationDate = visitor.CheckedInAt;
        // cardHolder.ExpirationDate = visitor.CheckedOutAt;
        // cardHolder.SetCustomField("NationalId",visitor.NationalId); //["NationalId"] = visitor.NationalId;
        // cardHolder.CustomFields["Company"] = visitor.Company;
        // cardHolder.CustomFields["HostorStaff"] = visitor.HostStaff.Name;

        _engine.TransactionManager.CommitTransaction();
        return cardHolder;

    }

}
