<script lang="ts">
    import { onMount } from "svelte";

    export let classes: string = '';

    const OFFSET = 0.09;
    let card: HTMLDivElement;

    const nr: {
        mousePos?: { x: number; y: number };
        hover?: boolean;
        inPhone?: boolean;
    } = {};

    function updateDimension() {

        if (nr.inPhone) return;

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
            x:
                (nr.mousePos!.x - oX - card.offsetWidth / 2) *
                ((oX + oW / 2) / window.innerWidth) *
                OFFSET,
            y:
                (nr.mousePos!.y - oY - card.offsetHeight / 2) *
                ((oY + oH / 2) / window.innerHeight) *
                OFFSET,
        };
    }

    function onMouseMove(ev: MouseEvent) {
        nr.mousePos = {
            x: ev.clientX,
            y: ev.clientY,
        };

        if (!nr.hover) return;

        const { x, y } = calculatePos();

        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);
    }

    onMount(async () => {
        
        nr.inPhone = window.innerWidth < 768;

        updateDimension();

        card.addEventListener("mousemove", onMouseMove);
        card.addEventListener("mouseenter", () => (nr.hover = true));
        card.addEventListener("mouseleave", () => () => {
            nr.hover = false;
            card.style.setProperty("--x", `0px`);
            card.style.setProperty("--y", `0px`);
        });

        window.addEventListener("resize", updateDimension);
        window.addEventListener("scroll", updateDimension);
    });
</script>

<div bind:this={card} class={`${classes} card`} style={`--offset: ${OFFSET}`}>
    <slot />
</div>
