import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import { Link } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

const PatientsCreateButton = (props) => {
  const {
    classes
  } = props;

  return (
    <Fab
      color="primary"
      className={classes.fab}
      component={Link}
      to="/patients/new"
    >
      <AddIcon />
    </Fab>
  );
};

PatientsCreateButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PatientsCreateButton);
