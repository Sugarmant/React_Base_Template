module.exports = {
    plugins: [
        require('postcss-pxtorem')({
            rootValue:16,
            propList: ['*'],
            exclude: /node_modules/i,
            unitPrecision:5
            
        })
    ]
}