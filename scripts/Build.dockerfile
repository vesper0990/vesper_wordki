FROM microsoft/dotnet:latest
ARG BUILD_CONFIG
ARG BUILD_LOCATION
ENV NUGET_XMLDOC_MODE skip
WORKDIR /app
COPY ./src/Wordki.Api/*.csproj ./src/Wordki.Api/
COPY ./src/Wordki.Infrastructure/*.csproj ./src/Wordki.Infrastructure/
COPY ./src/Wordki.Core/*.csproj ./src/Wordki.Core/
run dotnet restore ./src/Wordki.Api/Wordki.Api.csproj
COPY . /app
run dotnet publish --output ${BUILD_LOCATION} --configuration ${BUILD_CONFIG}

