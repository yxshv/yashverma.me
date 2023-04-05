<script lang="ts">
    import "./styles.css";
    import "highlight.js/styles/github-dark.css"
    import Giscus from '../../../components/giscus/Giscus.svelte';
    import BackToHome from "../../../components/BackToHome.svelte";

    export let data: {
        slug: string;
        post: string;
        attrs: {
            title?: string;
            date?: string;
            image?: string;
            tags?: string[];
        };
    };
</script>

<div class="flex justify-center items-center flex-col py-10">

    <BackToHome />
    <article
        class="text-white prose-slate prose-lg py-10 w-screen lg:w-[50vw] px-6"
    >
        <h1 class="title mb-0">{data.attrs.title}</h1>
        {#if data.attrs.date}
            <p class="text-sm font-semibold date text-white">
                <img
                    src="/calendar.svg"
                    class="w-5 -translate-y-[0.125rem] h-5 inline-block"
                    alt="calendar icon"
                />
                {data.attrs.date}
            </p>
        {/if}
        {#if data.attrs.image}
            <img class="mt-0" src={data.attrs.image} alt={data.attrs.title} />
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
</div>
