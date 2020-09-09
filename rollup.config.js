import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";
const PACKAGE_NAME= require('./package.json').name;
const name= "CPromise";

const mode= process.env.NODE_ENV;
const input = './lib/c-promise.js';

const config = mode === 'development' ? [
        {
            input,
            output: {
                file: `dist/${PACKAGE_NAME}.js`,
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
                file: `dist/${PACKAGE_NAME}.cjs.js`,
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
                file: `dist/${PACKAGE_NAME}.umd.js`,
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
                file: `dist/${PACKAGE_NAME}.umd.min.js`,
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
                file: `dist/${PACKAGE_NAME}.mjs`,
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
                file: `dist/dev/${PACKAGE_NAME}.umd.js`,
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
