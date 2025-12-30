using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace NGS_VMS
{
    public interface IService
    {
        public bool Connect();
        public bool Disconnect();

        public void Create(Visitor model);

        public void Update(Visitor oldModel, Visitor newModel);

        public int? Delete(Visitor model);

        public List<Visitor> Read();

    }
}