const router = require('express').Router();

const coin = require('coinofcli')

const collection = require('./db/collection');

// router level middleware
router.use((req, res, next) => {
    // add a timeCreated key when a new snippet is created
    if (req.method === 'GET' && req.body) {
        const body = req.body;
        body.timeSearched = Date.now();
    }
    next();
});

// GET /search/<item>
// GET /search/?item=dog
router.get('/', async (req, res) => {

    try {

        const { item } = req.query;
        let keyword = "";
        if (item)
            keyword = item;


        const search_result = await coin.search_it(keyword);

        const { coins } = search_result.data;

        // add data about cards hands to the file-system "database"
        collection.add({
            searchKeyword: keyword,
            timeSearched: req.body.timeSearched,
            resultCount: coins.length,
        });

        //in case if we have no search result
        if (coins.length == 0) {
            res.json("No search result")
        } else {

            const coin_id_and_name = coins.map((coin) => {

                //contains two keys: the id and displayText (text related to the search result). 
                //displayText here is the coin name
                return { "coin name": `${coin.name}`, "id": `${coin.uuid}` };
            });

            res.json(coin_id_and_name);
        }

        // console.log(coins)

        // respond with a 200 JSON response

    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// POST /search/<item>
router.post('/', async (req, res) => {

    try {

        const { id } = req.body;

        const selected_json = await coin.select_by_id(id)
        // console.log(selected_json)
        const one_coin = selected_json.data.coin;

        // add data about cards hands to the file-system "database"


        // respond with a 200 JSON response
        res.json(one_coin);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

module.exports = router;