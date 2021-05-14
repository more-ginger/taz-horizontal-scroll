export const state = () => ({
  globalScroll: 0,
  globalStep: 0
})

export const mutations = {
  updateGlobalScroll (state, scroll) {
    // console.log('scroll', scroll)
    state.globalScroll = scroll
  },
  updateGlobalStep (state, step) {
    state.globalStep = step
    // console.log('step', state.globalStep)
  }
}
