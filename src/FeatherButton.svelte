<script lang="ts">
    import FeatherIcon from "./FeatherIcon.svelte";

    export let icon: string;
    export let size = '24px';
    export let title: string;
</script>

<!-- svelte-ignore a11y-invalid-attribute -->
<a href="#" on:click|preventDefault class={$$props.class} {title}>
    <slot name="label:prepend"></slot>
    <FeatherIcon {icon} {size} prepended={'label:prepend' in $$slots} appended={'label:append' in $$slots} on:click />
    <slot name="label:append"></slot>
</a>

<style>
    .touch-target {
        display: flex;
        align-items: center;
        background-color: #fffd;
        box-sizing: border-box;
        padding: 0 4px;
        height: 26px;
        border-radius: 16px;
        box-shadow: #00000029 0 1.5px 3px 0;
        transition: 0.4s;
    }

    .touch-target:active,
    .touch-target:hover,
    .touch-target:focus {
        border-radius: 8px;
        background-color: #fffe;
        box-shadow: #0000007B 0 3px 4px 0;
    }
</style>