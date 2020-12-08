using Microsoft.EntityFrameworkCore.Migrations;

namespace Timesheet.Data.SqlServer.Migrations
{
    public partial class AddTaskState : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TaskStateId",
                table: "Tasks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "TaskStates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskStates", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "TaskStates",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "Open" });

            migrationBuilder.InsertData(
                table: "TaskStates",
                columns: new[] { "Id", "Name" },
                values: new object[] { 2, "Closed" });

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_TaskStateId",
                table: "Tasks",
                column: "TaskStateId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_TaskStates_TaskStateId",
                table: "Tasks",
                column: "TaskStateId",
                principalTable: "TaskStates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_TaskStates_TaskStateId",
                table: "Tasks");

            migrationBuilder.DropTable(
                name: "TaskStates");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_TaskStateId",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "TaskStateId",
                table: "Tasks");
        }
    }
}
