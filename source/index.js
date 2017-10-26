function resolveFetchMethod() {
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
