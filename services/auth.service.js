const config = require('../config/config.json');
const axios = require('axios').default;

exports.getRefreshToken = async () => {
    const data = getCredentialData(
        config.user,
        config.password,
    );
    const basicAuth = getBasicAuth(
        config.authorization.clientId,
        config.authorization.password
    );
    const requestConfig = {
      method: 'post',
      url: `${config.host}:${config.port}/login`,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': basicAuth
      },
      data,
    };
    const response = await axios(requestConfig);
    return response.data;
}

const getCredentialData = (user, password) => {
    console.log("password", password);
    const data = JSON.stringify({ user, password});
    return data;
}

const getBasicAuth = (clientId, password) => {
    const basicAuth = "Basic " + Buffer.from(
        clientId + ":" + password
    ).toString("base64");
    return basicAuth;
}