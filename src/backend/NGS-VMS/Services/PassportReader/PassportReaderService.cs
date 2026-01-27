using NGS_VMS.Models;

namespace NGS_VMS.Services.PassportReader;

public class PassportReaderService
{
    // private readonly string _userId;
    //  private readonly string _libPath;
    private readonly PassportReaderLoader _loader;
    //  private readonly (bool status, string message) m_PassportReaderConnection;
    public PassportReaderService(PassportReaderLoader loader)
    {
        // _userId = "66915733240645123987";
        // _libPath = Environment.GetEnvironmentVariable("PASSPORT_SDK_LIB_PATH") ?? throw new InvalidDataException("Unable to load Passport Lib SDK Path!");
        // _libPath = @"C:\Program Files\Sinosecu\Sinosecu Passport ReaderX64\lib";
        // _loader = new PassportReaderLoader();
        //  m_PassportReaderConnection = _loader.LoadKernel(_userId, _libPath);
        _loader = loader;
        Scan();
    }

    public ReaderScanResult Scan()
    {
        var result = new ReaderScanResult();
        // Write Code Here
        // if (m_PassportReaderConnection.status)
        // {
        //Console.WriteLine($"Passport Reader Status = {m_PassportReaderConnection.message}");
        var loaderResult = _loader.AutoDetectDocument();
        if (loaderResult.cardType == (int)ScanType.PASSPORT)
        {
            result.DocumentType = nameof(ScanType.PASSPORT);
            result.Success = true;
            if (loaderResult.data.ContainsKey(PassportReaderLoader.KEY_PASSPORT_NUMBER))
            {
                result.PassportNumber = loaderResult.data[PassportReaderLoader.KEY_PASSPORT_NUMBER];
            }
            else
            {
                result.PassportNumber = "Please Try Scanning Your Document Again!";
            }
        }
        else if (loaderResult.cardType == (int)ScanType.NRIC)
        {
            result.DocumentType = nameof(ScanType.NRIC);
            result.Success = true;
            result.Nric = loaderResult.data[PassportReaderLoader.KEY_NRIC];
        }
        else
        {
            result.Success = false;
            result.Error = "Error Occured:" + loaderResult.ToString();
        }

        //}
        // else
        // {
        //     result.Success = false;
        //     result.Error = m_PassportReaderConnection.message;
        // }
        return result;
    }

}
