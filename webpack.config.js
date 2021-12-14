'use strict';

const path = require('path');

module.exports = (env, argv) => {

    const mode = argv.mode || 'development';

    const isProduction = mode === 'production';

    const debugAccessPoint = isProduction
        ? {}
        : {libraryTarget: 'var', library: 'debugAccessPoint'};

    return {
        mode: mode,
        devtool: isProduction ? 'source-map' : false,
        entry: './src/Markupper.tsx',

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'markupper.js',
            ...debugAccessPoint
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].css',
                            },
                        },
                        'extract-loader',
                        'css-loader',
                        'sass-loader',
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
    }
};