<script lang="ts">
    import { contract } from "sveeeth";
    import { ethers } from "ethers";
    import { GOV_CONFIG } from "../constants";

    const governorContract = contract(GOV_CONFIG);

    console.log("GOV_CONFIG:", GOV_CONFIG);
    console.log("governorContract:", governorContract);

    let amountToLock: number;
    let lockDuration: number;

    const lockWAsset = async () => {
        console.log("Amount to lock:", amountToLock);
        console.log("Lock duration:", lockDuration);

        console.log("Contract instance:", governorContract);
    
        try {
            // Convert the amount to lock from Ether to Wei
            const amountToLockWei = ethers.utils.parseEther(amountToLock.toString());

            // Call the lockWAsset function on the contract
            const transaction = await governorContract.lockWAsset(amountToLockWei, lockDuration);

            // Wait for the transaction to be mined
            await transaction.wait();

            // Transaction successfully mined
            console.log("Transaction successful!");
        } catch (error) {
            alert("Error: " + error.message);
        }
    };
</script>

<h2>Locking wAsset</h2>

<p>Amount to lock:</p>
<input type="number" bind:value={amountToLock} placeholder="Enter amount to lock" />

<p>Lock duration (in days):</p>
<input type="number" bind:value={lockDuration} placeholder="Enter lock duration" />

<button on:click={lockWAsset}>Lock wAsset</button>