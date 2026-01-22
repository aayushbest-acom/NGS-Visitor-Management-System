using System;
using System.Text;
using NGS_VMS.Models;

namespace NGS_VMS.Services.PassportReader;

public class PassportReaderService
{
    private readonly string _userId;
    private readonly string _libPath;
    public PassportReaderService(IConfiguration configuration)
    {
        _userId = configuration["passportReaderUserId"] ?? throw new InvalidOperationException("Unable to Find User ID!");
        _libPath = Environment.GetEnvironmentVariable("PASSPORT_SDK_LIB_PATH") ?? throw new InvalidDataException("Unable to load Passport Lib SDK Path!");

    }
    public ReaderScanResult Scan()
    {
        var result = new ReaderScanResult();

        int init = IDCardNative.InitIDCard(_userId, 0, _libPath);
        if (init != 0)
            return Fail($"Device initialization failed (code {init})");

        try
        {
            if (IDCardNative.DetectDocument() != 1)
                return Fail("No document detected");

            int cardType = 0;
            int mainId = IDCardNative.AutoProcessIDCard(ref cardType);

            if (mainId <= 0)
                return Fail("Recognition failed");

            if (mainId == 13) // Passport
            {
                result.PassportNumber = ReadField(1, 1);
                result.DocumentType = "PASSPORT";
                result.Success = true;
                return result;
            }

            if (mainId == 2004) // Singapore NRIC
            {
                result.Nric = ReadField(1, 6);
                result.DocumentType = "NRIC";
                result.Success = true;
                return result;
            }

            return Fail("Unsupported document type");
        }
        finally
        {
            IDCardNative.FreeIDCard();
        }
    }

    private string ReadField(int attr, int index)
    {
        int len = 256;
        var sb = new StringBuilder(len);
        int ret = IDCardNative.GetRecogResultEx(attr, index, sb, ref len);
        return ret == 0 ? sb.ToString() : null;
    }

    private static ReaderScanResult Fail(string message)
    {
        return new ReaderScanResult
        {
            Success = false,
            Error = message
        };
    }

}
