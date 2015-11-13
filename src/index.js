import { isCollection, toClj } from 'mori';
import { isFSA } from 'flux-standard-action';

export default function makeMori() {
  return next => action => {
    let key;
    let payload;
    if (action.type === undefined) { return next(action); }

    if (isFSA(action)) {
      key = 'payload';
      payload = action[key];
    } else {

      key = Object.keys(action).find(k => {
        return k !== 'type';
      });
      payload = action[key];
    }

    payload = isCollection(payload) ? payload : toClj(payload);
    const newAction = Object.assign({}, action, {
      [key]: payload,
    });

    return next(newAction);
  };
}
