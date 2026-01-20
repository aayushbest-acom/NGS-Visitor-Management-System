using System.Runtime.InteropServices;
using System.Text;

namespace NGS_VMS
{
    internal static class IDCardNative
    {
        [DllImport("IDCard.dll", CharSet = CharSet.Unicode)]
        public static extern int InitIDCard(string userId, int type, string libPath);

        [DllImport("IDCard.dll")]
        public static extern void FreeIDCard();

        [DllImport("IDCard.dll")]
        public static extern int DetectDocument();

        [DllImport("IDCard.dll")]
        public static extern int AutoProcessIDCard(ref int cardType);

        [DllImport("IDCard.dll", CharSet = CharSet.Unicode)]
        public static extern int GetRecogResultEx(
            int attribute,
            int index,
            StringBuilder buffer,
            ref int bufferLen);
    }
}
