using Microsoft.EntityFrameworkCore.Migrations;

namespace Timesheet.Data.SqlServer.Migrations
{
    public partial class AddExampleProject : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Projects",
                columns: new[] { "Id", "Name" },
                values: new object[] { -1L, "Example Project" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Location", "Name" },
                values: new object[] { -1L, null!, "Example User" });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "Id", "Name", "ProjectId", "TaskStateId" },
                values: new object[] { -1L, "Example Task", -1L, 1 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: -1L);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: -1L);

            migrationBuilder.DeleteData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: -1L);
        }
    }
}
