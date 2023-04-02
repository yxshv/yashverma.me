<script lang="ts">
    import { onMount } from "svelte";
    import Grid from "./Grid.svelte";

    interface Card {
        title: string;
        description: string;
        image: string;
        link: string;
    }

    const MAGNITUDE_ON_INCREASE = 1 / 2;
    const DISTANCE_BW_CARDS = 350;
    const PADDINGS = 200;
    const PERSPECTIVE = 200;

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
            description:
                "Project boostrapping and setup tool. Easier than making a cake",
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
            description: "A simple and easy to use free API testing tool.",
            image: "/reqcool.png",
            link: "https://req-cool.vercel.app",
        },
    ];

    const height =
        cards.length * ((DISTANCE_BW_CARDS * 1) / MAGNITUDE_ON_INCREASE) +
        2 * MAGNITUDE_ON_INCREASE +
        3 * DISTANCE_BW_CARDS +
        PADDINGS;

    const nr: {
        cs?: NodeListOf<HTMLDivElement>;
        lastScroll?: number;
    } = {};

    let wrapper: HTMLDivElement;
    let intro: HTMLDivElement;


    onMount(async () => {

        nr.cs = wrapper.querySelectorAll(".card");

        nr.cs.forEach((card, i) => {

            const rect = card.getBoundingClientRect();

            const rightLeft = i % 2 === 0 ? -1 : 1;

            const translate3d = {
                x: (rect.width * rightLeft * 3) / 4,
                y: 0,
                z: i * -DISTANCE_BW_CARDS - PADDINGS,
            };

            card.dataset.i = `${i}`;

            card.style.setProperty("--x", `${translate3d.x}px`);
            card.style.setProperty("--oZ", `${translate3d.z}px`);
            wrapper.style.setProperty("--z", `0px`);

            card.style.zIndex = `${-1 * i}`;
        });

        onScroll();
        window.addEventListener("scroll", onScroll);
        window.addEventListener("click", onClick)
    });

    function onClick(event: MouseEvent) {
        
        if (window.scrollY > (height + window.innerHeight) || window.scrollY < 100) {
            return;
        }

        const mousePos = {
            x: event.clientX,
            y: event.clientY,
        };

        nr.cs?.forEach((card, index) => {
            const rect = card.getBoundingClientRect();

            const isInside = mousePos.x >= rect.left && mousePos.x <= rect.right && mousePos.y >= rect.top && mousePos.y <= rect.bottom;
            const opacity = parseFloat(card.style.getPropertyValue("--opacity"));
            const z = parseFloat(card.style.getPropertyValue("--oZ")) + parseFloat(wrapper.style.getPropertyValue("--z"));

            if (isInside && opacity > 0 && z < PERSPECTIVE) {
                const link = cards[index].link;
                window.open(link, "_blank");
            }
        })

    }

    function onScroll() {
        const scroll = window.scrollY;

        let opacity = 1;
        let scale = 1;

        if (scroll < 200) {
            if (1-scroll/50 <= 0.7) {
                scale = 0.7;
                opacity = 0;
            } else {
                scale = 1 - scroll/50
                opacity = 1 - scroll/50
            }
            
        } else {
            scale = 0.7;
            opacity = 0;
        }
        
        intro.style.setProperty("--sc", `${Math.abs(scale)}`);
        intro.style.setProperty("--op", `${Math.abs(opacity)}`);

        nr.lastScroll = scroll;

        const last = nr.cs![nr.cs!.length - 1];
        const lastSecond = nr.cs![nr.cs!.length - 2];

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

        nr.cs!.forEach((card) => {
            const last = parseFloat(
                card.style.getPropertyValue("--oZ").replace("px", "")
            );

            const z = last + scroll * MAGNITUDE_ON_INCREASE;

            card.style.setProperty(
                "--opacity",
                `${z < -3/2 * DISTANCE_BW_CARDS ? 0 : 1}`
            );
        });
    }
</script>

<div id="tWrapper" class="z-[-1] hidden lg:block relative" style={`height: ${height}px;`}>
    <div
        bind:this={intro}
        class="aboutme fixed flex justify-center gap-10 lg:justify-between flex-col items-center z-1 p-8 lg:p-16 top-0 w-screen h-full bg-[#101217]"
    >
        <div
            class="flex gap-2 font-bold p-3 py-2 pr-4 rounded-full bg-white/10 justify-center items-center"
        >
            <img
                src="https://avatars.githubusercontent.com/u/93475253?v=4"
                class="w-8 h-8 rounded-full"
                alt="Yash"
            />
            yxshv
        </div>
        <div class="text-center me">
            <p class="text-3xl hidden lg:block font-semibold">
                Hey
                <svg
                    class="inline-block mb-2 rotate-[20deg]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M13 24q-2.575 0-4.7-1.438t-3.075-3.837L2.675 12.3q-.1-.25-.137-.463T2.5 11.35q0-.75.575-1.325T4.4 9.45q.175 0 .313.013T5 9.525l.775.2q.35.1.65.263T7 10.4V4.5q0-1.05.725-1.775T9.5 2q.15 0 .288.012t.262.038q.15-.95.863-1.5T12.5 0q.8 0 1.425.438t.9 1.162q.175-.05.338-.075T15.5 1.5q1.05 0 1.775.725T18 4v.55q.125-.025.25-.037t.25-.013q1.05 0 1.775.725T21 7v9q0 3.35-2.325 5.675T13 24Zm0-2q2.5 0 4.25-1.75T19 16V7q0-.2-.15-.35t-.35-.15q-.2 0-.35.15T18 7v4q0 .425-.288.713T17 12q-.425 0-.713-.288T16 11V4q0-.2-.15-.35t-.35-.15q-.2 0-.35.15T15 4v7q0 .425-.288.713T14 12q-.425 0-.713-.288T13 11V2.5q0-.2-.15-.35T12.5 2q-.2 0-.35.15T12 2.5V11q0 .425-.288.713T11 12q-.425 0-.713-.288T10 11V4.5q0-.2-.15-.35T9.5 4q-.2 0-.35.15T9 4.5V14q0 .425-.288.713T8 15h-.375q-.325 0-.537-.163t-.338-.462L6.025 12.5q-.175-.425-.488-.625T4.5 11.45L7.1 18q.725 1.8 2.337 2.9T13 22Z"
                    />
                </svg>
                I am <span class="hero-underline">Yash!</span> A 14yr old
                <br />software developer, proficient in
                <span class="hero-underline">Typescript</span>,
                <br /> <span class="hero-underline">Python</span>,
                <span class="hero-underline">Golang</span>, and a little bit of
                <span class="hero-underline">rust</span>
            </p>
        </div>
        <span class="hidden lg:flex justify-center items-center gap-1">
            <div class="scroll" />
            SCROLL TO BEGIN
        </span>
    </div>
    <div
        bind:this={wrapper}
        id="wrapper"
        class="h-screen overflow-y-hidden w-screen fixed z-[-1]"
        style={`perspective: ${PERSPECTIVE}px`}
    >
        {#each cards as card, index (index)}
            <div class="card z-[-1]" style="translate: -50% -50%">
                <img class="rounded-md" src={card.image} alt="card" />
                <div class="details p-2">
                    <h1 class="font-bold text-2xl overflow-y-hidden">
                        {card.title}
                    </h1>
                    <p class="">{card.description}</p>
                </div>
            </div>
        {/each}
    </div>
    <!-- starts -->
    <div class="z-[-30] h-full w-screen fixed top-0 stars">
        <div class="overlay w-screen h-screen absolute top-0"></div>
        <div
            style="background-image: url(/stars.svg)"
            class="w-screen h-screen"
        />
    </div>
</div>

<div class="mobile lg:hidden h-auto relative">
    <div
        class="flex isolate justify-center relative py-28 gap-10 lg:justify-between flex-col items-center z-1 p-8 lg:p-16 top-0 w-screen h-full bg-[#101217]"
    >
        <div
            class="flex gap-2 font-bold p-3 py-2 pr-4 rounded-full bg-white/10 justify-center items-center"
        >
            <img
                src="https://avatars.githubusercontent.com/u/93475253?v=4"
                class="w-8 h-8 rounded-full"
                alt="Yash"
            />
            yxshv
        </div>
        <div class="text-center me">
            <p class="text-2xl lg:hidden font-semibold">
                Hey
                <svg
                    class="inline-block mb-2 rotate-[20deg]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M13 24q-2.575 0-4.7-1.438t-3.075-3.837L2.675 12.3q-.1-.25-.137-.463T2.5 11.35q0-.75.575-1.325T4.4 9.45q.175 0 .313.013T5 9.525l.775.2q.35.1.65.263T7 10.4V4.5q0-1.05.725-1.775T9.5 2q.15 0 .288.012t.262.038q.15-.95.863-1.5T12.5 0q.8 0 1.425.438t.9 1.162q.175-.05.338-.075T15.5 1.5q1.05 0 1.775.725T18 4v.55q.125-.025.25-.037t.25-.013q1.05 0 1.775.725T21 7v9q0 3.35-2.325 5.675T13 24Zm0-2q2.5 0 4.25-1.75T19 16V7q0-.2-.15-.35t-.35-.15q-.2 0-.35.15T18 7v4q0 .425-.288.713T17 12q-.425 0-.713-.288T16 11V4q0-.2-.15-.35t-.35-.15q-.2 0-.35.15T15 4v7q0 .425-.288.713T14 12q-.425 0-.713-.288T13 11V2.5q0-.2-.15-.35T12.5 2q-.2 0-.35.15T12 2.5V11q0 .425-.288.713T11 12q-.425 0-.713-.288T10 11V4.5q0-.2-.15-.35T9.5 4q-.2 0-.35.15T9 4.5V14q0 .425-.288.713T8 15h-.375q-.325 0-.537-.163t-.338-.462L6.025 12.5q-.175-.425-.488-.625T4.5 11.45L7.1 18q.725 1.8 2.337 2.9T13 22Z"
                    />
                </svg>
                I am <span class="hero-underline">Yash!</span> A 14yr old 
                software developer, proficient in
                <span class="hero-underline">Typescript</span>,
                <span class="hero-underline">Python</span>,
                <span class="hero-underline">Golang</span>, and a little bit of
                <span class="hero-underline">rust</span>
            </p>
        </div>
        <div class="z-[-1] h-full w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 stars">
            <div class="overlay phone w-screen h-full absolute top-0" />
            <div
                style="background-image: url(/stars.svg)"
                class="w-screen h-full"
            />
        </div>
    </div>
    
</div>

<style lang="postcss">
    .hero-underline {
        @apply underline underline-offset-4 decoration-2;
    }

    .card {
        width: 350px;
        position: absolute;
        top: 50vh;
        left: 50vw;
        translate: -50% -50%;
        color: white;

        background: rgb(0, 7, 25);

        @apply rounded-3xl flex-col flex justify-center p-3 gap-2;

        border: 2px solid #7861d4;

        will-change: transform, opacity;
        transform: translate3d(var(--x), 0, calc(var(--z) + var(--oZ)));
        opacity: var(--opacity);
        transition: opacity 200ms ease-in-out;
    }

    .card img {
        @apply rounded-2xl;
        box-shadow: 2px 2px #7861d4;
    }

    #wrapper {
        overflow: hidden;
    }

    .aboutme {
        will-change: opacity, scale;

        --sc: 1;
        opacity: var(--op);
        transition: opacity 500ms;
    }

    .aboutme .me {
        will-change: scale;

        scale: var(--sc);
        transition: scale 300ms;
    }

    .stars .overlay {
        background-image: radial-gradient(circle, transparent 0%, #101217 80%, #101217 100%);
    }
    
    .stars .overlay.phone {
        background-image: radial-gradient(circle, transparent 0%, #101217 99%);
    }

</style>
