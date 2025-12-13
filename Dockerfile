# Minimal, secure container to run pnpm tasks in isolation
# Uses non-root user, read-only filesystem, and controlled network

FROM node:24.12.0-alpine3.23 AS base

# Install pnpm via corepack (preferred)
RUN corepack enable && corepack prepare pnpm@10.25.0 --activate

# Create unprivileged user
RUN adduser -D appuser
USER appuser

# Workdir inside container
WORKDIR /workspace

# Copy lockfiles first for better caching when installing deps
COPY --chown=appuser:appuser pnpm-lock.yaml* package.json* pnpm-workspace.yaml* .npmrc* ./

# Install dependencies in a separate layer
# Use --frozen-lockfile to ensure reproducibility
RUN --mount=type=cache,uid=1000,gid=1000,target=/home/appuser/.local/share/pnpm \
    pnpm install --frozen-lockfile --prefer-offline

# Copy the rest of the source
COPY --chown=appuser:appuser . .

# Development defaults: expose Vite dev port and run `pnpm dev`
# Vite uses WebSocket over the same port for HMR.
EXPOSE 5173

# Enable better file watching inside containers
ENV CHOKIDAR_USEPOLLING=true \
    WATCHPACK_POLLING=true \
    VITE_DEV_PORT=5173

# Default command runs dev server, bind to all interfaces
CMD ["pnpm", "dev", "--host", "0.0.0.0", "--port", "${VITE_DEV_PORT}"]

# Security hardening suggestions (use at run time, adjust for dev):
# - Run with read-only FS:   docker run --read-only --tmpfs /tmp:rw,size=64m ...
# - Disable new privileges:  docker run --security-opt no-new-privileges --cap-drop ALL ...
# - Restrict network:        docker run --network none ... (not for dev)
# - Limit mounts:            docker run -v "$PWD":/workspace:ro ... for read-only
#   If you need write access for build outputs, use -v "$PWD":/workspace:rw
