import test from 'ava';
import { friendly, unfriendly } from './hello';

test('Return default greetings', t => {
  t.plan(2);
  t.is('Hey there friend!', friendly());
  t.is('Go away, dickhead.', unfriendly());
});

test('Return custom greetings', t => {
  t.plan(2);
  t.is('Hey there ...You!', friendly('...You'));
  t.is('Go away, dipshit.', unfriendly('dipshit'));
});
