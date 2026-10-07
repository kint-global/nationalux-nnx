"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { ethers } = require("ethers");
const deployment = require("../contract/DEPLOYMENT.json");
const abi = require("../contract/ABI.json");

const RPC_URL = process.env.ETH_RPC_URL || "https://ethereum-rpc.publicnode.com";
const provider = new ethers.JsonRpcProvider(RPC_URL);
const token = new ethers.Contract(deployment.contract_address, abi, provider);
const roles = new ethers.Interface([
  "function isMinter(address account) view returns (bool)",
  "function isPauser(address account) view returns (bool)"
]);

async function role(fn, account) {
  const result = await provider.call({
    to: deployment.contract_address,
    data: roles.encodeFunctionData(fn, [account])
  });
  return roles.decodeFunctionResult(fn, result)[0];
}

test("NNX canonical mainnet identity and supply", async () => {
  const network = await provider.getNetwork();
  assert.equal(network.chainId, 1n);
  assert.equal(await token.name(), "Nationalux");
  assert.equal(await token.symbol(), "NNX");
  assert.equal(await token.decimals(), 18n);
  assert.equal(await token.totalSupply(), ethers.parseUnits("9999900", 18));
});

test("NNX documented administrative role separation", async () => {
  assert.equal(await role("isMinter", deployment.admin_address), true);
  assert.equal(await role("isPauser", deployment.admin_address), true);
  assert.equal(await role("isMinter", deployment.treasury_address), false);
  assert.equal(await role("isPauser", deployment.treasury_address), false);
});
