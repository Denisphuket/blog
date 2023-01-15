import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { BuildPlugin } from './buildPlugin';
import { BuildLoaders } from './buildLoaders';
import { BuildResolvers } from './buildResolvers';
import { BuildDevServer } from './buildDevServer';

export function BuildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const { paths, mode, isDev } = options;

    return {
        mode,
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
            publicPath: '/',
        },
        plugins: BuildPlugin(options),
        module: {
            rules: BuildLoaders(options),
        },
        resolve: BuildResolvers(options),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? BuildDevServer(options) : undefined,
    };
}
