const mongoose = require('mongoose');

const listSchema = mongoose.Schema({

    _id: false, 
    questionName : String,
    questionDescription : String,
    questionLevel : String,
    questionUrl : String,
    questionTags : [String]
});

const questionListSchema = mongoose.Schema(
    {
    email :{type : String, required : true ,unique : true   },
    list :[listSchema]
},
{
    timestamps : true
});


const Question = mongoose.model('Question',listSchema);
const QuestionList = mongoose.model('QuestionList',questionListSchema);
module.exports = Question;
module.exports =QuestionList;

