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
