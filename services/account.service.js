const axios = require('axios').default;
const config = require('../config/config.json');
const { getAcessToken } = require('./auth.service');
const { getAllTransactionsByAcount } = require('./transaction.service');


const getAllAccounts = async () => {
    const allAccounts = [];
    const acessToken = await getAcessToken();
    
    let page = 1;
    let continuePagination = true;
    while (continuePagination) {
        const paginatedAccounts = await getPaginatedAccounts(acessToken, page);
        allAccounts.push(...paginatedAccounts.account);
        continuePagination = !!paginatedAccounts.link.next;
        page++;
    }
    const uniqueArray = allAccounts.filter((item, pos) => {
        return allAccounts.indexOf(item) == pos;
    })
    const parsedArray = uniqueArray.map(async (account) => {
        let transactions; 
        try {
            transactions = await getAllTransactionsByAcount(acessToken, account.acc_number);
        } catch (error) {
            console.error(error);
            transactions = [];
        }
        return {
            'acc_number': account.acc_number,
            'amount': account.amount,
            transactions: transactions,
        }
    })
    return Promise.all(parsedArray);
}

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
    getAllAccounts,
}