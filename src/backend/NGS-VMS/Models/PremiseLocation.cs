namespace NGS_VMS
{
    public record PremiseLocation
    {
        public Guid Id { set; get; }
        public string Name { set; get; } = null!;

        public bool IsRestrictedArea { set; get; } = default;

        public PremiseLocation()
        {

        }
    }
}