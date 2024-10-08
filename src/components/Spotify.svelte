<!-- svelte-ignore a11y-click-events-have-key-events -->

<script lang="ts">
    import Card from "./Card.svelte";
    import { PUBLIC_DISCORD_ID } from '$env/static/public'
    import { useLanyard } from "sk-lanyard";

    const presence = useLanyard({ method: "ws", id: PUBLIC_DISCORD_ID });
    let progress = 0;

    $: if ($presence?.listening_to_spotify) {
        const total = $presence.spotify.timestamps.end! - $presence.spotify.timestamps.start;
	    progress = 100 - (100 * ($presence.spotify.timestamps.end! - new Date().getTime())) / total;
    }

</script>

<Card on:click={() => {
    window.open("https://open.spotify.com/track/" + $presence?.spotify.track_id)
}} classes="w-full lg:aspect-[1] lg:flex-1 cursor-pointer">
    <div class="content py-5 lg:py-0 min-w-[70%] flex justify-center item-center gap-3 flex-col">
        <div class="flex justify-center items-center gap-2">
            {#if $presence?.listening_to_spotify}
                <img src={$presence?.spotify.album_art_url} class="w-20" alt="spotify" />
                <div class="flex justify-center text-left flex-col">
                    <h1 class="text-lg font-semibold">
                        {$presence?.spotify.song}
                    </h1>
                    <p class="text-md opacity-75">{$presence?.spotify.artist}</p>
                </div>
                {:else}
                <div class="music">
                    <div />
                    <div />
                    <div />
                    <img src="/spotify.svg" alt="spotify" />
                </div>
                <div class="flex justify-center text-left flex-col">
                    <h1 class="text-lg font-semibold">Nothings playing</h1>
                    <p class="text-md opacity-75">right now</p>
                </div>
            {/if}
        </div>
        <div style={`display: ${$presence?.listening_to_spotify ? 'block': 'none'};`} class="h-[5px] w-full rounded-full bg-white/50">
            <div style={`width: ${progress}%;`} class="h-[5px] seek bg-white rounded-full transition-all" />
        </div>
    </div>
</Card>


<style lang="postcss">

    .music {
        @apply relative w-20 aspect-[1] gap-1 flex justify-center items-center bg-[#2A2A49];
    }

    .music > *:not(img) {
        @apply w-[5px] aspect-[1/5] bg-white rounded-full;
    }

    .music > div:nth-child(1) {
        animation: scaleUpDown 1s ease-in-out infinite 500ms;
    }

    .music > div:nth-child(2) {
        animation: scaleUpDown 1s ease-in-out infinite 1000ms;
    }

    .music > div:nth-child(3) {
        animation: scaleUpDown 1s ease-in-out infinite 1500ms;
    }

    .music > img {
        @apply absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-5;
    }

    @keyframes scaleUpDown {
        0% {
            transform: scaleY(1);
        }
        50% {
            transform: scaleY(0.5);
        }
        100% {
            transform: scaleY(1);
        }
    }

    .seek {
        @apply relative;
    }

    .seek::before {
        content: '';
        @apply absolute top-1/2 right-0 w-[10px] h-[10px] rounded-full bg-white;
        transform: translate(50%, -50%);
    }

</style>
