const setBackground = (prefab, texture, options) => {
  const elBodySprite = prefab.body.render.sprite
  elBodySprite.texture = `/img/${texture}.png`
  Object.assign(elBodySprite, options)
}

// matter.js has a built in random range function, but it is deterministic
const customRand = (min, max) => {
  return Math.random() * (max - min) + min
}

export {
  setBackground,
  customRand
}
