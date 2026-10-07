# Verification Guide

## Requirements

- Node.js 18 or newer
- Internet access to an Ethereum Mainnet JSON-RPC endpoint

## Run

```bash
npm install
npm run verify:state
npm test
```

Optionally use a private or institutional RPC endpoint:

```bash
ETH_RPC_URL=https://your-mainnet-rpc.example npm run verify:state
```

On Windows PowerShell:

```powershell
$env:ETH_RPC_URL="https://your-mainnet-rpc.example"
npm run verify:state
```

## What is checked

The script performs read-only calls. It does not request a wallet, private key or transaction signature.

- Ethereum chain ID is `1`.
- Bytecode exists at the canonical NNX contract address.
- Token name, symbol, decimals and total supply.
- Current pause state.
- Principal treasury token balance.
- `isMinter(address)` and `isPauser(address)` role state for the documented administrative and treasury addresses.

## Historical source limitation

This process verifies live deployed state. It does not prove historical Solidity source provenance. Source verification remains separate until an original or reproducibly matching source package is available.


## Deployed bytecode artifact

The repository includes `contract/DEPLOYED_BYTECODE.txt`, containing the canonical deployed EVM runtime bytecode captured from the NNX contract view for technical inspection and reproducibility.

Etherscan Similar Contracts Search reports one exact bytecode match:

- Exact-match contract: `0xED8E3d54abc8E4a55d320FFfa5A3E9963f3Ea8a6`
- Reported creator: `0x0d42b0e471C0A702dfe12417e2354cc9F1680A09`
- Similarity: `exact`

The exact-match contract is also unverified as Solidity source. Accordingly, this evidence confirms bytecode equivalence as reported by Etherscan, but does not establish original Solidity source provenance.
