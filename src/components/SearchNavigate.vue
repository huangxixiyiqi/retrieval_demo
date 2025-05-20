<template>
    <div class="search-navigate">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
            <el-tab-pane label="文本检索图像" name="first"></el-tab-pane>
            <el-tab-pane label="图像检索文本" name="second"></el-tab-pane>
            <div style="display: flex; align-items: center;">
                <p style="margin-right: 20px;font-size: 20px;">{{account}}</p>
                <el-button icon="el-icon-circle-close" type="danger" circle class="close-button" @click="handleLoginout"></el-button>
            </div>
           
        </el-tabs>
    </div>
</template>

<script>
export default {
    name: 'SearchNavigate',
    data() {
        return {
            activeName: 'first', // 默认选中 "文本检索图像"
            account: localStorage.getItem('account'),
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
            // 触发自定义事件，将当前选中的标签名传递给父组件
            this.$emit('tab-change', tab.name);
        },
        handleLoginout() {
            localStorage.setItem('jwt_token', null);
            localStorage.setItem('isAuthenticated', 'false');
            this.$router.push('/login');
            
            this.$message({
                message: '成功退出！',
                type: 'success'
            });
        }
    }
};
</script>

<style scoped>
.search-navigate {
    /* 样式可以根据需要调整 */
}

.tabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 20px;
}

.close-button {
    margin-left: auto;

    /* 确保按钮靠右 */
}
</style>