using Autofac;
using Microsoft.Extensions.Configuration;
using Wordki.Infrastructure.Settings;

namespace Wordki.Infrastructure.IoC.Modules
{
    public class SettingsModule : Module
    {

        private readonly IConfiguration configuration;

        public SettingsModule(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        protected override void Load(ContainerBuilder builder)
        {
            var section = typeof(GeneralSettings).Name.Replace("Settings", string.Empty);
            var configurationValue = new GeneralSettings();
            configuration.GetSection(section).Bind(configurationValue);
            builder.RegisterInstance(configurationValue).SingleInstance();
        }

    }
}
