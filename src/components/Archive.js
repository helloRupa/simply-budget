import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ArchivedBudget from './archive/ArchivedBudget';
import Close from '../shared/Close';
import { chooseDashboard } from '../actions/ui_actions';
import { fetchArchives } from '../actions/archive_actions';

function Archive({ archive, fetchArchives, chooseDashboard }) {
  useEffect(() => {
    fetchArchives();
  }, [fetchArchives]);

  return (
    <div>
      <h2>Archived Budgets</h2>
      <Close callback={chooseDashboard} display='Close' />

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

export default connect(mapStateToProps, { chooseDashboard, fetchArchives })(Archive);
