export const state = () => ({
  casesByCountry: [],
  historyByCountry: []
})

export const mutations = {
  setCasesByCountry(state, casesByCountry) {
    state.casesByCountry = casesByCountry
  },
  setHistoryByCountry(state, historyByCountry) {
    state.historyByCountry = historyByCountry.filter(
      (a, b, c) => c.findIndex((t) => t.total_cases === a.total_cases) === b
    )
  }
}
