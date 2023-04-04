<script lang="ts">

    import "./styles.css";
    import "highlight.js/styles/base16/atelier-plateau.css";

    export let data: {
        slug: string;
        post: string;
    };
</script>

<div class="flex justify-center items-center">
    <article class="text-white prose-slate prose-lg w-screen lg:w-[50vw] px-6">
        <div />
        {@html data.post}
    </article>
</div>
