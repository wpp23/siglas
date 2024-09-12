/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_APP_NAME: string; 
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_VER: string;
    readonly VITE_BASE_URL_BACKEND: string;
    readonly VITE_TOKEN_API: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }   