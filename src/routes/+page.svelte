<script lang="ts">
  import sveeeth, { account, configureChains, } from "sveeeth";
  import { mainnet } from "sveeeth/chains";
  import { publicProvider } from "sveeeth/providers";
  import {
    AccountConnect,
    WethBalance,
    NftsOwned,
    RenderNfts,
    IdStats,
    ApproveTokens,
    LockWAsset,
    StakeFRZ,
    BurnFrAsset,
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
    NftsOwned,
    RenderNfts,
    IdStats,
    ApproveTokens,
    LockWAsset,
    StakeFRZ,
    FrethBalance,
    BurnFrAsset,
    FRZBalance,
    Multicall,
    Signing,
  ];
</script>

<h1>True Freeze Minimalist</h1>
<p>
  Due to server deprecation, the original UI no longer functions. This Minimalist website remains as core functionality for accessing 
  the primitive and withdrawing assets. Other user interfaces may exist for True Freeze. Use all with caution and see: https://deepfreezellc.gitbook.io/true-freeze/key-info/token-addresses for 
the immutable contract addresses and further instructions.
</p>
<hr />

<AccountConnect />
<hr />

{#if $account.isConnected}
  {#each components as Component}
    <Component />
    <hr />
  {/each}
{/if}
