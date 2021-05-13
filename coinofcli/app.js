// Name: Jonathan Sum
const inquirer = require('inquirer');

const coin = require('./index.js');



const _discardPrompt = async (coins) => {


    const displayCoins = coins.map((coin) => {
        // Possible todo here: I may need to put both name and uuid or more into the
        // value.
        return { name: `${coin.name}`, value: `${coin.uuid}` };
    });


    return inquirer.prompt([
        {
            type: 'checkbox',
            name: 'selected_uuid',
            message: 'select a coin to see more detail',


            choices: displayCoins,


            validate: (coins) => {
                if (coins.length > 1) {
                    return 'You may only select up to one coin';
                }
                else if (coins.length == 0) {
                    return 'You have to select at least one coin';
                }
                else {
                    return true;
                }
            }
        }
    ]);
};

const _p_search_coin = (coin) => {

    console.log(`Id: ${coin.uuid}` + '\n' +
        `Name: ${coin.name}` + '\n' +
        `USD Value: ${coin.price}` + '\n' +
        `Value ranking: ${coin.rank}` + '\n' +
        `Total Buy and Sell in just 24 hours: ${coin['24hVolume']}`)
    console.log('- - - - - - - - - - - - - - - - - - - - -');
};


//For debugging
// const _p_search_coins = (coins) => {
//     coins.forEach((coin) => {
//         console.log(`uuid: ${coin.uuid}`);
//         console.log(`iconUrl: ${coin.iconUrl}`);
//         console.log(`name: ${coin.name}`);
//         console.log(`symbol: ${coin.symbol}`);
//     });
//     console.log('- - - - - - - - - - - - - - - - - - - - -');
// };


async function search(item) {


    const search_result = await coin.search_it(item);


    const { coins } = search_result.data;

    //in case if we have no search result
    if (coins.length == 0) {
        console.log("No search result")
        return;
    }

    const { selected_uuid } = await _discardPrompt(coins);

    const selected_json = await coin.select_by_id(selected_uuid[0])

    const one_coin = selected_json.data.coin;

    _p_search_coin(one_coin)


}




module.exports = {
    search
};
