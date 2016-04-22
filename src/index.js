import { flow, sample } from 'lodash/fp';
import { friendly } from './util/hello';
import globalStyles from './index.css';

const greet = flow(sample, friendly);
const root = document.createElement('div');
root.classList.add(globalStyles.root);
root.innerHTML = greet(['dude', 'dudette', 'compadre', 'affendi', 'something']);

document.body.appendChild(root);
