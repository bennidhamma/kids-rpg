import Airtable from 'airtable'
var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appI5M2FFteHsHsl7');

// maybe useful?
export interface Place {
    Name: string
    Title: string
    Description: string
    Picture?: any
    "Random Encounter Level"?: number
    Enemy?: string[],
}

const places = base('Places')

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

