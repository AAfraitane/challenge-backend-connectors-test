const express = require('express');

const { getAllAccounts } = require('./services/account/account.service.getAllAccounts');

const app = express();
const port = 5000;

app.get('/accounts', async (req, res) => {
    res.json(await getAllAccounts());
})

app.listen(port, async() => {
  console.log(`Example app listening at http://localhost:${port}`)
  console.log(JSON.stringify(await getAllAccounts()));
})