<script>
    import { ownedTokenIds } from './ownedNfts'; // Adjust the path as necessary

    let tokenIds = [];

    // Subscribe to the store
    $: tokenIds = $ownedTokenIds;
</script>

<h3>Owned NFT Token IDs</h3>
{#if tokenIds.length === 0}
    <p>No owned tokens.</p>
{:else}
    <ul>
        {#each tokenIds as tokenId}
            <li>Token ID: {tokenId}</li>
        {/each}
    </ul>
{/if}
