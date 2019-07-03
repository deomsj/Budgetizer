import React from 'react';
import * as types from 'types';
import { makeStyles } from '@material-ui/core/styles';
import { unparse } from 'papaparse';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { getDateString } from '../shared/helpers';

const Download = ({ transactions, user }) => {
  const classes = useStyles();
  const fields = ['Date', 'Description', 'Merchant', 'Debit', 'Amount'];
  const data = user.transactions
    .sort((a, b) => b - a)
    .map(transactionId => {
      const transaction = transactions[transactionId];
      return [
        getDateString(transactionId),
        transaction.description,
        transaction.merchant,
        transaction.debit ? 'DEBIT' : 'CREDIT',
        transaction.amount,
      ];
    });
  const dataForDownload = { fields, data };
  const csvData = unparse(dataForDownload, {});
  const csvDataUri = 'data:text/csv;charset=utf-8,' + encodeURI(csvData);

  return (
    <main>
      <Paper className={classes.paper}>
        <Typography variant='h6'>Download Transactions to CSV:</Typography>
        <Link
          href={csvDataUri}
          download='bulk_transaction_upload.csv'
          target='_blank'
          rel='noopener noreferrer'>
          Download CSV
        </Link>
      </Paper>
    </main>
  );
};

export default Download;

Download.propTypes = {
  user: types.user.isRequired,
  transactions: types.transactions.isRequired,
};

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(1),
  },
}));
