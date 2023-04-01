import { useAsync } from 'react-use'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { fraudWallets } from 'common/frauds'
import { useMemo, useState } from 'react'
import { ellipseAddress } from 'common/utils'

const fetchAccountData = async () => {
  const accountData = await Promise.all(
    fraudWallets.map(async (wallet) => {
      const accountResponse = await fetch(
        `https://mainnet-api.algonode.cloud/v2/accounts/${wallet.address}`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const accountData = await accountResponse.json()

      const transactionResponse = await fetch(
        `https://mainnet-idx.algonode.cloud/v2/accounts/${wallet.address}/transactions?limit=1`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const transactionData = await transactionResponse.json()
      console.log(transactionData)
      const roundTime = transactionData.transactions[0]['round-time']

      const minutesSinceLastActivity = Math.floor(
        (Date.now() / 1000 - roundTime) / 60
      )
      const daysSinceLastActivity = Math.floor(minutesSinceLastActivity / 1440)
      const secondsSinceLastActivity = Math.floor(Date.now() / 1000 - roundTime)

      let lastActive
      if (daysSinceLastActivity > 0) {
        lastActive = `${daysSinceLastActivity} day${
          daysSinceLastActivity > 1 ? 's' : ''
        } ago`
      } else if (minutesSinceLastActivity > 0) {
        lastActive = `${minutesSinceLastActivity} minute${
          minutesSinceLastActivity > 1 ? 's' : ''
        } ago`
      } else {
        lastActive = `${secondsSinceLastActivity} second${
          secondsSinceLastActivity > 1 ? 's' : ''
        } ago`
      }

      return { ...accountData, label: wallet.label, lastActive }
    })
  )
  return accountData
}

const columns = [
  { key: 'address', label: 'Address' },
  { key: 'label', label: 'Label' },
  { key: 'amount', label: 'Amount (Algo)' },
  { key: 'lastActive', label: 'Last Active' },
  { key: 'track_activity', label: 'Activity' }
]

export default function Home() {
  const { loading, error, value: accounts } = useAsync(fetchAccountData, [])
  const [searchValue, setSearchValue] = useState('')

  const filteredAccounts = useMemo(() => {
    if (!accounts) return []

    if (searchValue && searchValue.length > 0) {
      return accounts.filter((account) =>
        account.address.toLowerCase().includes(searchValue.toLowerCase())
      )
    }

    return accounts
  }, [accounts, searchValue])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div
      className="card card-compact max-w-3xl mx-auto pl-2 pr-2"
      style={{ height: 'calc(100vh - 60px)' }}
    >
      <div className="flex justify-center mb-4">
        <div className="relative w-full">
          <input
            type="text "
            className="input input-bordered w-full"
            placeholder="Search by wallet address..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-4">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
      </div>

      {searchValue && filteredAccounts.length === 0 ? (
        <div className="text-center">
          This wallet isn't listed in the open source scammer wallet list.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table mx-auto table-compact w-full ">
            <thead>
              <tr>
                <th></th>
                {columns.map((column) => (
                  <th key={column.key}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account, index) => (
                <tr key={account.address}>
                  <th className="text-center">{index + 1}</th>
                  <td className="text-center">
                    {ellipseAddress(account.address, 6)}
                  </td>
                  <td className="text-center">{account.label}</td>
                  <td className="text-center">{account.amount / 1e6} Algo</td>
                  <td className="text-center">{account.lastActive}</td>
                  <td className="text-center">
                    <a
                      href={`https://algoexplorer.io/address/${account.address}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className=""
                    >
                      <FontAwesomeIcon size="lg" icon={faSearch} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
