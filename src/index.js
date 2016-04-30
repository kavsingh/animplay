import { forEach, mapValues } from 'lodash/fp';
import { createBodymovinWrapper } from './animation/bodymovinWrapper';
import { loadAnimations } from './animations';
import globalStyles from './index.css';

const root = document.createElement('div');
root.classList.add(globalStyles.root);

document.body.appendChild(root);

async function loadAnims() {
  const anims = await loadAnimations(['bodymovin', 'grunt']);
  return mapValues(data => createBodymovinWrapper({ data }), anims);
}

loadAnims().then(forEach(anim => anim(root).loop()));
