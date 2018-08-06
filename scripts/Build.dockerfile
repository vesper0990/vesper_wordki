FROM microsoft/aspnetcore-build:latest
ARG BUILD_CONFIG
ARG BUILD_LOCATION
ENV NUGET_XMLDOC_MODE skip
WORKDIR /app
COPY *.csproj .
run dotnet restore
COPY . /app
run dotnet publish --output ${BUILD_LOCATION} --configuration ${BUILD_CONFIG}

