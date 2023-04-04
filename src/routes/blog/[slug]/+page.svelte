<script lang="ts">

    import "./styles.css";
    import "highlight.js/styles/base16/atelier-plateau.css";

    export let data: {
        slug: string;
        post: string;
    };
</script>

<div class="flex justify-center items-center">
    <div class="text-white prose-slate lg:prose-lg w-[50vw] px-6">
        {@html data.post}
    </div>
</div>
