const Bankdb = require(`../model/model`);

// create and save new bank
exports.create = (req, res) => {
    // validate request

    if (!req.body) {
        res.status(400).send({ message:`content cannot be empty`})
        return;
    }


    // new bank
    const bank = new Bankdb({
        name: req.body.name,
        interestRate: req.body.interestRate[1],
        maxLoan: req.body.maxLoan[1],
        minPayment: req.body.minPayment[1],
        loanTerm: req.body.loanTerm[1]
    })

    if (bank.minPayment > bank.maxLoan) {
        res.render(`error`, {error: `Minimum down payment cannot be greater than maximum loan`});
        return;
    } else {
    // save bank in the database
    bank
        .save(bank)
        .then(data => {
            // res.send(data);
            res.redirect(`/`);
        })
        .catch(err => {
            let code;
            if (err.code == 11000 ) {
                code = `There is a bank with the same name. `;
            }
            res.status(500).render(`error`, {error: code});
        })
    }

}

// retrive and return all banks/ retrieve and return single bank
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        Bankdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({message: `not found bank with id ${id}`})
                } else {
                    res.send(data);
                }
            }).catch(err => {
                res.status(500).send({message: `error retrieving bank with id ${id}`})
            })
    } else {
        Bankdb.find()
        .then(bank => {
            res.send(bank);
        })
        .catch(err => {
            res.status(500).send({message: err.message || `Error occured while retriving bank information`})
        })
        }
}

// update a new identified bank by bank id
exports.update = (req, res) => {
    if (!req.body) {
        return res 
                .status(400)
                .send({message: `data to update can not be empty`})
    }

    const id = req.params.id;
    Bankdb.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false
    }).then (data => {
        if(!data) {
            res.status(404).send({message: `cannot update bank with ${id}. Maybe bank not found`})
        } else {
            res.send(data);
        }
    }).catch( err => {
        res.status(500).send({message: `Error update bank information`})
    })


}

// delete a bank with specified bank id
exports.delete = (req, res) => {
    const id = req.params.id;
    console.log(id);
    Bankdb.findByIdAndDelete(id) 
        .then(data => {
            if(!data) {
                res.status(404).send({message: `cannot delete with id ${id} Maybe id is wrong`})
            } else {
                res.send({
                    message: `bank was deleted successfully`
                })
            }
        }).catch(err => {
            res.status(500).send({
                message: `could not delete bank with id ${id}`
            })
        })
}

exports.calculator = (req, res) => {

    console.log(req.body);

    if (req.query.id) {
        const id = req.query.id;

        Bankdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({message: `not found bank with id ${id}`})
                } else {
                    res.send(data);
                }
            }).catch(err => {
                res.status(500).send({message: `error retrieving bank with id ${id}`})
            })
    } else {
        Bankdb.find()
        .then(bank => {
            res.send(bank);
        })
        .catch(err => {
            res.status(500).send({message: err.message || `Error occured while retriving bank information`})
        })
        }
}