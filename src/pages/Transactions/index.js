import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { stableSort, getSorting, filterTransactionsBy } from './helpers';
import TableHeader from './TableHeader';
import TableToolbar from './TableToolbar';
import TableRow from './TableRow';
import { useTextInput } from '../../shared/TextInput';

const Transactions = ({ user, transactions, actions }) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filter, setFilter] = useTextInput();

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = event => setRowsPerPage(+event.target.value);
  const handleRequestSort = (_, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const rows = user.transactions
    .map(id => transactions[id])
    .filter(filterTransactionsBy(filter));

  const noData = !user.transactions.length;

  return (
    <main>
      <Paper className={classes.paper}>
        <TableToolbar
          actions={actions}
          user={user}
          filter={filter}
          setFilter={setFilter}
          noData={noData}
        />
        {noData ? (
          <Typography variant='body2' component='div' align='right'>
            <Box m={5}>Click the + icon to add your first Transaction!</Box>
          </Typography>
        ) : (
          <>
            <div className={classes.tableWrapper}>
              <Table
                className={classes.table}
                aria-labelledby='tableTitle'
                size='medium'>
                <TableHeader
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {stableSort(rows, getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => (
                      <TableRow row={row} key={row.id} actions={actions} />
                    ))}
                </TableBody>
              </Table>
            </div>
            <TablePagination
              rowsPerPageOptions={[10, 20, 50, 100]}
              component='div'
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{ 'aria-label': 'Previous Page' }}
              nextIconButtonProps={{ 'aria-label': 'Next Page' }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
    </main>
  );
};

export default Transactions;

const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
}));
