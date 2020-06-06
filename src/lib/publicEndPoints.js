const axios = require("axios");

function PublicClient(apiUri = `https://api.bitpolo.com`) {
    const axiosInstance = axios.create(Object.assign({ baseURL: apiUri }));
    async function get(url) {
        axiosInstance.get(url)
            .then((res) =>
                console.log(JSON.stringify(res.data)))
            .catch(error => {
                console.log(error.response && error.response !== undefined
                    ? JSON.stringify(error.response.data)
                    : error);
            });
    }
    async function post(url, body) {
        axiosInstance
            .post(url, body, {
                headers: Object.assign({ 'content-type': 'application/json; charset=utf-8' })
            })
            .then(res => console.log(JSON.stringify(res.data)))
            .catch(error => {
                console.log(error.response && error.response !== undefined && error.response.data
                    ? JSON.stringify(error.response.data)
                    : error);

            });
    }
    return {
        getServerTime() {
            return get('/api/v1/time');
        },
        marketList() {
            return get('/api/v1/market/list');
        },
        marketTotalVolume() {
            return get('/api/v1/market/total-volume')
        },
        marketTicker(market) {
            return get(`/api/v1/market/ticker/${(market) ? market : ''}`);
        },
        marketKline(payload) {
            return post('/api/v1/market/kline', payload);
        },
        marketLast(market) {
            return get(`/api/v1/market/last/${market}`);
        },
        marketDeals(payload) {
            return post('/api/v1/market/deals', payload);
        },
        assets(asset_name) {
            return get(`/api/v1/assets/${asset_name ? asset_name : ''}`);
        },
        orderBook(payload) {
            return post('/api/v1/order/book', payload);
        },
        orderDepth(payload) {
            return post('/api/v1/order/depth', payload);
        }
    };
}
module.exports = new PublicClient();