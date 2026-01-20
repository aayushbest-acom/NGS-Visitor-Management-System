using System;
using Microsoft.EntityFrameworkCore;

namespace NGS_VMS.Data;

public class AppDbContext : DbContext
{
    public DbSet<Visitor> Visitors => Set<Visitor>();
    public DbSet<Profile> Profiles => Set<Profile>();
    public DbSet<PremiseLocation> PremiseLocations => Set<PremiseLocation>();

    public AppDbContext(DbContextOptions options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Visitor>(entity =>
        {
            entity.Property(v => v.VisitStatus)
                .HasConversion<int>()
                .IsRequired();

            entity.HasOne<Profile>()
        .WithMany()
        .HasForeignKey(v => v.HostStaffId)
        .OnDelete(DeleteBehavior.Restrict)
        .IsRequired();

            // FK → Profiles (ScheduledById) [OPTIONAL]
            entity.HasOne<Profile>()
                  .WithMany()
                  .HasForeignKey(v => v.ScheduledById)
                  .OnDelete(DeleteBehavior.Restrict)
                  .IsRequired(false);

            // FK → PremiseLocations (CurrentLocationId) [REQUIRED]
            entity.HasOne<PremiseLocation>()
                  .WithMany()
                  .HasForeignKey(v => v.CurrentLocationId)
                  .OnDelete(DeleteBehavior.Restrict)
                  .IsRequired();

        });
    }

}
