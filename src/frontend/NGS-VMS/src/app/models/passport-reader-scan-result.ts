export interface PassportReaderScanResult {
    success: boolean;
    documentType: string;
    passportNumber: string;
    nric: string;
    error: string;
}
