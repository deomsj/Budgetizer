import React from 'react';
import * as types from 'types';
import Chart from 'react-google-charts';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { getDateString } from '../shared/helpers';

const Analysis = ({ user, transactions }) => {
  let minTime = Number.MAX_SAFE_INTEGER;
  let maxTime = Number.MIN_SAFE_INTEGER;

  const dailyTotals = user.transactions.reduce((totals, transactionId) => {
    const { debit, amount } = transactions[transactionId];
    const date = new Date(transactionId);
    const dateString = getDateString(date);
    if (!totals[dateString]) {
      totals[dateString] = { credit: 0, debit: 0, date, id: transactionId };
    }
    if (debit) {
      totals[dateString].debit += Number(amount);
    } else {
      totals[dateString].credit += Number(amount);
    }

    minTime = Math.min(minTime, transactionId);
    maxTime = Math.max(maxTime, transactionId);
    return totals;
  }, {});

  const totalsList = Object.keys(dailyTotals)
    .sort((a, b) => dailyTotals[b].id - dailyTotals[a].id)
    .map(dateString => {
      const { credit, debit, date } = dailyTotals[dateString];
      const total = credit + debit;
      return [date, credit, debit, total];
    });
  const legend = ['Date', 'Credit', 'Debit', 'Total'];
  const dailyExpenditures = [legend, ...totalsList];

  if (totalsList.length < 2) {
    return (
      <main>
        <Typography variant='h6' component='div' paragraph>
          <Box m={5}>
            This page will help you analyze spending patterns over time. Head
            over to the Transactions page to enter some data!
          </Box>
          <Box m={5}>
            Come back to this page when you have saved transactions over
            multiple days
          </Box>
        </Typography>
      </main>
    );
  }

  return (
    <main>
      <Chart
        width={'100%'}
        height={'80%'}
        chartType='ComboChart'
        data={dailyExpenditures}
        options={{
          title: 'Daily Spending',
          hAxis: { title: 'Day', titleTextStyle: { color: '#333' } },
          vAxis: {
            title: 'Amount ($)',
            titleTextStyle: { color: '#333' },
            minValue: 0,
          },
          // For the legend to fit, we make the chart area smaller
          chartArea: { width: '50%', height: '70%' },
          seriesType: 'bars',
          series: { 2: { type: 'line' } },
          animation: {
            startup: true,
            easing: 'out',
            duration: 700,
          },
        }}
        chartPackages={['corechart', 'controls']}
        controls={[
          {
            controlType: 'ChartRangeFilter',
            options: {
              filterColumnIndex: 0,
              ui: {
                chartType: 'AreaChart',
                chartOptions: {
                  chartArea: { width: '50%', height: '70%' },
                  hAxis: { baselineColor: 'none' },
                },
              },
            },
            controlPosition: 'bottom',
            controlWrapperParams: {
              state: {
                range: {
                  start: new Date(minTime),
                  end: new Date(maxTime),
                },
              },
            },
          },
        ]}
      />
    </main>
  );
};

Analysis.propTypes = {
  user: types.user.isRequired,
  transactions: types.transactions.isRequired,
};

export default Analysis;
