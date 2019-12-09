FROM mcr.microsoft.com/dotnet/core/runtime:3.0 AS base
WORKDIR /app
EXPOSE 5000

ENV ASPNETCORE_URLS=http://+:5000

FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS build
WORKDIR /src
COPY ["src/Wordki.Api/Wordki.Api.csproj", "src/Wordki.Api/"]
COPY ["src/Wordki.Infrastructure/Wordki.Infrastructure.csproj", "src/Wordki.Infrastructure/"]
COPY ["src/Wordki.Utils/Wordki.Utils.csproj", "src/Wordki.Utils/"]
COPY ["src/Wordki.Queries/Wordki.Queries.csproj", "src/Wordki.Queries/"]
COPY ["src/Wordki.Commands/Wordki.Commands.csproj", "src/Wordki.Commands/"]
COPY ["src/Wordki.Core/Wordki.Core.csproj", "src/Wordki.Core/"]
RUN dotnet restore "src/Wordki.Api/Wordki.Api.csproj"
COPY . .
WORKDIR "/src/src/Wordki.Api"
RUN dotnet build "Wordki.Api.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Wordki.Api.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Wordki.Api.dll"]