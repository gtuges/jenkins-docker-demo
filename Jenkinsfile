pipeline {
  agent any

  stages {
    stage('Verify runtime') {
      agent {
        docker {
          image 'node:24-alpine'
          args '-u 1000:1000'
          reuseNode true
        }
      }

      steps {
        sh 'node --version'
        sh 'npm --version'
      }
    }

    stage('Install dependencies') {
      agent {
        docker {
          image 'node:24-alpine'
          args '-u 1000:1000'
          reuseNode true
        }
      }

      steps {
        sh 'npm ci'
      }
    }

    stage('Test') {
      agent {
        docker {
          image 'node:24-alpine'
          args '-u 1000:1000'
          reuseNode true
        }
      }

      steps {
        sh 'npm test'
      }
    }

    stage('Build Docker image') {
      steps {
        sh 'docker build --tag dockertut4:${BUILD_NUMBER} .'
      }
    }

    stage('Inspect image') {
      steps {
        sh 'docker image ls dockertut4 --format "{{.Repository}}:{{.Tag}}"'
      }
    }
  }

  post {
    success {
      echo 'Tests passed and the Docker image was built.'
    }
    failure {
      echo 'Pipeline failed. Review the Console Output.'
    }
  }
}