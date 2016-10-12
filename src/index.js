import { forEach, mapValues, partial } from 'lodash/fp';
import { loadAnimations } from './loaders';
import { createBodymovinWrapper } from './bodymovinWrapper';
import globalStyles from './index.css';

const root = document.createElement('div');
root.classList.add(globalStyles.root);

document.body.appendChild(root);

async function getWrappedAnims(animNames) {
  const anims = await loadAnimations(animNames);
  return mapValues(data => partial(createBodymovinWrapper, [{ data }]), anims);
}

getWrappedAnims(['bodymovin', 'grunt']).then(
  forEach(wrapped => wrapped(root).loop()));
