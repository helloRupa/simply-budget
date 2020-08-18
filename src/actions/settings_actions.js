import { getSettings, updateSettings } from '../utils/comms';
import { dispatchError } from './error_actions';

export const setSettings = settings => ({
  type: 'SET_SETTINGS',
  settings
});

export function fetchSettings() {
  return dispatch => {
    getSettings()
    .then(settings => {
      dispatch(setSettings(settings));
    })
    .catch(error => {
      dispatchError(dispatch, {
        error: 'Could not fetch settings.',
        location: 'fetchSettings()',
        debug: error
      });
    });
  };
};

export function patchSettings(settings) {
  return dispatch => {
    updateSettings(settings)
    .then(settings => {
      dispatch(setSettings(settings));
    })
    .catch(error => {
      dispatchError(dispatch, {
        error: 'Could not update settings.',
        location: 'patchSetting()',
        debug: error
      });
    });
  };
};
