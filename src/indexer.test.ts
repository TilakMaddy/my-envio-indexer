import { describe, it } from "vitest";
import { createTestIndexer, type FiatTokenProxy_AdminChanged } from "envio";
import { TestHelpers } from "envio";

describe("FiatTokenProxy contract AdminChanged event tests", () => {
  it("FiatTokenProxy_AdminChanged is created correctly", async (t) => {
    const indexer = createTestIndexer();

    // Creating mock for FiatTokenProxy contract AdminChanged event
    const event = {
      contract: "FiatTokenProxy" as const,
      event: "AdminChanged" as const,
      params: {
        previousAdmin: TestHelpers.Addresses.defaultAddress,
        newAdmin: TestHelpers.Addresses.defaultAddress,
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
    let actualFiatTokenProxyAdminChanged = await indexer.FiatTokenProxy_AdminChanged.getOrThrow("42161_0_0");

    // Creating the expected entity
    const expectedFiatTokenProxyAdminChanged = {
      id: "42161_0_0",
      previousAdmin: event.params.previousAdmin,
      newAdmin: event.params.newAdmin,
      chainId: 42161,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    t.expect(actualFiatTokenProxyAdminChanged, "Actual FiatTokenProxyAdminChanged should be the same as the expected FiatTokenProxyAdminChanged").toEqual(expectedFiatTokenProxyAdminChanged);
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
