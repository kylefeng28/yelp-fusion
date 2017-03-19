'use strict';

const axios = require('axios');
const querystring = require('querystring');

class YelpClient {
	constructor(token) {
		this.token = token;

		this.axios = axios.create({
			baseURL: 'https://api.yelp.com/v3',
			headers: { 'Authorization': 'Bearer ' + token }
		});
	}

	search(parameters) {
		return this.axios.request({
			url: '/businesses/search',
			params: parameters,
		});
	}

	phoneSearch(parameters) {
		return this.axios.request({
			url: '/businesses/search/phone',
			params: parameters,
		});
	}

	transactionSearch(transactionType, parameters) {
		return this.axios.request({
			url: '/transactions/' + transactionType + '/search',
			params: parameters,
		});
	}

	business(id) {
		return this.axios.request({
			url: '/businesses/' + id,
		});
	}

	reviews(businessId) {
		return this.axios.request({
			url: '/businesses/' + businessId + '/reviews',
		});
	}

	autocomplete(parameters) {
		return this.axios.request({
			url: '/autocomplete',
			params: parameters,
		});
	}
}

const accessToken = (clientId, clientSecret) => {
	var data = {
		grant_type: 'client_credentials',
		client_id: clientId,
		client_secret: clientSecret
	};
	return axios.post('https://api.yelp.com/oauth2/token', querystring.stringify(data));
};

const createClient = (token) => {
	return new YelpClient(token);
};

module.exports = {
	client: createClient,
	accessToken: accessToken
};
