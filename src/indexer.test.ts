import { describe, it } from "vitest";
import { createTestIndexer, type FiatTokenProxy_Approval } from "envio";
import { TestHelpers } from "envio";

// The simulated event lands on the chain's configured start_block.
const START_BLOCK = 501626000;

describe("FiatTokenProxy contract Approval event tests", () => {
  it("FiatTokenProxy_Approval is created correctly", async (t) => {
    const indexer = createTestIndexer();

    // Creating mock for FiatTokenProxy contract Approval event
    const event = {
      contract: "FiatTokenProxy" as const,
      event: "Approval" as const,
      params: {
        owner: TestHelpers.Addresses.defaultAddress,
        spender: TestHelpers.Addresses.defaultAddress,
        value: 100n,
      },
    };

    await indexer.process({
      chains: {
        42161: {
          simulate: [event],
        },
      },
    });

    // Getting the actual entity from the test indexer
    let actualFiatTokenProxyApproval = await indexer.FiatTokenProxy_Approval.getOrThrow(`42161_${START_BLOCK}_0`);

    // Creating the expected entity
    const expectedFiatTokenProxyApproval = {
      id: `42161_${START_BLOCK}_0`,
      owner: event.params.owner,
      spender: event.params.spender,
      value: event.params.value,
      chainId: 42161,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    t.expect(actualFiatTokenProxyApproval, "Actual FiatTokenProxyApproval should be the same as the expected FiatTokenProxyApproval").toEqual(expectedFiatTokenProxyApproval);
  });
});

describe("Indexer smoke test", () => {
  it("processes the first block with events on chain 42161", async (t) => {
    const indexer = createTestIndexer();

    const result = await indexer.process({ chains: { 42161: {} } });

    t.expect(result.changes.length, "Should have at least one change").toBeGreaterThan(0);
    const firstChange = result.changes[0]!;
    t.expect(firstChange.chainId).toBe(42161);
    t.expect(firstChange.eventsProcessed).toBeGreaterThan(0);
  }, 60_000);
});
