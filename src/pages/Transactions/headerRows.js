const headerRows = [
  {
    id: 'id',
    numeric: true,
    label: 'Date',
  },
  {
    id: 'description',
    numeric: false,
    label: 'Description',
  },
  { id: 'merchant', numeric: false, label: 'Merchant' },
  { id: 'debit', numeric: false, label: 'Debit / Credit' },
  { id: 'amount', numeric: true, label: 'Amount' },
];

export default headerRows;
