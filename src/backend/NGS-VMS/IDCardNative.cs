using System.Runtime.InteropServices;
using System.Text;

namespace NGS_VMS
{
    internal static class IDCardNative
    {
        private const string Dll = "IDCard.dll";

        [DllImport(Dll, CharSet = CharSet.Unicode, CallingConvention = CallingConvention.StdCall)]
        public static extern int InitIDCard(
            string userId,
            int nType,
            string libPath
        );

        [DllImport(Dll, CallingConvention = CallingConvention.StdCall)]
        public static extern int FreeIDCard();

        [DllImport(Dll, CallingConvention = CallingConvention.StdCall)]
        public static extern int IsCardOn();

        [DllImport(Dll, CallingConvention = CallingConvention.StdCall)]
        public static extern int AcquireAndRecogIDCard(
            int timeoutMs
        );

        [DllImport(Dll, CharSet = CharSet.Unicode, CallingConvention = CallingConvention.StdCall)]
        public static extern int GetRecogResult(
            int index,
            StringBuilder buffer,
            ref int bufferLen
        );

        [DllImport(Dll, CharSet = CharSet.Unicode, CallingConvention = CallingConvention.StdCall)]
        public static extern int GetFieldName(
            int index,
            StringBuilder buffer,
            ref int bufferLen
        );

        [DllImport(Dll, CharSet = CharSet.Unicode, CallingConvention = CallingConvention.StdCall)]
        public static extern int GetSAMIDToStr(
            StringBuilder buffer
        );
    }

}
