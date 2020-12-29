FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /server

COPY ["./tests/Wordki.Tests.E2E/Wordki.Tests.E2E.csproj", "tests/Wordki.Tests.E2E/"]
COPY ["./tests/Wordki.Tests.Utils/Wordki.Tests.Utils.csproj", "tests/Wordki.Tests.Utils/"]
COPY ["./src/Wordki.Utils/Wordki.Utils.csproj", "src/Wordki.Utils/"]
COPY ["./src/Wordki.Api/Wordki.Api.csproj", "src/Wordki.Api/"]

RUN dotnet restore "./tests/Wordki.Tests.E2E/Wordki.Tests.E2E.csproj"

COPY ./src ./src
COPY ./tests ./tests

COPY ./build/common/wait ./wait
RUN chmod +x ./wait

RUN dotnet build "./tests/Wordki.Tests.E2E/Wordki.Tests.E2E.csproj"

ENTRYPOINT ./wait && dotnet test ./tests/Wordki.Tests.E2E/Wordki.Tests.E2E.csproj -r ./tests/Wordki.Tests.E2E/bin -l nunit;LogFileName=TestResults.xml
