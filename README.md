# D3 Playground

A playground to test a setup/installation for d3 developments.

## My recommended software tools

- Required Base: [node JS and node package manager](http://nodejs.org)
- Recommended Editor: [VS code](https://code.visualstudio.com/)

## How to setup a d3 project using typescript and webpack

1. Create a project folder `proj` and switch in the terminal to the folder.

2. Initialize npm project `npm init` (this creates a `package.json` file)

3. Install d3 and typings:

        npm install --save d3
        npm install --save-dev @types/d3

4. Install webpack and necessary tools:

        npm install --save-dev webpack webpack-cli webpack-dev-server
        npm install --save-dev awesome-typescript-loader source-map-loader html-webpack-plugin

5. Add a typescript dependency

        npm install --save-dev typescript awesome-typescript-loader source-map-loader

6. Create a source folder `src` and a `index.html` containing:

```xml
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>D3 with typescript</title>
</head>

<body>
    <h1>Typescript, Webpack, d3</h1>
    <div id="select-div">
        Blabla
    </div>

    <svg width="300px" height="150px">
        <rect x="20" y="20" width="20px" height="20" rx="5" ry="5" />
        <rect x="60" y="20" width="20px" height="20" rx="5" ry="5" />
        <rect x="100" y="20" width="20px" height="20" rx="5" ry="5" />
    </svg>
</body>

</html>
```

7. Add a typescript source `index.ts` containing:

```typescript
import * as d3 from 'd3';

console.log("JS is running");

d3.select("h1").style("color", "blue");
d3.select("#select-div").style("background-color", "#039BE5");

const square = d3.selectAll("rect");
square.style("fill", "orange");
```

8. Configure webpack by creating a `webpack.config.js` in the project folder to process index.html and source files, creating source maps, ...

```js
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
})

module.exports = {
    mode: 'development',

    entry: './src/index.ts',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        extensions: ['.ts', '.ts', '.js']
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    plugins: [HtmlWebpackPluginConfig]
};
```

9. Configure typescript compiler by creating `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "sourceMap": true,
    "outDir": "./dist/",
    "strict": true,
    "noImplicitAny": true
  },
  "include": [
    "./src/**/*"
  ]
}
```

10. Configure the package scripts to run a dev-server and build the project. Modify `package.json` and add under `scripts`:

        "start": "webpack-dev-server",
        "build": "webpack"

11. To run the dev-server go to the console and run

        npm start

    Now connect to [http://localhost:8080](http://localhost:8080)

12. To build a self contained project (index.html, necessary js files):

        npm run build
