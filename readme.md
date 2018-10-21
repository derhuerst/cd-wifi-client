# cd-wifi-client

**A client for the onboard WiFi portal of *České dráhy* (Czech Railways) trains.**

[![npm version](https://img.shields.io/npm/v/cd-wifi-client.svg)](https://www.npmjs.com/package/cd-wifi-client)
[![build status](https://api.travis-ci.org/derhuerst/cd-wifi-client.svg?branch=master)](https://travis-ci.org/derhuerst/cd-wifi-client)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/cd-wifi-client.svg)
[![chat with me on Gitter](https://img.shields.io/badge/chat%20with%20me-on%20gitter-512e92.svg)](https://gitter.im/derhuerst)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)


## Installation

```shell
npm install cd-wifi-client
```


## Usage

```js
const {acknowledgeCaptivePortal} = require('cd-wifi-client')

const acknowledgeLegalTerms = (msg) => {
	console.log(msg)
	return Promise.resolve() // we always accept
}

acknowledgeCaptivePortal(acknowledgeLegalTerms)
.then(successMsg => console.info(successMsg))
.catch(console.error)
```


## Contributing

If you have a question or need support using `cd-wifi-client`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/cd-wifi-client/issues).
