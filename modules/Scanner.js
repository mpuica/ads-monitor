// scanner.js
// ==========
// Base class for the scanning loop

var scraper = require('kijiji-scraper');

// Constructor
function Scanner(config) {
    this.config = {
        interval : 10000,
        prefs: {
            locationId : '1700281',
            categoryId : '30'
        },
        params: {

        }
    };
    this.start_time = Date.now().toString();
    this.history = [];
    this.log = [];
    this.loop = 0;
    this.iterations = 0;
    this.items = 0;
}

// start method will place the Scanner in execute mode
Scanner.prototype.start = function(config) {
    var self = this;

    this.config = config;

    this.start_time = Date.now().toString();
    this.history = [];
    this.log = [];
    this.loop = 0;
    this.iterations = 0;
    this.items = 0;

    console.log('Scanner start method called.');
    console.log(this.config);
    self.iterations = 0;
    self.loop =  true;
    self.execute();
};

// stop method will stop the execution of the scanner
Scanner.prototype.stop = function() {
    var self = this;
    console.log('Scanner stop method called on iteration ' + self.iterations);
    clearTimeout(self.loop);
    self.loop = false;
};

Scanner.prototype.execute = function () {
    var self = this;
    if(self.loop){
        self.loop = setTimeout(function(){
            self.iterations ++;
            console.log("iteration no " + self.iterations);
            scraper.query(
                self.config.prefs,
                self.config.params,
                function(err, ads) {
                    ads.forEach(function(ad) {
                        if(self.history.indexOf(ad.link) == -1 ) {
                            //we have newer ads in list, so take action and flag to save the new history
                            self.history.push(ad.link);
                            var  log_entry = '[' + ad.pubDate + '] ' +
                                ad.title + ' (' + ad.innerAd.info.Prix + ') ' +
                                ad.link ;
                            self.log.push(log_entry);
                            self.items ++;
                            console.log('==========================================================');
                            console.log(self.history);
                            console.log('----------------------------------------------------------');
                            console.log(ad);

                            console.log('new ad ' + self.history.length + ' : ' + self.log.length);
                        }

                    });
                });

            self.execute();
        }, self.config.interval);
    }
};

// here you have it!
module.exports = Scanner;
