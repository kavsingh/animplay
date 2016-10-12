import test from 'ava';
import sinon from 'sinon';
import { loadAnimations } from './loaders';

test('Loads animations', async t => {
  t.plan(2);

  const spy = sinon.spy();
  const mockLoader = name => Promise.resolve().then(spy).then(() => `${name}_`);
  const loaded = await loadAnimations(['this', 'that'], mockLoader);

  t.is(2, spy.callCount);
  t.deepEqual({
    this: { data: 'this_', segments: {} },
    that: { data: 'that_', segments: {} },
  }, loaded);
});
