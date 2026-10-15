import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

/**
 * Postgres bağlantısı tembel (lazy) kurulur: modül yüklenirken DEĞİL, veritabanı
 * ilk kez kullanıldığında. Böylece DATABASE_URL tanımlı olmasa bile derleme ve
 * statik sayfalar (Vercel/Netlify dahil) sorunsuz çalışır; yalnızca gerçekten
 * veritabanına erişen API route'ları hata verir.
 *
 * Bulut Postgres sağlayıcıları (Neon, Supabase, Vercel Postgres) SSL ister;
 * yerel geliştirmede (localhost/127.0.0.1) SSL kapatılır.
 */

const globalForDb = globalThis as typeof globalThis & {
  __kukPgPool?: Pool;
};

function createPool(): Pool {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL tanımlı değil. Yayın ortamında (Vercel/Netlify) ortam değişkeni olarak ekleyin."
    );
  }

  const isLocal =
    databaseUrl.includes("localhost") || databaseUrl.includes("127.0.0.1");

  return new Pool({
    connectionString: databaseUrl,
    // Bulut sağlayıcılarda SSL gerekir; yerelde gerekmez.
    ssl: isLocal ? undefined : { rejectUnauthorized: false },
  });
}

function getPool(): Pool {
  if (!globalForDb.__kukPgPool) {
    globalForDb.__kukPgPool = createPool();
  }
  return globalForDb.__kukPgPool;
}

// Proxy: db'ye ilk erişimde havuz kurulur. Modül import'u asla hata fırlatmaz.
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, prop, receiver) {
    const instance = drizzle(getPool());
    const value = Reflect.get(instance, prop, receiver);
    return typeof value === "function" ? value.bind(instance) : value;
  },
});

export function getDbPool(): Pool {
  return getPool();
}
