const yargs = require('yargs');
const app = require('./app.js');

yargs
    .usage('$0: Usage <cmd> [options]')
    // add the 'draw' command
    .command({
        command: 'play',
        desc: 'play a game of 5 card draw',
        builder: (yargs) => {
            // add the shuffle option to the play command
            return yargs.options('s', {
                alias: 'shuffle',
                describe: 'shuffles the deck before playing',
                boolean: false
            });
        },
        handler: (argv) => {
            app.play(argv.shuffle);
        }
    })
    // add a help menu to assist the user in understanding our CLI
    .help('help').argv;
