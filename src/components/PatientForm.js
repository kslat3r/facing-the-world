import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import Avatar from '@material-ui/core/Avatar';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    margin: theme.spacing.unit * 2,
    display: 'flex',
    flexWrap: 'wrap'
  },
  error: {
    marginBottom: theme.spacing.unit * 2,
    backgroundColor: theme.palette.error.dark,
    borderRadius: 4,
    maxWidth: 99999
  },
  upload: {
    display: 'none'
  },
  avatar: {
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
  icon: {
    fontSize: 50
  },
  errorIcon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  input: {
    width: 'auto'
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2
  },
  progress: {
    color: '#fff',
    marginTop: 1,
    marginBottom: 3
  },
  removeButton: {
    backgroundColor: theme.palette.error.dark,
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: theme.palette.error.light
    },
    minWidth: 150
  }
});

class PatientForm extends React.Component {
  constructor (props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onRemove = this.onRemove.bind(this);

    this.state = {
      item: {},
    };
  }

  onChange (field, value) {
    this.setState({
      item: Object.assign({}, this.state.item, {
        [field]: value
      })
    });
  }

  componentWillMount () {
    this.setState({ item: this.props.item })
  }

  onSubmit () {
    const {
      onSubmit
    } = this.props;

    onSubmit(this.state.item);
  }

  onRemove () {
    const {
      onRemove
    } = this.props;

    onRemove(this.state.item);
  }

  render() {
    const {
      classes,
      uploading,
      submitting,
      removing,
      error,
      onFileUpload
    } = this.props;

    const {
      item
    } = this.state;

    return (
      <div>
        {error ? (
          <SnackbarContent
            className={classes.error}
            message={
              <span
                id="client-snackbar"
                className={classes.message}
              >
                <ErrorIcon
                  className={classes.errorIcon}
                />
                {error}
              </span>
            }
          />
        ) : null}

      <Paper
        className={classes.paper}
      >
        <input
          type="file"
          ref={ref => this.upload = ref}
          className={classes.upload}
          onChange={onFileUpload}
        />

        <Avatar
          className={classes.avatar}
          onClick={() => this.upload.click()}
          src={item.photoUri && !uploading ? item.photoUri : undefined}
        >
          {!uploading ? (
            <AddAPhotoIcon
              className={classes.icon}
            />
          ) : (
            <CircularProgress
              className={classes.progress}
              size={50}
            />
          )}
        </Avatar>

        <TextField
          id="number"
          key="number"
          name="number"
          label="Patient number"
          className={classes.textField}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            className: classes.input
          }}
          fullWidth
          value={item.number}
          onChange={(e) => this.onChange('number', e.target.value)}
        />

        <TextField
          id="firstName"
          key="firstName"
          name="firstName"
          label="First name"
          className={classes.textField}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            className: classes.input
          }}
          fullWidth
          value={item.firstName}
          onChange={(e) => this.onChange('firstName', e.target.value)}
        />

        <TextField
          id="lastName"
          key="lastName"
          name="lastName"
          label="Last name"
          className={classes.textField}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            className: classes.input
          }}
          fullWidth
          value={item.lastName}
          onChange={(e) => this.onChange('lastName', e.target.value)}
        />

        <TextField
          id="dateOfBirth"
          key="dateOfBirth"
          name="dateOfBirth"
          label="Birth date"
          type="date"
          margin="normal"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            className: classes.input
          }}
          fullWidth
          value={item.dateOfBirth}
          onChange={(e) => this.onChange('dateOfBirth', e.target.value)}
        />

        <TextField
          id="history"
          key="history"
          name="history"
          label="History"
          margin="normal"
          className={classes.textField}
          multiline
          rows="4"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            className: classes.input
          }}
          value={item.history}
          onChange={(e) => this.onChange('history', e.target.value)}
        />

        <TextField
          id="managementPlan"
          key="managementPlan"
          name="managementPlan"
          label="Management plan"
          margin="normal"
          className={classes.textField}
          multiline
          rows="4"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            className: classes.input
          }}
          value={item.managementPlan}
          onChange={(e) => this.onChange('managementPlan', e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          fullWidth
          disabled={submitting || uploading}
          onClick={this.onSubmit}
        >
          {submitting ? (
            <CircularProgress
              className={classes.progress}
              size={20}
            />
          ) : 'Submit'}
        </Button>

        {item.id ? (
          <Button
            variant="contained"
            color="primary"
            className={classes.removeButton}
            disabled={removing || uploading}
            onClick={this.onRemove}
          >
            {removing ? (
              <CircularProgress
                className={classes.progress}
                size={20}
              />
            ) : 'Remove'}
          </Button>
        ) : null}
      </Paper>
    </div>
    );
  }
}

PatientForm.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  uploading: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  removing: PropTypes.bool.isRequired,
  error: PropTypes.object,
  onFileUpload: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default withStyles(styles)(PatientForm);
