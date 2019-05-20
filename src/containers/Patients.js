import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PatientsActions from '../actions/patients';
import { withStyles } from '@material-ui/core/styles';
import Loading from '../components/Loading';
import Error from '../components/Error';
import NoResults from '../components/NoResults';
import PatientsSearch from '../components/PatientsSearch';
import PatientsList from '../components/PatientsList';
import PatientsCreateButton from '../components/PatientsCreateButton';

const styles = theme => ({
  root: {
    marginTop: 154,
    [theme.breakpoints.up('sm')]: {
      marginTop: 162
    },
  }
});

class Patients extends React.Component {
  constructor (props) {
    super(props);

    this.search = this.search.bind(this);
  }

  async componentWillMount () {
    const { patientsActions } = this.props;

    await patientsActions.list();
  }

  async search (e) {
    console.log(e.target.value)
  }

  render () {
    const {
      classes,
      patients
    } = this.props;

    const {
      items,
      error,
      loading
    } = patients;

    return (
      <div>
        <PatientsSearch
          onSearch={this.search}
        />

        <div
          className={classes.root}
        >
          {loading ? (
            <Loading />
          ) : null}

          {error ? (
            <Error />
          ) : null}

          {!error && !loading && !items.length ? (
            <NoResults />
          ) : null}

          {!error && !loading && items.length ? (
            <PatientsList
              items={items}
            />
          ) : null}
        </div>

        <PatientsCreateButton />
      </div>
    );
  }
};

Patients.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect((state) => {
  return {
    patients: state.patients
  };
}, (dispatch) => {
  return {
    patientsActions: bindActionCreators(PatientsActions, dispatch)
  };
})(withStyles(styles)(Patients));
