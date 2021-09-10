import React, { useState } from 'react';

import { Button } from '@material-ui/core';
import { withStyles, useTheme } from '@material-ui/styles';
const NavButton = withStyles({
  root: {
    color: '#4d2a4e',
    fontSize: 'medium',
    textTransform: 'none',
    fontWeight: 'bold',
    fontFamily: ['Roboto', 'sans-serif'].join(','),
  },
})(Button);

export default NavButton;
