<script>
    import BackToHome from "../../components/BackToHome.svelte";

</script>
<div class="lg:p-20 p-10 relative text-[#9DA8C2]">
    <div class="overlay"><div class="fade-out" /></div>
    <BackToHome classes="mt-10" />

    <h1 class="mt-20 relative isolate text-6xl lg:text-8xl font-bold text-center w-full outline-text">PROJECTS</h1>
    <p class="text-center w-full mt-2 font-semibold text-xl">Things I have built so far</p>

    
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
        ;
    }

    .overlay {
        @apply absolute z-[-1] top-0 left-0 w-full h-screen opacity-50;
        background-image: url(/grid.svg);
    }

    .overlay .fade-out {
        @apply absolute z-[10] top-0 left-0 w-full h-screen;
        background-image: radial-gradient(circle, transparent 0%, #131325 80%, #131325 100%);
    }

</style>