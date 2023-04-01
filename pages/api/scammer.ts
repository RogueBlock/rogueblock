import { NextApiRequest, NextApiResponse } from 'next'
import { fraudWallets } from 'common/frauds'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query

  if (typeof address !== 'string') {
    return res.status(400).json({ error: 'Invalid address' })
  }

  const isScammer = fraudWallets.some((wallet) => wallet.address === address)

  if (!isScammer) {
    return res.status(404).json({ error: 'Not found' })
  }

  res.status(200).json({ isScammer })
}
