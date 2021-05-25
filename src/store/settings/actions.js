import config from '@/config'

const updateInterval = ({ commit }, interval) => {
    config.set('interval', interval)
    commit('updateInterval', interval)
}

const updateShowTime = ({ commit }, showTime) => {
    config.set('showTime', showTime)
    commit('updateShowTime', showTime)
}

export default {
    updateInterval,
    updateShowTime
}