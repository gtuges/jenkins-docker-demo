pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        echo 'Building the application...'
      }
    }

    stage('Test') {
      steps {
        echo 'Running automated tests...'
      }
    }
  }

  post {
    success {
      echo 'Pipeline succeeded.'
    }
  }
}