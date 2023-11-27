<script>
    import { contract } from "sveeeth";
    import { NFT_CONFIG } from "../constants";
    import { ownedTokenIds } from './ownedNfts.js';

    let tokenIds = [];
    let tokenSVGs = new Map();

    // Subscribe to the store
    $: tokenIds = $ownedTokenIds;

    // Contract instance for fetching token URIs
    const nftContract = contract(NFT_CONFIG);

    async function fetchTokenURIs() {
        for (const tokenId of tokenIds) {
            try {
                const tokenURI = await nftContract.tokenURI(tokenId);
                const jsonBase64 = tokenURI.split(',')[1];
                const json = atob(jsonBase64);
                const tokenData = JSON.parse(json);

                if (tokenData.image) {
                    const svgBase64 = tokenData.image.split(',')[1];
                    tokenSVGs.set(tokenId, svgBase64);
                }
            } catch (error) {
                console.error(`Error fetching token URI for ID ${tokenId}:`, error);
            }
        }
    }

    // Reactively fetch token URIs whenever tokenIds change
    $: if (tokenIds.length > 0) {
        fetchTokenURIs();
    }
</script>


<style>
    .svg-container {
        max-width: 250px; /* Maximum width for the SVG */
        height: auto;     /* Maintain aspect ratio */
        overflow: hidden; /* In case SVG doesn't scale correctly */
    }

</style>

<h3>Owned NFTs</h3>
{#if tokenIds.length === 0}
    <p>No owned tokens.</p>
{:else}
    <ul>
        {#each tokenIds as tokenId}
            <li>
                Token ID: {tokenId}
                {#if tokenSVGs.has(tokenId)}
                <div class="svg-container">
                    {@html atob(tokenSVGs.get(tokenId))}
                </div>
                {/if}
            </li>
        {/each}
    </ul>
{/if}
