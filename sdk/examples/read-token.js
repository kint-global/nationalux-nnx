"use strict";

const { ethers } = require("ethers");
const { connectNNX } = require("../src");

const rpc = process.env.ETH_RPC_URL || "https://ethereum-rpc.publicnode.com";
const provider = new ethers.JsonRpcProvider(rpc);
const nnx = connectNNX(provider);

(async () => {
  console.log({
    name: await nnx.name(),
    symbol: await nnx.symbol(),
    totalSupply: ethers.formatUnits(await nnx.totalSupply(), await nnx.decimals())
  });
})().catch(console.error);
