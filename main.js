const express = require("express");
const cors = require('cors')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;
const User = mongoose.model('users', {name : String, age: Number});

(async () => {
    app.get('/users',async (req,res) => {
        const user = await User.find({});
        res.status(200).send(user);
    })

    app.put('/users/:_id',async (req,res) => {
        const user = await User.findById(req.params._id);
        console.log(req.body.name);
        user.name = req.body.name;
        user.age = req.body.age;
        await user.save();
        res.status(200).send({msg : "user has been updated"})
    })

    app.post('/users',async (req,res) => {
        let user = new User();
        console.log(req.body);
        user.name = req.body.name;
        user.age = req.body.age;
        await user.save();
        res.status(201).send(user);
    })
    app.delete('/users/:_id',async (req,res) => {
        // users = users.filter(item=>item.id!==deleteid);that is bullshit
        // res.status(201).send(users);

        const user = await User.findOne({_id: req.params._id});
        if(user){
            user.delete();
            res.status(201).send({msg : "Success delete"});
        }
        else{
            res.status(404).send({msg : "not found"});
        }
    })
})();

app.listen(port,() => {
    console.log(`Server has been started: http://localhost:${port}\n`);
});
