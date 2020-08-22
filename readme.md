# cd-wifi-client

**A client for the onboard WiFi portal of *České dráhy* (Czech Railways) trains.**

[![npm version](https://img.shields.io/npm/v/cd-wifi-client.svg)](https://www.npmjs.com/package/cd-wifi-client)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/cd-wifi-client.svg)
[![chat with me on Gitter](https://img.shields.io/badge/chat%20with%20me-on%20gitter-512e92.svg)](https://gitter.im/derhuerst)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)


## Installation

```shell
npm install cd-wifi-client
```


## Usage

### Acknowledging the captive portal

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

### Getting the current position

```js
const {fetchTrainStatus} = require('cd-wifi-client')

console.log(await fetchTrainStatus())
```

```js
{
	latitude: 50.252175,
	longitude: 14.30227,
	altitude: 185.5,
	speed: 85,
	delay: null,
}
```

### Getting the WiFi data limit & connectivity

```js
const {
	fetchWifiStatus,
	fetchWifiConnectivity,
} = require('cd-wifi-client')

console.log(await fetchWifiStatus())
console.log(await fetchWifiConnectivity())
```

```js
// WiFi status
{
	authenticated: true,
	id: null,
	clientIpAddress: '10.0.0.105',
	clientMacAddress: null,
	dataUsage: {used: 0, limit: -1, speedLimit: false, region: 'CZ'},
}
// WiFi connectivity
{
	version: '1.9',
	online: '1',
	bundleid: '84105699258',
	bundleip: '10.3.2.1',
	links: [
		{
			index: '1',
			device_type: 'ethernet',
			device_state: 'down',
			link_state: 'disconnected',
			ethernet_info: {ip: '0.0.0.0', netmask: '0.0.0.0', mode: 'dhcp'},
		},
		{
			index: '102',
			device_type: 'modem',
			device_subtype: 'sierra-7710',
			device_state: 'up',
			link_state: 'available',
			rssi: '-75',
			technology: 'lte',
			operator_id: '23002',
			apninfo: 'cd-internet,-1,-1',
			umts_info: {net_status: '1', lac: 'FFFE', cellid: '03F3FF01'},
		},
		// …
	]
}
```


## Related

- [`sncf-wifi-portal-client`](https://github.com/derhuerst/sncf-wifi-portal-client) – Query information from the SNCF WiFi portal in French TGV trains.
- [`wifi-on-ice-portal-client`](https://github.com/derhuerst/wifi-on-ice-portal-client) – Query information from the WifiOnICE portal in German ICE trains.
- [`digital-im-regio-portal-client`](https://github.com/derhuerst/digital-im-regio-portal-client) – Query information from the Digital im Regio portal in German Regio trains.
- [`live-cd-wifi-position`](https://github.com/derhuerst/live-cd-wifi-position) – Live vehicle geolocation of České dráhy (Czech Railways) trains taken from the on-board Icomera WiFi system.


## Contributing

If you have a question or need support using `cd-wifi-client`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/cd-wifi-client/issues).
