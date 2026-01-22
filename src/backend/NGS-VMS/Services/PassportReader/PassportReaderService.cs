using System;

namespace NGS_VMS.Services.PassportReader;

public class PassportReaderService
{
    private readonly string _userId;
    private readonly string _libPath;
    public PassportReaderService(IConfiguration configuration)
    {
        _userId = configuration["passportReaderUserId"] ?? throw new InvalidOperationException("Unable to Find User ID!");
        _libPath = Environment.GetEnvironmentVariable("PASSPORT_LIB_SDK_PATH") ?? throw new InvalidDataException("Unable to load Passport Lib SDK Path!");

    }

}
