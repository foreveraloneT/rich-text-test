const ENABLED_CUSTOM_BLOCK_TYPES = [
  'unstyled'
]

export default (contentBlock) => {
  const type = contentBlock.getType()
  if (ENABLED_CUSTOM_BLOCK_TYPES.includes(type)){
    return `custom-${type}`
  }
}
