import typescript from 'rollup-plugin-typescript2';
import del from 'rollup-plugin-delete';
import smartAsset from 'rollup-plugin-smart-asset';
import postcss from 'rollup-plugin-postcss';
import url from 'postcss-url';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'playground/src/3d-business-card/index.js',
        format: 'esm',
        banner: '/* eslint-disable */',
      },
      {
        file: 'dist/index.js',
        format: 'esm',
      }
    ],
    plugins: [
      del({
        targets: ['dist/*', 'playground/src/3d-business-card'],
      }),
      typescript(),
      postcss({
        modules: true,
        extract: true,
        plugins: [
          url({
            url: 'inline',
          }),
        ],
      }),
      smartAsset({
        url: 'inline',
      }),
    ]
  },
];
