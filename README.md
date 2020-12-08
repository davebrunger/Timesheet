# Timesheet
Timesheet is a .Net Core React/Typescript web app to record timesheet information. It uses SQL Server as the backend. The database is created
in a "Code First" manner with fluent Configuration. I have deliberately avoided using Redux, at least for the time being.

## Database
The database only needs to be configured once in the `appSettings.json` file in the `Timesheet` project.

## Migrations
To use EF Core migrations open a command window then navigate to the `Timesheet.Data.SqlServer` project folder.

## Add a Migration
Issue the command:

    dotnet ef migrations add <Migration Name> -s ..\Timesheet\Timesheet.csproj

## Perform a Database Update
Issue the command:

    dotnet ef database update -s ..\Timesheet\Timesheet.csproj
