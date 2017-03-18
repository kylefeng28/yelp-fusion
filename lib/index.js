'use strict';

const rp = require('request-promise');

class YelpClient {
	constructor(token) {
		this.token = token;
	}

	search(parameters) {
		return rp({
			url: 'https://api.yelp.com/v3/businesses/search',
			qs: parameters,
			auth: { bearer: this.token },
			json: true
		});
	}

	phoneSearch(parameters) {
		return rp({
			url: 'https://api.yelp.com/v3/businesses/search/phone',
			qs: parameters,
			auth: { bearer: this.token },
			json: true
		});
	}

	transactionSearch(transactionType, parameters) {
		return rp({
			url: 'https://api.yelp.com/v3/transactions/' + transactionType + '/search',
			qs: parameters,
			auth: { bearer: this.token },
			json: true
		});
	}

	business(id) {
		return rp({
			url: 'https://api.yelp.com/v3/businesses/' + id,
			auth: { bearer: this.token },
			json: true
		});
	}

	reviews(businessId) {
		return rp({
			url: 'https://api.yelp.com/v3/businesses/' + businessId + '/reviews',
			auth: { bearer: this.token },
			json: true
		});
	}

	autocomplete(parameters) {
		return rp({
			url: 'https://api.yelp.com/v3/autocomplete',
			qs: parameters,
			auth: { bearer: this.token },
			json: true
		});
	}
}

const accessToken = (clientId, clientSecret) => {
	return rp({
		url: 'https://api.yelp.com/oauth2/token', 
		method: 'POST',
		form: {
			grant_type: 'client_credentials',
			client_id: clientId,
			client_secret: clientSecret
		},
		json: true
	});
};

const createClient = (token) => {
	return new YelpClient(token);
};

module.exports = {
	client: createClient,
	accessToken: accessToken
};
