import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

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
                ]
            }),
            resolve(),
            commonjs()
        ]
    },
];
