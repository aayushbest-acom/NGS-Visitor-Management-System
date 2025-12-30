namespace NGS_VMS
{
    public record PremiseLocation
    {
        public string Name { set; get; } = null!;

        public bool IsRestrictedArea { set; get; } = default;
    }
}