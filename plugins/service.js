const createService = (axios, store, error) => {
  // const catchHttpErrors = httpErr => {
  //   error({ statusCode: httpErr.response && httpErr.response.status })
  // }

  // const http = {
  //   post: (...args) => axios.$post(...args),
  //   patch: (...args) => axios.$patch(...args),
  //   get: (...args) => axios.$get(...args).catch(catchHttpErrors)
  // }

  return {
    // article: {
    //   bySlug: slug => http.get(`/public/articles/${slug}/`),
    //   underlineAnchors: slug => http.get(`/public/articles/${slug}/underline_anchors/`)
    // },
    // menu: {
    //   main: () => http.get('/public/menu/main/', { useCache: true }),
    //   footer: () => http.get('public/menu/footer/', { useCache: true })
    // },
    // newsletter: form => http.post('/public/newsletter/subscribe/', form)
  }
}

export default ({ app, store, error }, inject) => {
  inject('service', createService(app.$axios, store, error))
}
