/* eslint-disable global-require */

import { map, zipObject } from 'lodash/fp';

const animationLoader = name =>
  require(`promise?bluebird!./animationData/${name}.json`)();

export async function loadAnimations(names = []) {
  return zipObject(names, await Promise.all(map(animationLoader, names)));
}
