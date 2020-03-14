import { NextApiRequest, NextApiResponse } from 'next'
import {getPlaces} from '../../data/getGameInfo'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const result = {
    places: await getPlaces()
  }
  res.status(200).json(result)
}
