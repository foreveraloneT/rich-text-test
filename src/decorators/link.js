import React from 'react'
import { css } from '@emotion/core'

const linkCss = css`
  cursor: pointer;
  color: blue;
  &:hover {
    text-decoration:  underline;
  }
`

const Link = ({
  contentState,
  entityKey,
  children,
}) => {
  const { url } = contentState.getEntity(entityKey).getData()
  const openLink = () => {
    window.open(url, '_blank');
  }
  return (
    <span
      css={linkCss}
      onClick={openLink}
    >
      {children}
    </span>  
  )
}

const findLinkStrategy = (contentBlock, callback, contentState) => {
  console.log('hi');
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      )
    },
    callback,
  )
}

const decorator = {
  strategy: findLinkStrategy,
  component: Link,
}

export default decorator;
