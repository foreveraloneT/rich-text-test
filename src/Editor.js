import React from 'react'
import {
  Editor as DraftEditor,
  EditorState,
  RichUtils,
  Modifier,
  convertToRaw,
} from 'draft-js'
import { css } from '@emotion/core'
import decorator from './decorators'
import blockStyleFn from './blockStyling'
import InlineToolBar from './components/InlineToolBar'

const Editor = ({
  onChange,
}) => {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty(decorator))
  const [title, setTitle] = React.useState('')
  const editorRef = React.useRef(null)
  const titleRef = React.useRef(null)

  React.useEffect(() => {
    titleRef.current.focus()
  }, [])

  // getter
  // const getLastBlockTextLength = () => editorState.getCurrentContent().getLastBlock().getText().length

  // method
  const focusEditor = () => {
    editorRef.current.focus()
  }

  const onTitleChange = (e) => {
    const title = e.target.value
    setTitle(title)
    onEditorChange(editorState, title)
  }

  const onEnterTitle = (e) => {
    if (e.keyCode === 13) {
      focusEditor()
    }
  }

  const onEditorChange = (newEditorState, currentTitle) => {
    setEditorState(newEditorState)
    if (typeof onChange === 'function') {
      onChange({
        title: currentTitle || title,
        editorState: newEditorState,
      })
    }
  }

  const onAddInLineStyle = (inlineStyle) => {
    onEditorChange(RichUtils.toggleInlineStyle(editorState, inlineStyle))
  }

  return (
    <div css={style}>
      <input
        ref={titleRef}
        className="editor-title"
        placeholder="Title"
        value={title}
        onChange={onTitleChange}
        onKeyUp={onEnterTitle}
      />
      <DraftEditor
        ref={editorRef}
        className="editor-story"
        placeholder="Tell your story..."
        editorState={editorState}
        blockStyleFn={blockStyleFn}
        onChange={onEditorChange}
        // stripPastedStyles={true}
      />
      <InlineToolBar
        editorState={editorState}
        onAddInLineStyle={onAddInLineStyle}
      />
    </div>
  )
}

const baseFontSize = '24px';
const placeholderColor = '#999';

const style = css`
  .editor-title {
    font-size: 42px;
    font-weight: bold;
    border: none;
    margin-bottom: 16px;

    &::placeholder {
      color: ${placeholderColor};
    }
    
    &:focus {
      outline: none;
    }
  }

  .custom {
    &-unstyled {
      font-size: ${baseFontSize};
      margin-bottom: 24px;
    }
  }

  .DraftEditor-root > .public-DraftEditorPlaceholder-root {
    color: ${placeholderColor};
    position: absolute;
    pointer-events: none;
    font-size: ${baseFontSize};
  }
`

export default Editor
