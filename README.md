# universal-fetch (aka. the-fetch-you-were-looking-for)
Universal JavaScript fetch utility for NodeJS, Browsers and React-Native*

_* React-Native coming soon_

## About

Using fetch in a Node library that could potentially be used on the web, for instance, is a massive main. Node doesn't have a fetch method and the `node-fetch` library doesn't play well in the browser due to `Buffer` support etc.

This library aims to provide pre-build fetch methods for each environment:

 * NodeJS (via [node-fetch](https://github.com/bitinn/node-fetch))
 * Browser (via `window.fetch` or GitHub's [fetch polyfill](https://github.com/github/fetch))
 * React-Native (via `global.fetch` with `Buffer` polyfill)

## Installation and Support

Install using the following:

```shell
npm install universal-fetch --save
```

This library supports NodeJS version 6 and above.

## Usage

TBA.

## Testing

Simply run `npm t` to run the tests.

You can run Node-only tests by using `npm run test:node`, and web-only by using `npm run test:web`. You can develop with the web-tests in watch-mode by running `npm run test:web:watch`.

