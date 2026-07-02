import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // El dominio raíz (smbinrtv.vercel.app) mostraba 404: ahora sirve el diario.
      { source: "/", destination: "/diario.html" },
      // URL bonita para compartir cada noticia: /noticia/ID -> función de metadatos.
      { source: "/noticia/:id", destination: "/api/noticia/:id" },
    ];
  },
};

export default nextConfig;
