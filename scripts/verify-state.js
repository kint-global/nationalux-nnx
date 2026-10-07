#!/usr/bin/env node
"use strict";

const { ethers } = require("ethers");
const deployment = require("../contract/DEPLOYMENT.json");
const abi = require("../contract/ABI.json");

const RPC_URL = process.env.ETH_RPC_URL || "https://ethereum-rpc.publicnode.com";
const CONTRACT = deployment.contract_address;
const ADMIN = deployment.admin_address;
const TREASURY = deployment.treasury_address;

// Historical role functions confirmed from deployed bytecode/state.
const roleInterface = new ethers.Interface([
  "function isMinter(address account) view returns (bool)",
  "function isPauser(address account) view returns (bool)"
]);

async function roleCall(provider, functionName, account) {
  const data = roleInterface.encodeFunctionData(functionName, [account]);
  const result = await provider.call({ to: CONTRACT, data });
  return roleInterface.decodeFunctionResult(functionName, result)[0];
}

function yesNo(value) {
  return value ? "YES" : "NO";
}

async function main() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const network = await provider.getNetwork();
  if (network.chainId !== 1n) {
    throw new Error(`Expected Ethereum Mainnet chainId 1, received ${network.chainId}`);
  }

  const code = await provider.getCode(CONTRACT);
  if (code === "0x") throw new Error("No bytecode found at the configured NNX contract address.");

  const token = new ethers.Contract(CONTRACT, abi, provider);
  const [name, symbol, decimals, totalSupply, paused, treasuryBalance,
    adminMinter, adminPauser, treasuryMinter, treasuryPauser] = await Promise.all([
      token.name(), token.symbol(), token.decimals(), token.totalSupply(), token.paused(),
      token.balanceOf(TREASURY),
      roleCall(provider, "isMinter", ADMIN),
      roleCall(provider, "isPauser", ADMIN),
      roleCall(provider, "isMinter", TREASURY),
      roleCall(provider, "isPauser", TREASURY)
    ]);

  const supply = ethers.formatUnits(totalSupply, decimals);
  const treasury = ethers.formatUnits(treasuryBalance, decimals);

  console.log("NNX Mainnet State Verification");
  console.log("==============================");
  console.log(`Chain ID:          ${network.chainId}`);
  console.log(`Contract:          ${CONTRACT}`);
  console.log(`Bytecode:          present (${(code.length - 2) / 2} bytes)`);
  console.log(`Name:              ${name}`);
  console.log(`Symbol:            ${symbol}`);
  console.log(`Decimals:          ${decimals}`);
  console.log(`Total Supply:      ${supply} NNX`);
  console.log(`Paused:            ${yesNo(paused)}`);
  console.log("");
  console.log(`Admin:             ${ADMIN}`);
  console.log(`Admin Minter:      ${yesNo(adminMinter)}`);
  console.log(`Admin Pauser:      ${yesNo(adminPauser)}`);
  console.log("");
  console.log(`Treasury:          ${TREASURY}`);
  console.log(`Treasury Balance:  ${treasury} NNX`);
  console.log(`Treasury Minter:   ${yesNo(treasuryMinter)}`);
  console.log(`Treasury Pauser:   ${yesNo(treasuryPauser)}`);
  console.log("");
  console.log("Source status: historical Solidity source is not represented as verified in this repository.");
}

main().catch((error) => {
  console.error("Verification failed:", error.message);
  process.exitCode = 1;
});
