pipeline {
    agent any
    
    tools {
        nodejs "nodejs-latest"
    }
    
    environment {
        // 可以在这里定义环境变量
        PROJECT_NAME = 'vue_platform'
        DEPLOY_PATH = '/docs/codes/vue_platform'
    }
    
    stages {
        stage('Checkout') {
            steps {
                // 从 GitHub 拉取代码
                git branch: 'test', 
                url: 'https://github.com/ColaLovingCat/vue_platform.git',
                credentialsId: 'github-credential'
            }
        }
        
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build:test'
            }
        }
        
        stage('Deploy to Nginx') {
            steps {
                sh """
                    echo "🚀 开始部署 Vue 项目..."
                    # 确保目标目录存在
                    sudo mkdir -p ${DEPLOY_PATH}
                    # 删除旧文件
                    echo "🧹 清理旧文件..."
                    sudo rm -rf ${DEPLOY_PATH}/*
                    # 复制新构建文件
                    echo "📦 复制新文件..."
                    sudo cp -r dist/* ${DEPLOY_PATH}/
                    echo "文件部署完成"
                """
            }
        }
        
        stage('Reload Nginx') {
            steps {
                sh """
                    echo "重新加载 Nginx 配置..."
                    sudo nginx -t && sudo systemctl reload nginx
                    echo "Nginx 重新加载完成"
                """
            }
        }
    }
    
    post {
        always {
            // 总是执行的步骤，比如清理、通知等
            echo 'Pipeline 完成'
        }
        success {
            // 构建成功时执行
            emailext (
                subject: "✅ 构建成功: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Vue 项目构建成功！\n\n查看详情: ${env.BUILD_URL}",
                to: "1207549518@qq.com"
            )
        }
        failure {
            // 构建失败时执行
            emailext (
                subject: "❌ 构建失败: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Vue 项目构建失败！\n\n查看详情: ${env.BUILD_URL}",
                to: "1207549518@qq.com"
            )
        }
    }
}
