FROM mcr.microsoft.com/devcontainers/base:noble

RUN apt-get update && apt-get upgrade -y

RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash \
  && apt-get install -y nodejs

RUN npx playwright install-deps

USER vscode
