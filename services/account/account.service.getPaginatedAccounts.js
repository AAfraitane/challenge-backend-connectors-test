const axios = require('axios').default;
const config = require('../../config/config.json');

const getPaginatedAccounts = async (accessToken, page) => {
    const requestConfig = {
        method: 'get',
        url: `${config.host}:${config.port}/accounts?page=${page}`,
        headers: { 
            'Authorization': `Bearer ${accessToken}`, 
        },
    };
    let response;
    try {
        response = await axios(requestConfig);
    } catch (error) {
        throw new Error(`Error while getting paginated accounts : ${error.toJSON().message}`);
    }
    return response.data;
}

module.exports = {
    getPaginatedAccounts,
}