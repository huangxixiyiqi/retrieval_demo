<template>
  <div style="margin-left: 100px; margin-right: 100px;">
    <el-container>
      <el-main>
        <el-row :gutter="20" style="margin-bottom: 20px;">
          <el-col :style="{ width: '20%' }" v-for="(product, index) in paginatedProducts" :key="index">
            <el-card shadow="hover" style="height: 450px; overflow-y: auto; ">
              <el-image :src="product.product.product_images" :preview-src-list="[product.product.product_images]"
                style="max-width: 100%; height: 300px;" fit="cover">
                <template #error>
                  <div class="image-error">加载失败</div>
                </template>
              </el-image>
              <div @click="showProductDetails(product)" class="clickable-area">
                <div class="product-title">商品名称: {{ product.product.product_name }}</div>
                <div class="product-ranking">排名: {{ product.rank }}</div>
                <div class="product-score">得分: {{ product.score }}</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-pagination background layout="prev, pager, next" :total="totalItems" :current-page.sync="currentPage"
          @current-change="handleCurrentChange"></el-pagination>
      </el-main>
    </el-container>

    <!-- 使用新组件 -->
    <ProductDetailsDialog :visible.sync="dialogTableVisible" :product="selectedProduct" />
  </div>
</template>

<script>
import ProductDetailsDialog from './ProductDetailsDialog.vue'; // 引入新组件

export default {
  name: 'ProductList',
  components: {
    ProductDetailsDialog // 注册新组件
  },
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10,
      dialogTableVisible: false,
      selectedProduct: null
    };
  },
  computed: {
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.products.slice(start, end);
    },
    totalItems() {
      return this.products.length;
    }
  },
  methods: {
    handleCurrentChange(page) {
      this.currentPage = page;
    },
    showProductDetails(product) {
      this.selectedProduct = product;
      this.dialogTableVisible = true;
    }
  }
};
</script>

<style scoped>
/* 样式保持不变 */
.product-title {
  margin-bottom: 5px;
}

.product-description {
  margin-bottom: 5px;
}

.product-ranking {
  margin-bottom: 5px;
}

.product-score {
  margin-bottom: 5px;
}

.image-error {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  background-color: #f5f7fa;
  color: #909399;
  font-size: 14px;
}

.clickable-area {
  cursor: pointer;
  /* 鼠标悬停时显示为手型 */
}
</style>