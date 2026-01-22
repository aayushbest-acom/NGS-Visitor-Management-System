using System;
using Microsoft.EntityFrameworkCore;

namespace NGS_VMS.Data;

public class AppDbContext : DbContext
{
    public DbSet<Visitor> Visitors => Set<Visitor>();
    public DbSet<Profile> Profiles => Set<Profile>();

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
                  .IsRequired();
        });
    }

}
