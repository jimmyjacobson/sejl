/**
 * Simple Express Json Logger
 *
 * Middleware that logs the path, user agent, time in milliseconds, method and ip ddress in json
 *
 */
var onHeaders = require('on-headers');

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

function simpleJsonLogger() {
  return function(req, res, next) {
    var startAt = process.hrtime();
    onHeaders(res, function onHeaders() {
      var diff = process.hrtime(startAt)
      var time = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);
      var logObject = {
        path: req.path,
        method: req.method,
        requestTimeLength: time,
        ua: req.headers['user-agent'],
        ip: req.connection.remoteAddress,
        requestSize: res.body,
        time: getPrettyDate(),
        statusCode: res.statusCode
      };
      console.log(JSON.stringify(logObject));
    });
    next();
  }
}
module.exports = simpleJsonLogger;
