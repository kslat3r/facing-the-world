import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom'

const styles = theme => ({});

const PatientListItem = (props) => {
  const {
    item
  } = props;

  return (
    <ListItem
      alignItems="flex-start"
      divider
      button
      component={Link}
      to={`/patients/${item.id}`}
      key={item.id}
    >
      <ListItemAvatar>
        <Avatar
          alt={`${item.firstName} ${item.lastName}`}
          src={item.photoUri ? item.photoUri : '/img/unknown.png'}
        />
      </ListItemAvatar>
      <ListItemText
        primary={`${item.firstName} ${item.lastName}`}
        secondary={`${item.dayOfBirth}/${item.monthOfBirth}/${item.yearOfBirth}`}
      />
    </ListItem>
  );
};

PatientListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

export default withStyles(styles)(PatientListItem);
