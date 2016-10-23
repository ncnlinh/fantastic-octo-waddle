var jwt = require('jsonwebtoken')
var request = require('request')

var generateToken = function () {
  return jwt.sign({
    api_key: '01cd196e-ba33-4c14-937f-7490910cdd32', // Replace this with the API Key provided by Modo
    iat: Math.floor(Date.now() / 1000)
  },
      'YE/uM4XmFLemPAGgaCBY8qdjSZFzPJxyw/KsuGtmOyZqmpOmU6nSTfh7EuJbwbknMfndMCnnmDx+Voc5GT8J7g==', // Replace this with the Client Secret provided by Modo
    {
      algorithm: 'HS256'
    })
}

/**
 * POST modo/people/register
  --> account_id
 */
exports.peopleRegister = function (req, res, next) {
  var options = {
    url: 'https://hack.modoapi.com/1.0.0-dev/people/register',
    method: 'POST',
    headers: {
      'Authorization': 'Token ' + generateToken(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fname: req.body.firstName,
      lname: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email
    })
  }
  request(options, function (error, response, body) {
    if (error) {
      res.send({error: error})
    } else {
      res.send({
        ...JSON.parse(body)
      })
      console.log(response.statusCode)
      console.log(body)
    }
  })
}

/**
 * POST modo/vault/get_type_list
 */
exports.vaultGetTypeList = function (req, res, next) {
  var options = {
    url: 'https://hack.modoapi.com/1.0.0-dev/vault/get_type_list',
    method: 'POST',
    headers: {
      'Authorization': 'Token ' + generateToken(),
      'Content-Type': 'application/json'
    }
  }
  request(options, function (error, response, body) {
    if (error) {
      res.send({error: error})
    } else {
      res.send({
        ...JSON.parse(body)
      })
      console.log(response.statusCode)
      console.log(body)
    }
  })
}

/**
 * POST modo/vault/fetch
 */
exports.vaultFetch = function (req, res, next) {
  var options = {
    url: 'https://hack.modoapi.com/1.0.0-dev/vault/fetch',
    method: 'POST',
    headers: {
      'Authorization': 'Token ' + generateToken(),
      'Content-Type': 'application/json'
    }
  }
  request(options, function (error, response, body) {
    if (error) {
      res.send({error: error})
    } else {
      res.send({
        ...JSON.parse(body)
      })
      console.log(response.statusCode)
      console.log(body)
    }
  })
}

/**
 * POST modo/card/create
 * {
    accountId: account_id
    }
    --> cardId
 */
exports.cardCreate = function (req, res, next) {
  var options = {
    url: 'https://hack.modoapi.com/1.0.0-dev/vault/add',
    method: 'POST',
    headers: {
      'Authorization': 'Token ' + generateToken(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      items: [
        {
          account_id: req.body.accountId,
          disable: 0,
          encrypted_data: {
            address: '1234 LoooooooongName Rd.',
            exp_month: 12,
            cvv: '123',
            pan: req.body.pan || '4124939999999990',
            zip: '75075',
            name: 'Aaron Crash Wilkinson',
            exp_year: 2020
          },
          sequestered: 1,
          description: 'Sample Open_Card',
          end_of_life: 1474480166,
          vault_type: 'OPEN_CARD'
        }
      ]
    })
  }
  request(options, function (error, response, body) {
    if (error) {
      res.send({error: error})
    } else {
      res.send({
        fundId: JSON.parse(body).response_data[0].vault_id
      })
      console.log(response.statusCode)
      console.log(body)
    }
  })
}

/**
 * POST modo/fund/create
 * {
    accountId: account_id
    }
    --> fundId
 */
exports.fundCreate = function (req, res, next) {
  var options = {
    url: 'https://hack.modoapi.com/1.0.0-dev/vault/add',
    method: 'POST',
    headers: {
      'Authorization': 'Token ' + generateToken(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      items: [{
        vault_type: 'ESCROW',
        description: 'Octo fund for a game',
        encrypted_data: { },
        unencrypted_json: {
          octo_info: 'whatever I want here'
        },
        end_of_life: 1577207858609,
        disable: 0,
        sequestered: 0
      }]
    })
  }
  request(options, function (error, response, body) {
    if (error) {
      res.send({error: error})
    } else {
      res.send({
        fundId: JSON.parse(body).response_data[0].vault_id
      })
      console.log(response.statusCode)
      console.log(body)
    }
  })
}

/**
 * POST modo/fund/deposit
amount
of accountId
from cardIds
to fundId
 */
exports.fundDeposit = function (req, res, next) {
  var options = {
    url: 'https://hack.modoapi.com/1.0.0-dev/coin/mint',
    method: 'POST',
    headers: {
      'Authorization': 'Token ' + generateToken(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      account_id: req.body.accountId,
      amount: req.body.amount,
      description: 'Some description',
      inputs: req.body.cardId.map(cardId => ({
        instrument_id: cardId,
        instrument_type: 'OPEN_CARD',
        qualifier: 'SOME_CUSTOM_TYPE',
        max_amount: 2000
      })),
      outputs: [{
        instrument_id: req.body.fundId,
        instrument_type: 'ESCROW',
        // account_id: req.body.fundId,
        qualifier: 'SOME_CUSTOM_TYPE',
        max_amount: 2000
      }]
    })
  }
  request(options, function (error, response, body) {
    if (error) {
      res.send({error: error})
    } else {
      res.send({
        ...JSON.parse(body).response_data
      })
      console.log(response.statusCode)
      console.log(body)
    }
  })
}
