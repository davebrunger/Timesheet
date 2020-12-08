using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Timesheet.Data.SqlServer.Migrations
{
    public partial class AddMissingTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkLog_Users_TaskId",
                table: "WorkLog");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkLog_Users_UserId",
                table: "WorkLog");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WorkLog",
                table: "WorkLog");

            migrationBuilder.RenameTable(
                name: "WorkLog",
                newName: "WorkLogs");

            migrationBuilder.RenameIndex(
                name: "IX_WorkLog_UserId",
                table: "WorkLogs",
                newName: "IX_WorkLogs_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_WorkLog_TaskId",
                table: "WorkLogs",
                newName: "IX_WorkLogs_TaskId");

            migrationBuilder.AlterColumn<decimal>(
                name: "Hours",
                table: "WorkLogs",
                type: "decimal(4,2)",
                precision: 4,
                scale: 2,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "WorkLogs",
                type: "DATE",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WorkLogs",
                table: "WorkLogs",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    ProjectId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tasks_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_ProjectId",
                table: "Tasks",
                column: "ProjectId");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkLogs_Tasks_TaskId",
                table: "WorkLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkLogs_Users_UserId",
                table: "WorkLogs");

            migrationBuilder.DropTable(
                name: "Tasks");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WorkLogs",
                table: "WorkLogs");

            migrationBuilder.RenameTable(
                name: "WorkLogs",
                newName: "WorkLog");

            migrationBuilder.RenameIndex(
                name: "IX_WorkLogs_UserId",
                table: "WorkLog",
                newName: "IX_WorkLog_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_WorkLogs_TaskId",
                table: "WorkLog",
                newName: "IX_WorkLog_TaskId");

            migrationBuilder.AlterColumn<decimal>(
                name: "Hours",
                table: "WorkLog",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(4,2)",
                oldPrecision: 4,
                oldScale: 2);

            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "WorkLog",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "DATE");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WorkLog",
                table: "WorkLog",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkLog_Users_TaskId",
                table: "WorkLog",
                column: "TaskId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkLog_Users_UserId",
                table: "WorkLog",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
