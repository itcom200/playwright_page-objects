pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '3', artifactNumToKeepStr: '2'))
        disableConcurrentBuilds()
        skipDefaultCheckout()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/dev']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/itcom200/playwright_page-objects.git',
                        credentialsId: 'github-playwright-pat'  // ✅ ถ้ามี PAT credential
                    ]],
                    extensions: [[$class: 'CleanBeforeCheckout']]
                ])
            }
        }


        stage('Install Dependencies') {
            steps {
                bat 'npm ci' //ติดตั้ง lib ต่าง ๆ (เช่น @playwright/test, csv-parse)
                bat 'npx playwright install' //โหลด browser ที่ Playwright ใช้ (Chromium, Firefox, WebKit)
            }
        }
         stage('Run Tests') {
            steps {
                bat 'npx playwright test --reporter=html --output=playwright-report'
            }
        }
        stage('Publish Report') {
            steps {
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
            archiveArtifacts artifacts: 'allure-results/**', allowEmptyArchive: true
            }
        }
    }



        stage('Generate Allure Report') {
            steps {
                // generate allure-report from allure-results
                bat 'allure generate allure-results --clean -o allure-report'
            }
        }

        stage('Publish Reports') {
            steps {
                // ✅ Keep Playwright HTML report
                publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report'
                ])

                // ✅ Add Allure report to Jenkins tab
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }

    post {
        always {
            script {
                emailext(
                    subject: "Jenkins Job - Build ${currentBuild.fullDisplayName}",
                    body: """<p>Build ${currentBuild.fullDisplayName} is completed.</p>
                             <p>Please check the attached test results or open the Allure/HTML reports on Jenkins.</p>""",
                    to: 'love_bas_bas@hotmail.com',
                    attachmentsPattern: 'playwright-report/**/*.html,playwright-report/**/*.png',
                    mimeType: 'text/html'
                )
            }
        }
    }
}
