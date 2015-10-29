/**
 * Simple Express Json Logger
 *
 * Middleware that logs the path, user agent, time in milliseconds, method and ip ddress in json
 *
 */
var onHeaders = require('on-headers');
var dgram = require('dgram');

function simpleJsonLogger(host, port, options) {
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
      };
      if (options.loggedFromEnv) {
        options.loggedFromEnv.forEach(function(envVar) {
          if (process.env[envVar])
            logObject[envVar] = process.env[envVar];
        });
      }
      if (options.tags) {
        logObject.tags = options.tags
      }
      var logEntry = JSON.stringify(logObject);
      if (!options.disableConsole) {
        console.log(logEntry);
      }

      if (host && port) {
        sendMessage(host, port, logEntry);
      }
    });
    next();
  }
}
module.exports = simpleJsonLogger;

function sendMessage(host, port, logEntry) {
  var message = new Buffer(logEntry);
  var client = dgram.createSocket('udp4');
  client.send(message, 0, message.length, port, host, function(err, bytes) {
    if (err) throw err;
    client.close();
  });
}
module.exports.sendMessage = sendMessage;

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
