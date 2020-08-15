const express = require('express');
const Readable = require('stream');
const DEFUALT_RESULT_COUNT_PER_PAGE = 15;
const DEFAULT_PAGE = 0;


const app = express();
var mongoose = require('./database');
var crud = require('./routes/crud')(mongoose);
var schema = require('./models/schema');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());

app.get('/entity/:perPage-:page', crud.fetch);
app.post('/entity/add/', crud.addEntity);
app.post('/entity/update', crud.updateEntity);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

app.listen(4400);