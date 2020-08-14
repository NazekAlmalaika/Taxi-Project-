const express = require('express');
const Readable = require('stream');
const DEFUALT_RESULT_COUNT_PER_PAGE = 15;
const DEFAULT_PAGE = 0;


const app = express();
var mongoose = require('./database');
var ridersRoutes = require('./routes/riders')(mongoose);
var schema = require('./models/schema');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());

app.get('/riders/:perPage-:page', ridersRoutes.allRiders);
app.post('/rider/add/', ridersRoutes.addRider);
app.post('/rider/update', ridersRoutes.updateRider);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

app.listen(4400);