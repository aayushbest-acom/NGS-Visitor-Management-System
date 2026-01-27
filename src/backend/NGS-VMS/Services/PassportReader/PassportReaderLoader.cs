using System;
using System.Drawing;
using System.Runtime.InteropServices;
using System.Text;

namespace NGS_VMS.Services.PassportReader;

public sealed class PassportReaderLoader : IDisposable
{

    public static readonly string KEY_PASSPORT_NUMBER = "The passport number from MRZ";
    public static readonly string KEY_NRIC = "somekey";
    private bool _isInitialized;
    private readonly int MAX_CH_NUM = 128;
    private delegate int InitIDCard([MarshalAs(UnmanagedType.LPWStr)] String userID, int nType, [MarshalAs(UnmanagedType.LPWStr)] String lpDirectory);

    [UnmanagedFunctionPointer(CallingConvention.StdCall, CharSet = CharSet.Unicode)]
    private delegate int GetFieldNameEx(int nAttribute, int nIndex, StringBuilder lpBuffer, ref int nBufferLen);

    [UnmanagedFunctionPointer(CallingConvention.StdCall, CharSet = CharSet.Unicode)]
    private delegate int GetRecogResultEx(int nAttribute, int nIndex, StringBuilder lpBuffer, ref int nBufferLen);

    private delegate int GetCurrentDevice([MarshalAs(UnmanagedType.LPWStr)] String ArrDeviceName, int nLength);
    private delegate void GetVersionInfo([MarshalAs(UnmanagedType.LPWStr)] String ArrVersion, int nLength);
    private delegate bool CheckDeviceOnline();
    private delegate void ResetIDCardID();
    private delegate int AddIDCardID(int nMainID, int[] nSubID, int nSubIdCount);
    private delegate int DetectDocument();
    private delegate void SetRecogDG(int nDG);
    private delegate void SetRecogVIZ(bool bRecogVIZ);
    private delegate void SetSaveImageType(int nImageType);
    private delegate int SetConfigByFile([MarshalAs(UnmanagedType.LPWStr)] String strConfigFile);
    private delegate void FreeIDCard();
    private delegate int GetDeviceSN([MarshalAs(UnmanagedType.LPWStr)] String ArrSn, int nLength);
    private delegate int SaveImageEx([MarshalAs(UnmanagedType.LPWStr)] String lpFileName, int nType);
    private delegate int AutoProcessIDCard(ref int nCardType);
    private delegate int GetBarcodeCount();
    private delegate int GetBarcodeRecogResult(int nIndex, [MarshalAs(UnmanagedType.LPWStr)] String lpBuffer, ref int nBufferLen, [MarshalAs(UnmanagedType.LPWStr)] String resultType, ref int nTypeLenth);
    private delegate int RecogBarCode([MarshalAs(UnmanagedType.LPWStr)] String lpBuffer, ref int nLen);
    private delegate int RecogCellPhoneBarCode();
    private delegate int GetGrabSignalType();
    private InitIDCard? pInitIDCard;

    private GetFieldNameEx? pGetFieldNameEx;
    private GetCurrentDevice? pGetCurrentDevice;
    private GetVersionInfo? pGetVersionInfo;
    private CheckDeviceOnline? pCheckDeviceOnline;
    private ResetIDCardID? pResetIDCardID;
    private AddIDCardID? pAddIDCardID;
    private DetectDocument? pDetectDocument;
    private GetGrabSignalType? pGetGrabSignalType;
    private SetRecogDG? pSetRecogDG;
    private SetRecogVIZ? pSetRecogVIZ;
    private SetConfigByFile? pSetConfigByFile;
    private GetBarcodeCount? pGetBarcodeCount;
    private GetBarcodeRecogResult? pGetBarcodeRecogResult;
    private SetSaveImageType? pSetSaveImageType;
    private FreeIDCard? pFreeIDCard;
    private GetDeviceSN? pGetDeviceSN;
    private SaveImageEx? pSaveImageEx;
    private AutoProcessIDCard? pAutoProcessIDCard;
    private GetRecogResultEx? pGetRecogResultEx;
    private RecogBarCode? pRecogBarCode;
    private RecogCellPhoneBarCode? pRecogCellPhoneBarCode;

    public (bool status, string message) Initialize(string userID, string libPath)
    {
        if (_isInitialized) return (true, "Already Initialized");
        var result = LoadKernel(userID, libPath);
        _isInitialized = true;
        return result;
    }
    private bool LoadDllPath(string path)
    {
        string dllPath = path + "\\IDCard.dll";
        IntPtr hModule = IDCardNative.LoadLibrary(dllPath);
        if (hModule.ToInt64() == 0)
        {
            throw new Exception("Passport Reader Loading Failed!");
        }

        pInitIDCard = pInitIDCard = (InitIDCard)IDCardNative.LoadFunction<InitIDCard>(hModule, "InitIDCard");
        pGetFieldNameEx = (GetFieldNameEx)IDCardNative.LoadFunction<GetFieldNameEx>(hModule, "GetFieldNameEx");
        pGetCurrentDevice = (GetCurrentDevice)IDCardNative.LoadFunction<GetCurrentDevice>(hModule, "GetCurrentDevice");
        pGetVersionInfo = (GetVersionInfo)IDCardNative.LoadFunction<GetVersionInfo>(hModule, "GetVersionInfo");
        pCheckDeviceOnline = (CheckDeviceOnline)IDCardNative.LoadFunction<CheckDeviceOnline>(hModule, "CheckDeviceOnline");
        pResetIDCardID = (ResetIDCardID)IDCardNative.LoadFunction<ResetIDCardID>(hModule, "ResetIDCardID");
        pAddIDCardID = (AddIDCardID)IDCardNative.LoadFunction<AddIDCardID>(hModule, "AddIDCardID");
        pDetectDocument = (DetectDocument)IDCardNative.LoadFunction<DetectDocument>(hModule, "DetectDocument");
        pGetGrabSignalType = (GetGrabSignalType)IDCardNative.LoadFunction<GetGrabSignalType>(hModule, "GetGrabSignalType");
        pSetRecogVIZ = (SetRecogVIZ)IDCardNative.LoadFunction<SetRecogVIZ>(hModule, "SetRecogVIZ");
        pSetConfigByFile = (SetConfigByFile)IDCardNative.LoadFunction<SetConfigByFile>(hModule, "SetConfigByFile");
        pSetRecogDG = (SetRecogDG)IDCardNative.LoadFunction<SetRecogDG>(hModule, "SetRecogDG");
        pSetSaveImageType = (SetSaveImageType)IDCardNative.LoadFunction<SetSaveImageType>(hModule, "SetSaveImageType");
        pGetDeviceSN = (GetDeviceSN)IDCardNative.LoadFunction<GetDeviceSN>(hModule, "GetDeviceSN");
        pSaveImageEx = (SaveImageEx)IDCardNative.LoadFunction<SaveImageEx>(hModule, "SaveImageEx");
        pAutoProcessIDCard = (AutoProcessIDCard)IDCardNative.LoadFunction<AutoProcessIDCard>(hModule, "AutoProcessIDCard");
        pGetBarcodeCount = (GetBarcodeCount)IDCardNative.LoadFunction<GetBarcodeCount>(hModule, "GetBarcodeCount");
        pGetBarcodeRecogResult = (GetBarcodeRecogResult)IDCardNative.LoadFunction<GetBarcodeRecogResult>(hModule, "GetBarcodeRecogResult");
        pRecogBarCode = (RecogBarCode)IDCardNative.LoadFunction<RecogBarCode>(hModule, "RecogBarCode");
        pRecogCellPhoneBarCode = (RecogCellPhoneBarCode)IDCardNative.LoadFunction<RecogCellPhoneBarCode>(hModule, "RecogCellPhoneBarCode");
        pGetRecogResultEx = (GetRecogResultEx)IDCardNative.LoadFunction<GetRecogResultEx>(hModule, "GetRecogResultEx");
        pFreeIDCard = (FreeIDCard)IDCardNative.LoadFunction<FreeIDCard>(hModule, "FreeIDCard");


        if (pInitIDCard == null || pGetCurrentDevice == null || pGetVersionInfo == null || pCheckDeviceOnline == null ||
            pResetIDCardID == null || pAddIDCardID == null || pDetectDocument == null || pGetDeviceSN == null ||
            pSaveImageEx == null || pFreeIDCard == null || pAutoProcessIDCard == null || pGetRecogResultEx == null ||
            pGetFieldNameEx == null || pSetRecogDG == null || pSetSaveImageType == null || pSetRecogVIZ == null ||
            pSetConfigByFile == null || pGetBarcodeCount == null || pGetBarcodeRecogResult == null || pRecogBarCode == null || pRecogCellPhoneBarCode == null || pGetGrabSignalType == null)
        {
            IDCardNative.FreeLibrary(hModule);
            throw new Exception("Passport Reader Loading Failed!");
        }
        return true;
    }

    public (bool status, string message) LoadKernel(string userID, string libPath)
    {
        if (!LoadDllPath(libPath))
        {
            return (false, "DLL Load Failed");
        }

        bool isDeviceOnline = pCheckDeviceOnline();
        if (!isDeviceOnline)
        {

            return (false, "Device is Offline!");
        }
        var initStatus = pInitIDCard(userID, 1, libPath);
        if (initStatus != 0)
        {
            (bool status, string message) result = (false, "");
            switch (initStatus)
            {
                case 1:
                    result.message = "UserID error.\n";
                    break;
                case 2:
                    result.message = "Device initialization failed.\n";
                    break;
                case 3:
                    result.message = "Failed to initialize the certificate core.\n";
                    break;
                case 4:
                    result.message = "The authorization file was not found.\n";
                    break;
                case 5:
                    result.message = "Failed to load template file.\n";
                    break;
                case 6:
                    result.message = "Failed to initialize card reader.\n";
                    break;

            }
            return result;

        }
        pSetConfigByFile(libPath + "\\IDCardConfig.ini"); //absolute path load IDCardConfig.ini

        return (true, "Kernel Loaded Successfully!");

    }

    public (int cardType, Dictionary<string, string> data) AutoDetectDocument()
    {
        int resultCardType = -1111;
        var resultData = new Dictionary<string, string>();
        int documentType = pDetectDocument();
        Console.WriteLine("Document Type: " + documentType);
        if (documentType != 0)
        {
            if (documentType == 1)
            {
                //int dataGroup = (1 << 1) | (1 << 2) | (1 << 12) | (1 << 11);

                //Console.WriteLine("Data Group = ", dataGroup);
                // pSetRecogDG(dataGroup);


                int cardType = 0;
                int idCardType = pAutoProcessIDCard(ref cardType);
                Console.WriteLine("cardType = " + cardType);
                Console.WriteLine("idCardType = " + idCardType);
                if (idCardType > 0 || idCardType == -8 || idCardType == -1115 || idCardType == -1117)
                {
                    resultCardType = idCardType;
                    resultData = resultData.Concat(ReadContent()).ToDictionary<string, string>();
                    Console.WriteLine($"{nameof(resultCardType)}={resultCardType}");
                    Console.WriteLine($"{nameof(resultData)}={resultData}");
                }

            }
        }
        // pFreeIDCard();
        return (resultCardType, resultData);
    }


    // private string ReadContent()
    // {
    //     Console.WriteLine("Inside ReadContent!");
    //     int bufferLength = MAX_CH_NUM * sizeof(byte);
    //     int index = 0;
    //     var content = string.Empty;
    //     while (index > 0)
    //     {
    //         string fieldName = new string('\0', MAX_CH_NUM);
    //         string fieldValue = new string('\0', MAX_CH_NUM);
    //         int result = pGetRecogResultEx(1, index, fieldValue, ref bufferLength);
    //         Console.WriteLine($"fieldName = {fieldName}");
    //         Console.WriteLine($"fieldValue = {fieldValue}");
    //         Console.WriteLine($"bufferLength = {bufferLength}");
    //         Console.WriteLine($"result = {result}");
    //         if (result == 3)
    //         {
    //             break;
    //         }
    //         bufferLength = MAX_CH_NUM * sizeof(byte);
    //         pGetFieldNameEx(1, index, fieldName, ref bufferLength);
    //         bufferLength = MAX_CH_NUM * sizeof(byte);
    //         content += fieldName;
    //         content += ":";
    //         content += fieldValue;
    //         content += "\r\n";
    //         Console.WriteLine($"content = {content}");
    //         index++;
    //     }
    //     return content;
    // }

    private IDictionary<string, string> ReadContent()
    {
        var result = new Dictionary<string, string>();
        int index = 0;

        while (true)
        {
            int len = MAX_CH_NUM;
            var value = new StringBuilder(len);

            int r = pGetRecogResultEx(1, index, value, ref len);

            if (r == 3) break;           // field not exist
            if (r == 1)                  // buffer too small
            {
                value = new StringBuilder(len);
                r = pGetRecogResultEx(1, index, value, ref len);
            }
            if (r != 0) break;

            len = MAX_CH_NUM;
            var name = new StringBuilder(len);
            pGetFieldNameEx(1, index, name, ref len);

            result.Add(name.ToString(), value.ToString());
            index++;
        }

        return result;
    }
    public void Dispose()
    {
        pFreeIDCard();
    }
}