/* eslint-disable global-require, import/no-dynamic-require */
/* global require */
import { map, mapValues, zipObject } from 'lodash/fp';

const animationLoader = name =>
  require(`promise?bluebird!./animationData/${name}.json`)();

export async function loadAnimations(names = [], loader = animationLoader) {
  return mapValues(
    data => ({ data, segments: {} }),
    zipObject(names, await Promise.all(map(loader, names)))
  );
}
