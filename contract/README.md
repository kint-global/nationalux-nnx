# NNX Smart Contract Reference

## Canonical Deployment

- Network: Ethereum Mainnet (`chainId: 1`)
- Standard: ERC-20
- Symbol: NNX
- Decimals: 18
- Contract: `0x1a5a018A46Cd4C5C4E04464C44f74B3B10C01DbE`
- Deployment: **January 29, 2020, 00:13:20 UTC**
- Creation transaction: `0xd029226b87f20d28a11f2cd65aea29972ad6201fd097ba54dec93b717ab73710`

## Current Documented Authority

Administrative / creator address:
`0x0d42b0e471C0A702dfe12417e2354cc9F1680A09`

- Minter: **YES**
- Pauser: **YES**

Principal treasury address:
`0xe3621488A974FCA5d39F9e72Afb738F04255412A`

- Minter: **NO**
- Pauser: **NO**

These roles can be checked against Ethereum Mainnet with:

```bash
npm install
npm run verify:state
```

No additional issuance is currently scheduled. Existing treasury holdings are intended to be used before additional issuance is considered. Material future issuance is subject to formal Nationalux approval and prior public disclosure.

## Administrative Security Roadmap

The administrative EOA remains the current authoritative role holder. Nationalux intends to evaluate a Safe-compatible multi-signature transition after role-transfer mechanics, signer responsibilities, recovery procedures and incident-response processes are finalized. A potential 3-of-5 configuration is a roadmap target only; it must not be described as deployed until the role transfer is verifiable on-chain.

## Treasury Security Roadmap

Nationalux intends to evaluate verifiable time-lock or vesting controls for material ecosystem, partner, liquidity or reserve allocations when those distributions are formally approved. No unimplemented vesting schedule is represented here as current on-chain fact.

## Source Status

The original Solidity source code from the historical 2020 deployment is not currently available in this repository and is **not represented as verified source**.

Do not add a reconstructed `NNX.sol` and label it as the original contract unless a reproducible build demonstrates that the relevant compiled bytecode matches the historical deployment.

## ABI Status

`ABI.json` is a conservative public integration interface for known ERC-20 and observed administrative functions. It is not represented as an ABI generated from verified historical Solidity source.

## Canonical Bytecode

The authoritative deployed bytecode is the bytecode returned by Ethereum Mainnet for the contract address. `scripts/verify-state.js` confirms that bytecode is present. This repository intentionally avoids publishing fabricated historical source or claiming unverifiable provenance.
