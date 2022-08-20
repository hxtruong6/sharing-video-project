const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },

  env: {
    BASE_URL: "http://127.0.0.1:8084/api",
  },
};
