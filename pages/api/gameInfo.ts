import { NextApiRequest, NextApiResponse } from 'next'
import {getConnections, getPlaces} from '../../data/getGameInfo'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const result = {
    places: await getPlaces(),
    connections: await getConnections()
  }
  res.status(200).json(result)
}
