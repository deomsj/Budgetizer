import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import MaterialTableRow from '@material-ui/core/TableRow';
import DeleteTransaction from './Modals/DeleteTransaction';
import EditTransaction from './Modals/EditTransaction';
import { getDateString } from '../../shared/helpers';

const TableRow = ({ row, actions }) => {
  const [selected, setSelected] = React.useState([]);

  function handleClick() {
    const selectedIndex = selected.indexOf(row.id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row.id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  }

  return (
    <MaterialTableRow
      hover
      onClick={handleClick}
      tabIndex={-1}
      key={row.id}
      padding='small'>
      <TableCell component='th' scope='row'>
        {getDateString(row.id)}
      </TableCell>
      <TableCell>{row.description}</TableCell>
      <TableCell>{row.merchant}</TableCell>
      <TableCell>{row.debit ? 'Debit' : 'Credit'}</TableCell>
      <TableCell>${Number(row.amount).toFixed(2)}</TableCell>
      <TableCell align='right' padding='none' style={{ minWidth: '120px' }}>
        <EditTransaction transaction={row} actions={actions} />
        <DeleteTransaction transaction={row} actions={actions} />
      </TableCell>
    </MaterialTableRow>
  );
};

export default TableRow;
