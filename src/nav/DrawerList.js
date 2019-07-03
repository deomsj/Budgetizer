import React from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import DrawerListItem from './DrawerListItem';
import { listItems } from './constants';

const DrawerList = () => (
  <>
    <div />
    <Divider />
    <List>
      {listItems.map(listItem => (
        <DrawerListItem {...listItem} key={listItem.text} />
      ))}
    </List>
  </>
);

export default DrawerList;
