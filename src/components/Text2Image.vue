<template>
    <div class="text2image">
        <div class="menu-container">
            <!-- 按钮放置在菜单上方 -->
            <el-button icon="el-icon-chat-line-round" circle class="history-button" @click="handleClose"></el-button>
            <el-menu class="el-menu-vertical-demo" :collapse="isCollapse">
                <!-- 动态渲染搜索历史 -->
                <el-menu-item v-if="!isCollapse" v-for="(item, index) in searchHistory" :key="index"
                    @click="handleSearchItemClick(item.searchText)" >
                    {{ item.searchText }}
                </el-menu-item>
            </el-menu>
        </div>
        <div class="search-container">
            <!-- 当 products 为空时显示占位 div -->
            <div v-if="products.length === 0" class="placeholder">
                <p style="font-size: 70px; margin-bottom: -25px;">网络交易风险信息检索工具</p>
                <p style="font-size: 20px;">图片库为各种商品图片</p>
            </div>

            <el-form ref="form" :model="form">
                <div class="form-container">
                    <el-form-item>
                        <el-input type="text" v-model="form.query" placeholder="请输入查询（商品）"></el-input>
                    </el-form-item>

                    <el-button @click="onSubmit" icon="el-icon-search" circle></el-button>

                </div>
            </el-form>
            <!-- 当 products 不为空时显示 ProductList -->
            <ProductList v-if="products.length !== 0" :products="products" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ProductList from './ProductList.vue';
import config from '@/config/config.js'
export default {
    name: 'Text2Image',
    components: {
        ProductList
    },
    data() {
        return {
            form: {
                query: ''
            },
            products: [],
            isCollapse: true,
            searchHistory: [] // 存储用户的搜索历史
        };
    },
    methods: {
        async onSubmit() {
            try {
                // const formData = new FormData();
                // formData.append('qid', this.form.query);

                // console.log('查询请求数据:', formData);

                // const response = await axios.post(`/api/ret/search_data_all/`, formData, {
                //     headers: {
                //         'Content-Type': 'multipart/form-data'
                //     }
                // });
                // this.fetchSearchHistory();
                // this.products = response.data.data.results || [];
                // console.log('查询成功:', this.products);
                
                const url = 't2i_history/search';
                const params = {
                    userId: localStorage.getItem('user_id'),
                    searchText: this.form.query,
                };

                // 使用 axios 发送 POST 请求
                axios.post(config.baseUrl+url, params)
                    .then(response => {
                        // 请求成功后的处理逻辑
                        console.log('搜索成功:', response.data);

                        // 假设返回的数据中包含 token 或用户信息
                        if (response.data.status === 'success') {
                            this.$message({
                                message: '搜索成功!',
                                type: 'success'
                            });
                            this.fetchSearchHistory();
                            this.products = response.data.data.results || [];
                            console.log('查询成功:', this.products);    
                        } else {
                            this.$message.error('搜索失败！');

                        }
                    })
                    .catch(error => {
                        // 请求失败后的处理逻辑
                        console.error('搜索失败:', error);
                       
                    });

            } catch (error) {
                console.error('查询失败:', error);
            }
        },
        handleClose() {
            this.fetchSearchHistory();
            this.isCollapse = !this.isCollapse;

        },
        async fetchSearchHistory() {
            try {
                // 从缓存中获取用户 ID
                const userId = localStorage.getItem('user_id');
                if (!userId) {
                    console.warn('未找到用户 ID，无法获取搜索历史');
                    return;
                }

                // 调用接口获取搜索历史
                const response = await axios.get(config.baseUrl+`t2i_history/getHistoryByUserId`, {
                    params: { userId } // 通过路径参数传递 userId
                });

                // 存储搜索历史数据
                this.searchHistory = response.data || [];
                console.log('搜索历史:', this.searchHistory);
            } catch (error) {
                console.error('获取搜索历史失败:', error);
            }
        },
        handleSearchItemClick(searchText) {
            // 处理搜索历史项点击事件
            this.form.query = searchText; // 将搜索历史内容填充到输入框
            this.onSubmit(); // 自动触发搜索
        }
    },
    mounted() {
        // 页面初始化时调用获取搜索历史的方法
        this.fetchSearchHistory();
    }
};
</script>

<style>
/* 样式保持不变 */
.text2image {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
}

.search-container {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.menu-container {
    flex: 0.05;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-right: 20px;
}

.placeholder {
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.form-container {
    width: 768px;
    height: 116px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F1F2F4;
    box-sizing: border-box;
    border-radius: 30px;
}

.el-form-item {
    margin: 0;
    display: flex;
    align-items: center;
}

.el-input {
    margin-right: 50px;
}

.form-container .el-input__inner {
    background-color: #F1F2F4 !important;
    border: 0;
    height: 100px;
    width: 600px;
    font-size: 20px;
    padding: 0px;
    color: black;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 1000px;
}

.history-button {
    border: 0;
    margin-left: 10px;
}

.history-button .el-icon-chat-line-round {
    font-size: 25px;
}
</style>