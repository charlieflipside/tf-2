<script lang="ts">
    import { account } from "sveeeth";
    import { parseAbiItem } from "viem";
    import { client } from './clients';
    import { NFT_CONFIG } from "../constants";
    import { writable } from 'svelte/store';
    import { ownedTokenIds } from './tokenStores.js';

    // Define an interface for the log structure
    interface Log {
        blockNumber: bigint;
        transactionHash: string;
        tokenId: number;
        from: string | undefined;
        to: string | undefined;
    }

    const receivedFreezerLogs = writable<Log[]>([]);
    const sentFreezerLogs = writable<Log[]>([]);
    
    function decodeTokenId(hexString: string): number {
        return parseInt(hexString, 16);
    }

    // Define an async function to fetch logs
    async function fetchLogs() {
        try {
            const receivedLogsResponse = await client.getLogs({  
                address: NFT_CONFIG.address,
                event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 tokenId)'),
                args: { to: $account.address },
                fromBlock: 14938400n
            });
            const sentLogsResponse = await client.getLogs({
                address: NFT_CONFIG.address,
                event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 tokenId)'),
                args: { from: $account.address },
                fromBlock: 14938400n
            });

            const mapLog = (log: any): Log => ({
                blockNumber: log.blockNumber,
                transactionHash: log.transactionHash,
                tokenId: decodeTokenId(log.topics[3]),
                from: log.args.from,
                to: log.args.to
            });

            receivedFreezerLogs.set(receivedLogsResponse.map(mapLog));
            sentFreezerLogs.set(sentLogsResponse.map(mapLog));
        } catch (error) {
            console.error("Error fetching logs:", error);
        }
    }
    
    // Use a reactive statement to call fetchLogs when $account.address changes
    $: if ($account.address) {
        fetchLogs();
    }

    // Reactive statement to process logs and log the owned tokens
    $: {
        const receivedLogs = $receivedFreezerLogs;
        const sentLogs = $sentFreezerLogs;
        getCurrentOwnedTokens(receivedLogs, sentLogs);
    }

    function getCurrentOwnedTokens(received: Log[], sent: Log[]): void {
        const ownedTokens = new Set<number>();
        const allLogs: Log[] = [...received, ...sent];

        // Sort logs by block number
        allLogs.sort((a, b) => Number(a.blockNumber) - Number(b.blockNumber));

        // Process logs in order
        for (const log of allLogs) {
            if (received.includes(log)) {
                ownedTokens.add(log.tokenId);
            } else if (sent.includes(log)) {
                ownedTokens.delete(log.tokenId);
            }
        }
        ownedTokenIds.set(Array.from(ownedTokens));
    
    }
</script>

<!-- Display the received logs -->
{#if $receivedFreezerLogs.length > 0}
    <h3>Received Freezer Logs:</h3>
    <ul>
        {#each $receivedFreezerLogs as log}
            <li>Block: {log.blockNumber.toString()} - Tx: {log.transactionHash} - Token ID: {log.tokenId} - From: {log.from} - To: {log.to}</li>
        {/each}
    </ul>
{:else}
    <p>No received freezer logs found.</p>
{/if}

<!-- Display the sent logs -->
{#if $sentFreezerLogs.length > 0}
    <h3>Sent Freezer Logs:</h3>
    <ul>
        {#each $sentFreezerLogs as log}
            <li>Block: {log.blockNumber.toString()} - Tx: {log.transactionHash} - Token ID: {log.tokenId} - From: {log.from} - To: {log.to}</li>
        {/each}
    </ul>
{:else}
    <p>No sent freezer logs found.</p>
{/if}
