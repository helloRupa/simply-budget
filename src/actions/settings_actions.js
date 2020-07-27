import { getSettings } from '../utils/comms';

export const setSettings = settings => ({
  type: 'SET_SETTINGS',
  settings
});

export function fetchSettings() {
  return dispatch => {
    getSettings()
    .then(settings => {
      dispatch(setSettings(settings));
    });
  };
};
