const superagent = require('superagent');

// config file to hold the base url (and API key where applicable)
const config = require('./config.json');

const buildDeck = async (shuffle) => {
    try {
        const deckUrl = `${config.url}/${shuffle ? 'new/shuffle' : 'new'}`;
        console.log(deckUrl);
        const response = await superagent.get(deckUrl);
        return response.body;
    } catch (error) {
        return error;
    }
};

const drawCards = async (deck_id, count) => {
    try {
        const drawUrl = `${config.url}/${deck_id}/draw/?count=${count}`;
        const response = await superagent.get(drawUrl);
        return response.body;
    } catch (error) {
        return error;
    }
};

module.exports = {
    buildDeck,
    drawCards
};
