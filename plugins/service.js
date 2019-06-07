const createService = (axios, store, error) => {
  const catchHttpErrors = httpErr => {
    error({ statusCode: httpErr.response && httpErr.response.status })
  }

  const http = {
    post: (...args) => axios.$post(...args),
    patch: (...args) => axios.$patch(...args),
    get: (...args) => axios.$get(...args).catch(catchHttpErrors)
  }

  return {
    rank: {
      all: () => http.get('/ranking_all', { useCache: true }),
      score: (userName) => http.get(`/ranking_user?user=${userName}`, { useCache: true }),
      clear: () => http.post('/clear_scores')
    },
    score: {
      add: userData => http.post('/add_score', userData),
      addTemp: (userScore) => http.post('/add_temp_score', userScore),
      getTemp: (scoreId) => http.get(`/get_temp_score?scoreId=${scoreId}`)
    },
    user: {
      validate: userName => http.get(`/validate_user?user=${userName}`, { useCache: true })
    }
  }
}

export default ({ app, store, error }, inject) => {
  inject('service', createService(app.$axios, store, error))
}
