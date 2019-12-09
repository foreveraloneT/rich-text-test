import { KeyBindingUtil } from 'draft-js';
import { SAVE } from './commands';

export default (event) => {
  if (event.keyCode === 83 && KeyBindingUtil.hasCommandModifier(event)) {
    return SAVE;
  }
  return false;
}
