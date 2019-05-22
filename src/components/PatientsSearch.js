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
  },
  hidden: {
    display: 'none'
  }
});

class PatientsSearch extends React.Component {
  constructor (props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);

    this.state = {
      term: ''
    };
  }

  componentWillMount () {
    const {
      term
    } = this.props;

    this.setState({
      term
    });
  }

  componentDidUpdate (prevProps) {
    const {
      term: prevTerm
    } = prevProps;

    const {
      term
    } = this.props;

    if (prevTerm !== term) {
      this.setState({
        term
      });
    }
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  onSearch (e) {
    if (e.key === 'Enter') {
      e.target.blur();

      const {
        onSearch
      } = this.props;

      onSearch(this.state.term);
    }
  }

  render () {
    const {
      classes,
      onReset
    } = this.props;

    const {
      term
    } = this.state;

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
          InputProps={{
            inputProps: {
              'aria-label': "Search by patient name or number"
            }
          }}
          onKeyPress={this.onSearch}
          value={term}
          onChange={this.onChange}
        />

        <InputAdornment
          className={classes.inputButton}
        >
          <IconButton
            onClick={onReset}
            aria-label="Reset search"
          >
            <Close />
          </IconButton>
        </InputAdornment>
      </Paper>
    );
  }
};

PatientsSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  term: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
};

export default withStyles(styles)(PatientsSearch);
