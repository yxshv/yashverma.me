
<div class="w-screen -z-20 bg-black fixed bottom-0">
    <div class="retro-grid-wrapper">
        <div class="grid">
            <div
                class="horizontal-line-wrapper"
                style="will-change: transform; transform: translate3d(0px, 8.749vh, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;"
            >
                <div class="horizontal-line" />
                <div class="horizontal-line" />
                <div class="horizontal-line" />
                <div class="horizontal-line" />
                <div class="horizontal-line" />
                <div class="horizontal-line" />
                <div class="horizontal-line" />
                <div class="horizontal-line" />
                <div class="horizontal-line" />
                <div class="horizontal-line" />
                <div class="horizontal-line" />
                <div class="horizontal-line" />
                <div class="horizontal-line" />
                <div class="horizontal-line" />
            </div>
            <div class="vertical-lines-wrapper">
                <div class="verlical-line" />
                <div class="verlical-line" />
                <div class="verlical-line" />
                <div class="verlical-line" />
                <div class="verlical-line" />
                <div class="verlical-line" />
                <div class="verlical-line" />
                <div class="verlical-line" />
                <div class="verlical-line" />
                <div class="verlical-line" />
                <div class="verlical-line" />
                <div class="verlical-line" />
                <div class="verlical-line" />
                <div class="verlical-line" />
                <div class="verlical-line" />
                <div class="verlical-line" />
                <div class="verlical-line" />
                <div class="verlical-line" />
                <div class="verlical-line" />
                <div class="verlical-line" />
                <div class="verlical-line" />
                <div class="verlical-line" />
                <div class="verlical-line" />
            </div>
        </div>
    </div>
</div>

<style>
    .retro-grid-wrapper {
        opacity: 0.65;
        position: relative;
        left: 0;
        top: auto;
        right: 0;
        bottom: 0;
        z-index: 1;
        overflow: hidden;
        width: 100%;
        height: 25vh;
        perspective: 500px;
        perspective-origin: 50% 100%;
    }
    .grid {
        position: absolute;
        left: 0;
        top: auto;
        right: 0;
        bottom: 0;
        z-index: 1;
        display: block;
        width: 100%;
        height: 100vh;
        transform: rotateX(53deg) rotateY(0) rotateZ(0) translate3d(0, 0, -26vh);
        transform-style: preserve-3d;
    }
    .horizontal-line-wrapper {
        z-index: 2;
        display: flex;
        width: 140%;
        height: 105%;
        margin-left: -20%;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

    .vertical-lines-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        display: flex;
        width: 140%;
        height: 100%;
        margin-left: -20%;
        justify-content: space-around;
        align-items: stretch;
    }

    .horizontal-line {
        width: 100%;
        height: 1px;
        background-color: #58479c;
        box-shadow: 0 0 15px 0 #58479c;
    }
    
    .verlical-line {
        width: 1px;
        height: 100%;
        /* background-color: #58479c; */
        background: linear-gradient(black, black, black, black, black, #58479c, #58479c, #58479c);
        box-shadow: 0 0 15px 0 rgba(88, 71, 156, 0.75);
    }
</style>
