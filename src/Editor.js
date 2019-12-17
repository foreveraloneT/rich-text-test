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

const Editor = ({
  onChange,
}) => {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty(decorator))
  const [title, setTitle] = React.useState('')
  const [toolBarInfo, setToolBarInfo] = React.useState({
    top: 0,
    left: 0,
    width: 0,
  })
  const [isShowToolBar, setIsShowToolBar] = React.useState(false)
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
    const selection = newEditorState.getSelection()
    const nativeSelection = window.getSelection()

    // console.log(selection)
    // console.log('startKey', selection.getStartKey())
    // console.log('startOffset', selection.getStartOffset())
    // console.log('endKey', selection.getEndKey())
    // console.log('endOffset', selection.getEndOffset())
    console.log('isCollapsed', selection.isCollapsed()); // show text is selected
    if (!selection.isCollapsed() && nativeSelection.rangeCount > 0) {
      const range = nativeSelection.getRangeAt(0);
      const { top, left, width } = range.getBoundingClientRect();
      setToolBarInfo({
        top,
        left,
        width,
      })
      setTimeout(setIsShowToolBar.bind(null, true))
    } else {
      setIsShowToolBar(false)
    }

    setEditorState(newEditorState)
    if (typeof onChange === 'function') {
      onChange({
        title: currentTitle || title,
        editorState: newEditorState,
      })
    }
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
      {
        isShowToolBar && (
          <div
            className="test"
            style={{
              top: toolBarInfo.top,
              left: toolBarInfo.left + toolBarInfo.width / 2
            }}
          />
        )
      }
    </div>
  )
}

const baseFontSize = '24px';
const placeholderColor = '#999';

const style = css`
  /* position: relative; */

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

  .plus-button {
    cursor: pointer;
    position: absolute;
    bottom: 0;
    left: -10px;
    transform: translateX(-100%);
    border: 1px solid black;
    border-radius: 50%;
    font-size: 20px;
    width: 30px;
    height: 30px;
    background-color: transparent;

    &:focus {
      outline: none;
    }
  }

  .test {
    position: absolute;
    width: 250px;
    height: 40px;
    background-color: grey;
    transform: translate(-50%, -40px);
    transition: all .2s ease-out;
  }
`

export default Editor
