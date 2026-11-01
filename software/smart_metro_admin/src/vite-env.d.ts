/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly API_BASE_URL: string;
  readonly USE_MOCK: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
