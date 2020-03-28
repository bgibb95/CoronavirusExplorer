export const state = () => ({
  casesByCountry: [],
  historyByCountry: [],
  affectedCountries: [],
  latestCountryStat: [],
  selectedCountry: 'South Africa',
  maskUsageImage: null,
  percentageChange: null,
  worldTotalStat: null
})

export const mutations = {
  setCasesByCountry(state, casesByCountry) {
    state.casesByCountry = casesByCountry
  },
  setHistoryByCountry(state, historyByCountry) {
    historyByCountry = historyByCountry.filter(
      (a, b, c) => c.findIndex((t) => t.active_cases === a.active_cases) === b
    )

    historyByCountry = historyByCountry.map((history) => {
      return {
        active_cases: history.active_cases.replace(',', ''),
        record_date: `${new Date(history.record_date.replace(/ /g, 'T')).getDate()}/${Number(
          new Date(history.record_date.replace(/ /g, 'T')).getMonth()
        ) + 1} `
      }
    })

    if (historyByCountry.length > 6) {
      historyByCountry = historyByCountry.filter(
        (a, b, c) => c.findIndex((t) => t.record_date === a.record_date) === b
      )
    }

    if (historyByCountry.length > 6) {
      historyByCountry = historyByCountry.slice(Math.max(historyByCountry.length - 6, 1))
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
  },
  setPercentageChange(state) {
    const secondLastValue = Number(state.historyByCountry[state.historyByCountry.length - 2].active_cases)
    const lastValue = Number(state.historyByCountry[state.historyByCountry.length - 1].active_cases)
    let percentChange = Math.ceil(100 - (secondLastValue * 100) / lastValue)
    percentChange = (percentChange < 0 ? '' : '+') + percentChange
    state.percentageChange = percentChange
  },
  setLatestStatByCountry(state, latestCountryStat) {
    state.latestCountryStat = latestCountryStat
  },
  setWorldTotalStat(state, worldTotalStat) {
    state.worldTotalStat = worldTotalStat
  }
}

export const actions = {
  fetchWorldTotalStat(context) {
    return this.$axios({
      method: 'get',
      url: `https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php`,
      headers: {
        'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
        'x-rapidapi-key': process.env.COVID_19_STATS_API_KEY
      }
    })
      .then((res) => {
        if (res.data) {
          context.commit('setWorldTotalStat', res.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  fetchLatestStatByCountry(context) {
    return this.$axios({
      method: 'get',
      url: `https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=${encodeURI(
        context.state.selectedCountry
      )}`,
      headers: {
        'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
        'x-rapidapi-key': process.env.COVID_19_STATS_API_KEY
      }
    })
      .then((res) => {
        if (res.data) {
          context.commit('setLatestStatByCountry', res.data.latest_stat_by_country)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  fetchCasesByCountry(context) {
    return this.$axios({
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
          context.commit('setPercentageChange')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  fetchAffectedCountries(context) {
    this.$axios({
      method: 'get',
      url: 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/affected.php',
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
            if (process.client) {
              const reader = new FileReader() // https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications
              reader.onload = (e) => resolve(e.target.result)
              reader.readAsDataURL(blob)
            }
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
