using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NGS_VMS.Migrations
{
    /// <inheritdoc />
    public partial class RemovedAssociations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Access",
                table: "Visitors");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Access",
                table: "Visitors",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
