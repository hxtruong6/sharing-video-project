const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },

  env: {
    BASE_URL: "https://poll-fvpw4qxifq-as.a.run.app/api",
    // BASE_URL: "http://127.0.0.1:8084/api",
  },
};
