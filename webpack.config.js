var path = require('path')
//在内存中，根据指定的模板页面，生成一份内存中的首页，同时自动把打包好的bundle注入到页面底部
//如果要配置插件，需要在到处的对象中，挂载一个plugins节点
var htmlWbpackFlugin = require('html-webpack-plugin')

module.exports = {
    entry:path.join(__dirname, './src/main.js'),//入口，要使用webpack打包哪个文件
    output:{
        path:path.join(__dirname, "./dist"), //指定打包好的文件，输出到哪个目录中去
        filename:'bundle.js' //这是指定输出文件的名称
    },
    plugins:[
        //所有的webpack插件的配置节点
        new htmlWbpackFlugin({
            template:path.join(__dirname,"./src/index.html"), //指定模板文件路径
            filename:'index.html' //设置生成的内存页面名称 //与你的页面名称相同
        })
    ],
    module:{
        //配置所有第三方loader
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader']}, //处理css文件的loader
            {test:/\.less/,use:['style-loader','css-loader','less-loader']}, //处理less文件的loader
            {test:/\.scss/,use:['style-loader','css-loader','sass-loader']},
            //处理图片路径的loader

            //限制大于的时候会给一个url地址，复合范围的时候就给一个64码，这样节省资源
            //limit = 91281&name =[name].[ext],限制大小和不改变姓名,
            ///相同的名字不管是不是在一个文件夹都会覆盖
            //超过范围的时候，显示八位哈希值-图片名字.格式 [hash:8]-[name].[ext],哈希值最长放32位
            {test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit = 91281&name =[hash:8]-[name].[ext]'},
            {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'}, //处理字体文件的loader
            //配置babel转换高级的es6语法
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
            //处理.vue文件的loader
            {test:/\.vue$/,use:'vue-loader'}
        ]
    },
    resolve:{
        alias:{
            //设置vue被导入时候的包的路径
            "vue$":"vue/dist/vue.js"
        }
    }
}
// npm i webpack-dev-server@2.9.3 -D
// npm i html-webpack-plugin -D 
// npm i less-loader less -D
// npm i sass-loader node-sass -D
// npm i webpack@3.10.0 -D
//npm i url-loader file-loader -D
//npm i bootstrap -S

//以src为根目录进行托管
//"dev": "webpack-dev-server --open --port 3000 --contentBase src --hot"
//以根目录进行托管
//"dev": "webpack-dev-server --open --port 3000  --hot"
//npm install bootstrap@3.2.0 -S
// npm i babel-core babel-loader babel-plugin-transform-runtime -D
//  npm i babel-preset-env babel-preset-stage-0 -D
//npm install babel-loader@7.1.5 -D
// npm i vue -S
// npm i vue-loader vue-template-compiler -D
//npm i vue-router -S
// npm i mint-ui -S
//npm install babel-plugin-component -D