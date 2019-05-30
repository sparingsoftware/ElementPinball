const setBackground = (prefab, texture, options) => {
	const elBodySprite = prefab.body.render.sprite
	elBodySprite.texture = `../../assets/${texture}.png`
	Object.assign(elBodySprite, options)
}

export {
	setBackground
}
