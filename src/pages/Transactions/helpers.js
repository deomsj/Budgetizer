import { getDateString } from 'shared/helpers';

export const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

export const getSorting = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
};

const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const filterTransactionsBy = filter => transaction => {
  const { id, description, merchant, debit, amount } = transaction;
  const combined = `${getDateString(id)}/${description}/${merchant}/${
    debit ? 'Debit' : 'Credit'
  }/${amount}`.toLowerCase();
  if (!filter.includes(',')) {
    return combined.includes(filter.toLowerCase());
  } else {
    // if filter text includes commas, then match all filters
    const filters = filter.split(',');
    let match = true;
    for (let i = 0; i < filters.length; i++) {
      if (!combined.includes(filters[i].toLowerCase().trim())) {
        match = false;
      }
    }
    return match;
  }
};
