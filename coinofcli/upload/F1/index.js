const superagent = require('superagent');

const base = 'https://api.coinranking.com/v2/';

const search_it = async (item) => {
    try {
        const search_url = `${base}search-suggestions?query=${item}`;
        const response = await superagent.get(search_url);
        return response.body;
    } catch (error) {
        return error;
    }
};

const select_by_id = async (uuid) => {
    try {
        //ex. https://api.coinranking.com/v2/coin/Qwsogvtv82FCd
        const drawUrl = `${base}/coin/${uuid}`;
        const response = await superagent.get(drawUrl);
        return response.body;
    } catch (error) {
        return error;
    }
};



module.exports = {
    search_it,
    select_by_id
};
