import fs from 'fs';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import json from '@rollup/plugin-json';
const lib = require("./package.json");
const outputFileName= 'c-promise';
const name= "CPromise";

const input = './lib/c-promise.js';

const year= new Date().getFullYear();
const banner= `// ${lib.name} v${lib.version}\n// Copyright (c) ${year===2020? "2020" : "2020-"+ year} ${lib.author.name} <${lib.author.email}>`;

fs.writeFileSync('./lib/env.json', JSON.stringify({version: lib.version}))

export default [
        {
            input,
            output: {
                file: `dist/${outputFileName}.cjs.js`,
                format: 'cjs',
                name,
                exports: "named",
                banner
            },
            plugins: [
                json(),
                resolve(),
                commonjs()
            ]
        },
        {
            input: './lib/umd-wrapper.js',
            output: {
                file: `dist/${outputFileName}.umd.js`,
                format: 'umd',
                name,
                exports: "default",
                banner
            },
            plugins: [
                json(),
                resolve(),
                commonjs()
            ]
        },
        {
            input: './lib/umd-wrapper.js',
            output: {
                file: `dist/${outputFileName}.umd.min.js`,
                format: 'umd',
                name,
                exports: "default",
                banner
            },
            plugins: [
                json(),
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
                exports: "named",
                banner
            },
            plugins: [
                json(),
                resolve(),
                commonjs()
            ]
        }
    ];
