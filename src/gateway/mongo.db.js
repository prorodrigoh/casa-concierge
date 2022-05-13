import mongodb from 'mongodb'
import {MONGO_URI} from './credentials.js'

const client = new mongodb.MongoClient(MONGO_URI)

export const getDb = async () => {
    await client.connect()
    return client.db('casa-concierge')
}

export const disconnect = async () => {
    await client.close()
    return ('Disconnected!')
}
