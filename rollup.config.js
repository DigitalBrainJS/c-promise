import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";
const outputFileName= 'c-promise';
const name= "CPromise";

const mode= process.env.NODE_ENV;
const input = './lib/c-promise.js';

const config = mode === 'development' ? [
        {
            input,
            output: {
                file: `dist/${outputFileName}.js`,
                format: 'cjs',
                name,
                exports: "auto"
            },
            plugins: [
                resolve(),
                commonjs()
            ]
        },
    ] :
    [
        {
            input,
            output: {
                file: `dist/${outputFileName}.cjs.js`,
                format: 'cjs',
                name,
                exports: "auto"
            },
            plugins: [
                resolve(),
                commonjs()
            ]
        },
        {
            input,
            output: {
                file: `dist/${outputFileName}.umd.js`,
                format: 'umd',
                name,
                exports: "auto"
            },
            plugins: [
                resolve(),
                commonjs()
            ]
        },
        {
            input,
            output: {
                file: `dist/${outputFileName}.umd.min.js`,
                format: 'umd',
                name,
                exports: "auto"
            },
            plugins: [
                resolve(),
                commonjs(),
                terser()
            ]
        },
        {
            input,
            output: {
                file: `dist/${outputFileName}.mjs`,
                format: 'esm',
                preferConst: true,
                exports: "named"
            },
            plugins: [
                resolve(),
                commonjs()
            ]
        },
        {
            input: './dev/dev.js',
            output: {
                file: `dist/dev/${outputFileName}.umd.js`,
                format: 'umd',
                name,
                exports: "auto"
            },
            plugins: [
                resolve(),
                commonjs()
            ]
        },
    ];


export default config;
