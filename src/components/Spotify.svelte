<script lang="ts">
    import Card from "./Card.svelte";
    import { PUBLIC_DISCORD_ID } from '$env/static/public'
    import { useLanyard } from "$lib/lanyard";

    const presence = useLanyard(PUBLIC_DISCORD_ID);
    let progress = $derived.by(() => {
        if (!$presence?.listening_to_spotify) return 0;

        const total = $presence.spotify.timestamps.end! - $presence.spotify.timestamps.start;
	    return 100 - (100 * ($presence.spotify.timestamps.end! - new Date().getTime())) / total;
    });

</script>

<Card onclick={() => {
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
                    <div></div>
                    <div></div>
                    <div></div>
                    <img src="/spotify.svg" alt="spotify" />
                </div>
                <div class="flex justify-center text-left flex-col">
                    <h1 class="text-lg font-semibold">Nothings playing</h1>
                    <p class="text-md opacity-75">right now</p>
                </div>
            {/if}
        </div>
        <div style={`display: ${$presence?.listening_to_spotify ? 'block': 'none'};`} class="h-[5px] w-full rounded-full bg-white/50">
            <div style={`width: ${progress}%;`} class="h-[5px] seek bg-white rounded-full transition-all"></div>
        </div>
    </div>
</Card>


<style>

    .music {
        position: relative;
        display: flex;
        width: 5rem;
        aspect-ratio: 1;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        background: #2a2a49;
    }

    .music > *:not(img) {
        width: 5px;
        aspect-ratio: 1 / 5;
        border-radius: 9999px;
        background: white;
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
        position: absolute;
        top: 0;
        right: 0;
        width: 1.25rem;
        translate: 33.333333% -33.333333%;
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
        position: relative;
    }

    .seek::before {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        width: 10px;
        height: 10px;
        border-radius: 9999px;
        background: white;
        transform: translate(50%, -50%);
    }

</style>
