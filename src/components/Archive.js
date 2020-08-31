import React from 'react';
import { connect } from 'react-redux';
import ArchivedBudget from './archive/ArchivedBudget';

function Archive({ archive }) {

  return (
    <ul>
      {archive.map(archived => <li key={archived.id}>
        <ArchivedBudget {...{archived}} />
      </li>)}
    </ul>
  )
}

const mapStateToProps = state => ({
  archive: state.archive
});

export default connect(mapStateToProps)(Archive);
