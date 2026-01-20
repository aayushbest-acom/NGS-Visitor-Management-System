using System;

namespace NGS_VMS.Models;

public class ReaderScanResult
{

    public bool Success { get; set; }
    public string DocumentType { get; set; } = String.Empty;
    public string PassportNumber { get; set; } = String.Empty;
    public string Nric { get; set; } = String.Empty;
    public string Error { get; set; } = String.Empty;
}
