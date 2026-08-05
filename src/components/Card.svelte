<script lang="ts">
    import { onMount } from "svelte";

    interface Props {
        classes?: string;
        rounded?: string;
        onclick?: (event: MouseEvent) => void;
        children?: import('svelte').Snippet;
    }

    let {
        classes = '',
        rounded = "2.5rem",
        onclick,
        children,
    }: Props = $props();

    const OFFSET = 0.09;
    let card = $state<HTMLButtonElement>();

    const nr: {
        mousePos?: { x: number; y: number };
        hover?: boolean;
        inPhone?: boolean;
    } = {};

    function updateDimension() {

        if (nr.inPhone || !card) return;

        const { top, left, width, height } = card.getBoundingClientRect();

        card.style.setProperty("--oX", `${left}px`);
        card.style.setProperty("--oY", `${top}px`);
        card.style.setProperty("--oW", `${width}px`);
        card.style.setProperty("--oH", `${height}px`);
    }

    function calculatePos() {
        if (!card) return { x: 0, y: 0 };

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
        if (!card) return;

        nr.mousePos = {
            x: ev.clientX,
            y: ev.clientY,
        };

        if (!nr.hover) return;

        const { x, y } = calculatePos();

        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);
    }

    onMount(() => {
        const element = card;
        if (!element) return;

        nr.inPhone = window.innerWidth < 768;

        updateDimension();

        const onMouseEnter = () => (nr.hover = true);
        const onMouseLeave = () => () => {
            nr.hover = false;
            element.style.setProperty("--x", `0px`);
            element.style.setProperty("--y", `0px`);
        };

        element.addEventListener("mousemove", onMouseMove);
        element.addEventListener("mouseenter", onMouseEnter);
        element.addEventListener("mouseleave", onMouseLeave);

        window.addEventListener("resize", updateDimension);
        window.addEventListener("scroll", updateDimension);

        return () => {
            element.removeEventListener("mousemove", onMouseMove);
            element.removeEventListener("mouseenter", onMouseEnter);
            element.removeEventListener("mouseleave", onMouseLeave);
            window.removeEventListener("resize", updateDimension);
            window.removeEventListener("scroll", updateDimension);
        };
    });
</script>

<button {onclick} bind:this={card} class={`${classes} card`} style={`--offset: ${OFFSET}; --rounded: ${rounded}`}>
    {@render children?.()}
</button>
