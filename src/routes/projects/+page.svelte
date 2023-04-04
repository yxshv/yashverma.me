<script lang="ts">
    import BackToHome from "../../components/BackToHome.svelte";
    import Card from "../../components/Card.svelte";

    import "../../cards.css";

    interface Card {
        title: string;
        description: string;
        image: string;
        link: string;
        type?: string[];
    }

    const allColors = ["rose", "green", "blue", "yellow"];

    const cards: Card[] = [
        {
            title: "LMFAO.tech",
            description:
                "One place for all your meme needs. Meme creator and more",
            image: "/lmfao-tech.png",
            link: "https://lmfao.tech",
            type: ["WEB APP", "PWA", "TWIITER BOT"],
        },
        {
            title: "Cakecutter",
            description:
                "Project boostrapping and setup tool. Easier than making a cake",
            image: "/cc.png",
            link: "https://cakes.run",
            type: ["CLI"],
        },
        {
            title: "Disco.pics",
            description: "Free unlimited image hosting and sharing platform",
            image: "/discopics.png",
            link: "https://disco.pics",
            type: ["WEB APP"],
        },
        {
            title: "Req-Cool",
            description: "A simple and easy to use free API testing tool.",
            image: "/reqcool.png",
            link: "https://req-cool.vercel.app",
            type: ["WEB APP"],
        },
        {
            title: "Buga-Chat",
            description: "Completely anonymous chat app",
            image: "/buga.png",
            link: "https://buga-chat.vercel.app",
            type: ["WEB APP", "WEBSOCKET", "API"],
        },
    ];
</script>

<div class="relative text-[#9DA8C2]">
    <div class="grid-overlay"><div class="fade-out" /></div>
    <div
        class="h-screen w-full flex justify-center items-center flex-col gap-10"
    >
        <BackToHome />

        <div>
            <h1
                class="relative isolate text-6xl lg:text-8xl font-bold text-center w-full outline-text"
            >
                PROJECTS
            </h1>
            <p class="text-center w-full mt-2 font-semibold text-xl">
                Things I have built so far
            </p>
        </div>
    </div>

    <div class="p-10 flex justify-center items-center flex-wrap lg:p-28 gap-5">
        {#each cards as card}
            <Card on:click={() => window.open(card.link)} classes="cursor-pointer">
                <div
                    class="content flex gap-3 p-1 items-start justify-center flex-col max-w-[20rem]"
                >
                    <img
                        src={card.image}
                        alt={card.title}
                        class=" aspect-[16/9] rounded-3xl"
                    />
                    <div class="">
                        <h1 class="pl-2 text-2xl font-semibold">
                            {card.title}
                        </h1>
                        <p class="pl-2 mt-1 text-sm opacity-[0.8]">
                            {card.description}
                        </p>
                    </div>
                    <div
                        class="flex justify-start items-center flex-wrap gap-1 pl-2"
                    >
                        {#each card?.type ?? [] as type, index}
                            <div
                                class={`rounded-md border ${
                                    allColors[index % allColors.length]
                                } font-semibold text-xs px-2 py-1`}
                            >
                                {type}
                            </div>
                        {/each}
                    </div>
                </div>
            </Card>
        {/each}
    </div>
</div>

<style lang="postcss">
    .outline-text {
        --spread: 1.15px;
        --color: rgb(255, 255, 255, 0.7);

        text-shadow: var(--spread) var(--spread) 0px var(--color),
            calc(-1 * var(--spread)) calc(-1 * var(--spread)) 0px var(--color),
            calc(-1 * var(--spread)) var(--spread) 0px var(--color),
            var(--spread) calc(-1 * var(--spread)) 0px var(--color),
            0 0 120px rgb(255 255 255 / 0.5);
    }

    .rose {
        @apply border-rose-600 bg-rose-500/20 text-rose-500;
    }

    .green {
        @apply border-green-600 bg-green-500/20 text-green-500;
    }

    .yellow {
        @apply border-yellow-600 bg-yellow-500/20 text-yellow-500;
    }

    .blue {
        @apply border-blue-600 bg-blue-500/20 text-blue-500;
    }
</style>
