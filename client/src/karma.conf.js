module.exports = function (config) {
  config.set({
    proxies: {
      '/assets/': '/src/assets/'
    },
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'), ,
      require('karma-junit-reporter')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: './dist/test/coverage',
      reports: ['html', 'lcovonly', 'cobertura'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml', 'junit'],
    junitReporter: {
      outputDir: '../dist/test/results'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadlessLauncher', 'ChromeDebug'],
    singleRun: false,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 60000,
    customLaunchers: {
      ChromeHeadlessLauncher: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      },
      ChromeDebug: {
        base: 'Chrome'
      },
    }
  });
};
