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

        stage('Smoke test image') {
      steps {
        sh '''
          docker rm -f dockertut4-smoke 2>/dev/null || true

          docker run -d --name dockertut4-smoke dockertut4:${BUILD_NUMBER}

          for attempt in $(seq 1 10); do
            if docker exec dockertut4-smoke wget -qO- http://127.0.0.1:3000/health | grep -q '"status":"ok"'; then
              echo 'Health check passed.'
              exit 0
            fi

            sleep 1
          done

          echo 'Health check failed.'
          docker logs dockertut4-smoke
          exit 1
        '''
      }

      post {
        always {
          sh 'docker rm -f dockertut4-smoke 2>/dev/null || true'
        }
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