const mongoose = require("mongoose");

function connectDB(){

    // mongoose.connect('mongodb+srv://admin:pzJHERiOr02lfDBc@cluster0.98wma.mongodb.net/rohitcars' , {useUnifiedTopology: true , useNewUrlParser: true})

    mongoose.connect("mongodb://raunaksrivastava6762:Raunak%40123@ac-pie29bm-shard-00-00.krvenlk.mongodb.net:27017,ac-pie29bm-shard-00-01.krvenlk.mongodb.net:27017,ac-pie29bm-shard-00-02.krvenlk.mongodb.net:27017/urbanrentals?ssl=true&replicaSet=atlas-ntjq9c-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0")

    const connection = mongoose.connection

    connection.on('connected' , ()=>{
        console.log('Mongo DB Connection Successfull')
    })

    connection.on('error' , ()=>{
        console.log('Mongo DB Connection Error')
    })


}

connectDB()

module.exports = mongoose