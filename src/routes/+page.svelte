<script>
    import HomeCards from "../components/HomeCards.svelte";
    import Hero from "../components/Hero.svelte";
</script>

<svelte:head>
    <title>Home • Yash Verma</title>
    <meta name="description" content="Hey I am Yash! A 17yr old software developer, proficient in Typescript, Python, Golang, and a little bit of rust" />
    <meta property="og:title" content="Home • Yash Verma" />
    <meta property="og:description" content="Hey I am Yash! A 17yr old software developer, proficient in Typescript, Python, Golang, and a little bit of rust" />
    <meta property="og:image" content="/og-image.png" />
    <meta property="twitter:image" content="/og-image.png" />
</svelte:head>

<Hero />
<div class="min-h-screen w-screen bg-[#131325] border-t-2 border-outline border-dashed ">
    <HomeCards />
</div>
