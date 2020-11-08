const axios = require('axios').default;
const config = require('../config/config.json');

const getAllTransactionsByAcount = async (accessToken, accountId) => {
    const allTransactions = [];
    let page = 1;
    let continuePagination = true;
    while (continuePagination) {
        const paginatedTransations = await getPaginatedTransactions(accessToken, accountId, page);
        allTransactions.push(...paginatedTransations.transactions);
        continuePagination = !!paginatedTransations.link.next;
        page++;
    }
    const uniqueArray = [];
    const uniqueArrayString = [];
    allTransactions.forEach((acc) => {
        if (!uniqueArrayString.includes(JSON.stringify(acc))) {
            uniqueArray.push(acc);
            uniqueArrayString.push(JSON.stringify(acc));
        }
    });
    return uniqueArray;
}

const getPaginatedTransactions = async (accessToken, accountId, page) => {
    const requestConfig = {
        method: 'get',
        url: `${config.host}:${config.port}/accounts/${accountId}/transactions?page=${page}`,
        headers: { 
            'Authorization': `Bearer ${accessToken}`, 
        },
    };
    let response;
    try {
        response = await axios(requestConfig);
    } catch (error) {
        throw new Error(`Error while getting paginated transactions with acccount id ${accountId} : ${error.toJSON().message}`);
    }
    return response.data;
}

module.exports = {
    getAllTransactionsByAcount,
}