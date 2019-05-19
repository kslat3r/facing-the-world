import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Auth } from 'aws-amplify';
import { SignIn } from 'aws-amplify-react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  logo: {
    maxWidth: 600,
    width: '100%'
  },
  error: {
    marginBottom: theme.spacing.unit * 2,
    backgroundColor: theme.palette.error.dark,
    borderRadius: 4,
    maxWidth: 99999
  },
  icon: {
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
    marginRight: theme.spacing.unit * 2
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

class CustomSignIn extends SignIn {
  constructor (props) {
    super(props);

    this._validAuthStates = ['signIn', 'signedOut', 'signedUp'];
  }

  async signIn (event) {
    event.preventDefault();

    const {
      username = '',
      password
    } = this.inputs;

    this.setState({
      error: null,
      loading: true
    });

    try {
      const user = await Auth.signIn(username, password);

      this.checkContact(user);
    } catch (err) {
      this.setState({ error: err.message })
    } finally {
      this.setState({ loading: false })
    }
}

  showComponent() {
    const { classes } = this.props;

    const {
      error,
      loading
    } = this.state;

    return (
      <Grid
        className={classes.root}
        container
        direction="column"
        justify="space-evenly"
        alignItems="stretch"
      >
        <Grid
          item
        >
          <Paper
            className={classes.paper}
          >
            <img
              className={classes.logo}
              src="/img/logo.jpg"
              alt="Facing the world"
            />
          </Paper>

          {error ? (
            <SnackbarContent
              className={classes.error}
              message={
                <span
                  id="client-snackbar"
                  className={classes.message}
                >
                  <ErrorIcon
                    className={classes.icon} />
                  {error}
                </span>
              }
            />
          ) : null}

          <Paper
            className={classes.paper}
          >
            <TextField
              id="username"
              key="username"
              name="username"
              label="Username"
              className={classes.textField}
              onChange={this.handleInputChange}
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
              type="password"
              id="password"
              key="password"
              name="password"
              label="Password"
              className={classes.textField}
              onChange={this.handleInputChange}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                className: classes.input
              }}
              fullWidth
            />

            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              fullWidth
              disabled={loading}
              onClick={(e) => this.signIn(e)}
            >
              {loading ? (
                <CircularProgress
                  className={classes.progress}
                  size={20}
                />
              ) : 'Log in'}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

CustomSignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomSignIn);
