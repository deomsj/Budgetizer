import { unparse } from 'papaparse';

const starterData = {
  fields: ['Date', 'Description', 'Merchant', 'Debit', 'Amount'],
  data: [
    ['24/01/2019', 'Coconut Coffee', "Hipster's Paradise", 'CREDIT', '2.15'],
    ['31/02/2019', 'Massaman Curry', 'Reform Kafe', 'DEBIT', '9.95'],
  ],
};
const starterCSV = unparse(starterData, {});

// generate href for download of csv starter file
export const starterCsvUri =
  'data:text/csv;charset=utf-8,' + encodeURI(starterCSV);

// convert 'dd/mm/yyyy' => milliseconds since January 1, 1970
const getIdFromDateString = dateString => {
  const [day, month, year] = dateString.split('/');
  const date = new Date(year, month - 1, day);
  return date.getTime();
};

export const toTransactionObject = user_id => transactionArray => ({
  id: getIdFromDateString(transactionArray[0]),
  user_id,
  description: transactionArray[1],
  merchant: transactionArray[2],
  debit: transactionArray[3] === 'DEBIT',
  amount: transactionArray[4],
});
