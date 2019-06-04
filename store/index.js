const state = () => ({
  score: 0
})

const getters = {
  getCurrentScore (state) {
    return state.score
  }
}

const mutations = {
  setCurrentScore (state, userScore) {
    state.score = userScore
  }
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
