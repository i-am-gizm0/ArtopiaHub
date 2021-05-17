<script lang="ts">

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-utilities.css'
import ArtCard from './ArtCard.svelte';
import Modal from './Modal.svelte';
import type { ArtInfo } from './types';
import Analytics from './Analytics.svelte';

let status = 'loading';

let artwork: ArtInfo[] = [];

let displayIndex: number;

function presentImage(artInfo: ArtInfo) {
    displayIndex = artwork.indexOf(artInfo);
}

fetch('https://api-dashboard.lili.network/artopia/approved').then(async response => {
    if (response.ok) {
        artwork = await response.json();
        status = 'loaded';
    } else {
        status = `Something went wrong. Try refreshing the page. API responded with ${response.status} ${response.statusText}:<br>\n${(await response.text()).replace(/\n/g, '<br>')}`;
    }
});

$: document.body.style.overflowY = displayIndex != undefined ? 'clip' : 'auto';
</script>

<nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="#" class="navbar-brand">Artøpia Hub</a>
        <span class="text-muted">Unofficial submissions site</span>
    </div>
</nav>

<main class="container-fluid">
    <div class="row justify-content-md-center m-2">
        {#if status == 'loading'}
        <div class="spinner-border text-dark" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        {:else if status == 'loaded'}
            {#each artwork as artInfo}
                <ArtCard {artInfo} {presentImage} />
            {/each}
        {:else}
            <span>{@html status}</span>
        {/if}
    </div>
</main>

<footer>
    <hr>
    <p class="text-muted">
        This site is not in any way affiliated with Twenty One Pilots or Artøpia. It is entirely fan-created and fan-run.
    </p>
    <p class="text-muted">
        On page load, current approved artwork is pulled from <a href="https://api-dashboard.lili.network/artopia/approved">Maestro</a> and displayed here.
    </p>
    <p class="text-muted">
        This app is a work-in-progress. You can follow its development and contribute on the <a href="https://github.com/i-am-gizm0/ArtopiaHub/">GitHub Repository</a>.
    </p>
</footer>

{#if displayIndex !== undefined}
    <Modal {artwork} bind:displayIndex={displayIndex} />
{/if}

<svelte:head>
    <style>
        html, body {
            margin: 0;
            padding: 0;
        }
    </style>
</svelte:head>

<style>
    footer {
        width: 100%;
        padding: 1rem;
        text-align: center;
    }
</style>

<Analytics />