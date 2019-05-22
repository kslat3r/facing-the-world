import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PatientAvatar from './PatientAvatar';
import { Link } from 'react-router-dom'

const styles = theme => ({});

class PatientListItem extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      image: null
    };
  }

  render () {
    const {
      item
    } = this.props;

    const Name = () => (
      <div>
        {item.firstName} <b>{item.lastName}</b>
      </div>
    );

    return (
      <ListItem
        alignItems="center"
        divider
        button
        component={Link}
        to={`/patients/${item.id}`}
      >
        <ListItemAvatar>
          <PatientAvatar
            variant="small"
            alt={`${item.firstName} ${item.lastName}`}
            photoKey={item.photoKey || undefined}
            src={!item.photoKey ? '/img/unknown.png' : undefined}
          />
        </ListItemAvatar>
        <ListItemText
          primary={<Name />}
          secondary={`${item.dateOfBirth.split('-').reverse().join('/')}`}
        />
      </ListItem>
    );
  }
};

PatientListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

export default withStyles(styles)(PatientListItem);
