import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';

const DrawerListItem = ({ icon, text, path }) => (
  <NavLink to={path}>
    <ListItem button>
      <Tooltip title={text} aria-label={text} enterDelay={500}>
        <ListItemIcon>{icon}</ListItemIcon>
      </Tooltip>
      <ListItemText primary={text} />
    </ListItem>
  </NavLink>
);

export default DrawerListItem;

DrawerListItem.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
