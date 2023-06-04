const crypto = require("crypto");

function createHash(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex").toString();
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;
  
  if (!event) {
    return TRIVIAL_PARTITION_KEY
  }
  
  candidate = event?.partitionKey ? event.partitionKey : createHash(JSON.stringify(event))
  
  candidate = typeof candidate !== 'string' ? JSON.stringify(candidate) : candidate
  
  candidate = candidate.length > MAX_PARTITION_KEY_LENGTH ? createHash(candidate) : candidate
  
  return candidate;
};
