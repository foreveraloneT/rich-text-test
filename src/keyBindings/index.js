import { getDefaultKeyBinding } from 'draft-js'

import * as commands from './commands'
import save from './save'
import test from './test'

const combineKeyBindings = (...bindingFns) => (event) => {
  let cmd
  for (let i = 0; i < bindingFns.length; i++) {
    const tmp = bindingFns[i](event)
    if (tmp) {
      cmd = tmp
      break;
    }
  }
  return cmd || getDefaultKeyBinding(event)
}

export default combineKeyBindings(
  save,
  test,
)

export { commands }
