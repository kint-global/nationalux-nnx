"use strict";

const { hashDatasetMetadata } = require("../src");

const metadata = {
  datasetId: "example-dataset-001",
  schemaVersion: "1.0",
  owner: "Example Provider",
  fields: ["timestamp", "value"]
};

console.log(hashDatasetMetadata(metadata));
