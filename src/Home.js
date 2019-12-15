import React from 'react'
import { css } from '@emotion/core'

import Editor from './Editor'

const Home = () => {
  return (
    <div css={style}>
      <Editor />
    </div>
  );
}

const style = css`
  padding: 50px 100px;
`

export default Home
