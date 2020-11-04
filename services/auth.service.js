const config = require('../config/config.json');
const axios = require('axios').default;
const qs = require('qs');

const getRefreshToken = async () => {
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
    let response;
    try {
        response = await axios(requestConfig);
    } catch (error) {
        throw new Error(`Error while getting refresh token, reason : ${error.toJSON().message}`);
    }
    return response.data.refresh_token;
}

const getAcessToken = async () => {
    const refreshToken = await getRefreshToken();
    const data = getQueryStringData(refreshToken);
    const requestConfig = {
        method: 'post',
        url: `${config.host}:${config.port}/token`,
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded', 
        },
        data,
    };
    let response;
    try {
        response = await axios(requestConfig);
    } catch (error) {
        throw new Error(`Error while getting access token, reason : ${error.toJSON().message}`);
    }
    return response.data.access_token;
}

const getCredentialData = (user, password) => {
    const data = JSON.stringify({ user, password});
    return data;
}

const getQueryStringData = (refreshToken) => {
    const data = qs.stringify({
        'refresh_token': refreshToken,
        'grant_type': 'refresh_token' 
    });
    return data;
}

const getBasicAuth = (clientId, password) => {
    const basicAuth = "Basic " + Buffer.from(
        clientId + ":" + password
    ).toString("base64");
    return basicAuth;
}

module.exports = {
    getRefreshToken,
    getAcessToken,
    getCredentialData,
    getQueryStringData,
    getBasicAuth
}