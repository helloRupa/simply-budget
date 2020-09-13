import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ArchivedBudget from './archive/ArchivedBudget';
import Close from '../shared/Close';
import { chooseDashboard } from '../actions/ui_actions';
import { fetchArchives } from '../actions/archive_actions';

function Archive({ archive, fetchArchives, chooseDashboard }) {
  window.scrollTo(0, 0);

  useEffect(() => {
    fetchArchives();
  }, [fetchArchives]);

  return (
    <div className="archive">
      <Close callback={chooseDashboard} display="Back" className="back" />

      <h2>Archived Budgets</h2>

      { archive.length === 0 ? <p>
          Nothing to see here! Why don't you archive something...or not, is OK!
        </p> : <ul>
        {archive.map(archived => <li key={archived.id}>
          <ArchivedBudget {...{archived}} />
        </li>)}
      </ul>}
    </div>
  )
}

const mapStateToProps = state => ({
  archive: state.archive
});

export default connect(mapStateToProps, { chooseDashboard, fetchArchives })(Archive);
