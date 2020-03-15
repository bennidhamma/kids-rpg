import { NextApiRequest, NextApiResponse } from 'next'
import {getConnections, getPlaces} from '../../data/getGameInfo'
import Cors from 'micro-cors'

const cors = Cors({
  allowMethods: ['GET', 'HEAD']
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = {
    places: await getPlaces(),
    connections: await getConnections()
  }
  res.status(200).json(result)
}

export default cors(handler)
