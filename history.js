const router = require('express').Router();

const collection = require('./db/collection');

// GET /history/search
router.get('/search', async (req, res) => {

    try {

        const search_history = collection.search();
        res.json(search_history);

        // respond with a 200 JSON response

    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

module.exports = router;