const request = require("request");

const forecast = (latitude, longtitude, callback) => {
  const url = `http://api.weatherapi.com/v1/current.json?key=b9f36c7cb3a8463d996154433242602&q=${latitude},${longtitude}`;

  request({ url, json: true }, (error, response) => {
    const databody = response.body;
    if (error) {
      callback("ERROR HAS OCCURRED", undefined);
    } else if (databody.error) {
      callback(databody.error.message, undefined);
    } else {
      callback(undefined, databody);
    }
  });
};

module.exports = forecast;
