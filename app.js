const express = require('express')
const cors = require('cors')

const con = require('./config')
const deportApi = require('./routes/depot.route')
const productApi = require('./routes/product.route')
const inventoryIncomeApi = require('./routes/inventory.income.route')
const inventoryOutcomeApi = require('./routes/inventory.outcome.route')
const app = express()

app.use(express.json())
app.use(cors(con.settingsCors))

deportApi(app)
productApi(app)
inventoryIncomeApi(app)
inventoryOutcomeApi(app)
module.exports = app