# simple-express-json-logger

simple-express-json-logger is a simple express middleware that will output a very simple log in JSON format.  It has no options, nor does it have any customization yet.

requestTimeLength is in milliseconds.

## Usage

    var express = require('express');
    var simpleJsonLogger = require('simple-express-json-logger');
    // Setup your express app
    var app = express();
    app.use(simpleJsonLogger());

Now on every request, you'll get something similar to this:

    {"path":"/","method":"GET","requestTimeLength":"6.55","ua":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36","ip":"::1","time":"2015-10-21 13:35:37"}

## License ##

simple-express-json-logger is licensed under ISC.

## About ##

simple-express-json-logger was developed by the team at [Wedgies](http://www.wedgies.com).

Wedgies is a digital survey platform that gives media, journalists and brands in-line survey capabilities inside social media, their website, and their apps — where they can collect millions of opinions from their readers and users. Wedgies is the leading social survey platform that enables publishers to collect survey respondents directly within social media streams.

Wedgies, a darling of Tony Hsieh’s Las Vegas’ Vegas Tech Fund, is backed by an all-star list of investors including Greycroft, Advancit Capital, MESA Ventures, Knight Foundation, kbs+ Ventures, Battle Born Ventures, Twilio, 500 Startups and SV Angel.

Wedgies founding team consists of top talent in developer tools and community management with experience that includes Zappos.com, Overstock.com, and Backcountry.com.

[![Built with Wedgies](https://d3v9r9uda02hel.cloudfront.net/production/1.55.17/img/built-with-wedgies.png)](http://wedgies.com)
