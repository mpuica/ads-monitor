#ads-monitor
A node.js app to monitor the preferred ads websites for updates on selected criteria and interval

### Description
* Scan the selected ads websites for new ads on defined criteria (limited to Kijiji for now)
* The Node.js API is receiving the call to start stop and fetch data from a looping server
  that is data scraping the RSS feed from Kijiji (using  kijiji-scraper) looking for new ads
  based on the selected critera taking action (sending email) and loggin into the frontend app
  all the new findings.

###Limitations (ToDO) :
* Works only with Kijiji (need to add more sources),
* I need a dynamic method to populate the criteria fields directly from the source 
(scrape the source for drop-down options also)
* No email for the moment
* TRY TO USE WEBSOCKETS INSTEAD OF LOOP POLLING

### Dependencies
express
request
cheerio
body-parser
method-override
morgan
kijiji-scraper

### Installation
`npm install`

### Documentation
[TBD]

###Demo
when the app is running you can see it here :
[https://ads-monitor.herokuapp.com/](https://ads-monitor.herokuapp.com/)