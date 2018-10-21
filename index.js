'use strict'

const {stringify} = require('query-string')
const Promise = require('pinkie-promise')
const {fetch} = require('fetch-ponyfill')({Promise})

const endpoint = 'http://cdwifi.cz/portal/api'

const sendRequest = (path, query = null, opt = {}, handleResponse = false) => {
	opt = Object.assign({
		redirect: 'follow',
		cache: 'no-store',
		headers: {
			accept: 'application/json',
			referrer: 'http://cdwifi.cz/'
		}
	}, opt)

	let url = endpoint + path
	if (query !== null) url += '?' + stringify(query)

	// Async stack traces are not supported everywhere yet, so we create our own.
	const err = new Error()

	// todo: resolve DNS using WiFi-local DNS server
	const req = fetch(url, opt)
	if (handleResponse) return req
	return req.then((res) => {
		if (!res.ok) {
			err.message = res.statusText
			err.statusCode = res.status
			throw err
		}
		return res.json()
	})
}

const fetchWifiStatus = () => {
	return sendRequest('/vehicle/gateway/user')
	.then((_) => ({
		authenticated: _.authenticated === 1,
		id: _.id,
		clientIpAddress: _.ip,
		clientMacAddress: _.mac,
		dataUsage: _.dataUsage ? {
			// todo: _.dataUsage.expire
			used: _.dataUsage.used,
			// todo: what is _.dataUsage.dataLimit?
			limit: parseInt(_.dataUsage.limit, 10),
			speedLimit: !!_.dataUsage.speedLimit,
			region: _.dataUsage.region
		} : null
	}))
}

const acknowledgeCaptivePortal = (acknowledgeLegalTerms, locale = 'en_GB') => {
	if ('function' !== typeof acknowledgeLegalTerms) {
		throw new Error('acknowledgeLegalTerms must be a Promise-retuning function.')
	}

	return fetchStatus()
	.then((status) => {
		if (status.authenticated) return 'Already authenticated.'

		return sendRequest('/page/pages.static.terms', {locale})
		.then((data) => {
			if (!data) throw new Error('Invalid response.')
			if (!data.body) {
				throw new Error('Missing legal text. Did you pick a valid locale?')
			}

			// todo: br2nl, decode HTML entities
			return acknowledgeLegalTerms(data.body)
		})
	})
	.then(() => {
		return sendRequest('/vehicle/gateway/user/authenticate', {
			url: 'http://cdwifi.cz/'
		}, null, true)
		.then((res) => {
			if (res.ok) return 'Successfully authenticated.'
			throw new Error('Authentication failed.')
		})
	})
}

module.exports = {
	fetchWifiStatus,
	acknowledgeCaptivePortal
}
