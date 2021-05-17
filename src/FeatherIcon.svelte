<script lang="ts">
    import { icons } from 'feather-icons';

    const DEFAULT_ICON = 'help-circle';
    export let icon = DEFAULT_ICON;
    export let size = '24px';

    const iconData = icons[icon] || icons[DEFAULT_ICON];
    iconData.attrs.width = size;
    iconData.attrs.height = size;
    if ($$props.prepended) {
        iconData.attrs.class += ' prepended';
    }
    if ($$props.appended) {
        iconData.attrs.class += ' appended';
    }
</script>

<svg {...iconData.attrs}>{@html iconData.contents}</svg>

<style>
    .prepended {
        margin-left: 4px;
    }

    
    .appended {
        margin-right: 4px;
    }
</style>