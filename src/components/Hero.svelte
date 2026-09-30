<script lang="ts">
    import { onMount } from "svelte";
    import BackToHome from "./BackToHome.svelte";

    interface Card {
        title: string;
        description: string;
        image: string;
        link: string;
    }

    // Orbit: cards revolve around an axis lying in the x-y plane, tilted
    // AXIS_TILT from the vertical. Cards only translate, so they keep facing
    // the viewer; the front of the orbit is the center of the screen.
    const AXIS_TILT = (22 * Math.PI) / 180;
    const ORBIT_RADIUS = 320;
    const PERSPECTIVE = 1100;

    // Scroll distance for one card to go from the front to the next card.
    const PX_PER_CARD = 700;
    // Where card 0 sits (in cards) before any scroll: partway round, coming in.
    const LEAD = 0.6;
    // 0..1, how strongly each card lingers at the front of the orbit.
    const LINGER = 0.6;

    // Spring that makes the orbit chase the scroll position.
    const ORBIT_STIFFNESS = 60;
    const ORBIT_DAMPING = 14;
    // Slightly underdamped spring on each card's tilt, for a small settle.
    const TUMBLE_STIFFNESS = 180;
    const TUMBLE_DAMPING = 20;
    // Degrees of tilt per px/s of card speed, and the cap.
    const TUMBLE_GAIN = 0.006;
    const TUMBLE_MAX = 15;

    const cards: Card[] = [
        {
            title: "LMFAO.tech",
            description:
                "One place for all your meme needs. Meme creator and more",
            image: "/lmfao-tech.png",
            link: "https://github.com/lmfao-tech/frontend",
        },
        {
            title: "Cakecutter",
            description:
                "Project boostrapping and setup tool. Easier than making a cake",
            image: "/cc.png",
            link: "https://github.com/cake-cutter/cakecutter",
        },
        {
            title: "Disco.pics",
            description: "Free unlimited image hosting and sharing platform",
            image: "/discopics.png",
            link: "https://github.com/discopics/disco.pics",
        },
        {
            title: "Req-Cool",
            description: "A simple and easy to use free API testing tool.",
            image: "/reqcool.png",
            link: "https://req-cool.vercel.app",
        },
    ];

    // Scroll distance the last card stays alone at the front before the next
    // section starts scrolling in over it.
    const HOLD = 500;

    // Scroll at which the last card reaches the front, plus the hold. The
    // section is a viewport taller than this so nothing covers the card sooner.
    const scrollLength = (cards.length - 1 + LEAD) * PX_PER_CARD + HOLD;

    // Orbit basis in CSS space (y points down): U is in-plane, perpendicular
    // to the axis; the other basis vector is +z, toward the viewer.
    const U = { x: Math.cos(AXIS_TILT), y: Math.sin(AXIS_TILT) };

    type Vec3 = { x: number; y: number; z: number };

    const nr: {
        cs?: NodeListOf<HTMLDivElement>;
        pos: number;
        vel: number;
        tilt: Vec3[];
        tiltVel: Vec3[];
        z: number[];
        opacity: number[];
        frame?: number;
        lastTime?: number;
        reducedMotion: boolean;
    } = { pos: 0, vel: 0, tilt: [], tiltVel: [], z: [], opacity: [], reducedMotion: false };

    let wrapper = $state<HTMLDivElement>();
    let intro = $state<HTMLDivElement>();

    const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
    const smoothstep = (a: number, b: number, v: number) => {
        const t = clamp((v - a) / (b - a), 0, 1);
        return t * t * (3 - 2 * t);
    };

    // Soft staircase: slows the orbit whenever a card is at the front.
    const linger = (c: number) => c - (LINGER * Math.sin(2 * Math.PI * c)) / (2 * Math.PI);
    const lingerSlope = (c: number) => 1 - LINGER * Math.cos(2 * Math.PI * c);

    function scrollTarget() {
        return clamp(window.scrollY / PX_PER_CARD - LEAD, -1, cards.length - 1);
    }

    onMount(() => {
        const element = wrapper;
        if (!element) return;

        nr.cs = element.querySelectorAll(".card");
        nr.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        nr.pos = scrollTarget();
        nr.tilt = cards.map(() => ({ x: 0, y: 0, z: 0 }));
        nr.tiltVel = cards.map(() => ({ x: 0, y: 0, z: 0 }));

        onScroll();
        render(0);
        window.addEventListener("scroll", onScroll);
        document.addEventListener("click", onClick);

        return () => {
            window.removeEventListener("scroll", onScroll);
            document.removeEventListener("click", onClick);
            if (nr.frame) cancelAnimationFrame(nr.frame);
        };
    });

    function onClick(event: MouseEvent) {
        if (window.scrollY >= scrollLength + window.innerHeight / 2 || window.scrollY < 100) {
            return;
        }

        // Open the front-most visible card under the pointer.
        let hit = -1;
        nr.cs?.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const isInside =
                event.clientX >= rect.left && event.clientX <= rect.right &&
                event.clientY >= rect.top && event.clientY <= rect.bottom;

            if (isInside && nr.opacity[index] > 0.5 && (hit < 0 || nr.z[index] > nr.z[hit])) {
                hit = index;
            }
        });

        if (hit >= 0) window.open(cards[hit].link, "_blank");
    }

    function startLoop() {
        if (nr.frame) return;
        nr.lastTime = undefined;
        nr.frame = requestAnimationFrame(tick);
    }

    function tick(time: number) {
        const dt = nr.lastTime === undefined ? 1 / 60 : Math.min((time - nr.lastTime) / 1000, 1 / 30);
        nr.lastTime = time;

        const settled = render(dt);
        nr.frame = settled ? undefined : requestAnimationFrame(tick);
    }

    // Advances the springs by dt seconds and positions every card.
    // Returns true once everything has come to rest.
    function render(dt: number) {
        const cardElements = nr.cs;
        if (!cardElements) return true;

        const target = scrollTarget();

        if (nr.reducedMotion) {
            nr.pos = target;
            nr.vel = 0;
        } else {
            nr.vel += (ORBIT_STIFFNESS * (target - nr.pos) - ORBIT_DAMPING * nr.vel) * dt;
            nr.pos += nr.vel * dt;
        }

        const orbit = linger(nr.pos);
        const orbitVel = lingerSlope(nr.pos) * nr.vel;
        let settled = Math.abs(target - nr.pos) < 1e-4 && Math.abs(nr.vel) < 1e-4;

        cardElements.forEach((card, i) => {
            // r = 0 at the front, ±1 half an orbit away (directly behind).
            const r = orbit - i;
            // phi decreases as r grows: cards enter top-left and leave bottom-right.
            const phi = Math.PI / 2 - Math.PI * r;
            const cos = Math.cos(phi);
            const sin = Math.sin(phi);

            const x = ORBIT_RADIUS * cos * U.x;
            const y = ORBIT_RADIUS * cos * U.y;
            const z = ORBIT_RADIUS * sin;

            // Card velocity in px/s along the orbit tangent.
            const angularVel = -Math.PI * orbitVel;
            const vx = -ORBIT_RADIUS * sin * U.x * angularVel;
            const vy = -ORBIT_RADIUS * sin * U.y * angularVel;
            const vz = ORBIT_RADIUS * cos * angularVel;

            // Lean into the direction of travel: the leading edge drags back,
            // with a little bank for sideways motion.
            let goal: Vec3 = { x: -vy + 0.6 * vz, y: vx, z: 0.3 * vx };
            const speed = Math.hypot(goal.x, goal.y, goal.z);
            const angle = Math.min(speed * TUMBLE_GAIN, TUMBLE_MAX);
            goal = speed > 0
                ? { x: (goal.x / speed) * angle, y: (goal.y / speed) * angle, z: (goal.z / speed) * angle }
                : { x: 0, y: 0, z: 0 };

            const tilt = nr.tilt[i];
            const tiltVel = nr.tiltVel[i];
            if (nr.reducedMotion) {
                tilt.x = tilt.y = tilt.z = 0;
            } else {
                for (const k of ["x", "y", "z"] as const) {
                    tiltVel[k] += (TUMBLE_STIFFNESS * (goal[k] - tilt[k]) - TUMBLE_DAMPING * tiltVel[k]) * dt;
                    tilt[k] += tiltVel[k] * dt;
                }
            }

            const tiltAngle = Math.hypot(tilt.x, tilt.y, tilt.z);
            if (tiltAngle > 0.05 || Math.hypot(tiltVel.x, tiltVel.y, tiltVel.z) > 0.05) settled = false;

            const rotate = tiltAngle > 0.01
                ? ` rotate3d(${tilt.x / tiltAngle}, ${tilt.y / tiltAngle}, ${tilt.z / tiltAngle}, ${tiltAngle}deg)`
                : "";

            // Fade out as the card swings round behind the center.
            const opacity = 1 - smoothstep(0.55, 0.95, Math.abs(r));

            nr.z[i] = z;
            nr.opacity[i] = opacity;

            card.style.transform = `translate3d(${x}px, ${y}px, ${z}px)${rotate}`;
            card.style.opacity = `${opacity}`;
            card.style.visibility = opacity > 0 ? "visible" : "hidden";
            card.style.zIndex = `${Math.round(z)}`;
        });

        return settled;
    }

    function onScroll() {
        if (!intro) return;

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

        startLoop();
    }
</script>

<div id="tWrapper" class="z-[-1] hidden lg:block relative" style={`height: calc(${scrollLength}px + 100vh);`}>
    <div
        bind:this={intro}
        class="aboutme fixed flex justify-center gap-10 lg:justify-between flex-col items-center z-1 p-8 lg:p-16 top-0 w-screen h-full bg-[#131325]"
    >
        <div class="grid-overlay"><div class="fade-out"></div></div>

        <BackToHome />
        <div class="text-center me" style="text-shadow: 0px 0px 100px white;">
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
                I am <span class="hero-underline">Yash!</span> A 17yr old
                <br />software developer, proficient in
                <span class="hero-underline">Typescript</span>,
                <br /> <span class="hero-underline">Python</span>, and
                <span class="hero-underline">Golang</span>
            </p>
        </div>
        <span class="hidden lg:flex justify-center items-center gap-1">
            <div class="scroll"></div>
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
></div>
    </div>
</div>

<div class="mobile lg:hidden h-auto relative">
    <div
        class="flex isolate justify-center relative py-28 gap-10 lg:justify-between flex-col items-center z-1 p-8 lg:p-16 top-0 w-screen h-full bg-[#101217]"
    >
        <BackToHome />
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
                I am <span class="hero-underline">Yash!</span> A 17yr old 
                software developer, proficient in
                <span class="hero-underline">Typescript</span>,
                <span class="hero-underline">Python</span>, and
                <span class="hero-underline">Golang</span>
            </p>
        </div>
        <div class="z-[-1] h-full w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 stars">
            <div class="overlay phone w-screen h-full absolute top-0"></div>
            <div
                style="background-image: url(/stars.svg)"
                class="w-screen h-full"
></div>
        </div>
    </div>
    
</div>

<style>
    .hero-underline {
        text-decoration-line: underline;
        text-decoration-thickness: 2px;
        text-underline-offset: 4px;
    }

    .card {
        width: 350px;
        position: absolute;
        top: 50vh;
        left: 50vw;
        translate: -50% -50%;
        color: white;

        background: #1B1B31;

        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.75rem;
        border-radius: 1.5rem;

        border: 2px solid #474466;

        will-change: transform, opacity;
        opacity: 0;
    }

    .card img {
        border-radius: 1rem;
        box-shadow: 2px 2px #474466;
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
        background-image: radial-gradient(circle, transparent 0%, #131325 80%, #131325 100%);
    }
    
    .stars .overlay.phone {
        background-image: radial-gradient(circle, transparent 0%, #131325 99%);
    }

</style>
