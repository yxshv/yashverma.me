<script lang="ts">
    import { onMount } from "svelte";

    const OFFSET = 0.08;
    let card: HTMLDivElement;

    const nr: {
        mousePos?: { x: number; y: number; },
        hover?: boolean
    } = {}

    function updateDimension() {
        const { top, left, width, height } = card.getBoundingClientRect();

        card.style.setProperty("--oX", `${left}px`);
        card.style.setProperty("--oY", `${top}px`);
        card.style.setProperty("--oW", `${width}px`);
        card.style.setProperty("--oH", `${height}px`);
    }

    function calculatePos() {

        const oX = parseInt(card.style.getPropertyValue("--oX"));
        const oY = parseInt(card.style.getPropertyValue("--oY"));
        const oW = parseInt(card.style.getPropertyValue("--oW"));
        const oH = parseInt(card.style.getPropertyValue("--oH"));

        return {
            x: ((nr.mousePos!.x - oX - card.offsetWidth/2) * ((oX + oW/2)/window.innerWidth) * OFFSET),
            y: ((nr.mousePos!.y - oY - card.offsetHeight/2) * ((oY + oH/2)/window.innerHeight) * OFFSET)
        }
    }

    function onMouseMove(ev: MouseEvent) {

        nr.mousePos = { 
            x: ev.clientX,
            y: ev.clientY,
        }

        if (!nr.hover) return
        
        const { x, y } = calculatePos();

        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);

    }

    onMount(async () => {
        
        updateDimension();
        
        card.addEventListener('mousemove', onMouseMove)
        card.addEventListener('mouseenter', () => nr.hover = true)
        card.addEventListener('mouseleave', () => () => {
            nr.hover = false;
            card.style.setProperty("--x", `0px`);
            card.style.setProperty("--y", `0px`);
        })


        window.addEventListener("resize", updateDimension);
        window.addEventListener("scroll", updateDimension);
    });

</script>

<div bind:this={card} class="card h-full" style={`--offset: ${OFFSET}`}>
    <div class="h-[70%] p-0">
        <div class="content rounded-[1.7rem] content-hs">
            <div class="map relative">
                <img class="w-80 " src="/map.png" />
                <div class="logo absolute rounded-full bg-[#1B1B31] p-[3px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <img class="w-8 rounded-full" src="/logo.jpg" />
                </div>
            </div>
        </div>
    </div>
    <div class="h-[30%] text-center">
        <h1 class="text-xl font-semibold">Bhopal, Madhya Pradesh</h1>
        <p class="text-lg opacity-75">India</p>
    </div>
</div>

<style lang="postcss">
    .content.img {
        padding: 0 !important;
        width: 240px;
        height: 190px;
        scale: 1.5;
        display: flex;
    }

    .card {
        transition: all 200ms ease-in-out;
        overflow: hidden;
        color: white;

        @apply rounded-3xl flex-col flex justify-center p-3 gap-2;

        border: 1px solid #474466;

        @apply p-4 flex bg-[#1B1B31] justify-center items-center rounded-[2.5rem] gap-5;

        will-change: transform;
        transition: scale 200ms ease-in-out;
    }
    
    .card:hover {
        scale: 1.05;
        transform: translate(var(--x), var(--y));
    }

    .content {
        will-change: transform;
    }

    .card:hover .content > * {
        transform: translate(calc(-1 * var(--x)), calc(-1 * var(--y)));
    }
    
    .content-hs {
        overflow: hidden;
    }

    .card .content-hs > * {
        scale: calc(1 + var(--offset));
    }

</style>
