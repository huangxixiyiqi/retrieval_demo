<template>
    <div class="index-page">

        <div class="grid-content bg-purple-dark">
            <SearchNavigate @tab-change="handleTabChange" />
        </div>
        
        <div class="grid-content bg-purple-dark">
            <router-view />
        </div>

        <template>
            <el-backtop visibility-height="10"></el-backtop>
        </template>
    </div>
</template>

<script>
import SearchNavigate from './SearchNavigate.vue';
import Text2Image from './Text2Image.vue';
import Image2Text from './Image2Text.vue';
export default {
    name: 'Index', // 组件名称
    components: {
        SearchNavigate,
        Text2Image,
        Image2Text,

    },
    data() {
        return {
            // 初始化数据（可根据需求扩展）
            currentTab: 'first', // 默认显示 "文本检索图像"
            
        };
    },
    methods: {
        
        handleTabChange(tabName) {
            // 更新当前选中的标签名
            this.currentTab = tabName;
            let targetPath = '';
            if (tabName === 'first') {
                targetPath = '/index/text-to-image'; // 跳转到 Text2Image 页面
            } else if (tabName === 'second') {
                targetPath = '/index/image-to-text'; // 跳转到 Image2Text 页面
            }

            // 检查当前路由是否与目标路由相同
            if (this.$route.path !== targetPath) {
                this.$router.push(targetPath);
            }
        },
    },
    mounted() {
        console.log('Index 页面已加载'); // 调试日志
        this.$router.push('/index/text-to-image');
    },
};
</script>

<style>

</style>