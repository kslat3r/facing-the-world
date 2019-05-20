import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import PatientListItem from './PatientsListItem';

const styles = theme => ({
  list: {
    marginTop: -18
  }
});

const PatientsList = (props) => {
  const {
    classes,
    items
  } = props;

  return (
    <List
      className={classes.list}
    >
      {items.map((item) => (
        <PatientListItem
          item={item}
        />
      ))}
    </List>
  );
};

PatientsList.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired
};

export default withStyles(styles)(PatientsList);
