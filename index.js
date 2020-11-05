const express = require('express');

const { getAllAccounts } = require('./services/account.service');

const app = express();
const port = 5000;

app.get('/accounts', async (req, res) => {
    res.json(await getAllAccounts());
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})