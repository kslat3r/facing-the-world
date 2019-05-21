import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    position: 'fixed',
    width: 'inherit',
    zIndex: 100,
    top: 56,
    left: 0,
    right: 0,
    [theme.breakpoints.up('sm')]: {
      top: 64
    },
  },
  search: {
    marginTop: theme.spacing.unit
  },
  inputButton: {
    top: -35,
    right: 5,
    float: 'right',
    position: 'relative'
  }
});

const PatientsSearch = (props) => {
  const {
    classes,
    onSearch,
    onReset
  } = props;

  return (
    <Paper
      className={classes.paper}
      elevation={0}
    >
      <TextField
        id="search"
        type="search"
        className={classes.search}
        placeholder="Search by patient name or number..."
        fullWidth
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
        onKeyPress={onSearch}
      />

      <InputAdornment
        className={classes.inputButton}
      >
        <IconButton
          onClick={onReset}
        >
          <Close />
        </IconButton>
      </InputAdornment>
    </Paper>
  );
};

PatientsSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
};

export default withStyles(styles)(PatientsSearch);
