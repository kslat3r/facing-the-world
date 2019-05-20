import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    paddingTop: 0
  },
});

const NoResult = (props) => {
  const { classes } = props;

  return (
    <Paper
      className={classes.root}
      elevation={0}
    >
      <Typography
        variant="h5"
        component="h3"
      >
        Patient could not be found
      </Typography>
      <Typography
        component="p"
      >
        Please go back and try again.
      </Typography>
    </Paper>
  );
}

NoResult.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoResult);
