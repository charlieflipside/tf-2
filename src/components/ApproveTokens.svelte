<script lang="ts">
    import { account, contract } from "sveeeth";
    import { ethers } from "ethers";
    import { GOV_CONFIG } from "../constants";
    import { FRETH_CONFIG } from "../constants";
    import { WETH_CONFIG } from "../constants";
    import { FRZ_CONFIG } from "../constants";
    import { NFT_CONFIG } from "../constants";

export const freth = contract(FRETH_CONFIG);
export const weth = contract(WETH_CONFIG);
export const frz = contract(FRZ_CONFIG);
export const freezer = contract(NFT_CONFIG);
export const governorContract = contract(GOV_CONFIG);
let govWethAllowance: number;
let govFrethAllowance: number;
let govNFTAllowance: boolean;

$: async () => {
    if ($account.address) {
    const rawGovWethAllowance = await checkGovernorWETHApproval();
    govWethAllowance = parseFloat(ethers.utils.formatUnits(rawGovWethAllowance, 18));
    
    const rawGovFrethAllowance = await checkGovernorWETHApproval();
    govFrethAllowance = parseFloat(ethers.utils.formatUnits(rawGovFrethAllowance, 18));
    
    govNFTAllowance = await checkGovernorNFTApproval();

    }
}

/* Gets */

const getGovWethAllowance = async () => {
    const rawGovWethAllowance = await checkGovernorWETHApproval();
    govWethAllowance = parseFloat(ethers.utils.formatUnits(rawGovWethAllowance, 18));
};

const getGovFrethAllowance = async () => {
    const rawGovFrethAllowance = await checkGovernorfrETHApproval();
    govFrethAllowance = parseFloat(ethers.utils.formatUnits(rawGovFrethAllowance, 18));
};

const getGovNFTAllowance = async () => {
    govNFTAllowance = await checkGovernorNFTApproval();
};

export const checkGovernorNFTApproval = async () => {
    try {
        if (!$account.address) {
        alert("Please connect your wallet first.");
        return;
        }

        // Get the user's address
        const userAddress = $account.address;

        // Check if the user has set approval for all tokens for the Governor contract
        const isApproved = await freezer.isApprovedForAll(userAddress, NFT_CONFIG.address);

        // Log the result
        console.log(`NFT Approval for Governor contract: ${isApproved}`);
        return isApproved;
    } catch (error) {
        alert("Error: " + error.message);
        throw error;
    }
};

/* Checks */

export const checkGovernorfrETHApproval = async() => {

    try {
    if (!$account.address) {
    alert("Please connect your wallet first.");
    return;
    }

    // Get the user's address
    const userAddress = $account.address;

    // Check the allowance for the Governor contract
    const allowance = await freth.allowance(userAddress, GOV_CONFIG.address);

     // Log the allowance
    console.log(`frETH Allowance for Governor contract: ${allowance}`);
    return allowance;
} catch (error) {
    alert("Error: " + error.message);
    throw error;
    }
}

export const checkGovernorWETHApproval = async () => {

    try {
    if (!$account.address) {
    alert("Please connect your wallet first.");
    return;
    }

    // Get the user's address
    const userAddress = $account.address;

    // Check the allowance for the Governor contract
    const allowance = await weth.allowance(userAddress, GOV_CONFIG.address);

    // Log the allowance
    console.log(`WETH Allowance for Governor contract: ${allowance}`);
    return allowance;
} catch (error) {
    alert("Error: " + error.message);
    throw error;
}
};

/* Approvals */

export const approveWETHtoGovernor = async () => {

    try {
        if (!$account.address) {
        alert("Please connect your wallet first.");
        return;
    }

        // Get the user's WETH balance
        const userAddress = $account.address;
        const balance = await weth.balanceOf(userAddress);

        // Approve the Governor contract to spend the user's WETH balance
        const transaction = await weth.approve(GOV_CONFIG.address, balance);

        // Wait for the transaction to be mined
        await transaction.wait();

        // Transaction successfully mined
        console.log("Transaction successful!");
    } catch (error) {
        alert("Error: " + error.message);
    }
};

export const approvefrETHtoGovernor = async () => {
    try {
        
        if (!$account.address) {
        alert("Please connect your wallet first.");
        return;
    }

        // Get the user's frETH balance
        const userAddress = $account.address;
        const balance = await freth.balanceOf(userAddress);

        // Approve the Governor contract to spend the user's WETH balance
        const transaction = await freth.approve(GOV_CONFIG.address, balance);

        // Wait for the transaction to be mined
        await transaction.wait();

        // Transaction successfully mined
        console.log("Transaction successful!");
    } catch (error) {
        alert("Error: " + error.message);
    }
};

export const approveAllNFTsToGovernor = async () => {
    try {
        if (!$account.address) {
            alert("Please connect your wallet first.");
            return;
        }

        // Approve the Governor contract to transfer any NFT owned by the user
        const transaction = await freezer.setApprovalForAll(GOV_CONFIG.address, true);

        // Wait for the transaction to be mined
        await transaction.wait();

        // Transaction successfully mined
        console.log("Transaction successful!");
    } catch (error) {
        alert("Error: " + error.message);
    }
};

</script>

<!-- Buttons -->

<h2>Approve Governor to use WETH</h2>
<button on:click={approveWETHtoGovernor}>Approve WETH to Governor</button>

<h2>Approve Governor to use frETH</h2>
<button on:click={approvefrETHtoGovernor}>Approve frETH to Governor</button>

<h2>Approve Governor to use Freezer NFT</h2>
<button on:click={approveAllNFTsToGovernor}>Approve Freezer NFT to Governor</button>

<h2>Gov WETH Approval </h2>
<p>Approval Amount: {govWethAllowance}</p>
<button on:click={getGovWethAllowance}>Check Approval</button>

<h2>Gov frETH Approval </h2>
<p>Approval Amount: {govFrethAllowance}</p>
<button on:click={getGovFrethAllowance}>Check Approval</button>

<h2>Gov NFT All Approval </h2>
<p>Approved for All: {govNFTAllowance}</p>
<button on:click={getGovNFTAllowance}>Check if Approved for All</button>
