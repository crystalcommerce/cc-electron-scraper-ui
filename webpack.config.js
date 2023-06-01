const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/*We are basically telling webpack to take index.js from entry. Then check for all file extensions in resolve. 
After that apply all the rules in module.rules and produce the output and place it in main.js in the public folder.*/

module.exports={
    
    entry : {
        main : path.resolve(__dirname, './src/index.js'),
    },
    output : {
        filename : "index.js",
        path : path.resolve(__dirname, "dist"),
    },
    devServer : {

        static: ["./public"],
         /** "open" 
          * opens the browser after server is successfully started
         */
        open: true,
         /** "hot"
          * enabling and disabling HMR. takes "true", "false" and "only". 
          * "only" is used if enable Hot Module Replacement without page 
          * refresh as a fallback in case of build failures
          */
        hot: true ,
         /** "liveReload"
          * disable live reload on the browser. "hot" must be set to false for this to work
         */
        liveReload: true,

        port : 4777,
        open : true,
        webSocketServer: false,
    },
    // plugins : [
    //     new HtmlWebpackPlugin({
    //         title : "Browser Scraper"
    //     })
    // ],

    resolve: {
        /** "extensions" 
         * If multiple files share the same name but have different extensions, webpack will 
         * resolve the one with the extension listed first in the array and skip the rest. 
         * This is what enables users to leave off the extension when importing
         */
        extensions: ['.js','.jsx','.json'] 
    },
    module:{
        /** "rules"
         * This says - "Hey webpack compiler, when you come across a path that resolves to a '.js or .jsx' 
         * file inside of a require()/import statement, use the babel-loader to transform it before you 
         * add it to the bundle. And in this process, kindly make sure to exclude node_modules folder from 
         * being searched"
         */
        // rules: [
        //     {
        //         test: /\.(js|jsx)$/,    //kind of file extension this rule should look for and apply in test
        //         exclude: /node_modules/, //folder to be excluded
        //         use:  'babel-loader' //loader which we are going to use
        //     },
        //     {
        //         test: /\.s[ac]ss$/i,
        //         use: [
        //             "style-loader",
        //             "css-loader",
        //             "less-loader",
        //             {
        //               loader: "sass-loader",
        //               options: {
        //                 // Prefer `dart-sass`
        //                 implementation: require("node-sass"),
        //               },
        //             },
        //         ],
        //     },
        //     {
        //         test: /\.css$/,
        //         use: ['style-loader', 'css-loader'],
        //     },
        // ]
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                    {
                    loader: 'sass-loader',
                    options: {
                        // Prefer `dart-sass`
                        implementation: require('node-sass'),
                    },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    }
}