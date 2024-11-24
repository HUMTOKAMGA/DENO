FROM denoland/deno:alpine

EXPOSE 8000

WORKDIR /app

USER deno

COPY . .

RUN deno cache src/app.ts

CMD ["run", "--allow-net", "--allow-env", "src/app.ts"]
