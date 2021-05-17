<script lang="ts">
    import type { ArtInfo } from "./types";
    import FeatherIcon from './FeatherIcon.svelte';
    import { slide } from 'svelte/transition';

    export let artInfo: ArtInfo;
    export let presentImage: (artInfo: ArtInfo) => void;
</script>

<div class="card col-md-3 p-0 mb-2 me-2" transition:slide>
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a href="#" on:click|preventDefault="{()=>presentImage(artInfo)}">
        <!-- svelte-ignore a11y-missing-attribute -->
        <img src={artInfo.src} class="card-img" loading="lazy">
    </a>
    {#if artInfo.user.instagram || artInfo.isApproved}
        <div class="overlay">
            <div style="color: #fff">
                {#if artInfo.user.instagram}
                    <FeatherIcon icon='instagram' size='1rem' />
                    <a href={`https://instagram.com/${artInfo.user.instagram.trim()}`} class="card-link link-light">
                        {artInfo.user.instagram.trim()}
                    </a>
                {/if}
                {#if artInfo.isApproved}
                    <img src="check.png" alt="Approved" title="Approved" class="approved">
                {/if}
            </div>
        </div>
    {/if}
</div>

<style>
    .card {
        transition: 0.5s box-shadow;
        border: none;
    }

    .card:hover, .card:focus-within {
        box-shadow: 0 2px 4px #0006;
    }
    
    .card-img {
        aspect-ratio: 4/3;
    }

    .overlay {
        pointer-events: none;

        width: 100%;
        height: 25%;

        position: absolute;
        left: 0;
        bottom: 0;

        background: rgb(0,0,0, 0.5);
        background: linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%);

        opacity: 0;
        transition: 0.25s opacity;
    }

    .card:hover .overlay,
    .overlay:focus-within    {
        opacity: 1;
    }

    @media (pointer: coarse) {
        .card .overlay {
            opacity: 1;
        }
    }

    .overlay > div {
        position: absolute;
        left: 0.75rem;
        bottom: 0.75rem;
    }

    .approved {
        height: 1em;
        width: 1em;
    }

    a {
        pointer-events: all;
        color: #fff !important;
    }
</style>