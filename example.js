'use strict'

const {
	fetchWifiStatus,
	acknowledgeCaptivePortal,
	fetchDataUsage,
	fetchTrainStatus,
	fetchNotifications,
	fetchWifiConnectivity
} = require('.')

const ack = (msg) => {
	console.log(msg)
	return Promise.resolve()
}

acknowledgeCaptivePortal(ack)
.then(console.log)
.catch((err) => {
	console.error(err)
	process.exitCode = 1
})
