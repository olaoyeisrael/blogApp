const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const blogRoutes = require('./Routes/blogRoutes');


const app = express();


//connect to mongodb
const dbURI = 'mongodb+srv://Israel:Israel123@nodeapp.3bllk.mongodb.net/node-app?retryWrites=true&w=majority'
mongoose.connect(dbURI,{useNewUrlParser:true, useUnifiedTopology:true})
.then((result)=>{let port = process.env.PORT;
    if (port == null || port == "") {
      port = 8000;
    }
    app.listen(port,()=>{console.log("Server has started successfully");})})
.catch((err)=> console.log(err))
//register veiw engine
app.set('view engine','ejs');
;

//listening for request
//app.listen(3000);


//testing middleware

app.use(express.static('public')) //style in public
app.use(express.urlencoded({extended: true}))  //middleware for the post
app.use(express.json())
app.use(morgan('dev'))



app.get('/add-blog',(req,res)=>{

    //creating a document with the schema
const blog = new Blog({
    title:'new blog 3',
    snippet:'about my new blog',
    body:'more about my new blog'});

blog.save() //when you are saving, you use it on the instance you created.
    .then((result)=>{res.send(result)
})
    .catch((err)=>{console.log(err)})
});
app.get('/all-blogs',(req, res)=>{
    Blog.find()//when you are finding, you use it directly
    .then((result)=>{res.send(result)})
    .catch((err)=>{console.log(err)})
});

app.get('/single-blog',(req,res)=>{
    Blog.findById('62123959fed0248e01bc9111')
    
    .then((result)=>{res.send(result)})
    .catch((err)=>{console.log(err)})
})


    //routes
app.get('/',(req, res)=>{
   
    res.redirect('/blogs')

})

app.get('/about',(req, res)=>{
   
    res.render('blogs/about',{title:'About'})
})

//routes


app.use('/blogs',blogRoutes);


//404
app.use((req,res)=>{
res.status(404).render('404',{title: '404!'});

})


