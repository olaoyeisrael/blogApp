const express = require('express')

const router = express.Router() //creating new instance of a router

const route = express()
const blogController = require('../controller/blogController');



route.get('/',blogController.blog_index);

route.post('',blogController.blog_create_post);



route.get('/create',blogController.blog_create_get);
    


route.get('/:id',blogController.blog_details);

route.delete('/:id',blogController.blog_delete);

module.exports = route