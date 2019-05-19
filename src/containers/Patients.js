import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    position: 'fixed',
    width: 'inherit',
    zIndex: 100,
    top: 64,
    left: 0,
    right: 0
  },
  search: {
    marginTop: theme.spacing.unit
  },
  list: {
    marginTop: 155
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

const Patients = (props) => {
  const { classes } = props;

  return (
    <div>
      <Paper
        className={classes.paper}
        elevation={1}
      >
        <TextField
          id="search"
          className={classes.search}
          placeholder="Search..."
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Paper>

      <List className={classes.list}>
        {[...Array(50)].map((j, i) => (
          <ListItem alignItems="flex-start" divider button component={Link} to={`/patients/${i}`}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Ali Connors"
              secondary="04/10/1987"
            />
          </ListItem>
        ))}
      </List>

      <Fab
        color="primary"
        className={classes.fab}
        component={Link}
        to="/patients/new"
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

Patients.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Patients);
