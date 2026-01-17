using NGS_VMS;
using NGS_VMS.Services.Genetec;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<GenetecConnection>();
builder.Services.AddSingleton<GenetecVisitorAdaptor>();
builder.Services.AddScoped<GenetecVisitorService>();
builder.Services.AddCors((options) =>
{
    options.AddPolicy("ngFrontend",
    p => p.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
});
builder.Services.AddHttpsRedirection((option) =>
{
    option.HttpsPort = 7079;
});
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();

app.MapGet("/", () => "Hello from NGS-VMS Backend Server!");
app.MapPost("/api/ng", (string message) =>
{
    Console.WriteLine("Message From Frontend: " + message);
    return Results.Accepted();
});
app.MapPost("/api/visitor/register", (Visitor visitor, GenetecVisitorService service) =>
{
    service.RegisterVisitor(visitor);
    return Results.Ok();
});


app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("ngFrontend");


app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();