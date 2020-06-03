import { allCountries } from '../static/countries'

export const state = () => ({
  casesByCountry: [],
  historyByCountryFull: [],
  showAllHistory: false,
  historyByCountry: [],
  historyByCountryLoading: false,
  countries: allCountries,
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
  setShowAllHistory(state, boolean) {
    state.showAllHistory = boolean
  },
  setHistoryByCountryLoading(state, boolean) {
    state.historyByCountryLoading = boolean
  },
  setIsMaskUsageImageFetched(state, boolean) {
    state.isMaskUsageImageFetched = boolean
  },
  setCasesByCountry(state, casesByCountry) {
    state.casesByCountry = casesByCountry
  },
  setHistoryByCountry(state, history) {
    let historyByCountry = []

    for (const item in history.result) {
      historyByCountry.push({
        Active: history.result[item].confirmed - (history.result[item].deaths + history.result[item].recovered),
        Date: item
      })
    }

    const newHistoryByCountry = historyByCountry.filter((a, b, c) => c.findIndex((t) => t.Active === a.Active) === b)

    if (newHistoryByCountry.length > 1) {
      historyByCountry = newHistoryByCountry
    }

    // String formatting
    historyByCountry = historyByCountry.map((history) => {
      return {
        Active: history.Active,
        Date: `${new Date(history.Date.replace(/ /g, 'T')).getDate()}/${Number(
          new Date(history.Date.replace(/ /g, 'T')).getMonth()
        ) + 1}/${Number(new Date(history.Date.replace(/ /g, 'T')).getFullYear())}`
      }
    })

    // Reduce to one data point per day
    // if (historyByCountry.length > 6) {
    //   historyByCountry = historyByCountry
    //     .reverse()
    //     .filter((history, index, array) => {
    //       return array.findIndex((historyItem) => historyItem.Date === history.Date) === index
    //     })
    //     .reverse()
    // }

    // Sort by date
    // historyByCountry.sort((a, b) => {
    //   return new Date(convertDigitIn(a.Date)) - new Date(convertDigitIn(b.Date))
    // })

    // function convertDigitIn(str) {
    //   return str
    //     .split('/')
    //     .reverse()
    //     .join('/')
    // }

    // Remove year
    historyByCountry = historyByCountry.map((history) => {
      return {
        Active: history.Active,
        Date: history.Date.slice(0, -5)
      }
    })

    // Filter out non numerical values
    // historyByCountry = historyByCountry.filter((el) => {
    //   return !isNaN(el.Active)
    // })

    state.historyByCountryFull = historyByCountry

    // Reduce array size if over maxLength
    let maxLength = 30

    if (process.client && window.innerWidth >= 768) {
      maxLength = 60
    }

    if (historyByCountry.length > maxLength) {
      historyByCountry = historyByCountry.slice(Math.max(historyByCountry.length - maxLength, 0))
    }

    state.historyByCountry = historyByCountry
  },
  // setHistoryByCountry(state, history) {
  //   let historyByCountry = history

  //   const newHistoryByCountry = historyByCountry.filter((a, b, c) => c.findIndex((t) => t.Active === a.Active) === b)

  //   if (newHistoryByCountry.length > 1) {
  //     historyByCountry = newHistoryByCountry
  //   }

  //   // String formatting
  //   historyByCountry = historyByCountry.map((history) => {
  //     return {
  //       Active: history.Active,
  //       Date: `${new Date(history.Date.replace(/ /g, 'T')).getDate()}/${Number(
  //         new Date(history.Date.replace(/ /g, 'T')).getMonth()
  //       ) + 1}/${Number(new Date(history.Date.replace(/ /g, 'T')).getFullYear())}`
  //     }
  //   })

  //   // Reduce to one data point per day
  //   // if (historyByCountry.length > 6) {
  //   //   historyByCountry = historyByCountry
  //   //     .reverse()
  //   //     .filter((history, index, array) => {
  //   //       return array.findIndex((historyItem) => historyItem.Date === history.Date) === index
  //   //     })
  //   //     .reverse()
  //   // }

  //   // Sort by date
  //   // historyByCountry.sort((a, b) => {
  //   //   return new Date(convertDigitIn(a.Date)) - new Date(convertDigitIn(b.Date))
  //   // })

  //   // function convertDigitIn(str) {
  //   //   return str
  //   //     .split('/')
  //   //     .reverse()
  //   //     .join('/')
  //   // }

  //   // Remove year
  //   historyByCountry = historyByCountry.map((history) => {
  //     return {
  //       Active: history.Active,
  //       Date: history.Date.slice(0, -5)
  //     }
  //   })

  //   // Filter out non numerical values
  //   // historyByCountry = historyByCountry.filter((el) => {
  //   //   return !isNaN(el.Active)
  //   // })

  //   state.historyByCountryFull = historyByCountry

  //   // Reduce array size if over maxLength
  //   let maxLength = 30

  //   if (process.client && window.innerWidth >= 768) {
  //     maxLength = 60
  //   }

  //   if (historyByCountry.length > maxLength) {
  //     historyByCountry = historyByCountry.slice(Math.max(historyByCountry.length - maxLength, 0))
  //   }

  //   state.historyByCountry = historyByCountry
  // },
  // setHistoryByCountry(state, history) {
  //   let historyByCountry = history

  //   const newHistoryByCountry = historyByCountry.filter(
  //     (a, b, c) => c.findIndex((t) => t.active_cases === a.active_cases) === b
  //   )

  //   if (newHistoryByCountry.length > 1) {
  //     historyByCountry = newHistoryByCountry
  //   }

  //   // String formatting
  //   historyByCountry = historyByCountry.map((history) => {
  //     return {
  //       active_cases: history.active_cases.split(',').join(''),
  //       record_date: `${new Date(history.record_date.replace(/ /g, 'T')).getDate()}/${Number(
  //         new Date(history.record_date.replace(/ /g, 'T')).getMonth()
  //       ) + 1}/${Number(new Date(history.record_date.replace(/ /g, 'T')).getFullYear())}`
  //     }
  //   })

  //   // Reduce to one data point per day
  //   if (historyByCountry.length > 6) {
  //     historyByCountry = historyByCountry
  //       .reverse()
  //       .filter((a, b, c) => c.findIndex((t) => t.record_date === a.record_date) === b)
  //       .reverse()
  //   }

  //   // Sort by date
  //   historyByCountry.sort((a, b) => {
  //     return new Date(convertDigitIn(a.record_date)) - new Date(convertDigitIn(b.record_date))
  //   })

  //   function convertDigitIn(str) {
  //     return str
  //       .split('/')
  //       .reverse()
  //       .join('/')
  //   }

  //   // Remove year
  //   historyByCountry = historyByCountry.map((history) => {
  //     return {
  //       active_cases: history.active_cases,
  //       record_date: history.record_date.slice(0, -5)
  //     }
  //   })

  //   // Filter out non numerical values
  //   historyByCountry = historyByCountry.filter((el) => {
  //     return !isNaN(el.active_cases)
  //   })

  //   state.historyByCountryFull = historyByCountry

  //   // Reduce array size if over maxLength
  //   let maxLength = 30

  //   if (process.client && window.innerWidth >= 768) {
  //     maxLength = 60
  //   }

  //   if (historyByCountry.length > maxLength) {
  //     historyByCountry = historyByCountry.slice(Math.max(historyByCountry.length - maxLength, 0))
  //   }

  //   state.historyByCountry = historyByCountry
  // },
  setCountries(state, countries) {
    state.countries = countries
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
      .filter((a, b, c) => c.findIndex((t) => t.Date === a.Date) === b)
      .reverse()
    if (filteredDuplicateDates.length > 1) {
      const secondLastValue = Number(filteredDuplicateDates[filteredDuplicateDates.length - 2].Active)
      const lastValue = Number(filteredDuplicateDates[filteredDuplicateDates.length - 1].Active)
      let percentChange = (100 - (secondLastValue * 100) / lastValue).toFixed(1)
      percentChange = (percentChange < 0 ? '' : '+') + percentChange
      state.percentageChange = percentChange
    } else {
      state.percentageChange = 0
    }
  },
  // setPercentageChange(state) {
  //   const filteredDuplicateDates = [...state.historyByCountry]
  //     .reverse()
  //     .filter((a, b, c) => c.findIndex((t) => t.record_date === a.record_date) === b)
  //     .reverse()
  //   if (filteredDuplicateDates.length > 1) {
  //     const secondLastValue = Number(filteredDuplicateDates[filteredDuplicateDates.length - 2].active_cases)
  //     const lastValue = Number(filteredDuplicateDates[filteredDuplicateDates.length - 1].active_cases)
  //     let percentChange = (100 - (secondLastValue * 100) / lastValue).toFixed(1)
  //     percentChange = (percentChange < 0 ? '' : '+') + percentChange
  //     state.percentageChange = percentChange
  //   } else {
  //     state.percentageChange = 0
  //   }
  // },
  setLatestStatByCountry(state, latestCountryStat) {
    state.latestCountryStat = latestCountryStat
  },
  setWorldTotalStat(state, worldTotalStat) {
    state.worldTotalStat = worldTotalStat
  }
}

export const actions = {
  // fetchCountries(context) {
  //   return this.$axios({
  //     method: 'get',
  //     url: `https://api.covid19api.com/countries`
  //   })
  //     .then((res) => {
  //       if (res.data) {
  //         const filtered = res.data.filter(Boolean) // Remove falsy values
  //         context.commit('setCountries', filtered)
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // },
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
    let isoCode = 'ZAF'

    context.state.countries.forEach((country) => {
      if (country.name === context.state.selectedCountry) {
        isoCode = country['alpha-3']
      }
    })
    return this.$axios({
      method: 'get',
      url: `https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_iso_alpha_3.php?alpha3=${encodeURI(
        isoCode
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
    context.commit('setHistoryByCountryLoading', true)
    let isoCode = 'ZAF'

    context.state.countries.forEach((country) => {
      if (country.name === context.state.selectedCountry) {
        isoCode = country['alpha-3']
      }
    })
    return this.$axios({
      method: 'get',
      url: `https://covidapi.info/api/v1/country/${isoCode}`
    })
      .then((res) => {
        if (res.data) {
          context.commit('setHistoryByCountry', res.data)
          context.commit('setPercentageChange')
          // context.commit('setHistoryByCountryFullRaw', res.data.stat_by_country)
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        context.commit('setHistoryByCountryLoading', false)
      })
  },
  // fetchCasesByCountry(context) {
  //   context.commit('setHistoryByCountryLoading', true)
  //   const slug = 'south-africa'

  //   console.log(countries)
  //   context.state.countries.forEach((country) => {
  //     console.log(context.state.selectedCountry)
  //     console.log(country)
  //     if (country.name === context.state.selectedCountry) {
  //       slug = country.Slug
  //     }
  //   })
  //   return this.$axios({
  //     method: 'get',
  //     url: `https://api.covid19api.com/dayone/country/${slug}`
  //   })
  //     .then((res) => {
  //       console.log(res)
  //       if (res.data) {
  //         context.commit('setHistoryByCountry', res.data)
  //         context.commit('setPercentageChange')
  //         // context.commit('setHistoryByCountryFullRaw', res.data.stat_by_country)
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  //     .finally(() => {
  //       context.commit('setHistoryByCountryLoading', false)
  //     })
  // },
  // fetchCasesByCountry(context) {
  //   context.commit('setHistoryByCountryLoading', true)
  //   return this.$axios({
  //     method: 'get',
  //     url: `https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php?country=${encodeURI(
  //       context.state.selectedCountry
  //     )}`,
  //     headers: {
  //       'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
  //       'x-rapidapi-key': process.env.COVID_19_STATS_API_KEY
  //     }
  //   })
  //     .then((res) => {
  //       if (res.data && res.data.stat_by_country) {
  //         context.commit('setHistoryByCountry', res.data.stat_by_country)
  //         context.commit('setPercentageChange')
  //         // context.commit('setHistoryByCountryFullRaw', res.data.stat_by_country)
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  //     .finally(() => {
  //       context.commit('setHistoryByCountryLoading', false)
  //     })
  // },
  // fetchAffectedCountries(context) {
  //   this.$axios({
  //     method: 'get',
  //     url: 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/affected.php',
  //     headers: {
  //       'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
  //       'x-rapidapi-key': process.env.COVID_19_STATS_API_KEY
  //     }
  //   })
  //     .then((res) => {
  //       if (res.data && res.data.affected_countries) {
  //         const filtered = res.data.affected_countries.filter(Boolean) // Remove falsy values
  //         context.commit('setAffectedCountries', filtered)
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // },
  fetchRandomMaskUsageInstructions(context) {
    // if (!context.state.isMaskUsageImageFetched) {
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
    // context.commit('setIsMaskUsageImageFetched', true)
    // }
  }
}
