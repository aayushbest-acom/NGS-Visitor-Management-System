using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using NGS_VMS.Models;

public class PassportWebSocketClient
{
    private static readonly Uri _uri = new("ws://127.0.0.1:90/echo");

    public async Task<ReaderScanResult> ScanAsync()
    {
        using var ws = new ClientWebSocket();
        await ws.ConnectAsync(new Uri("ws://127.0.0.1:90/echo"), CancellationToken.None);

        // Send scan command
        var scanCmd = new
        {
            Type = "Notify",
            Command = "TriggerEx",
            Operand = "ManualRecog",
            Param = new { DocumentId = 2 }
        };

        var json = JsonSerializer.Serialize(scanCmd);
        await ws.SendAsync(
            Encoding.UTF8.GetBytes(json),
            WebSocketMessageType.Text,
            true,
            CancellationToken.None);

        // Wait for results
        while (true)
        {
            var msg = await ReceiveFullMessageAsync(ws, CancellationToken.None);

            // Extra safety
            if (string.IsNullOrWhiteSpace(msg))
                continue;

            JsonDocument doc;
            try
            {
                doc = JsonDocument.Parse(msg);
            }
            catch (JsonException)
            {
                // Ignore non-JSON garbage
                continue;
            }

            var root = doc.RootElement;

            if (root.GetProperty("Type").GetString() == "Notify"
                && root.GetProperty("Command").GetString() == "Save"
                && root.GetProperty("Operand").GetString() == "DocInfoAllInOne")
            {
                return ParseFields(root.GetProperty("Param").GetProperty("Fields"));
            }
        }
    }


    private ReaderScanResult ParseFields(JsonElement fields)
    {
        if (fields.TryGetProperty("PassportNo", out var passport))
        {
            return new ReaderScanResult
            {
                Success = true,
                DocumentType = "PASSPORT",
                PassportNumber = passport.GetProperty("Content").GetString()
            };
        }

        if (fields.TryGetProperty("IDNumber", out var id))
        {
            return new ReaderScanResult
            {
                Success = true,
                DocumentType = "NRIC",
                Nric = id.GetProperty("Content").GetString()
            };
        }

        return new ReaderScanResult
        {
            Success = false,
            Error = "No passport or NRIC found"
        };
    }

    private async Task<string> ReceiveFullMessageAsync(ClientWebSocket ws, CancellationToken ct)
    {
        var buffer = new byte[8 * 1024];
        using var ms = new MemoryStream();

        while (true)
        {
            var result = await ws.ReceiveAsync(buffer, ct);

            // Ignore empty frames
            if (result.Count == 0)
                continue;

            // Ignore non-text messages
            if (result.MessageType != WebSocketMessageType.Text)
                continue;

            ms.Write(buffer, 0, result.Count);

            // End of message reached
            if (result.EndOfMessage)
                break;
        }

        return Encoding.UTF8.GetString(ms.ToArray());
    }

}
