export const state = () => ({
  casesByCountry: [],
  historyByCountry: [],
  affectedCountries: [],
  latestCountryStat: [],
  selectedCountry: 'South Africa',
  maskUsageImage: null,
  percentageChange: null,
  worldTotalStat: null,
  pageHeight: 0,
  isMaskUsageImageFetched: false
})

export const mutations = {
  setIsMaskUsageImageFetched(state, boolean) {
    state.isMaskUsageImageFetched = boolean
  },
  setCasesByCountry(state, casesByCountry) {
    state.casesByCountry = casesByCountry
  },
  setHistoryByCountry(state, historyByCountry) {
    const newHistoryByCountry = historyByCountry.filter(
      (a, b, c) => c.findIndex((t) => t.active_cases === a.active_cases) === b
    )

    if (newHistoryByCountry.length > 1) {
      historyByCountry = newHistoryByCountry
    }

    historyByCountry = historyByCountry.map((history) => {
      return {
        active_cases: history.active_cases.replace(',', ''),
        record_date: `${new Date(history.record_date.replace(/ /g, 'T')).getDate()}/${Number(
          new Date(history.record_date.replace(/ /g, 'T')).getMonth()
        ) + 1} `
      }
    })

    let maxLength = 30

    if (process.client && window.innerWidth >= 768) {
      maxLength = 80
    }

    if (historyByCountry.length > 6) {
      historyByCountry = historyByCountry
        .reverse()
        .filter((a, b, c) => c.findIndex((t) => t.record_date === a.record_date) === b)
        .reverse()
    }

    if (historyByCountry.length > maxLength) {
      historyByCountry = historyByCountry.slice(Math.max(historyByCountry.length - maxLength, 1))
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
  setPageHeight(state, height) {
    state.pageHeight = height
  },
  setPercentageChange(state) {
    const filteredDuplicateDates = [...state.historyByCountry]
      .reverse()
      .filter((a, b, c) => c.findIndex((t) => t.record_date === a.record_date) === b)
      .reverse()
    if (filteredDuplicateDates.length > 1) {
      const secondLastValue = Number(filteredDuplicateDates[filteredDuplicateDates.length - 2].active_cases)
      const lastValue = Number(filteredDuplicateDates[filteredDuplicateDates.length - 1].active_cases)
      let percentChange = (100 - (secondLastValue * 100) / lastValue).toFixed(1)
      percentChange = (percentChange < 0 ? '' : '+') + percentChange
      state.percentageChange = percentChange
    } else {
      state.percentageChange = 0
    }
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
        if (res.data && res.data.latest_stat_by_country) {
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
        if (res.data && res.data.stat_by_country) {
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
        if (res.data && res.data.affected_countries) {
          const filtered = res.data.affected_countries.filter(Boolean) // Remove falsy values
          context.commit('setAffectedCountries', filtered)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  fetchRandomMaskUsageInstructions(context) {
    if (!context.state.isMaskUsageImageFetched) {
      this.$axios({
        responseType: 'blob',
        method: 'get',
        url: 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/random_masks_usage_instructions.php',
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
      context.commit('setIsMaskUsageImageFetched', true)
    }
  }
}
