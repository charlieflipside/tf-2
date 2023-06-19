<script lang="ts">
  import { account } from "sveeeth";
  import { fetchEnsData } from "sveeeth/utils";
</script>

<h3>ENS Data</h3>

{#await fetchEnsData($account)}
  <p>Loading...</p>
{:then { name }}
  <p>Name: {name}</p>
{/await}
