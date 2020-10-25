
require("babel-register")({
    presets: ["es2015", "react"]
});

const domain = require("./config").DOMAIN;
const router = require("./sitemap-routes").default;
const Sitemap = require("react-router-sitemap").default;

let idMap = require('./sitemap-data').default;

const filterConfig = {
    isValid: false,
    rules: [/\/dashboard/, /\*/],
};

setTimeout(
    function generateSitemap() {
        let paramsConfig = {
            "/teachers/:teacherTag": idMap
        };
        return (
            new Sitemap(router)
                .filterPaths(filterConfig)
                .applyParams(paramsConfig)
                .build(`${domain}`)
                .save("./public/sitemap.xml")
        );
}, 2000);
