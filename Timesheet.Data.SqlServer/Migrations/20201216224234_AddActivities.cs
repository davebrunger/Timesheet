using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Timesheet.Data.SqlServer.Migrations
{
    public partial class AddActivities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Projects_ProjectId",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_TaskStates_TaskStateId",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkLogs_Tasks_TaskId",
                table: "WorkLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkLogs_Users_UserId",
                table: "WorkLogs");

            migrationBuilder.AddColumn<int>(
                name: "ActivityId",
                table: "WorkLogs",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DueDate",
                table: "Projects",
                type: "DATE",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Activities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Activities", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Activities",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Plan" },
                    { 2, "Design" },
                    { 3, "Development" },
                    { 4, "Test" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_WorkLogs_ActivityId",
                table: "WorkLogs",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Name",
                table: "Users",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_Name",
                table: "Tasks",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Projects_Name",
                table: "Projects",
                column: "Name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Projects_ProjectId",
                table: "Tasks",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_TaskStates_TaskStateId",
                table: "Tasks",
                column: "TaskStateId",
                principalTable: "TaskStates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkLogs_Activities_ActivityId",
                table: "WorkLogs",
                column: "ActivityId",
                principalTable: "Activities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkLogs_Tasks_TaskId",
                table: "WorkLogs",
                column: "TaskId",
                principalTable: "Tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkLogs_Users_UserId",
                table: "WorkLogs",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Projects_ProjectId",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_TaskStates_TaskStateId",
                table: "Tasks");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkLogs_Activities_ActivityId",
                table: "WorkLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkLogs_Tasks_TaskId",
                table: "WorkLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkLogs_Users_UserId",
                table: "WorkLogs");

            migrationBuilder.DropTable(
                name: "Activities");

            migrationBuilder.DropIndex(
                name: "IX_WorkLogs_ActivityId",
                table: "WorkLogs");

            migrationBuilder.DropIndex(
                name: "IX_Users_Name",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_Name",
                table: "Tasks");

            migrationBuilder.DropIndex(
                name: "IX_Projects_Name",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "ActivityId",
                table: "WorkLogs");

            migrationBuilder.DropColumn(
                name: "DueDate",
                table: "Projects");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Projects_ProjectId",
                table: "Tasks",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_TaskStates_TaskStateId",
                table: "Tasks",
                column: "TaskStateId",
                principalTable: "TaskStates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkLogs_Tasks_TaskId",
                table: "WorkLogs",
                column: "TaskId",
                principalTable: "Tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkLogs_Users_UserId",
                table: "WorkLogs",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
