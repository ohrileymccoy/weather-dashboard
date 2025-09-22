/// <reference types="@cloudflare/workers-types" />

type Env = {
  DB: D1Database;
};

type WeatherPayload = {
  city: string;
  date: string;
  temp: number;
  humidity: number;
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const data = (await request.json()) as WeatherPayload;

  await env.DB.prepare(
    "INSERT INTO weather (city, date, temp, humidity) VALUES (?1, ?2, ?3, ?4)"
  )
    .bind(data.city, data.date, data.temp, data.humidity)
    .run();

  return Response.json({ success: true });
};
