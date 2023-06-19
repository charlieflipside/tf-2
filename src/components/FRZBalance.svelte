<script lang="ts">
    import { account, contract } from "sveeeth";
    import { FRZ_CONFIG } from "../constants";

    const frz = contract(FRZ_CONFIG);
</script>

    <h3>FRZ Balance</h3>
    {#await $account.address && frz.balanceOf($account.address)}
    <p>Loading...</p>
    {:then balance}
    <p>Balance: {balance / 1e18} FRZ</p>  
    {/await}