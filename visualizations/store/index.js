export const state = () => ({
  globalScroll: 0,
  globalStep: 0,
  scrollyTellingStatus: true,
  isMobile: false
})

export const mutations = {
  updateGlobalScroll (state, scroll) {
    // console.log('scroll', scroll)
    state.globalScroll = scroll
  },
  updateGlobalStep (state, step) {
    state.globalStep = step
    // console.log('step', state.globalStep)
  },
  UpdatescrollyTellingStatus (state, scrollyStatus) {
    state.scrollyTellingStatus = scrollyStatus
  },
  updateViewportStatus (state, mobile) {
    state.isMobile = mobile
  }
}
