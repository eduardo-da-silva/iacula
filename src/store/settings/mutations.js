const updateInterval = (state, interval) => {
    state.interval = interval
}

const updateShowTime = (state, showTime) => {
    state.showTime = showTime
}


export default {
    updateInterval,
    updateShowTime
}