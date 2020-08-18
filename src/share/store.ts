import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import createPersistedState from "vuex-persistedstate";
import { changePageColor } from './utils';

export default new Vuex.Store({
  state: {
    bgColor: '#1CA085'
  },
  mutations: {
    CHANGE_BACKGROUND_COLOR(state, color) {
      changePageColor(color)
      state.bgColor = color
    }
  },
  plugins: [
    createPersistedState()
  ]
})