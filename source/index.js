function reactNativeFetch(url, options) {
    const Buffer = require("buffer/").Buffer;
    // Upload example (XHR):
    //  https://gist.github.com/Tamal/9231005f0c62e1a3f23f60dc2f46ae35
    const method = options && options.method || "GET";
    const headers = options && typeof options.headers === "object" ?
        Object.assign({}, options.headers) : {};
    const body = options && options.body || null;
    return new Promise((resolve, reject) => {
        const oReq = new XMLHttpRequest();
        oReq.open(method, url, true);
        Object.keys(headers).forEach(header => {
            oReq.setRequestHeader(header, headers[header]);
        });
        oReq.responseType = "arraybuffer";
        oReq.onload = function (oEvent) {
            const arrayBuffer = oReq.response; // Note: not oReq.responseText
            const buff = Buffer.from(arrayBuffer);
            resolve(reactNativeWrapBuffer(buff));
        };
        oReq.send(body);
    });
}

function reactNativeWrapBuffer(buff) {
    const response = {
        text: () => Promise.resolve(buff.toString("utf8")),
        json: () => response.text().then(txt => JSON.parse(txt)),
        buffer: () => Promise.resolve(buff)
    };
    return response;
}

function resolveFetchMethod() {
    if (FETCH_ENV === "react-native") {
        return reactNativeFetch;
    }
    if (FETCH_ENV === "web") {
        const globalFetch = global.fetch || null;
        return globalFetch;
    }
    if (FETCH_ENV === "node") {
        const nodeFetch = require("node-fetch");
        return nodeFetch;
    }
}

function resolveFetchResponse(response) {
    if (FETCH_ENV === "web") {
        // Temporary global fix for Buffer:
        global.Buffer = global.Buffer || require("buffer/").Buffer;
        const toBuffer = require("blob-to-buffer");
        response.buffer = response.buffer || function handleBlobConversion() {
            return response.blob().then(blob => {
                return new Promise((yeah, nah) => {
                    toBuffer(blob, (err, buff) => {
                        if (err) {
                            return nah(err);
                        }
                        return yeah(buff);
                    });
                });
            });
        };
    }
    return response;
}

module.exports = function fetch(input, init) {
    const fetchUsingAppropriateMethod = resolveFetchMethod();
    return fetchUsingAppropriateMethod(input, init)
        .then(res => resolveFetchResponse(res));
};
