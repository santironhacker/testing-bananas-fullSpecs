// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

// enabled this flag to remove skipped tests from the output
const COMPACT = true;

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-mocha-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['mocha'],
    mochaReporter: {
      ignoreSkipped: COMPACT,
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome_Headless"],
    singleRun: false,
    customLaunchers: {
      Chrome_Headless: {
          base: 'Chrome',
          flags: ['--headless', '--disable-gpu', '--remote-debugging-port=9222']
      }
    },
  });
};
