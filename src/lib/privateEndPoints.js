const axio = require("axios");
const crypto = require("crypto");

function AuthenticationClient(key, secret, passphrase, apiUri =`https://api.bitpolo.com`) {
    const axiosInstance = axio.create(Object.assign({ baseURL: apiUri }));
    const signRequest = (method, path, body) => {

        const timestamp = new Date().getTime();
        const signatureString = `${timestamp}${method.toUpperCase()}${path}${body ? body : ''}`;
        const hmac = crypto.createHmac('sha256', secret);
        const signature = hmac.update(signatureString).digest('base64');
        return {
            key,
            passphrase,
            signature,
            timestamp
        };

    };
    const getSignature = (method, relativeURI, body) => {
        const sig = signRequest(method, relativeURI, body);

        return {
            'BITPOLO-ACCESS-KEY': sig.key,
            'BITPOLO-ACCESS-SIGN': sig.signature,
            'BITPOLO-ACCESS-TIMESTAMP': sig.timestamp,
            'BITPOLO-ACCESS-PASSPHRASE': sig.passphrase
        }
    };
    async function get(url) {
        axiosInstance
            .get(url, { headers: Object.assign({}, getSignature('get', url, JSON.stringify({}))) })
            .then(res => console.log(JSON.stringify(res.data)))
            .catch(error => {
                console.log(error.response && error.response !== undefined && error.response.data
                    ? JSON.stringify(error.response.data)
                    : error);
            });
    }

    async function post(url, body) {
        axiosInstance
            .post(url, body, {
                headers: Object.assign({ 'content-type': 'application/json; charset=utf-8' }, getSignature('post', url, JSON.stringify(body)))

            })
            .then(res => console.log(JSON.stringify(res.data)))
            .catch(error => {
                console.log(error.response && error.response !== undefined && error.response.data
                    ? JSON.stringify(error.response.data)
                    : error);
            });
    }
    return {
        async getBalance(asset_names) {
            return get(`/api/v1/asset/balance?asset=${asset_names}`);
        },
        async balanceHistory(asset_history) {
            return post(`/api/v1/asset/balance/history`, asset_history);
        },
        async putLimit(payload) {
            return post(`/api/v1/order/put-limit`, payload);
        },
        async putMarket(payload) {
            return post(`/api/v1/order/put-market`, payload);
        },
        async orderCancel(payload) {
            return post('/api/v1/order/cancel', payload);
        },
        async orderPending(payload) {
            return post('/api/v1/order/pending', payload);
        },
        async orderPendingDetails(payload) {
            return post('/api/v1/order/pending-details', payload);
        },
        async orderDeals(payload) {
            return post('/api/v1/order/deals', payload);
        },
        async orderFinished(payload) {
            return post('/api/v1/order/finished', payload);
        },
        async finishedOrderDetails(payload) {
            return post('/api/v1/order/finished-details', payload);
        }
    };
}

exports.AuthenticationClient= AuthenticationClient;