const RinoCSS = require('rinocss');
const webpack = require('webpack');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require('path');

const webpackConfig = {
    entry: './cssdist/rinoui.css',
    output: {
        path: path.resolve(__dirname, 'mincssdist'),
        filename: 'rinoui.min.css'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin()
        ]
    }
};

async function build()
{
    let rinocss = new RinoCSS();
    let css = await rinocss.buildCSS(path.resolve("./src/css/main.tot"));
    await rinocss.writeFile("./cssdist/rinoui.css", css);
}

// Not working at the moment
async function buildMin()
{
    await build();
    await webpack(webpackConfig, (error, stats) =>
    {
        if (error || stats.hasErrors())
        {
            console.error(error || stats.compilation.errors);
        }
        else
        {
            console.log('Webpack build completed');
        }
    });
}

build();