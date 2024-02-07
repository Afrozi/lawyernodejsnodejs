const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const hbs = require('hbs');
const methodoverride = require("method-override");
const ejsmate = require("ejs-mate");
const mongoose = require("mongoose");
const static_temp =path.join(__dirname,'../public');
const staticpath = path.join(__dirname,'../template/views');
 require("./db/connect");
 const chat = require("./model/model");
// const partials_path = path.join(__dirname,'../template/partials');
app.set('views',staticpath);
app.set('view engine','ejs');
app.engine('ejs', ejsmate);
app.use(methodoverride("_method"));
app.use(express.urlencoded({extended:true}));
// hbs.registerPartials(partials_path);
app.use(express.static(static_temp));
//show data
app.get('/about', async(req,res)=>{
    let chats = await chat.find();
    console.log(chats);
    res.render("about",{chats});
})
// index router
app.get('/',(req,res)=>{
    res.render('index');
})
// insert router
app.post('/about',(req,res)=>{
    let {fname,lname,email,phone,description} = req.body;
    let newdata = new chat({
        fname:fname,
        lname:lname,
        email:email,
        phone:phone,
        description:description,
    });
    console.log(newdata);
     newdata.save().then(()=>{
        console.log("data was success full submit");
    }).catch((err)=>{
        console.log(err);
    });
    res.redirect("/about");
});
// edit router
app.get("/about/:id/edit", async(req,res)=>{
    let {id} = req.params;
 let datachart = await chat.findById(id);
    res.render("edit",{datachart});
});
// update router
 app.put("/about/:id", async(req,res)=>{
    let {id} = req.params;
    let {fname:newfname,lname:newlname,email:newemail,phone:newphone,description:newdescription} = req.body;
    let updatedata = await chat.findByIdAndUpdate(id,{
        fname:newfname,
        lname:newlname,
        email:newemail,
        phone:newphone,
        description:newdescription,
    },{runValidators:true,new:true});
    console.log(updatedata);
    res.redirect("/about");
 })
 // delete router
 app.delete("/about/:id",async(req,res)=>{
    let {id} = req.params;
    let deletedata = await chat.findByIdAndDelete(id);
    console.log(deletedata);
    res.redirect('/about');
 })
app.get('*',(req,res)=>{
    res.render('error');
})
app.listen(port,()=>{
    console.log('server is a running');
});