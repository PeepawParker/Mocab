const https = require("https");

exports.getRequest = (url, headers = {}) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: "GET",
      headers: headers,
    };

    const req = https.request(url, options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const parsedData = JSON.parse(data);
          resolve(parsedData);
        } catch (err) {
          reject(`Error parsing JSON: ${err.message}`);
        }
      });
    });

    req.on("error", (err) => {
      reject(`Request error: ${err.message}`);
    });

    req.end();
  });
};
