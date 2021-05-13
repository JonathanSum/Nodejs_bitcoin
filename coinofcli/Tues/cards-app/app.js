const inquirer = require('inquirer');

// the custom deckofcards module
// npm install using: npm instal ../deckofcards --save (this is the relative file path)
const deck = require('deckofcards');

// helper functions for printing
const _print = (result, remaining) => {
    result.forEach((card) => {
        console.log(`${card.value} of ${card.suit}`);
    });
    console.log(`Remaining Cards: ${remaining}`);
    console.log('- - - - - - - - - - - - - - - - - - - - -');
};

// prompt user to select cards to be thrown away
const _discardPrompt = async (cards) => {
    // return a new array of objects where name is what is displayed to the user
    // and value is what is returned from the inquirer prompt
    const displayCards = cards.map((card) => {
        return { name: `${card.value} of ${card.suit}`, value: card.code };
    });

    // create an inquirer checkbox prompt
    return inquirer.prompt([
        {
            type: 'checkbox',
            name: 'cards',
            message: 'select cards to throw away',

            // display the cards to the user for them to select
            choices: displayCards,

            // validate that the user picks less than 4 cards
            validate: (cards) => {
                if (cards.length > 4) {
                    return 'You may only select up to four cards';
                } else {
                    return true;
                }
            }
        }
    ]);
};

// add a findAndRemove function
// this function is able to find and remove the cards from the original hand
// that the user selected to be thrown away
const _findAndRemove = (original, throwaway) => {
    // use the filter method on the original cards array (array of objects) to return a new array
    return original.filter((card) => {
        // if the card.code is NOT included in the throwaway array (array of strings) then keep it
        return !throwaway.includes(card.code);
    });
};

// function for playing 5 card draw
// deal a user 5 cards and ask them which they want to throwaway
// replace those cards with new ones
async function play(shuffle) {
    // hard code the rules of the game
    const count = 5;

    try {
        // get a deck of cards that are either shuffled or not shuffled depending on the user input
        const deckOfCards = await deck.buildDeck(shuffle);

        // draw n number of cards from the deck that was requested above (using same deck_id)
        const { deck_id } = deckOfCards;

        const originalHand = await deck.drawCards(deck_id, count);
        _print(originalHand.cards, originalHand.remaining);

        // prompt the user to select which cards to throwaway
        const throwaway = await _discardPrompt(originalHand.cards);

        // find and remove the cards from the original hand that need to be thrown away
        const filterCards = _findAndRemove(originalHand.cards, throwaway.cards);

        // draw the same number of cards that were removed
        // the number of cards removed matches the throwaway.cards.length
        const newCards = await deck.drawCards(deck_id, throwaway.cards.length);

        // concat the filtered hand and the new cards to make a complete 5 card hand
        const finalHand = filterCards.concat(newCards.cards);
        _print(finalHand, newCards.remaining);
    } catch (error) {
        console.log(error);
    }
}

// export the play function so that it can be used in the cli.js
module.exports = {
    play
};
