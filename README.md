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
npm install the-fetch-you-were-looking-for --save
```

This library supports NodeJS version 6 and above.

## Usage

This library can be used in a variety of different environments, and should be imported like such:

 * **NodeJS**: `const fetch = require("the-fetch-you-were-looking-for/node.js");`
 * **Browsers**: `import fetch from "the-fetch-you-were-looking-for/web";`
 * **React-Native**: `import fetch from "the-fetch-you-were-looking-for/react-native";`

Then use `fetch` as you would normally, taking into account some limitations (mentioned below).

## Limitations

This library isn't a drop-in replacement for fetch, and behaves a bit differently on some environments.

### NodeJS limitations

When being used on NodeJS, this library exports `node-fetch`. `node-fetch` handles `.text()` and `.json()` outputs normally, but does not support `.blob()`. It is therefore important to mention that `.blob()` is not supported _at all_ by this library (use `.buffer()` instead).

Fetching with credentials also behaves differently to the browser implementation, and these differences can be found by reviewing the [`node-fetch`](https://github.com/bitinn/node-fetch) repository.

### Web limitations

Currently, this library only exports the browser's `fetch` method. It does however handle the result and provides the `.buffer()` response method similarly to the NodeJS implementation.

### React-Native limitations

When used in React-Native, this library uses `XMLHttpRequest` to polyfill `fetch`. The built-in fetch is very rough around the edges and doesn't function quite like expected. Using an XHR allows this library to return binary data in `Buffer` form.

The `fetch` command itself is much simpler, and its `options` only support the following items:

 * `method`: The method to use for the request
 * `headers`: Key-value store of the headers for the request
 * `body`: The body to send with the request. This supports `FormData` for uploading files.

It also supports only several response actions:

 * `.text()`: Output text (Promise -> String)
 * `.json()`: Output JS object (Promise -> Object)
 * `.buffer()`: Output `Buffer` (polyfilled) (Promise -> Buffer)

## Testing

Simply run `npm t` to run the tests.

You can run Node-only tests by using `npm run test:node`, and web-only by using `npm run test:web`. You can develop with the web-tests in watch-mode by running `npm run test:web:watch`.

