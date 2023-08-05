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
let approvalAmount: number;

$: async () => {
    if ($account.address) {
    const rawApprovalAmount = await checkGovernorWETHApproval();
    approvalAmount = parseFloat(ethers.utils.formatUnits(rawApprovalAmount, 18));
    }
}

const getApprovalAmount = async () => {
    const rawApprovalAmount = await checkGovernorWETHApproval();
    approvalAmount = parseFloat(ethers.utils.formatUnits(rawApprovalAmount, 18));
};

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
    console.log(`Allowance for Governor contract: ${allowance}`);
    return allowance;
} catch (error) {
    alert("Error: " + error.message);
    throw error;
}
};

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

<h2>Approve Governor to use WETH</h2>
<button on:click={approveWETHtoGovernor}>Approve WETH to Governor</button>

<h2>Approve Governor to use frETH</h2>
<button on:click={approvefrETHtoGovernor}>Approve frETH to Governor</button>

<h2>Approve Governor to use Freezer NFT</h2>
<button on:click={approveAllNFTsToGovernor}>Approve Freezer NFT to Governor</button>

<h2>Gov WETH Approval </h2>
<p>Approval Amount: {approvalAmount}</p>
<button on:click={getApprovalAmount}>Check Approval</button>
