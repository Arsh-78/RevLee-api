const express = require('express');
const mongoose = require('mongoose');
const QuestionList = require('./models/questionLModel');

const app = express();


//nodemon to run updates sync not restrting
//routes

app.use(express.json());

app.get('/', (req,res)=>{
    res.send('Hello Node Api')
})

app.get('/questionList/:email', async(req,res)=>{
    try{
        const {email} = req.params;
        const questionList = await QuestionList.findOne({ email: email });
        
        res.status(200).json(questionList);

    }catch(error){
        res.status(500).json({message: error.message})
    }

});

app.post('/questionList', async(req,res)=>{
    try{
        const qList = await QuestionList.create(req.body);
        res.status(200).json(qList);

    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
})

app.put('/questionList/:email', async(req,res)=>{
    try{
        const {email} = req.params;
        const newq = req.body
        const questionList = await QuestionList.findOneAndUpdate({ email: email },
            { $addToSet : {list : newq},},
            {unique:true,dropDups:true}
            );
            if(!questionList)
            {
                return res.status(404).json({message:'Cant find the lis for givrn mail'});
                
            }
        const updatedList = await QuestionList.findOne({ email: email});
        res.status(200).json(updatedList);

    }catch(error){
        res.status(500).json({message: error.message})
    }

});

app.delete('/questionList/:email', async (req, res) => {
    try {
        
        const {email} = req.params;
        const questionList = await QuestionList.findOneAndDelete({ email: email });

        if(!questionList)
        {
            return res.status(404).json({message:'user with the given mail doesnt exist'});
        }

        res.status(200).json(questionList);
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});
mongoose.
connect('mongodb+srv://admin:amin@cluster0.qxlbhwk.mongodb.net/QuestionList?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected to MongoDB')
    app.listen(3000,()=>{
    console.log('App is running on port 3000')
    });


}).catch(()=>{
    console.log('error')
})