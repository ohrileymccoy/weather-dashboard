/// <reference types="@cloudflare/workers-types" />

type Env = {
  DB: D1Database;
};

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const { results } = await env.DB.prepare(
    "SELECT * FROM weather ORDER BY date DESC LIMIT 50"
  ).all();

  return Response.json(results);
};
