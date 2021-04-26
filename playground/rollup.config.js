import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';

const legacy = process.env.decorators === 'legacy';

export default [
    {
        plugins: [
            babel({
                babelHelpers: 'bundled' ,
                plugins: [
                    legacy ? ["@babel/plugin-proposal-decorators", {legacy}] :
                        ["@babel/plugin-proposal-decorators", {legacy, decoratorsBeforeExport: true}],
                    ["@babel/plugin-proposal-class-properties", { "loose" : true }]
                ],
                presets: [
                    "@babel/preset-react"
                ]
            }),
            json(),
            postcss({
                plugins: []
            }),
            replace({
                'process.env.NODE_ENV': JSON.stringify( 'production' )
            }),
            resolve({
                browser: true
            }),
            commonjs({
                extensions: ['.js', '.jsx']
            })
        ]
    },
];
