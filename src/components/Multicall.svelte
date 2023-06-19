<script lang="ts">
  import { account, multicall } from "sveeeth";
  import { WETH_CONFIG } from "../constants";

  const wethMulticall = multicall(WETH_CONFIG);

  $: wethMulticallCal = wethMulticall
    .call("balanceOf", [$account.address])
    .call("totalSupply")
    .call("name")
    .call("symbol");
</script>

<h3>Multicall</h3>

{#await $account.address && wethMulticallCal.execute()}
  <p>Loading...</p>
{:then result}
  <pre>{JSON.stringify(result, null, 2)}</pre>
  <p>balanceOf: {result[0]}</p>
  <p>totalSupply: {result[1]}</p>
  <p>name: {result[2]}</p>
  <p>symbol: {result[3]}</p>
{/await}

<style>
  pre {
    background: #f2f2f2;
    padding: 8px;
    border: 1px solid black;
  }
</style>