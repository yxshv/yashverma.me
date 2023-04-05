<script lang="ts">

    import "./styles.css";
    import "highlight.js/styles/github-dark.css";

    export let data: {
        slug: string;
        post: string;
    };
</script>

<div class="flex justify-center items-center">
    <article class="text-white prose-slate prose-lg py-10 w-screen lg:w-[50vw] px-6">
        <div class="h-[1px] w-full bg-outline" />
        {@html data.post}
    </article>
</div>
