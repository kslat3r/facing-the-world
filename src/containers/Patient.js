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

    this.upload = this.upload.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  async componentWillMount () {
    const {
      match,
      patientActions
    } = this.props;

    const {
      params
    } = match;

    const {
      id
    } = params;

    if (id) {
      await patientActions.get(id);
    }
  }

  componentWillUnmount () {
    const {
      patientActions
    } = this.props;

    patientActions.reset();
  }

  async upload (e) {
    if (e.target.files.length) {
      const {
        patientActions
      } = this.props;

      await patientActions.upload(e.target.files[0]);
    }
  }

  async create (data) {
    const {
      patientActions,
      history
    } = this.props;

    await patientActions.create(data);

    history.push('/patients');
  }

  async update (data) {
    const {
      patientActions,
      history
    } = this.props;

    await patientActions.update(data);

    history.push('/patients');
  }

  async remove (data) {
    const {
      patientActions,
      history
    } = this.props;

    await patientActions.remove(data.id);

    history.push('/patients');
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
      uploading,
      submitting,
      removing
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
            uploading={uploading}
            submitting={submitting}
            removing={removing}
            error={error}
            onFileUpload={this.upload}
            onSubmit={!item.id ? this.create : this.update}
            onRemove={this.remove}
          />
        ) : null}
      </div>
    );
  }
};

Patient.propTypes = {
  classes: PropTypes.object.isRequired,
  patient: PropTypes.object.isRequired,
  patientActions: PropTypes.object.isRequired
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
