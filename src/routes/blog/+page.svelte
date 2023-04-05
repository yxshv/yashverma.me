<!-- svelte-ignore a11y-click-events-have-key-events -->

<script lang="ts">
    import BackToHome from "../../components/BackToHome.svelte";
    import Card from "../../components/Card.svelte";
    import { posts } from "../../stores/posts.store";

    import "../../cards.css";

    interface Card {
        title: string;
        image: string;
        slug: string;
        tags?: string[];
        datePublished: Date;
        isPublished?: boolean;
    }

    const sort = (a: Card, b: Card) => {
        return b.datePublished.getTime() - a.datePublished.getTime();
    };

    const allColors = ["rose", "green", "blue", "yellow"];

    $: cards = (Object.keys($posts).map((key) => {
        return {
            title: $posts[key].title,
            image: $posts[key].image,
            slug: key,
            tags: $posts[key].tags,
            datePublished: $posts[key].datePublished,
            isPublished: $posts[key].isPublished,
        } as Card
    })).sort(sort).filter(c => c.isPublished) as Card[];
</script>

<div class="relative text-[#9DA8C2]">
    <div class="grid-overlay"><div class="fade-out" /></div>
    <div
        class="h-screen w-full flex justify-center items-center flex-col gap-10"
    >
        <BackToHome />

        <div>
            <h1
                class="relative isolate text-6xl lg:text-8xl font-bold text-center w-full outline-text"
            >
                BLOGS
            </h1>
            <p class="text-center w-full mt-2 font-semibold text-xl">
                Sharing things I learn
            </p>
        </div>
    </div>

    <div class="p-10 flex justify-center items-center flex-wrap lg:p-28 gap-7">
        {#each cards as card}
            <Card rounded="1.9rem" on:click={() => window.location.href = "/blog/" + card.slug} >
                <div
                    class="content aspect-[1] flex gap-3 p-1 items-start text-left justify-start flex-col max-w-[20rem]"
                >
                    <img
                        src={card.image}
                        alt={card.title}
                        class="aspect-[16/9] bg-center object-cover rounded-[1rem]"
                    />
                
                    <div class="pl-2">
                        <h1
                            class=" text-xl font-semibold"
                        >
                            {card.title}
                        </h1>
                    </div>
                    <div
                        class="pl-2"
                    >
                        <div class="flex justify-start items-center flex-wrap gap-1 ">
                            {#each card?.tags ?? [] as tag, index}
                                <div
                                    class={`rounded-md border ${
                                        allColors[index % allColors.length]
                                    } font-semibold text-xs px-2 py-1`}
                                >
                                    {tag}
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </Card>
        {/each}
    </div>
</div>