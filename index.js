const express = require('express');

const { getRefreshToken } = require('./services/auth.service');

const app = express();
const port = 5000;


app.get('/', async (req, res) => {
    res.json(await getRefreshToken());
})

// app.use("/accounts", getParsedAccountsController);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})