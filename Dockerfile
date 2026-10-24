# The Technopedia website: build the static content at container startup and
# serve it. Only latexmarkdown is needed to build (the agent's isolated-vm is
# not used here, and avoids a native compilation step).
FROM node:22-alpine
WORKDIR /app
RUN npm install --no-save latexmarkdown
COPY build.js serve.js ./
COPY content ./content
ENV PORT=8080
CMD ["sh", "-c", "node build.js && node serve.js"]
