using Microsoft.EntityFrameworkCore;
using NGS_VMS;
using NGS_VMS.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
 options.UseSqlite("Data Source=ngs_vms.db"));

builder.Services.AddCors((options) =>
{
    options.AddPolicy("AllowAll",
    p => p.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();
app.UseRouting();
app.UseCors("AllowAll");

app.MapGet("/", () => "Hello from NGS-VMS Backend Server!");
app.MapGet("/api/ng", (string message) =>
{
    Console.WriteLine("Message From Frontend: " + message);
    return Results.Accepted();
});
app.MapPost("/api/visitor/register", async (Visitor visitor, AppDbContext db) =>
{
    Console.WriteLine(visitor);
    db.Visitors.Add(visitor);
    await db.SaveChangesAsync();
    return Results.Created($"/api/visitors/register/{visitor.Id}", visitor);
});

app.MapPut("/api/visitor/update/{id:guid}", async (Guid id, Visitor updatedVisitor, AppDbContext db) =>
{
    var visitor = await db.Visitors.FindAsync(id);
    if (visitor is null)
    {
        return Results.NotFound();
    }
    db.Entry(visitor).CurrentValues.SetValues(updatedVisitor);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapGet("/api/visitors", async (AppDbContext db) =>
{
    return await db.Visitors.AsNoTracking().ToListAsync();
});

app.MapGet("/api/visitor/{id:guid}", async (Guid id, AppDbContext db) =>
{
    var visitor = await db.Visitors.FindAsync(id);
    return visitor is null ? Results.NotFound() : Results.Ok(visitor);
});

app.UseSwagger();
app.UseSwaggerUI();


app.UseAuthorization();
app.MapControllers();

app.Run();