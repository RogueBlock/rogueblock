import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <div className="pt-5">
        <div className="text-yellow-300 font-bold text-xl">RogueBlock </div>
      </div>

      <div className="mt-5 mb-5 text-left  ">
        <h3>
          Open source list of community reported frauds and scam wallets on
          Algorand blockchain.
          <br />
          Contribute on{' '}
          <Link
            href="https://github.com/aorumbayev/rougeblock"
            target={'_blank'}
            style={{ textDecoration: 'none' }}
            rel="noopener noreferrer"
          >
            GitHub.
          </Link>{' '}
        </h3>
      </div>
    </header>
  )
}
