const axios = require(`axios`);


exports.homeRoutes = (req, res) => {
    // make a get request to /api/banks
    axios.get(`http://localhost:3000/api/banks`)
        .then(function (response) {
            res.render(`index`, { banks: response.data})
        })
        .catch(err => {
            res.send(err);
        })

}

exports.add_bank = (req, res) => {
    res.render(`add_bank`);
}

exports.update_bank = (req, res) => {
    axios.get(`http://localhost:3000/api/banks`, {params: {id: req.query.id}})
        .then(function(bankData) {
            res.render(`update_bank`, {bank: bankData.data})
        })
        .catch(err => {
            res.send(err);
        })
}



exports.mortgage_calculator = (req, res) => {
    
    // make a get request to /api/banks
    axios.get(`http://localhost:3000/api/banks`)
        .then(function (response) {
            res.render(`mortgage_calculator`, { banks: response.data})
        })
        .catch(err => {
            res.send(err);
        })    
}


exports.table = (req, res) => {

    // make a get request to /api/banks
    axios.get(`http://localhost:3000/api/banks`)
        .then(function (response) {
            res.render(`mortgage_calculator`, { banks: response.data})
        })
        .catch(err => {
            res.send(err);
        })    
}