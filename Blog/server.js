const express = require('express');
const articalesRouter = require("./routes/articales");
const Article = require('./models/article')
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
mongoose.connect("mongodb://localhost:27017/Food");

app.set('view engine', 'ejs');
app.use (express.urlencoded({extended : false}))
app.use(methodOverride('_method'));
app.get('/', async(req, res) => {
   const articales = await Article.find().sort({createdAt :'desc'})
    res.render('articles/index', { articales: articales });
});
app.use('/articles', articalesRouter);
app.listen(4000, () => {
    console.log("Server running on port 4000");
});

