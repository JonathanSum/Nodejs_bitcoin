const yargs = require('yargs');
const app = require('./app.js');

yargs
    .usage('$0: Usage <cmd> [options]')
    // add the 'search' command
    .command({
        command: 'search',
        desc: "search with the coin name and select it to see the value and detail of it",
        //node cli.js play --item coin_name
        builder: (yargs) => {
            // add the item option to the search command
            return yargs.options('s', {
                alias: 'item',
                describe: 'search with the name of the item'
            });
        },
        handler: (argv) => {
            app.search(argv.item);
        }
    },

    )

    .help('help').argv;



