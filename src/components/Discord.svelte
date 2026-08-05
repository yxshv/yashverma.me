<script lang="ts">
    import Card from "./Card.svelte";
    import { PUBLIC_DISCORD_ID } from "$env/static/public";
    import { useLanyard } from "$lib/lanyard";
    import { untrack } from "svelte";

    const presence = useLanyard(PUBLIC_DISCORD_ID);
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

    let status = $state<[string, string]>(["", ""]);

    $effect(() => {
        const act = $presence?.activities;
        if (act) {
            let current: [string, string] = [...untrack(() => status)];
            let set = false;
            act.forEach((a) => {
                if (set && current[0] !== "Listening" && a.type !== 0) return;
                if (a.type === 4) {
                    current = [a.state, ""];
                    set = true;
                } else {
                    current = [activities[a.type], a.name];
                    set = true;
                }
            });

            status = current;
        }
    });
</script>

<Card onclick={() => {
    window.open(`https://discord.com/users/${PUBLIC_DISCORD_ID}`)
}} classes="cursor-pointer w-full lg:w-auto">
    <div class="content w-full lg:w-auto relative text-left flex justify-center items-center p-5 lg:p-10">
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
                <!-- svelte-ignore a11y_missing_content -->
                <h1 class="text-lg">
                    <span
                        class="inline-block w-[100px] h-[15px] bg-white/10 rounded-md"
></span>
                </h1>
                <p class="w-[100px] h-[15px] bg-white/10 rounded-md inline-block"></p>
            {/if}
        </div>
    </div>
</Card>

<style>
    .avatar {
        position: relative;
    }

    .avatar::before {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 9999px;
        background: #1b1b31;
        translate: -0.25rem -0.25rem;
    }

    .avatar::after {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 9999px;
        background: var(--color);
        translate: -0.25rem -0.25rem;
        scale: 0.7;
    }
</style>
