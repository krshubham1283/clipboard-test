const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0")
  });
  
  test("Return partition key present in event when length is less than 256", () => {
    const event = {
      partitionKey: '3c6eb74dd4be3459a3741cd6b61be705ba41e5fd3d16f485bcef3d828e358f16904460fb5d36d5c5f1ea5b5755214cc' +
        '9de49a8bd4e91fed03e0fcacd7390a28e'
    }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(event.partitionKey)
  })
  
  test("Return new partition key present in event when length is more than 256", () => {
    const event = {
      partitionKey: '3c6eb74dd4be3459a3741cd6b61be705ba41e5fd3d16f485bcef3d828e358f16904460fb5d36d5c5f1ea5b5755214cc' +
        '9de49a8bd4e91fed03e0fcacd7390a28e3c6eb74dd4be3459a3741cd6b61be705ba41e5fd3d16f485bcef3d828e358f16904460fb5d36d5c5f1ea5b5755214cc' +
        '9de49a8bd4e91fed03e0fcacd7390a28eqwrt'
    }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).not.toBe(event.partitionKey)
  })
  
  test("Return new partition key with length less than when partition key not present in event", () => {
    const event = {
      name: 'xyz',
      age: 23,
      id: 'qwertyuio123456789'
    }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey.length).toBeLessThanOrEqual(256);
  })
});
