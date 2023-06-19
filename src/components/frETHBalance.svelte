<script lang="ts">
    import { account, contract } from "sveeeth";
    import { FRETH_CONFIG } from "../constants";

    const freth = contract(FRETH_CONFIG);
</script>

    <h3>freth Balance</h3>
    {#await $account.address && freth.balanceOf($account.address)}
    <p>Loading...</p>
    {:then balance}
    <p>Balance: {balance/1e18} frETH</p>  
    {/await}