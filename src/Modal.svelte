<script lang="ts">
    import type { ArtInfo } from "./types";
    import { fade } from 'svelte/transition';
    import whenipress from 'whenipress';
import FeatherButton from "./FeatherButton.svelte";
import FeatherIcon from "./FeatherIcon.svelte";
import { onMount } from "svelte";


    export let artwork: ArtInfo[];
    export let displayIndex: number;

    function closeModal() {
        displayIndex = undefined;
    }

    let currentArtwork: ArtInfo = artwork[displayIndex];

    $: if (displayIndex) currentArtwork = artwork[displayIndex];

    function changeIndexBy(amount: number) {
        if (displayIndex != undefined) {
            displayIndex += amount;
        }
        checkIndex();
    }

    whenipress('ArrowRight').then(()=>{
        changeIndexBy(1);
    });
    whenipress('ArrowLeft').then(()=>{
        changeIndexBy(-1);
    });
    whenipress('Escape').then(()=>{
        displayIndex = undefined;
    });

    function checkIndex() {
        if (displayIndex < 0) {
            displayIndex = artwork.length - 1;
        }
        if (displayIndex >= artwork.length) {
            displayIndex = 0;
        }
    }

    let scrim: HTMLAnchorElement;

    onMount(()=>{
        scrim.focus();
    })
</script>

<div class="lightbox" transition:fade>
    <!-- svelte-ignore a11y-invalid-attribute -->
    <!-- svelte-ignore a11y-missing-content -->
    <a href="#" class="scrim" on:click|preventDefault={closeModal} bind:this={scrim}></a>

    <!-- <a href="#close" class="close-button" on:click|preventDefault={closeModal}>&times;</a> -->
    <!-- <button type="button" class="btn-close" aria-label="Close" on:click|preventDefault={closeModal}></button> -->
    <FeatherButton icon='x' size='2rem' class="close-button" on:click={closeModal} />

    {#key displayIndex}
        <div class="art-container" transition:fade>
            <!-- svelte-ignore a11y-missing-attribute -->
            <img src={currentArtwork.src}>

            <div class="art-overlay">
                {#if currentArtwork.user.instagram}
                    <div class="top-overlay">
                        <span>Art by <FeatherIcon icon='instagram' size='1rem' /> <a href={`https://instagram.com/${currentArtwork.user.instagram}`}>{currentArtwork.user.instagram.trim()}</a></span>
                    </div>
                {/if}

                <FeatherButton
                    title="Last Artwork"
                    icon="arrow-left-circle"
                    size="1.5rem"
                    class="control-button left"
                    on:click={()=>changeIndexBy(-1)}
                />
                <FeatherButton
                    title="Next Artwork"
                    icon="arrow-right-circle"
                    size="1.5rem"
                    class="control-button right"
                    on:click={()=>changeIndexBy(1)}
                />
            </div>
        </div>
    {/key}
</div>

<style>
    .lightbox, .scrim {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
    }

    .scrim {
        background-color: #0008;
        backdrop-filter: blur(8px);
    }

    :global(.close-button) {
        z-index: 11;
        color: #fff !important;
        position: fixed;
        top: 2rem;
        right: 2rem;
    }

    .art-container {
        z-index: 11;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .art-container, .art-container img {
        /* max-width: calc(100vw - 8rem);
        max-height: calc(100vh - 8rem); */
        max-width: 90vw;
        max-height: 75vh;
    }

    .art-container img {

        border-radius: 3px;
        box-shadow: 0 1px 3px #000d;
    }

    .art-overlay {
        opacity: 0;
        transition: 0.25s opacity;
        width: 100%;
    }

    .art-container:hover .art-overlay {
        animation: overlay-show 6.25s linear;
    }

    .art-overlay:focus-within {
        opacity: 1 !important;
    }

    @media (pointer: coarse) {
        .art-overlay {
            opacity: 1;
        }
    }

    @keyframes overlay-show {
        0% {
            opacity: 0;
        }

        4% {
            opacity: 1;
        }

        84% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }

    .top-overlay {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 4rem;

        padding-left: 1rem;
        padding-top: 1rem;

        background: rgb(0,0,0, 0.5);
        background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0) 100%);

        color: #fff !important;
    }

    .top-overlay a {
        color: #fff !important;
    }

    :global(.control-button) {
        position: absolute;
        top: 50%;
        color: #fff !important;
    }

    :global(.control-button.left) {
        left: 1rem;
    }
    
    :global(.control-button.right) {
        right: 1rem;
    }
</style>