import { createStore } from 'vuex'
import modules from "../store/modules"

export default createStore({
  modules,
  state: {},
  mutations: {},
  actions: {},
  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
  strict: process.env.NODE_ENV !== "production"
})
