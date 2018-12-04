<template>
    <div @contextmenu.prevent.stop="contextMenuHandler" @blur="blurHandler">
        <slot></slot>
        <transition name="fade">
            <ul v-show="openMenu" :style="{top: top, left: left }" class="menu" ref="contextMenuItems">
                <li v-for="item in items" @click.prevent="handleClick(item)" :key="item.id">
                    <span v-if="item.template" v-html="item.template"></span>
                    <span v-else>{{ item.name }}</span>
                </li>
            </ul>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'right-click',
        props: {
            items: {
                type: Array,
                required: true
            },
            currentItem: {
                type: Object,
                required: false,
                default: null
            }
        },
        data () {
            return {
                openMenu: false,
                top: 0,
                left: 0,
                width: 0,
                contextMenuItems: null,
                currentMenuId: 0
            }
        },
        created () {
            this.currentMenuId = Math.floor((Math.random() * 1000000) + 1);
        },
        mounted () {
            this.handleEvent = function(e) {
                this.openMenu = false
            }
            window.document.querySelector('html').addEventListener('contextmenu', this)
        },
        beforeDestroy () {
            window.document.querySelector('html').removeEventListener('contextmenu', this)
        },
        methods: {
            contextMenuHandler (e) {
                this.top = `${e.clientY + document.body.scrollTop + document.documentElement.scrollTop}px`
                this.left = `${e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft}px`
                this.openMenu = true
            },
            handleClick(item) {
                item.onClick(this.currentItem)
                this.openMenu = false
            },
            blurHandler () {
                console.log('blurHandler')
                this.openMenu = false
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
