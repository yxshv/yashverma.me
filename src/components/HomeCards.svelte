<script lang="ts">
    import Card from "./Card.svelte";
    import Spotify from "./Spotify.svelte";
    import "../cards.css";
    import Discord from "./Discord.svelte";

    import { PUBLIC_TWITTER_USERNAME, PUBLIC_GITHUB_USERNAME } from "$env/static/public"

</script>

<div class="p-8 py-10 lg:p-20">
    <div class="flex gap-8 flex-wrap lg:flex-nowrap items-center">
        <div class="h-full">
            <Card classes="flex-grow h-full flex justify-center items-stretch">
                <div class="p-0">
                    <div class="content rounded-[1.7rem] content-hs">
                        <div class="map relative">
                            <img class="" alt="bhopal map" src="/map.png" />
                            <div
                                class="logo absolute rounded-full bg-bg p-[3px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            >
                                <img
                                    class="w-8 rounded-full"
                                    alt="my logo"
                                    src="/logo.jpg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center">
                    <h1 class="text-2xl ">Bhopal, Madhya Pradesh</h1>
                    <p class="text-lg opacity-75">India</p>
                </div>
            </Card>
        </div>
        <div
            class="lg:w-[56%] flex gap-8 justify-center flex-wrap flex-col lg:flex-nowrap content-stretch items-stretch"
        >
            <div class="flex justify-center gap-8 items-stretch flex-wrap lg:flex-nowrap content-center">
                <Card on:click={() => window.location.href = "/projects"} classes="cursor-pointer">
                    <div
                        class="content px-5 pt-4  flex justify-center item-center flex-col"
                    >
                        <h1 class="text-2xl block text-center w-full flex-grow">
                            My Projects
                        </h1>
                        <div class="">
                            <img
                                src="/projects.svg"
                                alt="my project list"
                                class="scale-[1.2]"
                            />
                        </div>
                    </div>
                </Card>
                <Card on:click={() => window.location.href = "/techstack"} classes="fade cursor-pointer">
                    <div
                        class="content px-5 pt-4 flex justify-center item-center flex-col"
                    >
                        <h1 class="text-2xl block text-center w-full flex-grow">
                            My Tech Stack
                        </h1>
                        <div class="">
                            <img
                                src="/techstack.svg"
                                alt="my tech stack"
                                class="scale-[1.3] image"
                            />
                        </div>
                    </div>
                </Card>
            </div>
            <div class="flex justify-center gap-8 items-stretch flex-wrap lg:flex-nowrap content content-center">
                <Card classes="flex-1 aspect-[1]">
                    <div
                        class="content px-5 pt-4 flex justify-center item-center flex-col"
                    >
                        <h1 class="text-2xl block text-center w-full flex-grow">
                            Blogs I've Written
                        </h1>
                        <div class="">
                            <img
                                src="/blogs.svg"
                                alt="my tech stack"
                                class="scale-[1.3]"
                            />
                        </div>
                    </div>
                </Card>
                <Spotify />
            </div>
        </div>
    </div>
    <div class="flex justify-center mt-8 gap-8 items-center flex-wrap">
        <Discord />
        <Card on:click={() => window.open("https://twitter.com/" + PUBLIC_TWITTER_USERNAME)} classes="w-full lg:w-auto cursor-pointer">
            <div class="content flex justify-center items-center gap-3 flex-col p-10">
                <div class="w-8 h-8 relative isolate">
                    <img src="/twitter.svg" class="w-8" alt="twitter" />
                    <img src="/twitter.svg" class="w-8 absolute top-0 left-0 -z-1" style={`filter: blur(10px);`} alt="twitter" />
                </div>
                <h1 class="text-xl">Twitter</h1>
            </div>
        </Card>
        <Card on:click={() => window.open("https://github.com/" + PUBLIC_GITHUB_USERNAME)} classes="w-full lg:w-auto cursor-pointer">
            <div class="content flex justify-center items-center gap-3 flex-col p-10">
                <div class="w-8 h-8 relative isolate">
                    <img src="/github.svg" class="w-8" alt="github" />
                    <img src="/github.svg" class="w-8 absolute top-0 left-0 -z-1" style={`filter: blur(10px);`} alt="github" />
                </div>
                <h1 class="text-xl">Github</h1>
            </div>
        </Card>
    </div>
</div>


<style lang="postcss">

</style>