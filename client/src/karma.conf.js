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
      require('karma-junit-reporter'),
      require('karma-sabarivka-reporter'),
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    reporters: ['progress', 'kjhtml', 'junit', 'sabarivka'],
    junitReporter: {
      outputDir: '../dist/test/results'
    },
    coverageIstanbulReporter: {
      dir: './dist/test/coverage',
      reports: ['html', 'lcovonly', 'cobertura'],
      fixWebpackSourcePaths: true
    },
    coverageReporter: {
      include: [
        // Specify include pattern(s) first
        'src/**/*.ts',
        // Then specify "do not touch" patterns (note `!` sign on the beginning of each statement)
        '!src/main.ts',
        '!src/**/*.spec.ts',
        '!src/**/*.module.ts',
        '!src/**/environment*.ts',
        '!src/**/*mock.ts'
      ]
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
