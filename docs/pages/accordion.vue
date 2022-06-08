<template>
    <section class="docs p1">
        <div class="panel">
            <h3>Accordion</h3>
            <p>Accordion component is useful for revealing nested info on click or dropdowns.</p>

            <nuxt-content :document="content"></nuxt-content>

            <div class="p-tb-1 accordion" @click="accordion">Section 1 (Open)</div>
            <p>Hidden content !</p>
            <div class="p-tb-1 accordion" @click="accordion">Section 2 (Open)</div>
            <p>Hidden content !</p>
            <div class="p-tb-1 accordion" @click="accordion">Section 3 (Open)</div>
            <p>Hidden content !</p>
            <div class="p-tb-1 accordion" @click="accordion">Section 4 (Open)</div>
            <p>Hidden content !</p>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return { content: "" };
    },
    methods: {
        accordion(e: any) {
            e.target.classList.toggle("accordion--active");
        },
    },
    async asyncData({ $content }) {
        console.log(await $content("accordion").fetch());
        return {
            content: await $content("accordion").fetch(),
        };
    },
});
</script>

<style lang="scss" scoped>
.docs {
    // min-height: 100vh;
    --tw-bg-opacity: 1;
    background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
}
.viewport {
    width: 1024px;
    margin: auto;
}
</style>
