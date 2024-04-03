const webpackPreprocessor = require('@cypress/webpack-preprocessor');

module.exports = (on, config) => {
    const options = {
        webpackOptions: {
            resolve: {
                fullySpecified: false,
            },
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        resolve: {
                            fullySpecified: false, // This line is important for your issue
                        },
                    },
                ],
            },
        },
    };

    on('file:preprocessor', webpackPreprocessor(options));
};
