# yelp-fusion

This is a fork of [tonybadguy/yelp-fusion](https://github.com/tonybadguy/yelp-fusion), using [axios](https://github.com/mzabriskie/axios)
instead of [tonybadguy/call-me-maybe](https://github.com/tonybadguy/call-me-maybe).

Yelp Fusion API client for Node.js with Promises

Please refer to official Yelp documentation for request / response model details:
https://www.yelp.com/developers/documentation/v3

## Install NPM Package
```
npm install yelp-fusion --save
```

## Get Access Token
```javascript
'use strict';

const yelp = require('yelp-fusion');

yelp.accessToken(clientId, clientSecret).then(response => {
  console.log(response.data.access_token);
}).catch(e => {
  console.log(e);
});
```

## Search
```javascript
'use strict';

const yelp = require('yelp-fusion');

const client = yelp.client(token);

client.search({
  term:'Four Barrel Coffee',
  location: 'san francisco, ca'
}).then(response => {
  console.log(response.data.businesses[0].name);
}).catch(e => {
  console.log(e);
});
```


##### Or get access token and search at the same time
```javascript
'use strict';

const yelp = require('yelp-fusion');

yelp.accessToken(clientId, clientSecret).then(response => {
  const client = yelp.client(response.data.access_token);

  client.search({
    term:'Four Barrel Coffee',
    location: 'san francisco, ca'
  }).then(response => {
    console.log(response.data.businesses[0].name);
  });
}).catch(e => {
  console.log(e);
});

```

## Phone Search
```javascript
'use strict';

const yelp = require('yelp-fusion');

const client = yelp.client(token);

client.phoneSearch({
  phone:'+14157492060'
}).then(response => {
  console.log(response.data.businesses[0].name);
}).catch(e => {
  console.log(e);
});
```

## Transaction Search
```javascript
'use strict';

const yelp = require('yelp-fusion');

const client = yelp.client(token);

client.transactionSearch('delivery', {
  location:'san diego'
}).then(response => {
  console.log(response.data.businesses[0].name);
}).catch(e => {
  console.log(e);
});
```

## Business
```javascript
'use strict';

const yelp = require('yelp-fusion');

const client = yelp.client(token);

client.business('gary-danko-san-francisco').then(response => {
  console.log(response.data.name);
}).catch(e => {
  console.log(e);
});
```

## Reviews
```javascript
'use strict';

const yelp = require('yelp-fusion');

const client = yelp.client(token);

client.reviews('gary-danko-san-francisco').then(response => {
  console.log(response.data.reviews[0].text);
}).catch(e => {
  console.log(e);
});
```

## Autocomplete
```javascript
'use strict';

const yelp = require('yelp-fusion');

const client = yelp.client(token);

client.autocomplete({
  text:'pizza'
}).then(response => {
  console.log(response.data.terms[0].text);
}).catch(e => {
  console.log(e);
});
```
