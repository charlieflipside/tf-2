<script lang="ts">
    import { account, contract } from "sveeeth";
    import { ethers } from "ethers";
    import { GOV_CONFIG } from "../constants";
    import { FRETH_CONFIG } from "../constants";
    import { WETH_CONFIG } from "../constants";
    import { FRZ_CONFIG } from "../constants";
    import { NFT_CONFIG } from "../constants";

const freth = contract(FRETH_CONFIG);
const weth = contract(WETH_CONFIG);
const frz = contract(FRZ_CONFIG);
const freezer = contract(NFT_CONFIG);
const governorContract = contract(GOV_CONFIG);

const approveWETHtoGovernor = async () => {

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

const approvefrETHtoGovernor = async () => {
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
const approveAllNFTsToGovernor = async () => {
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
