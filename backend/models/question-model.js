// schema/structure
// Import mongoose
// define schema:
//     question : string,
//      option : array of object :[{id,value}]
// 1:Mango 2:Apple 3: grapes 4: kiwi
//         answer : object {id,value}
// export model

const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({

    question:String,
    options:[{id:Number, value:String}],
    answer:{id:Number, value:String}

})

module.exports = mongoose.models?.Question || mongoose.model("Question", questionSchema)