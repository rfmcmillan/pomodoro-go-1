import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography, Fade } from '@material-ui/core';

const BlockError = (props) => {
  const theme = useTheme();
  const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: '80vh',
      width: '80vw',
      margin: 'auto',
      paddingTop: 25,
    },
    quote: { color: theme.palette.text.primary },
    person: { color: theme.palette.text.primary, marginTop: '30px' },
  }));
  const classes = useStyles();

  const [quoteToDisplay, setQuoteToDisplay] = useState('');
  useEffect(() => {
    const quotes = [
      {
        quote:
          'All we have to decide is what to do with the time that is given us.',
        person: 'J. R. R. Tolkien',
      },
      {
        quote:
          'If you love life, don’t waste time, for time is what life is made up of.',
        person: 'Bruce Lee',
      },
      {
        quote:
          'If we take care of the moments, the years will take care of themselves.',
        person: 'Maria Edgeworth',
      },
      {
        quote:
          'Yesterday’s the past, tomorrow’s the future, but today is a gift. That’s why it’s called the present.',
        person: 'Bil Keane',
      },
    ];
    const quoteToDisplayIdx = Math.floor(Math.random() * quotes.length);

    setQuoteToDisplay(quotes[quoteToDisplayIdx]);
  }, []);

  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      justifyContent="center"
      className={classes.root}
    >
      <Grid item>
        <Fade easing="ease-in" timeout={2000} in={true}>
          <Typography className={classes.quote} variant="h1">
            {quoteToDisplay.quote}
          </Typography>
        </Fade>
      </Grid>
      <Grid item>
        <Fade easing="ease-in" timeout={2000} in={true}>
          <Typography className={classes.person} variant="h1">
            - {quoteToDisplay.person}
          </Typography>
        </Fade>
      </Grid>
    </Grid>
  );
};

export default BlockError;
