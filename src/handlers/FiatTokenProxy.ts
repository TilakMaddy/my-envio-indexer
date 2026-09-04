/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import { indexer } from "envio";
import type {
  FiatTokenProxy_AdminChanged,
  FiatTokenProxy_Approval,
  FiatTokenProxy_AuthorizationUsed,
  FiatTokenProxy_Blacklisted,
  FiatTokenProxy_BlacklisterChanged,
  FiatTokenProxy_Burn,
  FiatTokenProxy_MasterMinterChanged,
  FiatTokenProxy_Mint,
  FiatTokenProxy_MinterConfigured,
  FiatTokenProxy_MinterRemoved,
  FiatTokenProxy_OwnershipTransferred,
  FiatTokenProxy_Pause,
  FiatTokenProxy_RescuerChanged,
  FiatTokenProxy_Transfer,
  FiatTokenProxy_UnBlacklisted,
  FiatTokenProxy_Unpause,
  FiatTokenProxy_Upgraded,
} from "envio";

indexer.onEvent({ contract: "FiatTokenProxy", event: "AdminChanged" }, async ({ event, context }) => {
  const entity: FiatTokenProxy_AdminChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    previousAdmin: event.params.previousAdmin,
    newAdmin: event.params.newAdmin,
  };

  context.FiatTokenProxy_AdminChanged.set(entity);
});

indexer.onEvent({ contract: "FiatTokenProxy", event: "Approval" }, async ({ event, context }) => {
  const entity: FiatTokenProxy_Approval = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    owner: event.params.owner,
    spender: event.params.spender,
    value: event.params.value,
  };

  context.FiatTokenProxy_Approval.set(entity);
});

indexer.onEvent({ contract: "FiatTokenProxy", event: "AuthorizationUsed" }, async ({ event, context }) => {
  const entity: FiatTokenProxy_AuthorizationUsed = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    authorizer: event.params.authorizer,
    nonce: event.params.nonce,
  };

  context.FiatTokenProxy_AuthorizationUsed.set(entity);
});

indexer.onEvent({ contract: "FiatTokenProxy", event: "Blacklisted" }, async ({ event, context }) => {
  const entity: FiatTokenProxy_Blacklisted = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    _account: event.params._account,
  };

  context.FiatTokenProxy_Blacklisted.set(entity);
});

indexer.onEvent({ contract: "FiatTokenProxy", event: "BlacklisterChanged" }, async ({ event, context }) => {
  const entity: FiatTokenProxy_BlacklisterChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    newBlacklister: event.params.newBlacklister,
  };

  context.FiatTokenProxy_BlacklisterChanged.set(entity);
});

indexer.onEvent({ contract: "FiatTokenProxy", event: "Burn" }, async ({ event, context }) => {
  const entity: FiatTokenProxy_Burn = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    burner: event.params.burner,
    amount: event.params.amount,
  };

  context.FiatTokenProxy_Burn.set(entity);
});

indexer.onEvent({ contract: "FiatTokenProxy", event: "MasterMinterChanged" }, async ({ event, context }) => {
  const entity: FiatTokenProxy_MasterMinterChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    newMasterMinter: event.params.newMasterMinter,
  };

  context.FiatTokenProxy_MasterMinterChanged.set(entity);
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

indexer.onEvent({ contract: "FiatTokenProxy", event: "MinterConfigured" }, async ({ event, context }) => {
  const entity: FiatTokenProxy_MinterConfigured = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    minter: event.params.minter,
    minterAllowedAmount: event.params.minterAllowedAmount,
  };

  context.FiatTokenProxy_MinterConfigured.set(entity);
});

indexer.onEvent({ contract: "FiatTokenProxy", event: "MinterRemoved" }, async ({ event, context }) => {
  const entity: FiatTokenProxy_MinterRemoved = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    oldMinter: event.params.oldMinter,
  };

  context.FiatTokenProxy_MinterRemoved.set(entity);
});

indexer.onEvent({ contract: "FiatTokenProxy", event: "OwnershipTransferred" }, async ({ event, context }) => {
  const entity: FiatTokenProxy_OwnershipTransferred = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    previousOwner: event.params.previousOwner,
    newOwner: event.params.newOwner,
  };

  context.FiatTokenProxy_OwnershipTransferred.set(entity);
});

indexer.onEvent({ contract: "FiatTokenProxy", event: "Pause" }, async ({ event, context }) => {
  const entity: FiatTokenProxy_Pause = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
  };

  context.FiatTokenProxy_Pause.set(entity);
});

indexer.onEvent({ contract: "FiatTokenProxy", event: "RescuerChanged" }, async ({ event, context }) => {
  const entity: FiatTokenProxy_RescuerChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    newRescuer: event.params.newRescuer,
  };

  context.FiatTokenProxy_RescuerChanged.set(entity);
});

indexer.onEvent({ contract: "FiatTokenProxy", event: "Transfer" }, async ({ event, context }) => {
  const entity: FiatTokenProxy_Transfer = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    from: event.params.from,
    to: event.params.to,
    value: event.params.value,
  };

  context.FiatTokenProxy_Transfer.set(entity);
});

indexer.onEvent({ contract: "FiatTokenProxy", event: "UnBlacklisted" }, async ({ event, context }) => {
  const entity: FiatTokenProxy_UnBlacklisted = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    _account: event.params._account,
  };

  context.FiatTokenProxy_UnBlacklisted.set(entity);
});

indexer.onEvent({ contract: "FiatTokenProxy", event: "Unpause" }, async ({ event, context }) => {
  const entity: FiatTokenProxy_Unpause = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
  };

  context.FiatTokenProxy_Unpause.set(entity);
});

indexer.onEvent({ contract: "FiatTokenProxy", event: "Upgraded" }, async ({ event, context }) => {
  const entity: FiatTokenProxy_Upgraded = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    implementation: event.params.implementation,
  };

  context.FiatTokenProxy_Upgraded.set(entity);
});
