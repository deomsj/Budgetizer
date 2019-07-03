import React from 'react';
import BallotIcon from '@material-ui/icons/Ballot';
import TimelineIcon from '@material-ui/icons/Timeline';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DownloadIcon from '@material-ui/icons/VerticalAlignBottom';
import AccountIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export const listItems = [
  {
    text: 'Transactions',
    icon: <BallotIcon />,
    path: '/transactions',
  },
  {
    text: 'Analysis',
    icon: <TimelineIcon />,
    path: '/analysis',
  },
  {
    text: 'Upload',
    icon: <CloudUploadIcon />,
    path: '/upload',
  },
  {
    text: 'Download',
    icon: <DownloadIcon />,
    path: '/download',
  },
  {
    text: 'Account',
    icon: <AccountIcon />,
    path: '/account',
  },
  {
    text: 'Logout',
    icon: <ExitToAppIcon />,
    path: '/',
  },
];

export const DRAWER_WIDTH = 240;
