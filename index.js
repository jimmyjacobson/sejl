/**
 * Simple Express Json Logger
 *
 * Middleware that logs the path, user agent, time in milliseconds, method and ip ddress in json
 *
 */
var onHeaders = require('on-headers');
var dgram = require('dgram');
var os = require('os');

function getPrettyDate() {
  var d = new Date();
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();

  return [year, month, day].join('-') + " "+[h, m, s].join(':');
}

function simpleJsonLogger(host, port, options) {
  // Set disableConsole to false by default if it's not included
  disableConsole = typeof disableConsole !== 'undefined' ?  disableConsole : false;

  return function(req, res, next) {
    var startAt = process.hrtime();
    onHeaders(res, function onHeaders() {
      var diff = process.hrtime(startAt)
      var time = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);
      var ip = req.connection.remoteAddress;
      ip = "::ffff:127.0.0.1";
      var ipParts = ip.split(':');
      var ipv4 = ipParts[ipParts.length - 1];
      var ipv6 = ip.replace(ipv4, '');
      var logObject = {
        path: req.path,
        method: req.method,
        requestTimeLength: time,
        ua: req.headers['user-agent'],
        ip: req.connection.remoteAddress,
        ip: ipv4,
        ipv6: ipv4,
        requestSize: res.body,
        time: getPrettyDate(),
        statusCode: res.statusCode,
        hostname: os.hostname()
      };
      if (options.loggedFromEnv) {
        options.loggedFromEnv.forEach(function(envVar) {
          if (process.env[envVar])
            logObject[envVar] = process.env[envVar];
        });
      }
      var logEntry = JSON.stringify(logObject);
      if (!options.disableConsole) {
        console.log(logEntry);
      }

      if (host && port) {
        var message = new Buffer(logEntry);
        var client = dgram.createSocket('udp4');
        client.send(message, 0, message.length, port, host, function(err, bytes) {
          if (err) throw err;
          client.close();
        });

      }
    });
    next();
  }
}
module.exports = simpleJsonLogger;
