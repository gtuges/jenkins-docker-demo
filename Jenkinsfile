pipeline {
  agent {
    docker {
      image 'node:24-alpine'
      args '-u 1000:1000'
    }
  }

  stages {
    stage('Verify runtime') {
      steps {
        sh 'node --version'
        sh 'npm --version'
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
  }

  post {
    success {
      echo 'CI checks passed.'
    }
    failure {
      echo 'CI checks failed. Review the Console Output.'
    }
  }
}