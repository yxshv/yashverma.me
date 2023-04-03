<script lang="ts">
    import Card from "./Card.svelte";
    import "./cards.css";
</script>

<div class="p-10 lg:p-20">
    <div class="flex justify-center items-center flex-wrap lg:flex-nowrap gap-8">
        <Card classes="h-full flex flex-grow w-full">
            <div class="h-[70%] p-0">
                <div class="content rounded-[1.7rem] content-hs">
                    <div class="map relative">
                        <img class="w-80 " src="/map.png" />
                        <div
                            class="logo absolute rounded-full bg-[#1B1B31] p-[3px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                            <img class="w-8 rounded-full" src="/logo.jpg" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="h-[30%] text-center">
                <h1 class="text-xl ">Bhopal, Madhya Pradesh</h1>
                <p class="text-lg opacity-75">India</p>
            </div>
        </Card>
        <div class="h-full flex gap-8 justify-center flex-wrap lg:flex-nowrap items-center">
            <Card classes="pb-0 w-full">
                <div
                    class="content px-5 pt-4 flex justify-center item-center flex-col"
                >
                    <h1
                        class="text-2xl  block text-center w-full flex-grow"
                    >
                        My Projects
                    </h1>
                    <div class="">
                        <img src="/projects.svg" class="scale-[1.2]" />
                    </div>
                </div>
            </Card>
            <Card classes="pb-0 fade w-full">
                <div
                    class="content px-5 pt-4 flex justify-center item-center flex-col"
                >

                    <h1
                        class="text-2xl block text-center w-full flex-grow"
                    >
                        My Tech Stack
                    </h1>
                    <div class="">
                        <img src="/techstack.svg" class="scale-[1.3] image" />
                    </div>
                </div>
            </Card>
        </div>
    </div>
</div>

<style lang="postcss">

</style>
