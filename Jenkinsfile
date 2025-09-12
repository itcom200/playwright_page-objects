pipeline {
    agent any

    options{
        // เก็บ 3 build และเก็บ artifact ไว้แค่ 2 build อีก 1 build ที่เหลือจะ ไม่มี artifact เก็บไว้
        buildDiscarder(logRotator(numToKeepStr: '3', artifactNumToKeepStr: '2'))
        disableConcurrentBuilds()     
        skipDefaultCheckout() //สั่งให้ Jenkins ไม่ต้อง checkout อัตโนมัติ ทำ checkout เองใน stage
    }

    stages {
        stage('Checkout') {
            steps {
                // stage('Checkout'): ดึงโค้ดจาก repository ที่กำหนด
                checkout([$class: 'GitSCM',
                branches: [[name: '*/master']],
                userRemoteConfigs: [[url: 'https://github.com/itcom200/playwright_page-objects.git']],
                extensions: [[$class: 'CleanBeforeCheckout']]
                ])
            }
        }
        
        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
                bat 'npx playwright install'
            }
        }
         stage('Run Tests') {
            steps {
                bat 'npx playwright test --reporter=html'
                bat 'npx playwright show-report --report=playwright-report --output=playwright-report-static'
            }//แสดง report โดยใช้ จาก playwright-report มาที่ playwright-report-static แทนเป็นการสร้างใหม่เพื่อแสดง
        }
        stage('Publish Report') {
            steps {
            archiveArtifacts artifacts: 'playwright-report-static/**', fingerprint: true
            }
        }
    }

    
    post {
        always {
            publishHTML(target: [
                    allowMissing: false, //ไม่เจอ report build จะ fail ทันที
                    alwaysLinkToLastBuild: true, //จะสร้าง link report ไปยัง build ล่าสุดเสมอ
                    keepAll: true, //เก็บ report ของ ทุก build ถ้า false จะเก็บแค่ report ของ build ล่าสุด
                    reportDir: 'playwright-report-static',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report' //ชื่อ report ที่จะแสดงบน Jenkins UI
                ])

            script {
                emailext(
                    subject: "Jenkins Job - Build ${currentBuild.fullDisplayName}",
                    body: """<p>Build ${currentBuild.fullDisplayName} is completed.</p>
                             <p>Please check the attached test results.</p>""",
                    to: 'love_bas_bas@hotmail.com',
                    attachmentsPattern: 'playwright-report/**/*.html,playwright-report/**/*.png',
                    mimeType: 'text/html'
                )
            }
        }
    }
}
