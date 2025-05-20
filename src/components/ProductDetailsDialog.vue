<template>
    <el-dialog title="商品详细信息" :visible.sync="dialogVisible">
        <div v-if="selectedProduct" class="dialog-content">
            <div><strong>排名: </strong> {{ selectedProduct.rank }}</div>
            <div><strong>得分: </strong> {{ selectedProduct.score }}</div>
            <div><strong>商品代码: </strong> {{ selectedProduct.id }}</div>
            <div><strong>商品地址: </strong>
                <a :href="selectedProduct.product.product_url" target="_blank">{{ selectedProduct.product.product_url
                    }}</a>
            </div>
            <div><strong>商品名称: </strong> {{ selectedProduct.product.product_name }}</div>
            <div><strong>商品价格: </strong> {{ selectedProduct.product.product_price }}</div>
            <div><strong>商品图片: </strong></div>
            <div v-if="typeof selectedProduct.product.product_images === 'string'">
                <!-- 如果是字符串，直接展示图片 -->
                <a :href="selectedProduct.product.product_images" target="_blank">
                    <img :src="selectedProduct.product.product_images" alt="商品图片"
                        style="width: 100px; height: auto; cursor: pointer;">
                </a>
            </div>
            <div v-else>
                <!-- 如果是数组，循环展示图片 -->
                <ul>
                    <li v-for="(image, index) in selectedProduct.product.product_images" :key="index">
                        <a :href="image.file_url" target="_blank">
                            <img :src="image.file_url" alt="商品图片" style="width: 100px; height: auto; cursor: pointer;">
                        </a>
                    </li>
                </ul>
            </div>
            <div><strong>商品介绍: </strong></div>
            <ul>
                <li v-for="(value, key) in selectedProduct.product.product_intro" :key="key">
                    <div v-for="(value, name) in value" :key="name"><strong>{{ name }}:</strong> {{ value }}</div>
                </li>
            </ul>
            <div><strong>商品规格: </strong></div>
            <ul>
                <li v-for="(value, key) in selectedProduct.product.product_spec" :key="key">
                    <div v-for="(value, name) in value" :key="name"><strong>{{ name }}:</strong> {{ value }}</div>
                </li>
            </ul>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'ProductDetailsDialog',
    props: {
        visible: {
            type: Boolean,
            required: true
        },
        product: {
            type: Object,
            default: null
        }
    },
    computed: {
        dialogVisible: {
            get() {
                return this.visible;
            },
            set(value) {
                this.$emit('update:visible', value);
            }
        },
        selectedProduct() {
            return this.product;
        }
    }
};
</script>

<style scoped>
.dialog-content {
    text-align: left;
    font-size: 20px;
}
</style>