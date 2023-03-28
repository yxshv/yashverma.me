<script lang="ts">
    import { onMount } from "svelte";

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
    const DISTANCE_BW_CARDS = 300;
    const cards: Card[] = [
        {
            title: "LMFAO.tech",
            description:
                "One place for all your meme needs. Meme creator and more",
            image: "/lmfao-tech.png",
            link: "https://lmfao.tech",
        },
        {
            title: "Cakecutter",
            description:"Project boostrapping and setup tool. Easier than making a cake",
            image: "/cc.png",
            link: "https://cakes.run",
        },
        {
            title: "Disco.pics",
            description: "Free unlimited image hosting and sharing platform",
            image: "/discopics.png",
            link: "https://disco.pics",
        },
        {
            title: "Req-Cool",
            description: "A simple and easy to free API testing tool.",
            image: "/reqcool.png",
            link: "https://req-cool.vercel.app",
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
    let intro: HTMLDivElement;

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

        onScroll();
        window.addEventListener("scroll", onScroll);
    });

    function onScroll() {
        const scroll = window.scrollY;

        if (scroll > 5) {
            intro.animate([{
                opacity: 0
            }], {
                duration: 1000,
                easing: "ease-in-out"
            })
        } else {
            intro.animate([{
                opacity: 1
            }], {
                duration: 1000,
                easing: "ease-in-out"
            })
        }

        no_rerender.lastScroll = scroll;

        const last = no_rerender.cs![no_rerender.cs!.length - 1];
        const lastSecond = no_rerender.cs![no_rerender.cs!.length - 2];

        wrapper.style.setProperty("--z", `${scroll * MAGNITUDE_ON_INCREASE}px`);

        const lastZIncrease = parseFloat(
            last.style.getPropertyValue("--oZ").replace("px", "")
        );
        const lastSecondZIncrease = parseFloat(
            lastSecond.style.getPropertyValue("--oZ").replace("px", "")
        );

        if (lastZIncrease + scroll * MAGNITUDE_ON_INCREASE >= 0) {
            last.style.setProperty("--z", `${-1 * lastZIncrease}px`);
        } else {
            last.style.removeProperty("--z");
        }
        if (lastSecondZIncrease + scroll * MAGNITUDE_ON_INCREASE >= 0) {
            lastSecond.style.setProperty(
                "--z",
                `${-1 * lastSecondZIncrease}px`
            );
        } else {
            lastSecond.style.removeProperty("--z");
        }

        no_rerender.cs!.forEach((card, i) => {
            const last = parseFloat(
                card.style.getPropertyValue("--oZ").replace("px", "")
            );

            const z = last + scroll * MAGNITUDE_ON_INCREASE;

            card.style.setProperty(
                "--opacity",
                `${z < (-3 / 2) * DISTANCE_BW_CARDS ? 0 : 1}`
            );
        });
    }
</script>

<div class="z-[-1] relative" style={`height: ${height}px;`}>
    <div bind:this={intro} class="fixed flex justify-center flex-col items-center z-1 p-20 top-0 gap-2 w-screen h-screen bg-black/80">
        <div class="text-center">
            <h1 class="text-5xl my-2 font-bold">Hi, I'm <span class="text-rose-500">Yash</span></h1>
            <p class="text-2xl">A 14yr old software developer, <br> proficient in Typescript, Python,<br> Golang, and a little bit of rust</p>
        </div>
        <span class="absolute bottom-[50px]">SCROLL TO BEGIN</span>
    </div>
    <div
        bind:this={wrapper}
        id="wrapper"
        class="h-screen overflow-y-hidden w-screen fixed z-[-1]"
        style="perspective: 200px"
    >
        {#each cards as card, index (index)}
            <div class="card z-[-1]" style="translate: -50% -50%">
                <img class="rounded-md" src={card.image} alt="card image" />
                <div class="details p-2">
                    <h1 class="font-bold text-2xl overflow-y-hidden">
                        {card.title}
                    </h1>
                    <p class="">{card.description}</p>
                </div>
            </div>
        {/each}
    </div>
</div>

<style lang="postcss">

    .card {
        width: 350px;
        position: absolute;
        top: 50vh;
        left: 50vw;
        translate: -50% -50%;
        color: white;

        @apply bg-gray-800 rounded-3xl flex-col flex justify-center p-5 gap-2;
        
        will-change: transform, opacity;
        transform: translate3d(var(--x), 0, calc(var(--z) + var(--oZ)));
        opacity: var(--opacity);
        transition: opacity 200ms ease-in-out;
    }

    .card img {
        @apply rounded-2xl;
    }

    #wrapper {
        overflow: hidden;
    }
</style>
