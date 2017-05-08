
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import ArcadeMode from '../components/ArcadeMode';
import { runTest } from '../actions/ArcadeAction';

const mapStateToProps = state => ({
  userData: state.arcadeReducer.userData
});

const mapDispatchToProps = dispatch => ({
  runTest: () => dispatch(runTest())
});

export default connect(mapStateToProps, mapDispatchToProps)(ArcadeMode);