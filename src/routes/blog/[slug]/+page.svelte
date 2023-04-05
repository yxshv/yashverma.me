<script lang="ts">

    import "./styles.css";
    import "highlight.js/styles/github-dark.css";

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

<div class="flex justify-center items-center">
    <article class="text-white prose-slate prose-lg py-10 w-screen lg:w-[50vw] px-6">
        <h1 class="title mb-0">{data.attrs.title}</h1>
        {#if data.attrs.date}
            <p class="text-sm font-semibold date text-white"><img src="/calendar.svg" class="w-5 -translate-y-[0.125rem] h-5 inline-block" alt="calendar icon" /> {data.attrs.date}</p>
        {/if}
        {#if data.attrs.image}
            <img class="mt-0" src={data.attrs.image} alt={data.attrs.title} />
        {/if}
        <div class="h-[1px] w-full bg-outline" />
        {@html data.post}
    </article>
</div>
