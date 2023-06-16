<script lang="ts">
    import Card from "./Card.svelte";
    import { PUBLIC_DISCORD_ID } from "$env/static/public";
    import { useLanyard } from "sk-lanyard";

    const presence = useLanyard({ method: "ws", id: PUBLIC_DISCORD_ID });
    const colors: { [key: string]: string } = {
        idle: "#F0B232",
        online: "#23A55A",
        dnd: "#EC3E42",
        offline: "#80848E",
    };
    const activities: { [key: string]: string } = {
        0: "Playing",
        1: "Streaming",
        2: "Listening to",
        3: "Watching",
        4: "",
        5: "Competing in",
        9: "",
    };

    let status: [string, string] = ["", ""];

    $: {
        const act = $presence?.activities;
        if (act) {
            let set = false;
            act.forEach((a) => {
                if (set && status[0] !== "Listening" && a.type !== 0) return;
                if (a.type === 4) {
                    status = [a.state, ""];
                    set = true;
                } else {
                    status = [activities[a.type], a.name];
                    set = true;
                }
            });
        }
    }
</script>

<Card on:click={() => {
    window.open(`https://discord.com/users/${PUBLIC_DISCORD_ID}`)
}} classes="cursor-pointer">
    <div class="content relative text-left flex justify-center items-center p-5 lg:p-10">
        <img src="/discord.svg" alt="discord logo" class="top-2 right-2 w-5 absolute" />
        <div
            class="avatar w-20 rounded-full"
            style={`--color: ${
                colors[$presence?.discord_status ?? "offline"]
            };`}
        >
            <img
                src={$presence
                    ? `https://cdn.discordapp.com/avatars/${$presence?.discord_user.id}/${$presence?.discord_user.avatar}`
                    : "/nopfp.jpg"}
                alt="discord user avatar"
                class="rounded-full w-20"
            />
        </div>
        <div class="flex flex-col justify-center items-start ml-4">
            {#if $presence}
                <h1 class="text-lg">
                    {$presence?.discord_user.username}
                </h1>
                <p class="text-sm">
                    {status[0]}
                    <span class="underline underline-offset-2">
                        {status[1]}
                    </span>
                </p>
            {:else}
                <h1 class="text-lg">
                    <span
                        class="inline-block w-[100px] h-[15px] bg-white/10 rounded-md"
                    />
                </h1>
                <p class="w-[100px] h-[15px] bg-white/10 rounded-md inline-block" />
            {/if}
        </div>
    </div>
</Card>

<style lang="postcss">
    .avatar {
        position: relative;
    }

    .avatar::before {
        content: "";

        @apply absolute bg-bg bottom-0 right-0 w-5 h-5 rounded-full -translate-x-1 -translate-y-1;
    }

    .avatar::after {
        content: "";

        @apply absolute bottom-0 right-0 w-5 h-5 scale-[0.7] rounded-full -translate-x-1 -translate-y-1;

        background: var(--color);
    }
</style>
