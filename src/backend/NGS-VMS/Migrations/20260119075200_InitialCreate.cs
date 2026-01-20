using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NGS_VMS.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PremiseLocations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    IsRestrictedArea = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PremiseLocations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Profiles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Designation = table.Column<string>(type: "TEXT", nullable: false),
                    Department = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Profiles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Visitors",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    NationalId = table.Column<string>(type: "TEXT", nullable: false),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: false),
                    Company = table.Column<string>(type: "TEXT", nullable: true),
                    HostStaffId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Purpose = table.Column<string>(type: "TEXT", nullable: false),
                    VehicleNumber = table.Column<string>(type: "TEXT", nullable: true),
                    VisitStatus = table.Column<int>(type: "INTEGER", nullable: false),
                    ScheduledAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    CheckedInAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CheckedOutAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ScheduledById = table.Column<Guid>(type: "TEXT", nullable: false),
                    CurrentLocationId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Access = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Visitors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Visitors_PremiseLocations_CurrentLocationId",
                        column: x => x.CurrentLocationId,
                        principalTable: "PremiseLocations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Visitors_Profiles_HostStaffId",
                        column: x => x.HostStaffId,
                        principalTable: "Profiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Visitors_Profiles_ScheduledById",
                        column: x => x.ScheduledById,
                        principalTable: "Profiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Visitors_CurrentLocationId",
                table: "Visitors",
                column: "CurrentLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Visitors_HostStaffId",
                table: "Visitors",
                column: "HostStaffId");

            migrationBuilder.CreateIndex(
                name: "IX_Visitors_ScheduledById",
                table: "Visitors",
                column: "ScheduledById");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Visitors");

            migrationBuilder.DropTable(
                name: "PremiseLocations");

            migrationBuilder.DropTable(
                name: "Profiles");
        }
    }
}
