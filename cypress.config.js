const { defineConfig } = require("cypress");
const webpackPreprocessor = require("@cypress/webpack-preprocessor");

module.exports = defineConfig({
  projectId: "ihvk1c",
  e2e: {
    baseUrl: 'https://sqlverifier-live-6e21ca0ed768.herokuapp.com',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: {
          resolve: {
            fullySpecified: false,
          },
          module: {
            rules: [
              {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: [{
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                  },
                }],
                resolve: {
                  fullySpecified: false,
                },
              },
              // Include other rules if necessary
            ],
          },
        },
        watchOptions: {},
      };

      on('file:preprocessor', webpackPreprocessor(options));
    },
  },
});
