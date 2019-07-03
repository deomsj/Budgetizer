# Budgetizer

## Application Summary

This is a simple budgeting application to help users track they’re spending.

## Functionality

The application will be able to:

- create and manage data for multiple users
- display transactions in a table
- add transactions
- sort tabular transaction data
- persist transactions across browser sessions
- delete transactions
- edit transactions
- meaningful graphical display of transactions
- bulk upload transactions from a csv file
- download transactions data to csv
- filter tabular transaction data

Note: All user data is simply stored in the browser's local storage. Do not store any sensitive information in this app unless you wire up this user interface to a secure data storage strategy with proper authentication

## Data Models

### Transactions

```javascript
{
  id: Number, // time in ms that can be used to generate date
  user_id: String,
  description: String,
  merchant: String,
  debit: Boolean, // if false, then transaction was of type credit
  amount: String
}
```

### Users

```javascript
{
  id: String,
  dob: String,
  firstName: String,
  lastName: String,
  transactions: [String] // array of transaction ids
}
```

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
