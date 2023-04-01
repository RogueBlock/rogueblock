# RogueBlock 🕵️

RogueBlock is an OSS list of known malicious wallet addresses on Algorand Blockchain. :warning:

## How to contribute 🙌

1. Fork the repository :fork_and_knife:
2. Add the malicious wallet address to the [frauds.ts](common/frauds.ts) file
3. Provide your contribution in the following format:

```json
{
  "address": "{place the malicious wallet address here}",
  "label": "{Place your description of the malicious wallet address here (for example MyAlgo hacker #1)}"
}
```

4. Make a pull request with your changes :rocket:
5. Wait for the review and merge :hourglass:

## How to use the API 🖥️

RogueBlock API allows you to check whether a given wallet address is in the malicious wallets list or not. To use the API, send a GET request to the following endpoint:

```:mag_right: Endpoint
https://rogueblock.xyz/api/scammer-lookup?address={put_wallet_to_check_here}
```

---

The response will be in the following format:

```json
{
"isScammer": Boolean,
}
```
