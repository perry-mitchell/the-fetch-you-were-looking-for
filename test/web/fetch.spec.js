const fetch = require("../../source/index.js");

const DEMO_TEXT_URL = "http://localhost:8081/robots.txt";
const DEMO_DATA_URL = "http://localhost:8081/favicon.ico";

describe("fetch", function() {

    it("fetches text", function() {
        return fetch(DEMO_TEXT_URL)
            .then(res => res.text())
            .then(contents => {
                expect(contents).to.match(/User-agent/i);
            });
    });

    it("fetches data", function() {
        return fetch(DEMO_DATA_URL)
            .then(res => res.buffer())
            .then(contents => {
                expect(contents).to.have.lengthOf(5430);
            });
    });

});
