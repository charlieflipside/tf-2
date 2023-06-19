<script lang="ts">
    import { account, contract } from "sveeeth";
    import { WETH_CONFIG } from "../constants";

    const weth = contract(WETH_CONFIG);
</script>

    <h3>Weth Balance</h3>
    {#await $account.address && weth.balanceOf($account.address)}
    <p>Loading...</p>
    {:then balance}
    <p>Balance: {balance/1e18} wETH</p>  
    {/await}