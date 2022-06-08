<template>
    <main class="docs">
        <!-- <div class="notice fixed-bottom-5pc fixed-left-5pc">
            <div class="notice__text">Test</div>
            <div class="notice-close-button">Dismiss</div>
        </div> -->
        <div class="navbar mobile-only border-bottom">
            <div class="p05 flex justify-right align-center mobile-only">
                <div class="hamburger" :class="navbar ? 'hamburger--active' : ''" @click="set('navbar')">
                    <span></span>
                </div>
            </div>
        </div>
        <div
            class="navbar border-bottom z200 mobile-h100 mobile-fixed-top mobile-charcoal navbar--mobile-bordered"
            :class="navbar ? 'mobile-right-left-50pc' : 'mobile-fixed-left-m100pc'"
        >
            <div class="navbar__inner mobile-flex-col">
                <div class="navbar__group">
                    <div class="navbar__item">
                        <div class="navbar__link">Website Brand</div>
                    </div>
                </div>
                <div class="navbar__group justify-right">
                    <div class="navbar__item">
                        <div class="navbar__link">Link A</div>
                    </div>
                    <div class="navbar__item" @click="toggleClass($event, 'navbar--show')">
                        <div class="navbar__link expand" @click="toggleClasses($event, ['expand--show', 'border-bottom-dashed'])">Link B</div>
                        <div class="navbar__nested panel-desktop">
                            <div class="navbar__item">
                                <div class="navbar__link">Test</div>
                            </div>
                            <div class="navbar__item">
                                <div class="navbar__link">Test</div>
                            </div>
                        </div>
                    </div>

                    <div class="navbar__item">
                        <div class="navbar__link">Test</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="handle z200 handle--right-edge fixed-right mobile-fixed-bottom-40pc mobile-only" @click="set('open')">
            <img class="s2" src="folder.svg" />
        </div>

        <div class="handle handle--right-edge bottom-2 fixed-right" v-if="top" @click="goTop()">
            <img class="s2" src="top.svg" />
        </div>

        <div class="columns columns--tight">
            <div class="column-2">
                <!-- <div class="menu p1 desktop-w-100 menu--fixed mobile-top menu--desktop-open" :class="open ? 'menu--open' : 'menu--hidden'"> -->
                <div class="menu p1 mobile-fixed-left z100 mobile-fixed-top mobile-h100 desktop-w10" :class="open ? 'menu--open' : ''">
                    <div class="panel mobile-bg-white">
                        <h3>Directory</h3>
                        <div class="expand accordion" @click="accordion">Section 1 (Open)</div>
                        <div>
                            <p>Test</p>
                            <p>Test</p>
                            <p>Test</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column-7">
                <div class="container">
                    <Nuxt></Nuxt>
                </div>
            </div>

            <div class="column-3">
                <div
                    class="drawer-mobile mobile-fixed-top-0 p1 mobile-fixed-right-0"
                    :class="toc ? 'mobile-left-auto z200 handle--active' : 'mobile-translate-x-100pc'"
                >
                    <div class="handle z200 handle--right-edge mobile-abs-top-20pc mobile-only" @click="set('toc')">
                        <img class="s2" src="document.svg" />
                    </div>

                    <div class="panel">
                        <h3>Table of Contents</h3>
                        <p>Accordion</p>
                    </div>
                </div>

                <div
                    class="drawer-mobile mobile-fixed-top-0 p1 mobile-fixed-right-0"
                    :class="drawer ? 'mobile-left-auto z200 handle--active' : 'mobile-translate-x-100pc'"
                >
                    <div class="handle z200 handle--right-edge mobile-abs-bottom-10pc mobile-only" @click="set('drawer')">
                        <img class="s2" src="cogwheels.svg" />
                    </div>
                    <div class="panel drawer-mobile">
                        <p>Test</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return {
            menu: false,
            open: false,
            drawer: false,
            toc: false,
            top: false,
            navbar: false,
        };
    },
    mounted() {
        window.addEventListener("scroll", this.scrollTracker);
    },
    methods: {
        toggleClass(e: any, className: string) {
            e.target.classList.toggle(className);
        },
        toggleClasses(e: any, classNames: []) {
            classNames.forEach((className: string) => {
                e.target.classList.toggle(className);
            });
        },
        accordion(e: any) {
            e.target.classList.toggle("accordion--active");
            e.target.classList.toggle("expand--active");
        },
        goTop() {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        },
        scrollTracker() {
            const scroll = document.body.scrollTop || document.documentElement.scrollTop;
            if (scroll > 300) {
                this.top = true;
                return;
            }
            this.top = false;
        },
        set(key: string) {
            // @ts-ignore
            this[key] = !this[key];
        },
        setDrawer() {
            this.drawer = !this.drawer;
        },
        setOpen() {
            this.open = !this.open;
            document.querySelector("body")?.classList.toggle("open");
        },
        toggle() {
            this.menu = !this.menu;
            document.querySelector("body")?.classList.toggle("open");
        },
        handler(e: any) {
            console.log(e);
            e.target.parentNode.classList.toggle("handle--active");
        },
    },
});
</script>

<style lang="scss" scoped>
$background: rgb(34, 34, 34);
html,
body,
.docs {
    color: rgb(34, 34, 34);
    background-color: rgba(243, 244, 246, 1);
}

.menu {
    --menu-bg-color: transparent;
    --menu-fg-color: black;
    // background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
}

.menu--open {
    .flex {
        justify-content: flex-end;
    }
}
</style>
