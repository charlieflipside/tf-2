<script lang="ts">
    import {account, contract } from "sveeeth";
    import { ethers } from "ethers";
    import { FRTOKENSTAKING_CONFIG } from "../constants";

    const burnContract = contract(FRTOKENSTAKING_CONFIG);

    console.log("FRTOKENBURNING_CONFIG:", FRTOKENSTAKING_CONFIG);
    console.log("burnContract:", burnContract);

    let amountToBurn: number;

    const burnFrToken = async () => {
        console.log("Amount to burn:", amountToBurn);
        console.log("Contract instance:", burnContract);

        try {
            // Convert the amount to burn from Ether (18 decimal) to Wei (smallest decimal)
            const amountToBurnWei = ethers.utils.parseEther(amountToBurn.toString());

            // Call the lockWAsset function on the contract
            const transaction = await burnContract.stake(amountToBurnWei);

            // Wait for the transaction to be mined
            await transaction.wait();

            // Transaction successfully mined
            console.log("Transaction successful!");
        } catch (error) {
            alert("Error: " + error.message);
        }
    };
</script>

<h2>Burning frETH</h2>

<p>Amount to burn (This is a *permanent* trade for a stream of FRZ):</p>
<input type="number" bind:value={amountToBurn} placeholder="Enter amount to *burn*!" />


<button on:click={burnFrToken}>Burn frETH</button>