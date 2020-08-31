import React from 'react';
import { connect } from 'react-redux';
import ArchivedBudget from './archive/ArchivedBudget';
import Close from '../shared/Close';

function Archive({ archive, setShowArchive }) {

  return (
    <div>
      <h2>Archived Budgets</h2>
      <Close callback={() => setShowArchive(false)} display='Close' />

      <ul>
        {archive.map(archived => <li key={archived.id}>
          <ArchivedBudget {...{archived}} />
        </li>)}
      </ul>
    </div>
  )
}

const mapStateToProps = state => ({
  archive: state.archive
});

export default connect(mapStateToProps)(Archive);
