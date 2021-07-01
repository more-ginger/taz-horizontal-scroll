export const state = () => ({
  globalScroll: 0,
  globalStep: 0,
  scrollyTellingStatus: true,
  isMobile: false,
  activeSubRegions: [
    ['Western Asia', 'Northern Africa'], // 1
    ['India'], // 2
    [
      'Tanzania',
      'Uganda',
      'Rwanda',
      'Burundi',
      'Democratic Republic of the Congo',
      'Kenya',
      'Ethiopia',
      'Eritrea',
      'Sudan',
      'South Sudan',
      'Egypt'
    ], // 3
    ['Bolivia', 'Colombia'] // 4
  ]
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
