const router = require('express').Router();

const coin = require('coinofcli')

const collection = require('./db/collection');

router.get('/search', async (req, res) => {

    try {

        const search_history = collection.search();
        res.json(search_history);

        // respond with a 200 JSON response

    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});