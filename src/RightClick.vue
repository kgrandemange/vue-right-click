<template>
    <div @contextmenu.prevent.stop="contextMenuHandler">
        <slot></slot>
        <transition name="fade">
            <ul v-show="openMenu" :style="{top: top, left: left, height: height}" class="menu" ref="contextMenuItems" @blur="openMenu = false">
                <li v-for="item in items" @click.prevent="item.onClick" :key="item.id">
                    {{ item.name }}
                </li>
            </ul>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'right-click',
        props: ['items'],
        data () {
            return {
                openMenu: false,
                top: 0,
                left: 0,
                height: 0,
                width: 0,
                contextMenuItems: null
            }
        },
        mounted () {
            this.handleEvent = function() {
                this.openMenu = false
            }
            window.document.querySelector('body').addEventListener('click', this)
            window.document.querySelector('body').addEventListener('contextmenu', this)
        },
        beforeDestroy () {
            this.$root.$el.removeEventListener('click', this)
            this.$root.$el.removeEventListener('contextmenu', this)
        },
        methods: {
            contextMenuHandler (e) {
                this.top = `${e.clientY + document.body.scrollTop + document.documentElement.scrollTop}px`
                this.left = `${e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft}px`
                this.height = `${this.items.length * 30}px`
                this.openMenu = true
            }
        }
    }
</script>

<style scoped lang="scss">
    .menu {
        position: fixed;
        z-index: 1000;
        width: 200px;
        border-radius: 4px;
        border: 1px solid #ebeef5;
        background-color: #fff;
        color: #303133;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        margin: 0;
        padding: 0;
        cursor: pointer;

        li {
            list-style-type: none;
            padding: 5px;

            &:hover {
                background-color: #ededed;
            }
        }

        li:not(:last-child) {
            border-bottom: 1px solid #e6e6e6;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
