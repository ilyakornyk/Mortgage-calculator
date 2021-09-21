const mongoose = require(`mongoose`);

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true 
    },
    interestRate: {
        type: Number,
        required: true,
    },
    maxLoan: {
        type: Number,
        required: true,
    },
    minPayment: {
        type: Number,
        required: true,
    },
    loanTerm: {
        type: Number,
        required: true,
    }
})

const Bankdb = mongoose.model(`bankdb`, schema);
module.exports = Bankdb;