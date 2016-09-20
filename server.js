// server.js

// set up ======================
var cheerio  = require('cheerio');
var express  = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var scraper = require('kijiji-scraper');
var path = require('path');

var app      = express();

// configuration ================
var config = require('./config/config');
var Scanner = require('./modules/Scanner');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(morgan('dev'));


// define Scanner model =============
scn = new Scanner();

// routes ========================

// get
app.get('/api/scanner/status', function(req, res) {

    if(scn.loop){
        var response = {
            server_started : scn.start_time,
            iterations: scn.iterations,
            items: scn.items,
            log: scn.log
        };
        res.json(response);
    } else {
        scn.stop();
        res.status(500);
        res.render('error', { error: 'server stopped the run.' });
    }

});

// start scanner
app.post('/api/scanner/start', function(req, res) {

    console.log(req.body);

    config = {
        interval : 10000,
        prefs: {
            locationId : req.body.location,
            categoryId : req.body.category
        },
        params: {
            "minPrice": req.body.minPrice,
            "maxPrice": req.body.maxPrice,
            "keywords": req.body.keywords,
            "adType": "OFFER"
        }
    };
    scn.start(config);
    res.json({server_started: scn.start_time});

});

// stop scanner
app.get('/api/scanner/stop', function(req, res) {
    scn.stop();
    res.json({server_started: false});
});

// application ===================
app.get('*', function(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, '/public') });
});

// listen ========================
app.listen(process.env.PORT || 8081);
console.log("Magic happens on port 8081 or other...");
