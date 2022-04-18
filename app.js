const express = require('express');
const morgan  = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
//express app
const app = express();
//In review 2
// const http = require("http")
// const PORT = 3000
// const server = http.createServer()

// server.listen(PORT, error => {
//   if (error) {
//     return console.error(error)
//   }

//  app.get('/about-me',(req,res)=>{
//     res.redirect('about','301');
// })
// })

// connect to mongo db
const dbURI = 'mongodb+srv://Nithish:welcome123@nodeblog.1kxq2.mongodb.net/note-tuts?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser:true, useUnifiedTopology: true})
     .then((result)=>{ app.listen(3000); })
     .catch((err)=> console.log(err));

//register view engine
app.set('view engine','ejs');
app.listen(3000, function(){
  console.log("info",'Server is running at port : ' + 3000);
});

app.use(express.static('public'));

app.use(morgan('dev'));

app.use(express.urlencoded({extended:true}));
app.get('/',(req,res)=>{
  res.redirect('/blogs');
});
app.get('/about',(req,res)=>{
  res.render('about',{title:'About'});
});

app.use('/blogs',blogRoutes);

app.get('/about-me',(req,res)=>{
    res.redirect('about','301');
})

app.use((req,res)=>{
    res.status(404).render('404',{title:'404'});
})
module.exports = app;