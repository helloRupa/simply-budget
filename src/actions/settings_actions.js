import { getSettings, updateSettings } from '../utils/comms';

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

export function patchSettings(settings) {
  return dispatch => {
    updateSettings(settings)
    .then(settings => {
      dispatch(setSettings(settings));
    });
  };
};
