export const state = () => ({
  casesByCountry: [],
  historyByCountry: [],
  affectedCountries: [],
  selectedCountry: 'South Africa',
  maskUsageImage: null
})

export const mutations = {
  setCasesByCountry(state, casesByCountry) {
    state.casesByCountry = casesByCountry
  },
  setHistoryByCountry(state, historyByCountry) {
    historyByCountry = historyByCountry.filter(
      (a, b, c) => c.findIndex((t) => t.total_cases === a.total_cases) === b
    )

    historyByCountry = historyByCountry.map((history) => {
      return {
        total_cases: history.total_cases,
        record_date: `${new Date(history.record_date).getDate()}/${new Date(
          history.record_date
        ).getMonth() + 1} `
      }
    })

    if (historyByCountry.length > 10) {
      historyByCountry = historyByCountry.filter(
        (a, b, c) => c.findIndex((t) => t.record_date === a.record_date) === b
      )
    }
    state.historyByCountry = historyByCountry
  },
  setAffectedCountries(state, affectedCountries) {
    state.affectedCountries = affectedCountries
  },
  setSelectedCountry(state, selectedCountry) {
    state.selectedCountry = selectedCountry
  },
  setMaskUsageImage(state, image) {
    state.maskUsageImage = image
  }
}

export const actions = {
  fetchCasesByCountry(context) {
    this.$axios({
      method: 'get',
      url: `https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php?country=${encodeURI(
        context.state.selectedCountry
      )}`,
      headers: {
        'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
        'x-rapidapi-key': process.env.COVID_19_STATS_API_KEY
      }
    })
      .then((res) => {
        if (res.data) {
          context.commit('setHistoryByCountry', res.data.stat_by_country)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  fetchAffectedCountries(context) {
    this.$axios({
      method: 'get',
      url:
        'https://coronavirus-monitor.p.rapidapi.com/coronavirus/affected.php',
      headers: {
        'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
        'x-rapidapi-key': process.env.COVID_19_STATS_API_KEY
      }
    })
      .then((res) => {
        if (res.data) {
          context.commit('setAffectedCountries', res.data.affected_countries)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  fetchRandomMaskUsageInstructions(context) {
    this.$axios({
      responseType: 'blob',
      method: 'get',
      url: 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/masks.php',
      headers: {
        'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
        'x-rapidapi-key': process.env.COVID_19_STATS_API_KEY
      }
    })
      .then((res) => {
        function blobToDataUrl(blob) {
          return new Promise((resolve) => {
            const reader = new FileReader() // https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications
            reader.onload = (e) => resolve(e.target.result)
            reader.readAsDataURL(blob)
          })
        }

        blobToDataUrl(res.data).then((url) => {
          context.commit('setMaskUsageImage', url)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
