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

    const allColors = ["rose", "yellow", "blue", "green"];

    const cards: Card[] = [
        {
            title: "Next.js",
            description: "The React Framework for Production",
            image: "/techstack/next.svg",
            link: "https://nextjs.org/",
            type: ["WEB FRAMEWORK"]
        },
        {
            title: "Svelte",
            description: "Svelte is a javascript web framework which is similar to React, rerendering on state changes",
            image: "/techstack/svelte.svg",
            link: "https://svelte.dev/",
            type: ["WEB FRAMEWORK"]
        },
        {
            title: "TailwindCSS",
            description: "TailwindCSS is utility-first CSS framework packed with classes, So you'll never need to touch CSS",
            image: "/techstack/tailwind.svg",
            link: "https://tailwindcss.com/",
            type: ["DESIGN","CSS FRAMEWORK"]
        },
        {
            title: "Prisma",
            description: "Prisma is a ORM that allows you make request to your database without writing SQL queries",
            image: "/techstack/prisma.svg",
            link: "https://prisma.io/",
            type: ["DATABASE", "ORM"]
        },
        {
            title: "Auth.js",
            description: "Auth.js is an open-source authentication solution for web applications. Implement OAuth in your websites in seconds!",
            image: "/techstack/auth.webp",
            link: "https://authjs.dev",
            type: ["AUTHENTICATION"]
        },
        {
            title: "Typescript",
            description: "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
            image: "/techstack/ts.svg",
            link: "https://typescriptlang.org/",
            type: ["LANGUAGE"]
        },
        {
            title: "PlanetScale",
            description: "PlanetScale is the world's most advanced serverless MySQL platform.",
            image: "/techstack/pscale.svg",
            link: "https://planetscale.com/",
            type: ["DATABASE"]
        },
        {
            title: "Go-Fiber",
            description: "Fiber is an express.js-inspired web framework for Go, its built on top of Fasthttp, the fastest HTTP engine for Go",
            image: "/techstack/gofiber.svg",
            link: "https://gofiber.io/",
            type: ["HTTP FRAMEWORK"]
        },
        {
            title: "Spline",
            description: "Spline is a web-based, 3D collaborative editor allowing you to create amazing 3D art with an easy to use editor and embeding them into your website with a single line of code.",
            image: "/techstack/spline.png",
            link: "https://spline.design/",
            type: ["3D"]
        },
        {
            title: "Umami",
            description:"Umami is an open source, privacy-focused alternative to Google Analytics.",
            image: "/techstack/umami.svg",
            link: "https://umami.is/",
            type: ["ANALYTICS"]
        },
        {
            title: "Vercel",
            description: "Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.",
            image: "/techstack/vercel.svg",
            link: "https://vercel.com/",
            type: ["HOSTING"]
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

    <div class="p-10 flex justify-center items-center flex-wrap lg:p-24 gap-8">
        {#each cards as card}
            <Card on:click={() => window.open(card.link, "_blank")} classes="cursor-pointer aspect-[1] lg:w-[350px] ">
                <div
                    class="content flex gap-3 p-1 items-center text-center justify-center flex-col max-w-[20rem]"
                >
                    <div class="bg-[#2B2E4F] p-5 flex rounded-xl border border-[#474466] justify-center items-center aspect-[1]">
                        <img
                            src={card.image}
                            alt={card.title}
                            class="w-10"
                        />
                    </div>
                    <div class="">
                        <h1 class="pl-2 text-2xl font-semibold">
                            {card.title}
                        </h1>
                        <p class="pl-2 mt-1 text-sm opacity-[0.8]">
                            {card.description}
                        </p>
                    </div>
                    <div
                        class="pl-2"
                    >
                        <div class="flex justify-center items-center flex-wrap gap-1 ">
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
