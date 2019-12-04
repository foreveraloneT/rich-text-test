import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, Modifier, convertToRaw } from 'draft-js';
import { css } from '@emotion/core'

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
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const handleKeyCmd = (cmd, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, cmd)
    if (newState) {
      onChange(newState)
      return 'handled';
    }
    return 'not-handled'
  }

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
    console.log('wtd')
    setEditorState(editorState)
  }

  const logContent = () => {
    console.log('content', convertToRaw(editorState.getCurrentContent()));
  }

  return (
    <div css={appCss}>
      <h1>Title</h1>
      <div css={toolBar}>
        <b onClick={handleClickBold}>B</b>
        <div onClick={handleClickLink}>LINK</div>
        <div onClick={logContent}>LOG</div>
      </div>
      <Editor
        editorState={editorState}
        onChange={onChange}
        handleKeyCommand={handleKeyCmd}
      />
    </div>
  )
}

export default App
