import db from './index'

class settingsApi {
    async getInterval() {
        try {
            const setting = await db.config.asyncFindOne({ _id: 0 })
            return Promise.resolve(setting === null ? 123000 : 111111)
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export default new settingsApi