<script>
    import { multicall } from "sveeeth";
    import { GOV_CONFIG } from "../constants";
    import { ownedTokenIds, tokenStatsMap } from './tokenStores.js';

    // Initialize multicall for governor contract
    const govMulticall = multicall(GOV_CONFIG);

    async function fetchTokenStats() {
        for (const tokenId of $ownedTokenIds) {
            const multicallInstance = govMulticall
                .call("getPositions", [tokenId])
                .call("getProgress", [tokenId])
                .call("getUnlockCost", [tokenId])
                .call("getWAssetFees", [tokenId]);

            try {
                const result = await multicallInstance.execute();
                tokenStatsMap.update(currentMap => {
                    currentMap.set(tokenId, {
                        positions: result[0],
                        progress: result[1],
                        unlockCost: result[2],
                        wAssetFees: result[3]
                    });
                    return new Map(currentMap);
                });
            } catch (error) {
                console.error(`Error fetching stats for token ID ${tokenId}:`, error);
            }
        }
    }

    $: if ($ownedTokenIds.length > 0) {
        fetchTokenStats();
    }
</script>

<h3>Token Stats</h3>
{#each Array.from($tokenStatsMap.entries()) as [tokenId, stats]}
    <div>
        <h4>Token ID: {tokenId}</h4>
        <p>Positions: {JSON.stringify(stats.positions)}</p>
        <p>Progress: {stats.progress}</p>
        <p>Unlock Cost: {stats.unlockCost}</p>
        <p>WAsset Fees: {stats.wAssetFees}</p>
    </div>
{/each}
