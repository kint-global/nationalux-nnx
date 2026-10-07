# NNX (Nationalux)

Public integration and on-chain verification repository for **NNX (Nationalux)** on Ethereum Mainnet.

> **Repository scope:** This is an integration/verification repository for the already-deployed 2020 NNX contract. It is **not** presented as the original Solidity build repository. The historical Solidity source is not currently available and no reconstructed source is represented as original or verified.

## Quick Start

Requirements: Node.js 18+

```bash
npm install
npm run verify:state
npm test
```

Both commands perform **read-only** Ethereum Mainnet calls. No wallet, private key, seed phrase, or transaction signing is required. Set `ETH_RPC_URL` to your own Ethereum RPC endpoint if desired; otherwise the public endpoint configured by the scripts is used.

## Canonical Contract

| Item | Value |
|---|---|
| Network | Ethereum Mainnet |
| Chain ID | `1` |
| Standard | ERC-20 |
| Symbol | `NNX` |
| Decimals | `18` |
| Contract | `0x1a5a018A46Cd4C5C4E04464C44f74B3B10C01DbE` |
| Deployment | January 29, 2020, 00:13:20 UTC |
| Current documented supply | 9,999,900 NNX |

Explorer: https://etherscan.io/token/0x1a5a018A46Cd4C5C4E04464C44f74B3B10C01DbE

## Read-only Integration

```js
const { ethers } = require("ethers");
const abi = require("./contract/ABI.json");

const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL);
const nnx = new ethers.Contract(
  "0x1a5a018A46Cd4C5C4E04464C44f74B3B10C01DbE",
  abi,
  provider
);

console.log(await nnx.symbol());
```

## Mainnet Verification

`npm run verify:state` checks the deployed contract directly and reports:

- Ethereum chain ID and bytecode presence
- token name, symbol, decimals and total supply
- pause state
- principal treasury balance
- documented administrative and treasury Minter/Pauser role separation

Current documented authority:

- Administrative address: `0x0d42b0e471C0A702dfe12417e2354cc9F1680A09` — Minter **YES**, Pauser **YES**.
- Principal treasury: `0xe3621488A974FCA5d39F9e72Afb738F04255412A` — Minter **NO**, Pauser **NO**.

No additional NNX issuance is currently scheduled.

## Historical Solidity Source Status

The original Solidity source used for the historical 2020 deployment is **not currently available in this repository**. Therefore:

- no `NNX.sol` is fabricated or presented as original source;
- this repository does not claim Etherscan source verification;
- `contract/ABI.json` is a conservative integration interface, not an ABI claimed to have been generated from a verified source publication;
- Ethereum Mainnet bytecode and state remain the canonical deployed reference.

A Solidity source file should only be added as historical/original source after provenance is established, or as reconstructed source when clearly labeled and reproducible compilation demonstrates the intended bytecode relationship.

## Administrative Security Roadmap

The current administrative authority remains an externally owned account. Nationalux intends to evaluate migration to a Safe-compatible multi-signature structure after signer, recovery, legal-responsibility and role-transfer procedures are finalized and verified on-chain. A configuration such as 3-of-5 is a **roadmap target, not a currently deployed state**.

Treasury time-lock or vesting controls may be deployed for approved material allocations. No treasury balance is represented here as already locked unless an actual lock contract and on-chain reference are published.

## Repository Map

```text
contract/                 ABI, deployment metadata and source-status notes
scripts/verify-state.js   read-only Ethereum Mainnet verification
 test/                    live mainnet read-only state tests
sdk/                      minimal executable integration examples
docs/                     ecosystem, tokenomics, verification and roadmap
```

The official public website is maintained separately from this engineering repository.

## SDK Scope

The minimal SDK demonstrates contract reads and deterministic SHA-256 metadata hashing. IPFS/Arweave storage, escrow, EIP-712 machine settlement, TEE/ZK verification and autonomous-agent payment modules are **not represented as deployed** until executable code and deployment/security references are published.

## Project

Official Website: https://nationalux-nnx.web.app/

**Nationalux Lab Inc.**  
Suite 318 – 1199 West Pender Street  
Vancouver, British Columbia V6E 2R1, Canada  
Email: kmat0@nationalux.cate24.com

NNX does not itself represent equity in Nationalux Lab Inc., corporate voting rights, dividends, guaranteed returns or fixed fiat redemption.

© 2026 Nationalux Lab Inc.


## Deployed Bytecode Evidence

The canonical runtime bytecode is included at `contract/DEPLOYED_BYTECODE.txt`. Etherscan reports an exact-bytecode match at `0xED8E3d54abc8E4a55d320FFfa5A3E9963f3Ea8a6`. See `contract/README.md` and `docs/VERIFICATION.md` for provenance limitations.
