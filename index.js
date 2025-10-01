const fs = require('fs');
const express = require('express');
const status= require('express-status-monitor')
const app = express();

app.use(status());
app.get('/',(req,res)=>{
  fs.readFile('temp.txt',(err,data)=>{
    res.end(data);
  })
})


app.listen(4000,()=>{
  console.log("server up");
})