using Genetec.Sdk.Entities;
using NGS_VMS;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<IService>(new GenetecService());
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.MapPost("/visitor/register", async (NGS_VMS.Visitor visitor, IService service) =>
{
    Console.WriteLine("Register Visitor Endpoint Invoked!");
});
app.Run();
