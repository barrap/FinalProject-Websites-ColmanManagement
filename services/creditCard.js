const creditCard = require('../models/creditCard')

const mongoose = require('mongoose');

async function getCreditCard(owner_id) {

    const credit_cards = await creditCard.findOne({ _owner_id: owner_id });

    // Returns the credit cards of specific customer
    return credit_cards
}

// Function to delete a card
async function deleteCard(card_number) {
    await creditCard.deleteOne({ _card_number: card_number })
}

// Adds new card to the database 
async function addCard(card_number, owner_id, exp_date, digits){
    const credit_card = new creditCard({
        _card_number: card_number, 
        _owner_id: owner_id,
        _exp_date: exp_date, 
        _digits: digits
    })

    // Tries and save the new card
    return await credit_card.save()
}

// Exports the neccesary modules
module.exports = {
    deleteCard,
    addCard
}