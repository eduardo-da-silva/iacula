import Datastore from 'nedb-async'
import path from 'path'
import { remote } from 'electron'

const dbFactory = file =>
    new Datastore({
        filename: `${path.join(remote.app.getPath('userData'))}/data/${file}`,
        autoload: true
    })

const db = {
    config: dbFactory('config.db')
}

export default db