import React from 'react'
import { css } from '@emotion/core'
import classNames from 'classnames'

const InlineToolBar = ({
  editorState,
  onAddInLineStyle,
}) => {
  const selection = editorState.getSelection()
  const nativeSelection = window.getSelection()

  const addInLineStyle = style => (e) => {
    onAddInLineStyle(style)
  }

  const keepRange = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  if (!selection.isCollapsed() && nativeSelection.rangeCount > 0) {
    const range = nativeSelection.getRangeAt(0);
    const { top, left, width } = range.getBoundingClientRect();
    if (!(top || left || width)) return null

    const styleSet = editorState.getCurrentInlineStyle()
    return (
      <div
        css={style}
        style={{
          top,
          left: left + width / 2
        }}
        onMouseDown={keepRange}
      >
        <div
          className={classNames(['tool-item', { 'tool-item--active': styleSet.has('BOLD') }])}
          onClick={addInLineStyle('BOLD')}
        >
          B
        </div>
        <div
          className={classNames(['tool-item', { 'tool-item--active': styleSet.has('ITALIC') }])}
          onClick={addInLineStyle('ITALIC')}
        >
          I
        </div>
      </div>
    )
  }
  return null;
}

const backgroundColor = '#111';
const pointerSize = 6;

const style = css`
  position: absolute;
  width: 250px;
  background-color: ${backgroundColor};
  transform: translate(-50%, -50px);
  transition: all .2s ease-out;
  border-radius: 10px;
  opacity: 0.95;
  padding: 0 12px;

  &::after {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border: ${pointerSize}px solid transparent;
    border-top-color: ${backgroundColor};
    border-bottom: none;
    margin-bottom: ${-pointerSize}px;
  }

  .tool-item {
    display: inline-block;
    cursor: pointer;
    font-size: 24px;
    padding: 4px 8px;
    color: white;

    &::first-child {
      padding-left: 0;
    }

    &::last-child {
      padding-right: 0;
    }

    &:hover, &--active {
      color: red;
    }
  }
`

export default InlineToolBar
