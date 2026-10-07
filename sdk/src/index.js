"use strict";

const { ethers } = require("ethers");
const abi = require("../../contract/ABI.json");
const deployment = require("../../contract/DEPLOYMENT.json");

/** Create a read-only NNX contract instance. */
function connectNNX(provider) {
  return new ethers.Contract(deployment.contract_address, abi, provider);
}

/**
 * Deterministically hash canonical JSON metadata for audit/reference use.
 * This does NOT upload data to IPFS/Arweave and does NOT imply on-chain registration.
 */
function hashDatasetMetadata(metadata) {
  const canonical = JSON.stringify(sortObject(metadata));
  return {
    canonical,
    sha256: require("node:crypto").createHash("sha256").update(canonical).digest("hex")
  };
}

function sortObject(value) {
  if (Array.isArray(value)) return value.map(sortObject);
  if (value && typeof value === "object") {
    return Object.keys(value).sort().reduce((out, key) => {
      out[key] = sortObject(value[key]);
      return out;
    }, {});
  }
  return value;
}

module.exports = { connectNNX, hashDatasetMetadata };
