using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using NGS_VMS;
using NGS_VMS.Data;
using NGS_VMS.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
 options.UseSqlite("Data Source=ngs_vms.db"));
builder.Services.AddCors((options) =>
{
    options.AddPolicy("AllowAll",
    p => p.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
});

builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                });

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();
app.UseRouting();
app.UseCors("AllowAll");

using var scoped = app.Services.CreateScope();
var context = scoped.ServiceProvider.GetRequiredService<AppDbContext>();
context.Database.Migrate();
if (context.Profiles.IsNullOrEmpty())
{
    var profiles = new List<Profile>
{
    new() {
        Id = Guid.Parse("13d3164c-1edc-403d-b36d-ce3877e9db87"),
        Name = "Amit Sharma",
        Designation = "Software Engineer",
        Department = "Engineering",
        Email = "amit.sharma@example.com",
        Role = Role.HOST,
        Phone = "+65 12345678",
    },
    new Profile
    {
        Id = Guid.Parse("d1302b42-5680-404e-92d5-7fbd7e97f15b"),
        Name = "Priya Verma",
        Designation = "UI/UX Designer",
        Department = "Design",
        Email = "priya.verma@example.com",
        Role = Role.HOST,
        Phone = "+65 12345678",

    },
    new() {
        Id = Guid.Parse("1a54a548-d4d4-4d1c-bc76-46c97f4a6329"),
        Name = "Rahul Mehta",
        Designation = "Project Manager",
        Department = "Product",
        Email = "rahul.mehta@example.com",
        Role = Role.HOST,
        Phone = "+65 87654321",

    },
    new() {
        Id = Guid.Parse("9484f2a9-f06b-4894-82b5-a68d0f08ae76"),
        Name = "Sneha Iyer",
        Designation = "QA Engineer",
        Department = "Quality Assurance",
        Email = "sneha.iyer@example.com",
        Role = Role.HOST,
        Phone = "+65 87654321",

    },
    new() {
        Id = Guid.Parse("c07a0c1c-b394-4513-accc-155a42cd0509"),
        Name = "Vikram Patel",
        Designation = "DevOps Engineer",
        Department = "Infrastructure",
        Email = "vikram.patel@example.com",
        Role = Role.HOST,
        Phone = "+65 87654321",

    }
};

    // Insert only missing profiles (idempotent)
    foreach (var profile in profiles)
    {
        if (!context.Profiles.Any(p => p.Id == profile.Id))
        {
            context.Profiles.Add(profile);
        }
    }

    await context.SaveChangesAsync();

}

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

app.MapGet("/api/hosts", async (AppDbContext db) =>
{
    return await db.Profiles.AsNoTracking().ToListAsync();
});

app.MapGet("/api/host/{id:guid}", async (Guid id, AppDbContext db) =>
{
    var host = await db.Profiles.FindAsync(id);
    return host is null ? Results.NotFound() : Results.Ok(host);
});

app.UseSwagger();
app.UseSwaggerUI();


app.UseAuthorization();
app.MapControllers();

app.Run();