import React from 'react';
import { Editor, EditorState, RichUtils, Modifier, convertToRaw } from 'draft-js';
import { css } from '@emotion/core'
import decorator from './decorators'
import keyBindingFn, { commands } from './keyBindings'

const appCss = css`
  padding: 50px;
`

const toolBar = css`
  display: flex;
  padding: 10px 0px;

  & > * {
    cursor: pointer;
    margin-right: 5px;
    &:hover {
      text-decoration: underline;
    }
  }
`

const App = () => {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty(decorator))
  const editorRef = React.useRef(null);

  const handleClickBold = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
  }

  const handleClickLink = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url: 'http://www.zombo.com' }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const contentStateWithLink = Modifier.applyEntity(
      contentStateWithEntity,
      editorState.getSelection(),
      entityKey
    )
    const newContentState = EditorState.push(editorState, contentStateWithLink)
    onChange(newContentState);
  }

  const onChange = (editorState) => {
    setEditorState(editorState)
  }

  const logContent = () => {
    console.log('state', editorState);
    console.log('content', convertToRaw(editorState.getCurrentContent()));
  }

  const handleKeyCmd = (cmd, editorState) => {
    // custom command here
    if (cmd === commands.SAVE) {
      alert('SAVE !!!')
      return 'handled'
    }
    if (cmd === commands.TEST) {
      alert('TEST !!!')
      return 'handled'
    }
    //
    const newState = RichUtils.handleKeyCommand(editorState, cmd)
    if (newState) {
      onChange(newState)
      return 'handled';
    }
    return 'not-handled'
  }

  React.useEffect(() => {
    editorRef.current.focus()
  }, [])

  return (
    <div css={appCss}>
      <h1>Title</h1>
      <div css={toolBar}>
        <b onClick={handleClickBold}>B</b>
        <div onClick={handleClickLink}>LINK</div>
        <div onClick={logContent}>LOG</div>
      </div>
      <Editor
        ref={editorRef}
        editorState={editorState}
        onChange={onChange}
        handleKeyCommand={handleKeyCmd}
        keyBindingFn={keyBindingFn}
      />
    </div>
  )
}

export default App
