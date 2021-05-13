const router = require('express').Router();

const collection = require('./db/collection');

// GET /hands/search
router.get('/search', (req, res) => {
    try {
        const { throwawayCount } = req.query;
        let results = [];
        // search for results in the file-system "database"
        if (throwawayCount) {
            // parseInt on throwawayCount because it is a string when destructing from req.query
            results = collection.search('throwawayCount', parseInt(throwawayCount));
        } else {
            results = collection.search();
        }

        // respond with 200 and JSON =
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

module.exports = router;
