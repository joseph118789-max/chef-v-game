# k3s / prod deployment

## One-time setup (ops bot)

```bash
# 1. Create the ghcr.io pull secret in the chef-v-game namespace
kubectl create namespace chef-v-game
kubectl create secret docker-registry ghcr-io \
  --docker-server=ghcr.io \
  --docker-username=seekn \
  --docker-password=<github-pat-with-read:packages> \
  -n chef-v-game

# 2. Apply the base stack once (the CI job applies it again on every release)
kubectl apply -k deploy/k8s/overlays/prod

# 3. Verify
kubectl -n chef-v-game get all,ing
```

## Promotion flow

| Trigger | Environment | Method |
|---|---|---|
| PR to `main` | (none — just CI) | lint + test + build smoke |
| Push to `main` | **dev** | SSH to dev box → `docker compose pull && up -d` |
| Push to `release/*` | **UAT** | SSH to UAT box → same compose flow |
| Tag `v*.*.*` | **prod** | `kubectl apply -k overlays/prod` + `kubectl set image` |

## CI secrets (GitHub repo settings)

| Secret | Used by |
|---|---|
| `GITHUB_TOKEN` | built-in, used for ghcr.io login |
| `DEV_HOST`, `DEV_USER`, `DEV_SSH_KEY`, `DEV_DEPLOY_PATH` | `deploy-dev` job |
| `UAT_HOST`, `UAT_USER`, `UAT_SSH_KEY`, `UAT_DEPLOY_PATH` | `deploy-uat` job |
| `KUBECONFIG_PROD` (base64 kubeconfig) | `deploy-prod` job |

## Rollback

```bash
# Roll back to previous ReplicaSet
kubectl -n chef-v-game rollout undo deployment/chef-v-game

# Or pin to a known good image
kubectl -n chef-v-game set image deployment/chef-v-game \
  frontend=ghcr.io/seekn/chef-v-game:<known-good-sha>
kubectl -n chef-v-game rollout status deployment/chef-v-game
```