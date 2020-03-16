import Airtable from 'airtable'
import cache from 'memory-cache'

var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appI5M2FFteHsHsl7');

export enum Test {
  Climb,
  Search,
  'Pick Lock',
  Charm,
  Intimidate
}

// maybe useful?
export interface Place {
    Id: string
    Name: string
    Title: string
    Description: string
    Picture?: any
    "Random Encounter Level"?: number
    Enemy?: string[],
}

export interface Connection {
    Id: string
    Name: string
    From: string[]
    To: string[]
    Description: string
    Test: Test
}

export interface Enemy {
    Id: string
    Name: string
    'Alive Description': string
    'Dead Description': string
    'Dying Scene'?: string
    Picture?: any
    WS: number
    RS: number
    MS: number
    Health: number
    Damage: number
    Random: boolean
    Level: number
}

const cacheTtlInMS = 30000

export const getPlaces = async () => {
    return getTable<Place>('Places')
}

export const getConnections = async () => {
    return getTable<Connection>('Connections')
}

export const getEnemies = async () => {
    return getTable<Enemy>('Enemies')
}

const getTable = async <T>(tableName: string) => {
    let ret: T[] = []
    var cacheKey = tableName
    const table = base(tableName)
    if (cache.get(cacheKey)) {
        return cache.get(cacheKey)
    }
    await table.select({
        view: 'Grid view'
    }).eachPage((records, fetchNextPage) => {
        ret = [...ret, ...records.map(r => ({...r.fields, Id: r.id} as unknown as T))]
        fetchNextPage()
    })
    cache.put(cacheKey, ret, cacheTtlInMS)
    return ret
}
