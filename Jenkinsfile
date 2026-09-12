pipeline {
  agent any

  environment {
    REGISTRY = 'ghcr.io'
    IMAGE_NAME = 'joseph118789-max/chef-v-game-frontend'
    // Credentials IDs in Jenkins (create these via Manage Jenkins → Credentials)
    GITHUB_TOKEN = credentials('github-token')
    ARGOCD_CREDS = credentials('argocd-admin')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Lint') {
      steps {
        sh 'npm ci'
        sh 'npm run lint'
      }
    }

    stage('Test: Receipt Scoring') {
      steps {
        sh 'npm run test:scoring'
      }
    }

    stage('Test: Member Utils') {
      steps {
        sh 'npm run test:members'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh '''
          docker build \
            --platform linux/amd64 \
            -t ${REGISTRY}/${IMAGE_NAME}:${GIT_COMMIT} \
            -t ${REGISTRY}/${IMAGE_NAME}:latest \
            -f deploy/Dockerfile.frontend \
            .
        '''
      }
    }

    stage('Push to GHCR') {
      steps {
        sh '''
          echo ${GITHUB_TOKEN} | docker login ${REGISTRY} -u joseph118789-max --password-stdin
          docker push ${REGISTRY}/${IMAGE_NAME}:${GIT_COMMIT}
          docker push ${REGISTRY}/${IMAGE_NAME}:latest
        '''
      }
    }

    stage('Trigger ArgoCD Sync') {
      steps {
        sh '''
          # Update the image tag in the kustomization prod overlay
          sed -i "s|ghcr.io/joseph118789-max/chef-v-game-frontend:CHANGEME|${REGISTRY}/${IMAGE_NAME}:${GIT_COMMIT}|" \
            deploy/k8s/overlays/prod/kustomization.yaml

          # Commit + push the updated kustomization (ArgoCD watches this repo)
          git config user.email "devops@openclaw" && \
          git config user.name "DevOps Bot" && \
          git add deploy/k8s/overlays/prod/kustomization.yaml && \
          git diff --staged --stat && \
          git commit -m "chore: update image tag for ArgoCD sync ${GIT_COMMIT}" && \
          git push origin main
        '''
      }
    }

    stage('ArgoCD Rollout Wait') {
      steps {
        sh '''
          # Poll ArgoCD until the application is healthy
          for i in $(seq 1 30); do
            STATUS=$(argocd app wait chef-v-game --timeout 10 2>/dev/null | grep -o 'synced\|out-of-sync\|healthy\|Unknown' | head -1 || echo "Unknown")
            echo "[$(date)] chef-v-game status: $STATUS"
            if [ "$STATUS" = "healthy" ]; then
              echo "ArgoCD rollout complete!"
              exit 0
            fi
            sleep 10
          done
          echo "ArgoCD rollout timed out after 5 minutes"
          exit 1
        '''
      }
    }
  }

  post {
    failure {
      echo "Pipeline failed — check logs above"
    }
    success {
      echo "Pipeline succeeded — chef-v-game deployed to k3s via ArgoCD"
    }
  }
}
