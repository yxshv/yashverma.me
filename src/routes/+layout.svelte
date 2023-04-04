<script>
    import "./styles.css";
</script>

<slot />

<style lang="postcss">
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
