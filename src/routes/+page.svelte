<script lang="ts">
  import sveeeth, { account, configureChains, } from "sveeeth";
  import { mainnet } from "sveeeth/chains";
  import { publicProvider } from "sveeeth/providers";
  import {
    AccountConnect,
    DaiBalance,
    WethBalance,
    EnsData,
    Multicall,
    NetworkDetails,
    Signing
  } from "../components";

  const { provider } = configureChains([mainnet], [publicProvider()]);

  sveeeth({
    autoConnect: true,
    provider,
  });

  const components = [
    NetworkDetails,
    EnsData,
    DaiBalance,
    WethBalance,
    Multicall,
    Signing,
  ];
</script>

<h1>Sveeeth Example</h1>
<hr />

<AccountConnect />
<hr />

{#if $account.isConnected}
  {#each components as Component}
    <Component />
    <hr />
  {/each}
{/if}
