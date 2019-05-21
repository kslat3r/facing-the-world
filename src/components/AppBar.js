import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
    textAlign: 'center'
  },
  logo: {
    height: 50,
  }
})

const SearchAppBar = props => {
  const {
    classes
  } = props

  return (
    <div
      className={classes.root}
    >
      <AppBar
        position="fixed"
        color="default"
      >
        <Toolbar>
          <div
            className={classes.grow}
          >
            <Link
              to="/patients"
            >
              <img
                src="/img/face.png"
                className={classes.logo}
                alt="Facing the world"
              />
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SearchAppBar);
