<script lang="ts">
  import sveeeth, { account, configureChains, } from "sveeeth";
  import { mainnet } from "sveeeth/chains";
  import { publicProvider } from "sveeeth/providers";
  import {
    AccountConnect,
    WethBalance,
    ApproveTokens,
    LockWAsset,
    FrethBalance,
    FRZBalance,
    EnsData,
    Multicall,
    NetworkDetails,
    Signing, 
  } from "../components";

  const { provider } = configureChains([mainnet], [publicProvider()]);

  sveeeth({
    autoConnect: true,
    provider,
  });

  const components = [
    NetworkDetails,
    EnsData,
    WethBalance,
    ApproveTokens,
    LockWAsset,
    FrethBalance,
    FRZBalance,
    Multicall,
    Signing,
  ];
</script>

<h1>True Freeze Minimalist</h1>
<hr />

<AccountConnect />
<hr />

{#if $account.isConnected}
  {#each components as Component}
    <Component />
    <hr />
  {/each}
{/if}
