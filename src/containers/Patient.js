import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PatientActions from '../actions/patient';
import { withStyles } from '@material-ui/core/styles';
import Loading from '../components/Loading';
import Error from '../components/Error';
import NoResult from '../components/NoResult';
import PatientForm from '../components/PatientForm';

const styles = theme => ({
  root: {
    marginTop: 73,
    [theme.breakpoints.up('sm')]: {
      marginTop: 81
    },
  }
});

class Patient extends React.Component {
  constructor (props) {
    super(props);

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  async componentWillMount () {
    const {
      match
    } = this.props;

    const {
      params
    } = match;

    const {
      id
    } = params;

    if (id) {
      await this.props.patientActions.get(id);
    } else {
      await this.props.patientActions.init();
    }
  }

  async create () {

  }

  async update () {

  }

  render () {
    const {
      classes,
      patient
    } = this.props;

    const {
      item,
      error,
      loading,
      submitting
    } = patient;

    return (
      <div
        className={classes.root}
      >
        {loading ? (
          <Loading />
        ) : null}

        {error ? (
          <Error />
        ) : null}

        {!error && !loading && !item ? (
          <NoResult />
        ) : null}

        {!error && !loading && item ? (
          <PatientForm
            item={item}
            submitting={submitting}
            error={error}
            onSubmit={!item.id ? this.create : this.update}
          />
        ) : null}
      </div>
    );
  }
};

Patient.propTypes = {
  classes: PropTypes.object.isRequired,
  patient: PropTypes.object.isRequired
};

export default connect((state) => {
  return {
    patient: state.patient
  };
}, (dispatch) => {
  return {
    patientActions: bindActionCreators(PatientActions, dispatch)
  };
})(withStyles(styles)(Patient));
