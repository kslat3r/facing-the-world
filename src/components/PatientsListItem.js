import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Storage } from 'aws-amplify';
import { Link } from 'react-router-dom'

const styles = theme => ({
  avatar: {
    height: 60,
    width: 60
  }
});

class PatientListItem extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      image: null
    };
  }

  async componentWillMount () {
    const {
      item
    } = this.props;

    let image;

    if (item.photoKey) {
      try {
        image = await Storage.get(item.photoKey);
      } catch (e) {}
    }

    this.setState({
      image
    });
  }

  render () {
    const {
      classes,
      item
    } = this.props;

    const {
      image
    } = this.state;

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
          <Avatar
            className={classes.avatar}
            alt={`${item.firstName} ${item.lastName}`}
            src={image ? image : '/img/unknown.png'}
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
