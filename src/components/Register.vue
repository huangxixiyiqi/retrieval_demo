<template>
    <div class="login-background">
        <div class="login-container">
            <div>
                <p style="font-size: 70px; margin-bottom: -25px;color: white;">网络交易风险信息检索工具</p>
            </div>
            <h2 style="color: white;">用户注册</h2>
            <el-input v-model="account" @input="validateAccount" placeholder="请输入用户名" />
            <el-input v-model="password" placeholder="请输入密码" type="password" show-password />
            <div class="btn-group">
                <el-button type="success" @click="handleRegister">注册</el-button>
                <el-button @click="back">返回</el-button>
            </div>
            <p class="tips">{{ tips }}</p>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import config from '@/config/config.js';
export default {
    name: 'register',
    data() {
        return {
            account: '',
            password: '',
            tips: '',
        };
    },
    methods: {
        validateAccount(value) {
            // 使用正则表达式匹配字母和数字
            const regex = /^[a-zA-Z0-9]*$/;
            if (!regex.test(value)) {
                // 如果输入不符合规则，移除非法字符
                this.account = value.replace(/[^a-zA-Z0-9]/g, '');
                this.$message.warning('用户名只能包含字母和数字');
            }
        },
        handleRegister() {
            // 定义请求的 URL 和参数
            const url = 'users/add';
            const params = {
                account: this.account,
                password: this.password,
            };

            // 使用 axios 发送 POST 请求
            axios.post(config.baseUrl+url, params)
                .then(response => {

                    // 假设返回的数据中包含 token 或用户信息
                    if (response.data.status === 'success') {
                        console.log('注册成功:', response.data);
                        this.$message({
                            message: '注册成功!',
                            type: 'success'
                        });
                        // 跳转到首页或其他页面
                        this.$router.push('/login');
                    } else {
                        this.$message.error('账号已被注册！');
                        this.tips = '账号已被注册！';
                    }
                })
                .catch(error => {
                    // 请求失败后的处理逻辑
                    console.error('注册失败:', error);
                    this.tips = '注册失败，请检查网络或稍后重试';
                });
        },
        back() {
            this.tips = '返回登陆页';
            this.$router.push('/login'); // 跳转到 Image2Text 页面

        },
    },
};
</script>

<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

    /* padding: 20px; */
}

/* 未登录时的背景图片样式 */
.login-background {
    width: 100%;
    height: 100%;
    background-image: url('../static/2153816108405096448.heic');
    /* 替换为实际背景图片路径 */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.el-input {
    width: 300px;
    margin: 15px 0;
    /* height: 40px; */
}

.btn-group {
    margin: 20px 0;
}

.btn-group .el-button {
    margin: 0 10px;
    padding: 12px 24px;
}

.tips {
    color: #ffffff;
    font-size: 14px;
    margin-top: 10px;
}
</style>