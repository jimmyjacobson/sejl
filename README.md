# simple-express-json-logger

**NOTICE: This library has been deprecated in favor of [Koala](https://github.com/wedgies/koala).**

simple-express-json-logger is a simple express middleware that will output a very simple log in JSON format.

requestTimeLength is in milliseconds.

## Usage

    var express = require('express');
    var simpleJsonLogger = require('simple-express-json-logger');
    // Setup your express app
    var app = express();
    app.use(simpleJsonLogger.logger);

Now on every request, you'll get something similar to this:

    {"path":"/","method":"GET","requestTimeLength":"6.55","ua":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36","ip":"::1","time":"2015-10-21 13:35:37"}

### Logstash UDP support ###

If you supply a host and a port when you initiate simple-express-json-logger, you'll get log entries to your UDP server.

    var express = require('express');
    var simpleJsonLogger = require('simple-express-json-logger');
    // Setup your express app
    var app = express();
    // Send message via udp to logstash.server.com:12345
    app.use(simpleJsonLogger.logger('logstash.server.com', 12345));

Setup your logstash server like so:

    input {
      udp {
        port => 12345
        type => 'node-logs' // Or whatever you want the logs to show up as
        codec => 'json'
      }
      output {
        // Whatever you want
      }
    }

You can also use the optional flag to turn off the console.log message so you can get only the UDP message sent.

    app.use(simpleJsonLogger.logger('logstash.server.com', 12345, { disableConsole: true }));

You can log environmental variables as well, like by adding them to the array in your options:

    app.use(simpleJsonLogger('logstash.server.com', 12345, {
      loggedFromEnv: ['envVar1', 'envVar2']
    ));

You can also add arbitrary tags that will get forwarded to your logs.  

    app.use(simpleJsonLogger.logger('logstash.server.com', 12345, {
      tags: ['web server 1', 'staging environment']
    ));

## License ##

simple-express-json-logger is licensed under ISC.

## About ##

simple-express-json-logger was developed by the team at [Wedgies](http://www.wedgies.com).

Wedgies is a digital survey platform that gives media, journalists and brands in-line survey capabilities inside social media, their website, and their apps — where they can collect millions of opinions from their readers and users. Wedgies is the leading social survey platform that enables publishers to collect survey respondents directly within social media streams.

Wedgies, a darling of Tony Hsieh’s Las Vegas’ Vegas Tech Fund, is backed by an all-star list of investors including Greycroft, Advancit Capital, MESA Ventures, Knight Foundation, kbs+ Ventures, Battle Born Ventures, Twilio, 500 Startups and SV Angel.

Wedgies founding team consists of top talent in developer tools and community management with experience that includes Zappos.com, Overstock.com, and Backcountry.com.

[![Built with Wedgies](https://d3v9r9uda02hel.cloudfront.net/production/1.55.17/img/built-with-wedgies.png)](http://wedgies.com)
