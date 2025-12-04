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
                        credentialsId: 'github-playwright-pat'
                    ]],
                    extensions: [[$class: 'CleanBeforeCheckout']]
                ])
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                  echo "Building Playwright Docker image..."
                  docker build -t my-playwright-image .
                '''
            }
        }

        stage('Run Tests in Docker') {
            steps {
                sh '''
                  # ลบ report เก่าทิ้งก่อน
                  rm -rf playwright-report
                  mkdir -p playwright-report

                  # รัน container แล้ว mount โฟลเดอร์ report ออกมาไว้ที่ workspace
                  docker run --rm \
                    -v "$PWD/playwright-report:/app/playwright-report" \
                    my-playwright-image
                '''
            }
        }

        stage('Archive Report') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
            }
        }
    }

    post {
        always {
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report'
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
