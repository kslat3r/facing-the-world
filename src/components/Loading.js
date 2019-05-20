import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 5,
    textAlign: 'center'
  },
  progress: {
    color: theme.palette.primary,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
});

const NoResults = (props) => {
  const { classes } = props;

  return (
    <Paper
      className={classes.root}
      elevation={0}
    >
      <CircularProgress
        className={classes.progress}
        size={50}
      />
    </Paper>
  );
}

NoResults.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoResults);
