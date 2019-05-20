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
    verticalAlign: -3
  },
});

class PatientForm extends React.Component {
  render() {
    const {
      classes,
      submitting,
      error,
      onSubmit
    } = this.props;

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
        />

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          fullWidth
          disabled={submitting}
          onClick={onSubmit}
        >
          {submitting ? (
            <CircularProgress
              className={classes.progress}
              size={20}
            />
          ) : 'Submit'}
        </Button>
      </Paper>
    </div>
    );
  }
}

PatientForm.propTypes = {
  classes: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default withStyles(styles)(PatientForm);
