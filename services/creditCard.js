const creditCard = require('../models/creditCard')

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING)


async function getCreditCard(username) {

    const credit_cards = await creditCard.find({ _username: username });
    
    // Returns the credit cards of specific customer
    return credit_cards
}

async function getCardByNumber(cardnumber)
{
    const credit_cards = await creditCard.findOne({ _id: cardnumber });

    // Returns card object by card number
    return credit_cards
}

// Function to delete a card
async function deleteCard(card_number) {
    await creditCard.deleteOne({ _id: card_number })
}

// Adds new card to the database 
async function addCard(card_number, username, exp_date, digits){
    const credit_card = new creditCard({
        _id: card_number, 
        _username: username,
        _exp_date: exp_date, 
        _digits: digits
    })

    // Tries and save the new card
    return await credit_card.save()
}

// Exports the neccesary modules
module.exports = {
    deleteCard,
    addCard,
    getCreditCard,
    getCardByNumber
}