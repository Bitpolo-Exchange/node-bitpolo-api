# BitPolo


The official Node.js library for the Bitplo REST and WebSocket APIs [BitPolo API Documentation](https://apidoc.bitpolo.com).


# Initialize Client

- apiKey
- apiSecret
- Passphrase

You can create the API Key, Secret and Passphrase from the `My Accounts` page of BitPolo exchange

```javascript
const publicClient = require('bitpolo');
const { AuthenticationClient } = require('bitpolo')
const authClient = new AuthenticationClient(apiKey, apiSecret, passphrase);
```

# Public Client Methods

```javascript
    pClient.getServerTime();

    pClient.marketList();

    pClient.marketTotalVolume();

    pClient.marketTicker('BTCINR');

    pClient.marketKline({ market: "BTCINR", start: 1577750400, end: 1577923200, interval: 86400 });

    pClient.marketLast('BTCINR');

    pClient.marketDeals({ "market": "BTCUSDT", "limit": 10 ,"last_id":1});

    pClient.assets('BTC');

    pClient.orderDepth({ "market": "BTCINR", "limit": 10, "interval": "1" });

```

# Private Client Methods

```javascript
authClient.asset().getBalance(['ETH', 'BTC', 'USDT']);

authClient.asset().balanceHistory({ 'asset': "ETH", 'start_time': 1576750273, 'end_time': 1577095873, 'offset': 0, 'limit': 10, 'type': 'deposit' });

authClient.trade().putLimit({ "market": "BTCUSDT", "side": 1, "amount": "100", "price": "0.05", "source": "beldex exchange" });

authClient.trade().putMarket({ "market": "BTCINR", "side": 1, "amount": "100", "source": "beldex exchange" });

authClient.trade().orderCancel({ "market": "BTCINR", "order_id": 84 });

authClient.trade().orderPending({ "market": "BTCUSDT", "offset": 0, "limit": 2, "user_id": 84 });

authClient.trade().orderPendingDetails({ "market": "BTCETH", "order_id": 84 });

authClient.trade().orderDeals({ "order_id": 84, "offset": 0, "limit": 3 });

authClient.trade().orderFinished({ "offset": 0, "limit": 3, "market": "ETHBTC", "start_time": 0, "end_time": 0 });

authClient.trade().finishedOrderDetails({ "order_id": 84 });
```

# Initialize WebSocket Client

```javascript
const WebsocketClient = require('bitpolo');
let wss = new WebsocketClient();
```

# WebSocket Client

```javascript

wss.connect();

wss.login(api-key, secret, passphrase);

wss.send({ "method": "state.subscribe", params: ["BTCINR"] });

wss.send({ "method": "deals.subscribe", params: ["BTCINR"] });

wss.send({ "method": "kline.subscribe", params: ["BTCUSDT", 60] });

wss.send({ "method": "depth.subscribe", "params": ["BTCUSDT", 50, '0'] });

wss.send({ "method": "depth.query", params: ["ETHUSDT", 50, '0'] });

wss.send({ "method": "kline.query", "params": ["BTCETH", 1575539107, 1580723167, 3600] });

wss.send({ "method": "order.query", params: ["BTCINR", 0, 50] });

wss.send({ "method": "order.history", "params": ["BTCUSDT", 1580636703, 1580723103, 0, 50] });

wss.send({ "method": "order.subscribe", "params": ["BTCINR"] });

wss.send({ "method": "asset.query", "params": ["INR", "BTC"] });

wss.send({ "method": "asset.subscribe", "params": ["USDT", "BTC"] });
```

## Listen to subscription

All the subscriptions can be handled using `onMessage` function. The subscription can be differentiated using the `method` value from the response data.

```javascript
wss.onMessage(data => {
    console.log(data);
});

```