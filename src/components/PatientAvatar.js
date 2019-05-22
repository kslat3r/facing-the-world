import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Storage } from 'aws-amplify';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  smallAvatar: {
    height: 60,
    width: 60
  },
  largeAvatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
    width: 200,
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.up('sm')]: {
      width: 250,
      height: 250
    },
  },
});

class PatientAvatar extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      photoSrc: null
    };
  }

  componentDidMount () {
    const {
      photoKey
    } = this.props;

    if (photoKey) {
      this.load(photoKey);
    }
  }

  componentDidUpdate (prevProps) {
    const {
      photoKey: prevPhotoKey
    } = prevProps;

    const {
      photoKey
    } = this.props;

    if (prevPhotoKey !== photoKey) {
      this.load(photoKey);
    }
  }

  load (photoKey) {
    Storage.vault.get(photoKey)
      .then(photoSrc => this.setState({
        photoSrc
      }))
      .catch(err => console.log(err));
  }

  render () {
    const {
      classes,
      variant,
      onClick,
      src,
      alt,
      children,
      forceNoSrc
    } = this.props;

    const {
      photoSrc
    } = this.state;

    let imgSrc;

    if (!forceNoSrc) {
      if (photoSrc) {
        imgSrc = photoSrc;
      } else {
        imgSrc = src;
      }
    }

    return (
      <Avatar
        className={variant === 'large' ? classes.largeAvatar : classes.smallAvatar}
        onClick={onClick}
        src={imgSrc}
        alt={alt}
      >
        {children}
      </Avatar>
    );
  }
}

PatientAvatar.propTypes = {
  classes: PropTypes.object.isRequired,
  variant: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  photoKey: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default withStyles(styles)(PatientAvatar);
