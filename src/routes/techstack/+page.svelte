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
    }

    const allColors = ["rose", "green", "blue", "yellow"];

    const cards: Card[] = [
        {
            title: "Next.js",
            description: "The React Framework for Production",
            image: "/techstack/next.svg",
            link: "https://nextjs.org/",
        },
        {
            title: "Svelte",
            description: "Svelte a javascript web framework which is kinda similar to React, rerendering on state changes",
            image: "/techstack/svelte.svg",
            link: "https://svelte.dev/",
        },
        {
            title: "TailwindCSS",
            description: "TailwindCSS is utility-first CSS framework packed with classes, So you'll never need to touch CSS",
            image: "/techstack/tailwind.svg",
            link: "https://tailwindcss.com/",
        },
        {
            title: "Prisma",
            description: "Prisma is a ORM that allows you make request to your database without writing SQL queries",
            image: "/techstack/prisma.svg",
            link: "https://prisma.io/",
        },
        {
            title: "Auth.js",
            description: "Auth.js is an open-source authentication solution for web applications. Implement OAuth in your websites in seconds!",
            image: "/techstack/auth.webp",
            link: "https://authjs.dev",
        },
        {
            title: "Typescript",
            description: "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
            image: "/techstack/ts.svg",
            link: "https://typescriptlang.org/",
        },
        {
            title: "PlanetScale",
            description: "PlanetScale is the world's most advanced serverless MySQL platform.",
            image: "/techstack/pscale.svg",
            link: "https://planetscale.com/",
        },
        {
            title: "Typescript",
            description: "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
            image: "/techstack/ts.svg",
            link: "https://typescriptlang.org/",
        },
        {
            title: "Go-Fiber",
            description: "Fiber is an express.js-inspired web framework for Go, its built on top of Fasthttp, the fastest HTTP engine for Go",
            image: "/techstack/gofiber.svg",
            link: "https://gofiber.io/",
        },
        {
            title: "Spline",
            description: "Spline web-based, collaborative 3D editor, Create amazing 3D art with an easy to use editor and embed them into your website with just one line of code.",
            image: "/techstack/spline.png",
            link: "https://spline.design/",
        },
        {
            title: "Umami",
            description:"Umami is an open source, privacy-focusedalternative to Google Analytics.",
            image: "/techstack/umami.svg",
            link: "https://umami.is/", 
        },
        {
            title: "Vercel",
            description: "Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.",
            image: "/techstack/vercel.svg",
            link: "https://vercel.com/",
        }
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
                MY TECH STACK
            </h1>
            <p class="text-center w-full mt-2 font-semibold text-xl">
                The tools I use to build stuff
            </p>
        </div>
    </div>

    <div class="p-10 flex justify-center items-center flex-wrap lg:p-28 gap-5">
        {#each cards as card}
            <Card on:click={() => window.open(card.link, "_blank")}>
                <div
                    class="content flex gap-3 p-1 items-start justify-center flex-col max-w-[20rem]"
                >
                    <div class="bg-[#2B2E4F] p-5 aspect-[1]">
                        <img
                            src={card.image}
                            alt={card.title}
                            class="w-10 rounded-sm"
                        />
                    </div>
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
                        <!-- </div>
                        {#if (card?.collabs ?? []).length > 0}
                            <div
                                class="flex justify-start items-center text-xs flex-wrap gap-1 mt-2"
                            >
                                <span class="opacity-75">In Collaboration with -</span> 
                                {#each (card.collabs ?? []) as collaborator, index}
                                    <a
                                        href={collaborator.link}
                                        target="_blank"
                                        class={`rounded-full gap-1 flex justify-center items-center border ${
                                            allColors[index % allColors.length]
                                        } font-semibold p-[2px] `}
                                    >
                                        <img class="w-5 h-5 rounded-full" src={collaborator.pfp} alt={collaborator.name}>
                                        {collaborator.name}
                                    </a>
                                {/each}
                            </div>
                        {/if} -->
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
