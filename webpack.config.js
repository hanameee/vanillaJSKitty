const path = require("path");

// 단순한 프로젝트이므로 오직 js 번들링만 진행. HTML/CSS는 웹팩 없이 dist 폴더에서 관리
module.exports = {
    entry: "./src/main.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    }
};
