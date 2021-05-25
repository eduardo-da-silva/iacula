Date.prototype.getDayOfWeek = function () {
    const days = ["1", "2", "3", "4", "5", "6", "7"]
    return days[this.getDay()]
}