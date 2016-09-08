import test from 'ava';
import { loadAnimations } from './loaders';

test('Loads animations', async t => {
  t.plan(2);

  let loadCount = 0;
  const mockLoader = name => {
    loadCount += 1;
    return Promise.resolve({ name });
  };

  const loaded = await loadAnimations(['this', 'that'], mockLoader);

  t.is(loadCount, 2);
  t.deepEqual(loaded, {
    this: { name: 'this' },
    that: { name: 'that' },
  });
});
