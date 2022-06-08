<template>
    <section class="docs p1 m1-tb-all">
        <div class="panel">
            <h2>{{ content.title }}</h2>
            <p>{{ content.description }}</p>
            <nuxt-content :document="content"></nuxt-content>
        </div>
        <div class="panel">
            <h3>Panel Component</h3>
            <p class="p-tb-1 border-bottom-dashed">This is my panel, there are others</p>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return { content: "" };
    },
    async asyncData({ $content }) {
        console.log(await $content("panel").fetch());
        return {
            content: await $content("panel").fetch(),
        };
    },
});
</script>

<style lang="scss" scoped>
.docs {
    min-height: 100vh;
    --tw-bg-opacity: 1;
    background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
}
.viewport {
    width: 1024px;
    margin: auto;
}
</style>
