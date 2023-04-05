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
        <h1 class="title">{data.attrs.title}</h1>
        {#if data.attrs.image}
        <img src={data.attrs.image} alt={data.attrs.title} />
        {/if}
        {#if data.attrs.date}
        <p class="text-sm text-gray-400"><img src="/calendar.svg" class="w-5 h-5 inline-block" /> {data.attrs.date}</p>
        {/if}
        <div class="h-[1px] w-full bg-outline" />
        {@html data.post}
    </article>
</div>
