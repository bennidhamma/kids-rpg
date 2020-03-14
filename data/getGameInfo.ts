import Airtable from 'airtable'
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
    Name: string
    Title: string
    Description: string
    Picture?: any
    "Random Encounter Level"?: number
    Enemy?: string[],
}

export interface Connection {
    Name: string,
    From: string[],
    To: string[],
    Description: string
    Test: Test
}

const places = base('Places')
const connections = base('Connections')

export const getPlaces = async () => {
    let ret: Place[] = []
    await places.select({
        view: 'Grid view'
    }).eachPage((records, fetchNextPage) => {
        ret = [...ret, ...records.map(r => r.fields as Place)]
        fetchNextPage()
    })
    return ret
}

export const getConnections = async () => {
    let ret: Connection[] = []
    await connections.select({
        view: 'Grid view'
    }).eachPage((records, fetchNextPage) => {
        ret = [...ret, ...records.map(r => r.fields as Connection)]
        fetchNextPage()
    })
    return ret
}
