<script lang="ts">
    import Card from "./Card.svelte";
    import { PUBLIC_DISCORD_ID } from '$env/static/public'
    import { useLanyard } from "sk-lanyard";

    const presence = useLanyard({ method: "ws", id: PUBLIC_DISCORD_ID });
    const colors: { [key: string]: string } = {
        "idle": "#F0B232",
        "online": "#23A55A",
        "dnd": "#EC3E42",
        "offline": "#80848E"
    }

</script>

<Card>
    <div class="content flex justify-center items-center p-10">
        <div class="avatar w-20 rounded-full" style={`--color: ${colors[$presence?.discord_status ?? "offline"]};`}>
            <img 
                src={$presence ? `https://cdn.discordapp.com/avatars/${$presence?.discord_user.id}/${$presence?.discord_user.avatar}` : "/nopfp.jpg"}
                alt="discord user avatar"
                class="rounded-full w-20"
            />
        </div>
        <div class="flex flex-col justify-center items-center gap-2 ml-4">
            <h1 class="text-lg">
                {#if $presence}
                    {$presence?.discord_user.username}<span class="opacity-50">#{$presence?.discord_user.discriminator}</span>
                {:else}
                    <span class="inline-block w-[100px] h-[20px] bg-white/10 rounded-md" />
                {/if}
            </h1>
            <p>{JSON.stringify($presence?.activities)}</p>
        </div>
    </div>
</Card>

<style lang="postcss">
    .avatar {
        position: relative;
    }

    .avatar::before {
        content: "";

        @apply absolute bg-[#1B1B31] bottom-0 right-0 w-5 h-5 rounded-full -translate-x-1 -translate-y-1;
    }

    .avatar::after {
        content: "";

        @apply absolute bottom-0 right-0 w-5 h-5 scale-[0.6] rounded-full -translate-x-1 -translate-y-1;
        
        background: var(--color);
    }

</style>