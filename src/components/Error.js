import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2
  },
});

const Error = (props) => {
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
        Oops, an error occurred
      </Typography>
      <Typography
        component="p"
      >
        Please reload the page and try again
      </Typography>
    </Paper>
  );
}

Error.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Error);
