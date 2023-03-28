<script lang="ts">
    import { onMount } from "svelte";
    import {} from "svelte/transition";

    interface Card {
        title: string;
        description: string;
        image: string;
        link: string;
    }

    interface CardPositionData {
        originalPos: {
            x: number;
            y: number;
            z: number;
        };
        z: number;
    }

    const MAGNITUDE_ON_INCREASE = 1 / 2;
    const DISTANCE_BW_CARDS = 200;
    const cards: Card[] = [
        {
            title: "LMFAO.tech",
            description:
                "A website that generates random tech jargon. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
            image: "https://lmfao.tech/og-image.png",
            link: "https://lmfao.tech",
        },
        {
            title: "LMFAO.tech",
            description:
                "A website that generates random tech jargon. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
            image: "https://lmfao.tech/og-image.png",
            link: "https://lmfao.tech",
        },
        {
            title: "LMFAO.tech",
            description:
                "A website that generates random tech jargon. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
            image: "https://lmfao.tech/og-image.png",
            link: "https://lmfao.tech",
        },
        {
            title: "LMFAO.tech",
            description:
                "A website that generates random tech jargon. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
            image: "https://lmfao.tech/og-image.png",
            link: "https://lmfao.tech",
        }
    ];

    const height =
        cards.length * ((DISTANCE_BW_CARDS * 1) / MAGNITUDE_ON_INCREASE) +
        2 * MAGNITUDE_ON_INCREASE +
        DISTANCE_BW_CARDS;

    const no_rerender: {
        data: CardPositionData[];
        cs?: NodeListOf<HTMLDivElement>;
        lastScroll?: number;
    } = { data: [] };

    let wrapper: HTMLDivElement;

    onMount(async () => {
        no_rerender.cs = wrapper.querySelectorAll(".card");

        no_rerender.cs.forEach((card, i) => {
            console.log("h");

            const rect = card.getBoundingClientRect();

            const rightLeft = i % 2 === 0 ? -1 : 1;

            const translate3d = {
                x: (rect.width * rightLeft * 3) / 4,
                y: 0,
                z: i * -DISTANCE_BW_CARDS,
            };

            no_rerender.data.push({
                originalPos: translate3d,
                z: translate3d.z,
            });

            card.style.setProperty("--x", `${translate3d.x}px`);
            card.style.setProperty("--oZ", `${translate3d.z}px`);
            wrapper.style.setProperty("--z", `0px`);

            card.style.zIndex = `${-1 * i}`;

            console.log(card.style.transform, card.style.zIndex);
        });

        onScroll()
        window.addEventListener("scroll", onScroll);

    });

    function onScroll() {

        const scroll = window.scrollY;

        no_rerender.lastScroll = scroll;

        const last = no_rerender.cs![no_rerender.cs!.length-1];	
        const lastSecond = no_rerender.cs![no_rerender.cs!.length-2];	
        
        wrapper.style.setProperty("--z", `${scroll*MAGNITUDE_ON_INCREASE}px`);

        const lastZIncrease = (parseFloat(last.style.getPropertyValue("--oZ").replace("px", "")))
        const lastSecondZIncrease = (parseFloat(lastSecond.style.getPropertyValue("--oZ").replace("px", "")))

        if (lastZIncrease + (scroll*MAGNITUDE_ON_INCREASE) >= 0) {
            last.style.setProperty("--z", `${-1 * lastZIncrease}px`);
        } else {
            last.style.removeProperty("--z")
        }
        if ((lastSecondZIncrease + (scroll*MAGNITUDE_ON_INCREASE)) >= 0) {
            lastSecond.style.setProperty("--z", `${-1 * lastSecondZIncrease}px`);
        } else {
            lastSecond.style.removeProperty("--z")
        }

        no_rerender.cs!.forEach((card, i) => {

            const last = (parseFloat(card.style.getPropertyValue("--oZ").replace("px", "")))

            const z = last + scroll * MAGNITUDE_ON_INCREASE;

            card.style.setProperty("--opacity", `${z < (-3/2 * DISTANCE_BW_CARDS) ? 0 : 1}`);

        });


    }
</script>

<div class="-z-1 w-screen overflow-x-hidden" style={`height: ${height}px`}>
    <div
        bind:this={wrapper}
        id="wrapper"
        class="max-w-screen h-screen overflow-y-hidden max-h-screen w-screen fixed -z-1"
        style="perspective: 200px"
    >
        {#each cards as card, index (index)}
            <div class="card" style="translate: -50% -50%">
                <img class="rounded-md" src={card.image} alt="card image" />
                <h1 class="font-bold text-3xl overflow-y-hidden">
                    {card.title}
                </h1>
                <p>{card.description}</p>
            </div>
        {/each}
    </div>
</div>

<style lang="postcss">
    .card {
        will-change: transform, opacity;
        transform: translate3d(var(--x), 0, calc(var(--z) + var(--oZ)));
        opacity: var(--opacity);
        transition: opacity 200ms ease-in-out;
    }

</style>