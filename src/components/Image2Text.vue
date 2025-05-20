<template>
    <div class="image2text">
        <div class="menu-container">
            <!-- 按钮放置在菜单上方 -->
            <el-button icon="el-icon-chat-line-round" circle class="history-button" @click="handleClose"></el-button>
            <el-menu class="el-menu-vertical-demo" :collapse="isCollapse">
                <!-- 动态渲染搜索历史 -->
                <el-menu-item v-if="!isCollapse" v-for="(item, index) in searchHistory" :key="index"
                    @click="handleSearchItemClick(item.image_url, item.imageUrl)">
                    <el-image :src="item.imageUrl" :preview-src-list="[item.imageUrl]"
                        style="max-width: 100%; height: 30px;" fit="cover">
                        <template #error>
                            <div class="image-error">加载失败</div>
                        </template>
                    </el-image>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="search-container">
            <div v-if="products.length === 0">
                <p style="font-size: 70px; margin-bottom: -25px;">网络交易风险信息检索工具</p>
                <p style="font-size: 20px;">图片库为各种商品图片</p>
            </div>
            <!-- 上传区域 -->
            <div class="upload">
                <el-upload class="upload-demo" drag :action="uploadUrl" name="image" :on-success="handleSuccess"
                    :data="{ userId: userId }" :before-upload="handleBeforeUpload">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">仅支持上传 JPG 或 PNG 格式的图片</div>
                </el-upload>
                <div v-if="previewUrl" class="preview">
                    <el-image :src="previewUrl" :preview-src-list="[previewUrl]" style="max-width: 100%; height: 300px;"
                        fit="cover">
                        <template #error>
                            <div class="image-error">加载失败</div>
                        </template>
                    </el-image>
                </div>
            </div>

            <!-- 动态渲染多个 el-descriptions -->
            <div v-for="(product, index) in paginatedProducts" :key="index" class="product-descriptions">
                <el-descriptions class="margin-top" :title="`检索结果 ${(currentPage - 1) * pageSize + index + 1}`"
                    :column="1" border @click.native="showProductDetails(product)" style="cursor: pointer;">
                    <el-descriptions-item label="商品名称" label-class-name="descriptions-label"
                        content-class-name="descriptions-content">
                        {{ product.product.product_name }}
                    </el-descriptions-item>
                    <!-- <el-descriptions-item label="排名" label-class-name="descriptions-label"
                    content-class-name="descriptions-content" :span="1">
                    {{ product.rank }}
                </el-descriptions-item>
                <el-descriptions-item label="得分" label-class-name="descriptions-label"
                    content-class-name="descriptions-content" :span="1">
                    {{ product.score }}
                </el-descriptions-item> -->

                </el-descriptions>
                <el-descriptions class="margin-top" :column="1" border @click.native="showProductDetails(product)"
                    style="cursor: pointer; margin-top: -40px;">
                    <el-descriptions-item label-class-name="descriptions-label1"
                        content-class-name="descriptions-content1" :span="1">
                        <strong>排名</strong>：{{ product.rank }}；<strong>得分</strong>：{{ product.score.toFixed(2) }}<br>
                        {{ formatProductIntro(product.product.product_intro) }} ；{{
                            formatProductIntro(product.product.product_spec
                            ) }}
                    </el-descriptions-item>
                </el-descriptions>
            </div>

            <!-- 暂无检索结果提示 -->
            <div v-if="products.length === 0" class="margin-top">暂无检索结果</div>

            <!-- 分页组件 -->
            <el-pagination v-if="products.length > 0" class="pagination" background layout="prev, pager, next"
                :total="products.length" :page-size="pageSize" :current-page="currentPage"
                @current-change="handlePageChange" />

            <!-- 商品详情对话框 -->
            <ProductDetailsDialog :visible.sync="dialogTableVisible" :product="selectedProduct" />
        </div>

    </div>
</template>

<script>

import ProductDetailsDialog from './ProductDetailsDialog.vue'; // 引入商品详情对话框组件
import axios from 'axios';
import config from '@/config/config.js'
export default {
    name: 'Image2Text',
    components: {
        ProductDetailsDialog // 注册商品详情对话框组件
    },
    data() {
        return {
            uploadUrl: config.pyUrl + `i2t/searchi2t_data_all/`, // 拼接完整URL
            products: [], // 存储检索结果
            userId: localStorage.getItem('user_id'),
            uploaded_image_url: '',
            previewUrl: '', // 存储图片预览URL
            currentPage: 1, // 当前页码
            pageSize: 10, // 每页显示数量
            dialogTableVisible: false, // 控制对话框显示状态
            selectedProduct: null, // 当前选中的商品
            isCollapse: true,
            searchHistory: [] // 存储用户的搜索历史
        };
    },
    computed: {
        // 计算当前页需要展示的商品数据
        paginatedProducts() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = this.currentPage * this.pageSize;
            return this.products.slice(start, end);
        },
    },
    methods: {
        handleSuccess(response, file) {
            console.log('服务器返回数据:', response);
            console.log('上传的文件信息:', file);
            // 在这里处理返回参数
            this.products = response.data.results || [];
            this.uploaded_image_url = response.data.uploaded_image;
            this.currentPage = 1; // 数据更新后重置到第一页
            console.log('上传图片路径:', response.data.uploaded_image);

            const url = 'i2t_history/addHistory';
            const params = {
                userId: localStorage.getItem('user_id'),
                imageUrl: response.data.uploaded_image,
            };

            // 使用 axios 发送 POST 请求
            axios.post(config.baseUrl+url, params)
                .then(response => {
                    // 请求成功后的处理逻辑
                    console.log('搜索成功:', response.data);
                    this.$message({
                        message: '搜索成功!',
                        type: 'success'
                    });
                    this.fetchSearchHistory();

                })
                .catch(error => {
                    // 请求失败后的处理逻辑
                    console.error('搜索失败:', error);

                });
        },
        handleBeforeUpload(file) {
            // 检查文件类型
            const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJPGorPNG) {
                this.$message.error('上传失败：仅支持 JPG 或 PNG 格式的图片');
                return false; // 阻止上传
            }

            // 生成图片预览URL
            const reader = new FileReader();
            reader.onload = (e) => {
                this.previewUrl = e.target.result; // 设置预览URL
            };
            reader.readAsDataURL(file); // 读取文件为Data URL

            return true; // 允许上传
        },
        handlePageChange(page) {
            this.currentPage = page; // 更新当前页码
        },
        showProductDetails(product) {
            this.selectedProduct = product; // 设置选中的商品
            this.dialogTableVisible = true; // 显示对话框
        },
        formatProductIntro(productIntro) {
            if (Array.isArray(productIntro)) {
                return productIntro.map(item =>
                    Object.entries(item)
                        .map(([key, value]) => `${key}：${value}`)
                        .join(';  ')
                ).join('; ');
            } else {
                return Object.entries(productIntro)
                    .map(([key, value]) => `${key}：${value}`)
                    .join(';  ');
            }
        },
        async handleSearchItemClick(image_url, imageUrl) {
            try {
                
                this.previewUrl = imageUrl; // 设置预览URL
                console.log('上传url:', image_url);
                console.log('上传url:', imageUrl);
                console.log('previewUrl:', this.previewUrl);
                // 模拟上传操作
                const formData = new FormData();
                formData.append('image_url', image_url);
                // formData.append('userId', this.userId);
                console.log('查询请求数据:', formData);

                const uploadResponse = await axios.post(this.uploadUrl, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                // 处理上传成功后的逻辑
                this.handleSuccess(uploadResponse.data, { url: imageUrl });
            } catch (error) {
                console.error('搜索历史图片上传失败:', error);
                this.$message.error('搜索历史图片上传失败，请稍后重试');
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
                const response = await axios.get(config.baseUrl+`i2t_history/getHistoryByUserId`, {
                    params: { userId } // 通过路径参数传递 userId
                });

                // 存储搜索历史数据，并为每个 image_url 添加前缀
                this.searchHistory = (response.data || []).map(item => ({
                    ...item,
                    imageUrl: config.pyUrl + `${item.imageUrl}`,
                    image_url: item.imageUrl
                }));
                console.log('搜索历史:', this.searchHistory);
            } catch (error) {
                console.error('获取搜索历史失败:', error);
            }
        },
    },
    mounted() {
        // 页面初始化时调用获取搜索历史的方法
        this.fetchSearchHistory();
    }
};
</script>

<style>
.image2text {
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

.upload {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-top: 50px;
    padding: 20px;
    box-sizing: border-box;
}

.upload-demo {
    flex: 1;
    max-width: 400px;
}

.preview {
    flex: 1;
    max-width: 300px;
}

@media (max-width: 768px) {
    .upload {
        flex-direction: column;
        gap: 10px;
    }
}

.margin-top {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: -20px;
}

.descriptions-label {
    width: 15%;
    font-size: 16px;
    font-weight: bold !important;
}

.descriptions-content {
    font-size: 14px;

}

.pagination {
    margin-top: 20px;
    text-align: center;
}

.descriptions-label1 {
    width: 0% !important;
    display: none !important;
    /* 隐藏 label */
}

.descriptions-content1 {
    font-size: 14px;
    width: 100%;
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