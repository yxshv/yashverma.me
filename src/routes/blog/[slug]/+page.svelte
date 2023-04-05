<script lang="ts">
    import "./styles.css";
    import "highlight.js/styles/github-dark.css";
    import Giscus from "../../../components/giscus/Giscus.svelte";
    import BackToHome from "../../../components/BackToHome.svelte";
    import { posts } from "../../../stores/posts.store";
    import { onMount } from "svelte";

    const allColors = ["rose", "green", "blue", "yellow"];

    export let data: {
        slug?: string;
        post?: string;
        fourOfour?: boolean;
    };

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ]

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]

    $: attrs = $posts[data.slug ?? "not-found"];
    $: date = `${days[attrs?.datePublished.getDay()]}, ${attrs?.datePublished.getDate()} ${
        months[attrs?.datePublished.getMonth()]
    } ${attrs?.datePublished.getFullYear()}`;

    onMount(async () => {
        const filenames: NodeListOf<HTMLDivElement> = document.querySelectorAll(".rehype-code-title");

        filenames.forEach((filename) => {
            const filenameText = filename.textContent

            if (filenameText === undefined) return
            
            if (filenameText === "terminal") filename.style.setProperty("--icon", "url('/term.svg')")

            if (filenameText === "types") filename.style.setProperty("--icon", "url('/techstack/ts.svg')")

        })
    })

</script>

<svelte:head>
    <title>Blogs • Yash Verma</title>
    <meta name="description" content="Sharings things I learn" />
    <meta property="og:title" content="Blogs • Yash Verma" />
    <meta property="og:description" content="Sharings things I learn" />
    <meta property="og:image" content="/og/blog.png" />
    <meta property="twitter:image" content="/og/blog.png" />
</svelte:head>

<div class="flex justify-center items-center flex-col py-10">
    <BackToHome />
    <div class="w-full lg:w-[50vw] px-6 mt-10">
        <button on:click={() => window.location.href="/blog"} class="text-left bg-bg border px-3 py-1 rounded-full border-outline mr-auto no-underline text-white inline-flex gap-1 justify-start items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-[1.1rem] h-[1.1rem]" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20v-2z"/></svg> 
            Back
        </button>
    </div>
    {#if data.fourOfour}
        <h1 class="four04 font-bold">404</h1>
        <p class="four04-p text-center text-2xl">This page does not exist</p>
    {:else}
        <article
            class="text-white prose-slate prose-lg py-10 w-screen lg:w-[50vw] px-6"
        >
            {#if !attrs?.isPublished}
                <blockquote class="notPublished">
                    <p>
                        This Blog is not published yet. This URL is public but secret, so share at your own discretion.
                    </p>
                </blockquote>
            {/if}
            <h1 class="title mb-5">{attrs?.title}</h1>

            <div class="flex justify-start items-center flex-wrap gap-1 ">
                {#each attrs?.tags ?? [] as tag, index}
                    <div
                        class={`rounded-md border ${
                            allColors[index % allColors.length]
                        } font-semibold text-xs px-2 py-1`}
                    >
                        {tag}
                    </div>
                {/each}
            </div>

            {#if attrs?.datePublished}
                <p class="text-sm font-semibold date -mt-1 text-white">
                    <img
                        src="/calendar.svg"
                        class="w-5 -translate-y-[0.125rem] h-5 inline-block"
                        alt="calendar icon"
                    />
                    {date}
                </p>
            {/if}
            {#if attrs?.image}
                <img class="mt-0" src={attrs?.image} alt={attrs?.title} />
            {/if}

            {@html data.post}

            <Giscus
                repo="yxshv/yashverma.me"
                repoId="R_kgDOJPfgbw"
                category="General"
                categoryId="DIC_kwDOJPfgb84CVioQ"
                mapping="pathname"
                strict="0"
                term="Welcome to giscus!"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme="dark"
                lang="en"
                loading="lazy"
            />
        </article>
    {/if}
</div>
