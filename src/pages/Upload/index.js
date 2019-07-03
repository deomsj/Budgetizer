import React from 'react';
import * as types from 'types';
import { makeStyles } from '@material-ui/core/styles';
import CSVReader from 'react-csv-reader';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { toTransactionObject, starterCsvUri } from './helpers';

const Upload = ({ actions, user }) => {
  const classes = useStyles();
  const handleUpload = csvDataArrays => {
    const transactions = csvDataArrays
      //remove column headers
      .slice(1)
      // filter out incomplete rows
      .filter(row => {
        if (row.length !== 5) return false;
        for (let i = 0; i < 5; i++) {
          if (row[i] === '') return false;
        }
        return true;
      })
      // replace array rows with transaction objects
      .map(toTransactionObject(user.id));
    actions.uploadTransactions(transactions);
  };

  return (
    <main>
      <Typography variant='h4' align='left' className={classes.title}>
        Bulk data upload from CSV:
      </Typography>
      <Paper className={classes.paper}>
        <Typography variant='h6'>Download Starter File:</Typography>
        <Typography variant='body1' paragraph>
          To upload multiple transactions at once: download this starter file,
          then add your transaction data in the rows below the column headers.
        </Typography>
        <Typography variant='body2' paragraph>
          Note: Two examples transactions are provided to demonstrate the
          expected data format. Replace these with your own data!
        </Typography>
        <Link
          href={starterCsvUri}
          download='bulk_transaction_upload.csv'
          target='_blank'
          rel='noopener noreferrer'>
          Download CSV
        </Link>
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant='h6'>Upload Data:</Typography>
        <Typography variant='body1' paragraph>
          Save your csv file, then upload it using the button below!
        </Typography>
        <CSVReader onFileLoaded={handleUpload} inputId='file-input' />
      </Paper>
    </main>
  );
};

export default Upload;

Upload.propTypes = {
  user: types.user.isRequired,
  actions: types.actions.isRequired,
};

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(1),
  },
  title: {
    padding: theme.spacing(3),
  },
}));
