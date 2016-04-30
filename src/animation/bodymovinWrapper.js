import { curry, find, flow, head, map } from 'lodash/fp';
import bodymovin from 'bodymovin';

/**
 * @type {number}
 */
const SEGMENT_LENGTH_SECONDS = 1;

/**
 * @param {Object} animInstance - bodymovin animation instance
 * @return {Array<Object>} - Array of section definitions
 */
const generateSegments = animInstance => {
  const { firstFrame, totalFrames, frameRate } = animInstance;
  const frameSegments = [];
  const step = SEGMENT_LENGTH_SECONDS * frameRate;
  let cursor = firstFrame;

  while (cursor < totalFrames) {
    frameSegments.push([cursor, Math.min(cursor + step, totalFrames)]);
    cursor = cursor + step + 1;
  }

  const frameTime = (frame) => Math.floor(frame / frameRate);

  return map((frames) => ({
    frames,
    loopFrames: frames,
    name: `${frameTime(head(frames))}s`,
  }), frameSegments);
};

/**
 * @param {Object} animInstance - bodymovin animation instance
 * @return {Object} - The passed in instance
 */
const haltAnim = (animInstance) => {
  animInstance.removeEventListener('complete');
  animInstance.pause();
  return animInstance;
};

/**
 * @param {Object} animInstance - bodymovin animation instance
 * @param {Object} segment - Object defining name, start / end / loop frames for segment
 * @return {PromiseLike<Object>} - Array of section definitions
 */
const playSegment = curry((animInstance, segment) => {
  if (!segment || !segment.frames) return Promise.resolve();

  haltAnim(animInstance);

  return new Promise((resolve) => {
    animInstance.addEventListener('complete', event => {
      haltAnim(animInstance);
      resolve(event);
    }, false);

    animInstance.playSegments(segment.frames, true);
  });
});

const loopSegment = curry((animInstance, segment) => {
  if (!segment || !segment.loopFrames) return;

  haltAnim(animInstance);

  animInstance.playSegments(segment.loopFrames, true);
  animInstance.addEventListener('complete', () => loopSegment(animInstance, segment), false);
});

/**
 * @param {Object} animData - bodymovin animation data
 * @param {Element} container - document element to render animation into
 * @return {Object} - Api for controlling animation segment playback
 */
export const createBodymovinWrapper = curry((animData, container) => {
  const { data, segments } = animData;
  const anim = bodymovin.loadAnimation({
    container,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    animationData: data,
  });
  const { firstFrame, totalFrames } = anim;
  const frames = [firstFrame, totalFrames - firstFrame];
  const allSegment = { frames, loopFrames: frames };
  const animSegments = segments || generateSegments(anim);
  const findSegment = name => find({ name }, animSegments);

  return {
    getSegmentNames: () => map(({ name }) => name, animSegments),
    play: () => playSegment(anim, allSegment),
    loop: () => loopSegment(anim, allSegment),
    playSegment: flow(findSegment, playSegment(anim)),
    loopSegment: flow(findSegment, loopSegment(anim)),
    halt: () => haltAnim(anim),
    destroy: () => {},
  };
});
