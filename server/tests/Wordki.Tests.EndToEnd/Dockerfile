FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /server
COPY ["./tests/Wordki.Tests.EndToEnd/Wordki.Tests.EndToEnd.csproj", "tests/Wordki.Tests.EndToEnd/"]
COPY ["./src/Wordki.Tests.Utils/Wordki.Tests.Utils.csproj", "src/Wordki.Tests.Utils/"]
COPY ["./src/Wordki.Queries/Wordki.Queries.csproj", "src/Wordki.Queries/"]
COPY ["./src/Wordki.Infrastructure/Wordki.Infrastructure.csproj", "src/Wordki.Infrastructure/"]
COPY ["./src/Wordki.Core/Wordki.Core.csproj", "src/Wordki.Core/"]
COPY ["./src/Wordki.Utils/Wordki.Utils.csproj", "src/Wordki.Utils/"]
COPY ["./src/Wordki.Commands/Wordki.Commands.csproj", "src/Wordki.Commands/"]
COPY ["./src/Wordki.Api/Wordki.Api.csproj", "src/Wordki.Api/"]
RUN dotnet restore "tests/Wordki.Tests.EndToEnd/Wordki.Tests.EndToEnd.csproj"
COPY ./src ./src
COPY ./tests ./tests
WORKDIR "/server/tests/Wordki.Tests.EndToEnd"
RUN dotnet build "Wordki.Tests.EndToEnd.csproj"
#RUN dotnet test "Wordki.Tests.EndToEnd.csproj" -r ./results

ENTRYPOINT ["dotnet", "test", "Wordki.Tests.EndToEnd.csproj", "-r", "./results", "-l", "nunit;LogFileName=TestResults.xml"]
#ENTRYPOINT ["tail", "-f", "/dev/null"]
