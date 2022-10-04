const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
var cors = require('cors');
const app = express();
app.use(cors());
mongoose.connect('mongodb://localhost/urlShortner',{
    useNewUrlParser:true, useUnifiedTopology: true
});

app.use(express.urlencoded({extended: false}));
app.get('/', async(req, res)=>{
    const shortUrls = await ShortUrl.find();
    res.json({shortUrls: shortUrls});
});
app.post('/shortUrls',async (req, res)=>{
    await ShortUrl.create({full: req.body.fullUrl });
    res.redirect(req.headers.origin);
});
app.get('/:shortUrl', async(req, res)=>{
    console.log(req.params.shortUrl);
    const obj =  await ShortUrl.findOne({short: req.params.shortUrl});
    console.log(obj.full);
    let url = obj.full;
    res.json({url: url});
})
app.listen(5000);
