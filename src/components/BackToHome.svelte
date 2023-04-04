<script lang="ts">
    export let classes: string = "";
</script>

<div class={`w-full flex justify-center items-center ${classes}`}>
    <button on:click={() => { window.location.href = "/" }} 
        class="flex gap-2 font-bold p-3 py-2 pr-4 rounded-full bg-[#2B2B3B] justify-center items-center"
    >
        <img src="/logo.jpg" class="w-8 h-8 rounded-full" alt="Yash" />
        yxshv
    </button>
</div>
