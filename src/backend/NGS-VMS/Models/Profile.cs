namespace NGS_VMS
{

    public class Profile
    {
        public Guid Id { set; get; }
        public string Name { set; get; } = null!;
        public string Designation { set; get; } = null!;

        public string Department { set; get; } = null!;

        public string Email { set; get; } = null!;

        public Profile()
        {

        }
    }
}