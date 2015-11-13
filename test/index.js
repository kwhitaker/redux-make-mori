
import { expect } from 'chai';
import { isCollection, toClj } from 'mori';
import makeMori from '../src/index';

describe('immutable middleware', () => {
  let result;
  const TYPE = 'SOME_TYPE';
  const notCollection = {
    values: [1, 2, 3],
  };

  const mCollection = toClj(notCollection);

  const FSA = {
    type: TYPE,
    payload: notCollection,
  };

  const moriFSA = {
    type: TYPE,
    payload: mCollection,
  };

  const notFSA = {
    type: TYPE,
    values: notCollection.values,
  };

  const weirdAction = {
    payload: notCollection,
  };

  const doNext = (action) => action;

  it('should coerce native types', () => {
    result = makeMori()(doNext)(FSA);
    expect(isCollection(result.payload))
      .to.equal(true);
  });

  it('should ignore mori types', () => {
    result = makeMori()(doNext)(moriFSA);
    expect(result.payload).to.equal(mCollection);
  });

  it('should work with non-standard-actions', () => {
    result = makeMori()(doNext)(notFSA);
    expect(isCollection(result.values))
      .to.equal(true);
  });

  it('should forward weird actions', () => {
    result = makeMori()(doNext)(weirdAction);
    expect(result).to.equal(weirdAction);
  });
});
