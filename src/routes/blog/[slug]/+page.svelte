<script lang="ts">
    import "./styles.css";
    import "highlight.js/styles/github-dark.css";
    import Giscus from "../../../components/giscus/Giscus.svelte";
    import BackToHome from "../../../components/BackToHome.svelte";
    import { posts } from "../../../stores/posts.store";

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
    $: date = `${days[attrs.datePublished.getDay()]}, ${attrs.datePublished.getDay()} ${
        months[attrs.datePublished.getMonth()]
    } ${attrs.datePublished.getFullYear()}`;

</script>

<div class="flex justify-center items-center flex-col py-10">
    <BackToHome />
    {#if data.fourOfour}
        <h1 class="four04 font-bold">404</h1>
        <p class="four04-p text-center text-2xl">This page does not exist</p>
    {:else}
        <article
            class="text-white prose-slate prose-lg py-10 w-screen lg:w-[50vw] px-6"
        >
            {#if !attrs.isPublished}
                <blockquote class="notPublished">
                    <p>
                        This Blog is not published yet. This URL is public but secret, so share at your own discretion.
                    </p>
                </blockquote>
            {/if}
            <h1 class="title mb-0">{attrs.title}</h1>
            {#if attrs.datePublished}
                <p class="text-sm font-semibold date text-white">
                    <img
                        src="/calendar.svg"
                        class="w-5 -translate-y-[0.125rem] h-5 inline-block"
                        alt="calendar icon"
                    />
                    {date}
                </p>
            {/if}
            {#if attrs.image}
                <img class="mt-0" src={attrs.image} alt={attrs.title} />
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
