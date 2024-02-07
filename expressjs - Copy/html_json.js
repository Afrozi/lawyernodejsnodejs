const express = require('express');
const app = express();
const port = 8000;
app.get("/",(req,res)=>{
    res.write(" <h1> hello world good </h1>");
    res.write(" <h2> hello world good </h2>");
    res.send();
})
app.get("/about",(req,res)=>{
    res.send("hello world good about");
})
app.get("/contact",(req,res)=>{
    res.send([
        {
        id:1,
        name:"afrozkhan",
        course:"adce"
    },
        {
        id:1,
        name:"afrozkhan",
        course:"adce"
    },
        {
        id:1,
        name:"afrozkhan",
        course:"adce"
    },
]);
})
app.listen(port,()=>{
    console.log('server is a listen');
})