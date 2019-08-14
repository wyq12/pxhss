<style lang="less">
    @import "./main.less";
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con" :style="{
            width: shrink?'0px':'200px',
            overflow: shrink ? 'visible' : 'auto',
            borderRight: shrink ? 'none' : 'auto'}">
            <shrinkable-menu
                :shrink="shrink"
                @on-change="handleSubmenuChange"
                :theme="menuTheme"
                :before-push="beforePush"
                :open-names="openedSubmenuArr"
                :menu-list="menuList">
                <div slot="top" class="menu-logo-con">
                    <Button :style="{
                            transform: 'rotateZ(' + (this.shrink ? '-180' : '0') + 'deg)',
                            background: shrink ? '#40a9ff' : '#fff',
                            boxShadow: shrink ? 'rgba(0, 0, 0, 0.1) -2px -2px 5px': 'none',
                            padding: 0,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                        }"
                        type="text"
                        @click="toggleClick">
                        <img v-show="shrink" src="../images/menu-w.png" alt="">
                        <img v-show="!shrink" src="../images/menu-s.png" alt="">
                    </Button>
                </div>
            </shrinkable-menu>
        </div>
        <div class="main-header-con">
            <div class="main-header">
                <div class="navicon-con">
                    <div slot="top" class="logo-con">
                        <img src="../images/logo.gif" key="max-logo" />
                    </div>
                </div>
                <div class="header-middle-con">
                    <div class="main-breadcrumb" style="display:inline-block">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                    <div style="display:inline-block;line-height: 40px;float:right">
                        <span class="card-user-infor-name" :style="{width: '100%',color: '#38B3FF',fontWeight: '100',fontSize: '1rem', color: 'white'}"><b :style="{fontWeight: '600', color: 'white'}">{{userName}}</b>欢迎您，今天是<b :style="{fontWeight: '600'}">{{nowLoginDay}}</b></span>
                    </div>
                </div>
                <div class="header-avator-con">
                    <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>
                    <message-tip v-model="mesCount"></message-tip>
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ userName }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <!-- <DropdownItem name="ownSpace">个人中心</DropdownItem> -->
                                    <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
                        </Row>
                    </div>
                </div>
            </div>
            <div class="tags-con" :style="{paddingLeft: shrink?'60px':'200px'}">
                <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
            </div>
        </div>
        <div class="single-page-con" :style="{left: shrink?'0px':'200px'}">
            <div class="single-page">
                <keep-alive :include="cachePage">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script>
    import shrinkableMenu from '../components/main/shrinkable-menu/shrinkable-menu.vue';
    import tagsPageOpened from '../components/main/tags-page-opened.vue';
    import breadcrumbNav from '../components/main/breadcrumb-nav.vue';
    import fullScreen from '../components/main/fullscreen.vue';
    import messageTip from '../components/main/message-tip.vue';
    import Cookies from 'js-cookie';
    import util from '@/libs/util.js';
    import store from '@/store';
    import { formatDate } from '@/libs/date';
    export default {
        components: {
            shrinkableMenu,
            tagsPageOpened,
            breadcrumbNav,
            fullScreen,
            messageTip
        },
        data () {
            return {
                websock: null,
                shrink: false,
                userName: '',
                nowLoginDay:'',
                isFullScreen: false,
                openedSubmenuArr: this.$store.state.app.openedSubmenuArr
            };
        },
        created () {
           
        },
        computed: {
            menuList () {
                return this.$store.state.app.menuList;
            },
            pageTagsList () {
                return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
            },
            currentPath () {
                return this.$store.state.app.currentPath; // 当前面包屑数组
            },
            avatorPath () {
                return localStorage.avatorImgPath;
            },
            cachePage () {
                return this.$store.state.app.cachePage;
            },
            lang () {
                return this.$store.state.app.lang;
            },
            menuTheme () {
                return this.$store.state.app.menuTheme;
            },
            mesCount () {
                return this.$store.getters.new.length;
            }
        },
        methods: {
            audio () {
                var audio = new Audio('http://court.ptnetwork001.com/dist/static/3424.mp3');
                audio.play();
            },
            initWebSocket () {
                let path = window.location.host
                const wsuri = 'ws://' + path + '/api/web/webSocket.jhtml';
                this.websock = new WebSocket(wsuri);
                this.websock.onopen = function (event) {
            			console.log('WebSocket:已连接');
            			console.log(event);
            		};
                this.websock.onmessage = this.websocketonmessage;
                this.websock.onerror = function (event) {
            			console.log('WebSocket:发生错误 ');
            			console.log(event);
            		};
            		this.websock.onclose = function (event) {
            			console.log('WebSocket:已关闭');
            			console.log(event);
            		}
            },
            websocketonmessage () {
                var data = JSON.parse(event.data);
                let newList = [];
                let readList = [];
                data.map(item => {
                    if (item.isRead == 0) {
                        newList.push(item)
                    } else {
                        readList.push(item)
                    }
                    this.$store.commit('SET_NEW', newList);
                    this.$store.commit('SET_READ', readList);
                })
                if (newList.length != 0) {
                    this.$Notice.info({
                        title: '你有新消息，请注意查收',
                        desc: '信箱中共有' + newList.length + '条未读消息'
                    });
                    this.audio();
                }
            },
            init () {
                let pathArr = util.setCurrentPath(this, this.$route.name);
                this.$store.commit('updateMenulist');
                if (pathArr.length >= 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.userName = Cookies.get('user');
                let messageCount = 3;
                this.messageCount = messageCount.toString();
                this.checkTag(this.$route.name);
                this.$store.commit('setMessageCount', 3);
                var dataStr = formatDate(
                    new Date(),
                    'yyyy-MM-dd hh:mm:ss'
                );
                this.nowLoginDay = dataStr.slice(0, 4) + '年' + dataStr.slice(5, 7) + '月' + dataStr.slice(8, 10) + '日';
                // store.dispatch('ShowNotice');
            },
            toggleClick () {
                this.shrink = !this.shrink;
            },
            handleClickUserDropdown (name) {
                if (name === 'ownSpace') {
                    util.openNewPage(this, 'ownspace_index');
                    this.$router.push({
                        name: 'ownspace_index'
                    });
                } else if (name === 'loginout') {
                    // 退出登录
                    this.$store.commit('logout', this);
                    this.$store.commit('clearOpenedSubmenu');
                    this.$store.dispatch('Logout').then(res => {
                        this.$router.push({
                            name: 'login'
                        });
                    })
                }
            },
            checkTag (name) {
                let openpageHasTag = this.pageTagsList.some(item => {
                    if (item.name === name) {
                        return true;
                    }
                });
                if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                    util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
                }
            },
            handleSubmenuChange (val) {
                // console.log(val)
            },
            beforePush (name) {
                // if (name === 'accesstest_index') {
                //     return false;
                // } else {
                //     return true;
                // }
                return true;
            },
            fullscreenChange (isFullScreen) {
                // console.log(isFullScreen);
            }
        },
        watch: {
            '$route' (to) {
                this.$store.commit('setCurrentPageName', to.name);
                let pathArr = util.setCurrentPath(this, to.name);
                if (pathArr.length > 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.checkTag(to.name);
                localStorage.currentPageName = to.name;
            },
            lang () {
                util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
            }
        },
        mounted () {
            this.init();
        },
        created () {
            // 显示打开的页面的列表
            this.$store.commit('setOpenedList');
            this.initWebSocket();
        }
    };
</script>
