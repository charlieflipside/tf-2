<script lang="ts">
    import {account, contract } from "sveeeth";
    import { ethers } from "ethers";
    import { MULTIREWARD_CONFIG } from "../constants";

    const multiRewardContract = contract(MULTIREWARD_CONFIG);

    console.log("MULTIREWARD_CONFIG:", MULTIREWARD_CONFIG);
    console.log("multiRewardContract:", multiRewardContract);

    let amountToStake: number;
    let amountToWithdraw: number;

    const stakeFRZ = async () => {
        console.log("Amount to stake:", amountToStake);
        console.log("Contract instance:", multiRewardContract);

        try {
            // Convert the amount to stake from Ether (18 decimal) to Wei (smallest decimal)
            const amountToStakeWei = ethers.utils.parseEther(amountToStake.toString());

            // Call the stake function on the contract
            const transaction = await multiRewardContract.stake(amountToStakeWei);

            // Wait for the transaction to be mined
            await transaction.wait();

            // Transaction successfully mined
            console.log("Transaction successful!");
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    const withdrawFRZ = async () => {
        console.log("Amount to withdraw:", amountToWithdraw);
        console.log("Contract instance:", multiRewardContract);

        try {
            // Convert the amount to stake from Ether (18 decimal) to Wei (smallest decimal)
            const amountToWithdrawWei = ethers.utils.parseEther(amountToWithdraw.toString());

            // Call the stake function on the contract
            const transaction = await multiRewardContract.withdraw(amountToWithdrawWei);

            // Wait for the transaction to be mined
            await transaction.wait();

            // Transaction successfully mined
            console.log("Transaction successful!");
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

</script>

<h2>Staking FRZ</h2>
<p>Amount to stake:</p>
<input type="number" bind:value={amountToStake} placeholder="Enter amount to stake" />
<button on:click={stakeFRZ}>Stake FRZ</button>

<h2>Withdrawing FRZ</h2>
<p>Amount to withdraw:</p>
<input type="number" bind:value={amountToWithdraw} placeholder="Enter amount to withdraw" />
<button on:click={withdrawFRZ}>Withdraw FRZ</button>