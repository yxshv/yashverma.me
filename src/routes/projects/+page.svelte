<!-- svelte-ignore a11y-click-events-have-key-events -->

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
        collabs?: Array<{
            name: string;
            pfp: string;
            link: string;
        }>;
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
            collabs: [
                {
                    name: "Dhravya Shah",
                    link: "https://dhravya.dev/",
                    pfp: "https://unavatar.io/twitter/dhravyashah",
                }
            ],
        },
        {
            title: "Cakecutter",
            description:
                "Project boostrapping and setup tool. Easier than making a cake",
            image: "/cc.png",
            link: "https://cakes.run",
            type: ["CLI"],
            collabs: [
                {
                    name: "Dhravya Shah",
                    link: "https://dhravya.dev/",
                    pfp: "https://unavatar.io/twitter/dhravyashah",
                },
            ],
        },
        {
            title: "Disco.pics",
            description: "Free unlimited image hosting and sharing platform",
            image: "/discopics.png",
            link: "https://disco.pics",
            type: ["WEB APP"],
            collabs: [
                {
                    name: "Dhravya Shah",
                    link: "https://dhravya.dev/",
                    pfp: "https://unavatar.io/twitter/dhravyashah",
                },
            ],
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
            <Card>
                <div
                    class="content flex gap-3 p-1 items-start text-left justify-center flex-col max-w-[20rem]"
                >
                    <a href={card.link} target="_blank">
                        <img
                            src={card.image}
                            alt={card.title}
                            class=" object-cover rounded-3xl"
                        />
                    </a>
                    <div class="">
                        <a
                            href={card.link} target="_blank" 
                            class="pl-2 text-2xl font-semibold underline decoration-transparent underline-offset-4 hover:decoration-white"
                        >
                            {card.title}
                        </a>
                        <p class="pl-2 mt-1 text-sm opacity-[0.8]">
                            {card.description}
                        </p>
                    </div>
                    <div
                        class="pl-2"
                    >
                        <div class="flex justify-start items-center flex-wrap gap-1 ">
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
                        {#if (card?.collabs ?? []).length > 0}
                            <div
                                class="flex justify-start items-center text-xs flex-wrap gap-1 mt-2"
                            >
                                <span class="opacity-75">In Collaboration with -</span> 
                                {#each (card.collabs ?? []) as collaborator, i}
                                    <a
                                        href={collaborator.link}
                                        target="_blank"
                                        class={`rounded-full gap-1 flex justify-center items-center border ${
                                            allColors[i % allColors.length]
                                        } font-semibold p-[2px] `}
                                    >
                                        <img class="w-5 h-5 rounded-full" src={collaborator.pfp} alt={collaborator.name}>
                                    </a>
                                {/each}
                            </div>
                        {/if}
                    </div>
                </div>
            </Card>
        {/each}
    </div>
</div>
