# NNX Integration SDK — Minimal Public Example

This directory contains small, executable integration examples. It is intentionally limited to functionality that can be demonstrated today.

## Included

- Read the canonical NNX Ethereum contract through `ethers`.
- Generate a deterministic SHA-256 reference for dataset metadata.

## Not represented as deployed

This SDK does **not** claim that IPFS/Arweave storage, escrow, EIP-712 machine payments, TEE/ZK verification, or autonomous-agent settlement are currently deployed production modules. Those items remain part of the technical roadmap until separate code, security testing and deployment references are published.

## Run

From the repository root:

```bash
npm install
node sdk/examples/read-token.js
node sdk/examples/hash-metadata.js
```

Set `ETH_RPC_URL` to use your own Ethereum Mainnet RPC endpoint.
