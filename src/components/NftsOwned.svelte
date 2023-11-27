<script lang="ts">
    import { account } from "sveeeth";
    import { parseAbiItem } from "viem";
    import { client } from './clients';
    import { NFT_CONFIG } from "../constants";
    
    let receivedFreezerLogs = [];
    let sentFreezerLogs = [];
    
    function decodeTokenId(hexString) {
        return parseInt(hexString, 16);
    }

    // Define an async function to fetch logs
    async function fetchLogs() {
        try {
            const receivedLogs = await client.getLogs({  
                address: NFT_CONFIG.address,
                event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 tokenId)'),
                args: { to: $account.address },
                fromBlock: 14938400n
            });
            const sentLogs = await client.getLogs({
                address: NFT_CONFIG.address,
                event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 tokenId)'),
                args: { from: $account.address },
                fromBlock: 14938400n
            });

            receivedFreezerLogs = receivedLogs.map(log => ({
                blockNumber: log.blockNumber,
                transactionHash: log.transactionHash,
                tokenId: decodeTokenId(log.topics[3]),
                from: log.args.from,
                to: log.args.to
            }));
            sentFreezerLogs = sentLogs.map(log => ({
                blockNumber: log.blockNumber,
                transactionHash: log.transactionHash,
                tokenId: decodeTokenId(log.topics[3]),
                from: log.args.from,
                to: log.args.to
            }));

            console.log(receivedFreezerLogs, sentFreezerLogs);
        } catch (error) {
            console.error("Error fetching logs:", error);
        }
    }
    
    // Use a reactive statement to call fetchLogs when $account.address changes
    $: if ($account.address) {
        fetchLogs();
    }
</script>

<!-- Display the received logs -->
{#if receivedFreezerLogs.length > 0}
    <h3>Received Freezer Logs:</h3>
    <ul>
        {#each receivedFreezerLogs as log}
            <li>Block: {log.blockNumber.toString()} - Tx: {log.transactionHash} - Token ID: {log.tokenId} - From: {log.from} - To: {log.to}</li>
        {/each}
    </ul>
{:else}
    <p>No received freezer logs found.</p>
{/if}

<!-- Display the sent logs -->
{#if sentFreezerLogs.length > 0}
    <h3>Sent Freezer Logs:</h3>
    <ul>
        {#each sentFreezerLogs as log}
            <li>Block: {log.blockNumber.toString()} - Tx: {log.transactionHash} - Token ID: {log.tokenId} - From: {log.from} - To: {log.to}</li>
        {/each}
    </ul>
{:else}
    <p>No sent freezer logs found.</p>
{/if}
