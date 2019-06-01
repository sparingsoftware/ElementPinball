import { cacheAdapterEnhancer } from 'axios-extensions'
import LRUCache from 'lru-cache'
const TEN_MINUTES = 1000 * 60 * 10

const defaultCache = new LRUCache({ maxAge: TEN_MINUTES })

export default function ({ $axios }) {
  const defaults = $axios.defaults
  // https://github.com/kuitos/axios-extensions
  defaults.adapter = cacheAdapterEnhancer(defaults.adapter, {
    enabledByDefault: false,
    cacheFlag: 'useCache',
    defaultCache
  })
}
