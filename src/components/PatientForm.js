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
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
    width: 150,
    height: 150,
    marginLeft: 'auto',
    marginRight: 'auto'
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
      submitting,
      removing,
      error
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
        <Avatar
          className={classes.avatar}
        >
          <AddAPhotoIcon
            className={classes.icon}
          />
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
          id="name"
          key="name"
          name="name"
          label="Name"
          className={classes.textField}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            className: classes.input
          }}
          fullWidth
          value={item.name}
          onChange={(e) => this.onChange('name', e.target.value)}
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
          disabled={submitting}
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
            disabled={removing}
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
  submitting: PropTypes.bool.isRequired,
  removing: PropTypes.bool.isRequired,
  error: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default withStyles(styles)(PatientForm);
