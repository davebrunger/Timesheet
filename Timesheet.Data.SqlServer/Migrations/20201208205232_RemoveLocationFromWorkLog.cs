using Microsoft.EntityFrameworkCore.Migrations;

namespace Timesheet.Data.SqlServer.Migrations
{
    public partial class RemoveLocationFromWorkLog : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "WorkLogs");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "WorkLogs",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
