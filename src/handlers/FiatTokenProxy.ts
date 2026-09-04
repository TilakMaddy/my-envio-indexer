/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import { indexer } from "envio";
import type {
  FiatTokenProxy_Approval,
  FiatTokenProxy_Burn,
  FiatTokenProxy_Mint,
} from "envio";

indexer.onEvent({ contract: "FiatTokenProxy", event: "Approval" }, async ({ event, context }) => {
  const entity: FiatTokenProxy_Approval = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    owner: event.params.owner,
    spender: event.params.spender,
    value: event.params.value,
  };

  context.FiatTokenProxy_Approval.set(entity);
});

indexer.onEvent({ contract: "FiatTokenProxy", event: "Burn" }, async ({ event, context }) => {
  const entity: FiatTokenProxy_Burn = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    burner: event.params.burner,
    amount: event.params.amount,
  };

  context.FiatTokenProxy_Burn.set(entity);
});

indexer.onEvent({ contract: "FiatTokenProxy", event: "Mint" }, async ({ event, context }) => {
  const entity: FiatTokenProxy_Mint = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    minter: event.params.minter,
    to: event.params.to,
    amount: event.params.amount,
  };

  context.FiatTokenProxy_Mint.set(entity);
});
