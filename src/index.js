import { forEach } from 'lodash/fp';
import { loadAnimations } from './loaders';
import { createBodymovinWrapper } from './bodymovinWrapper';
import styles from './index.css';

const loopedRoot = document.createElement('div');
const controlledRoot = document.createElement('div');

const initLooped = (animData, container) =>
  createBodymovinWrapper(animData, container).loop();

const initControlled = (animData, container) => {
  const wrapped = createBodymovinWrapper(animData, container);

  forEach(segment => {
    const button = document.createElement('button');
    button.innerText = segment;
    button.classList.add(styles.button);
    container.appendChild(button);
    button.addEventListener('click', () => wrapped.loopSegment(segment), false);
  }, wrapped.getSegmentNames());
};

forEach(el => {
  el.classList.add(styles.animContainer);
  document.body.appendChild(el);
}, [loopedRoot, controlledRoot]);

loadAnimations(['bodymovin', 'testAnim1']).then(({ bodymovin, testAnim1 }) => {
  initLooped(bodymovin, loopedRoot);
  initControlled({
    ...testAnim1,
    segments: [
      { name: 'one', frames: [0, 24], loopFrames: [0, 24] },
      { name: 'two', frames: [24, 40], loopFrames: [24, 40] },
      { name: 'three', frames: [40, 60], loopFrames: [40, 60] },
    ],
  }, controlledRoot);
});
