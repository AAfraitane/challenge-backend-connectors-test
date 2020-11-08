const { getAcessToken } = require('../auth.service');
const { getAllTransactionsByAcount } = require('../transaction.service');
const { getPaginatedAccounts } = require('./account.service.getPaginatedAccounts')

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

    const uniqueArray = [];
    const uniqueArrayString = [];
    allAccounts.forEach((acc) => {
        if (!uniqueArrayString.includes(JSON.stringify(acc))) {
            uniqueArray.push(acc);
            uniqueArrayString.push(JSON.stringify(acc));
        }
    });
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

module.exports = {
    getAllAccounts,
}