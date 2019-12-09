import { KeyBindingUtil } from 'draft-js';
import { TEST } from './commands';

export default (event) => {
  if (event.keyCode === 75 && KeyBindingUtil.hasCommandModifier(event)) {
    return TEST;
  }
  return false;
}
