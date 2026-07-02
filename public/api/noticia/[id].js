// api/noticia/[id].js
//
// Genera una página HTML con Open Graph / Twitter Cards correctos para
// UNA noticia específica de SMBINRTV, y redirige al visitante humano
// hacia el diario real (diario.html?n=ID).
//
// Los bots de Facebook, WhatsApp, X, Telegram, LinkedIn, etc. NO ejecutan
// JavaScript ni siguen "meta refresh": solo leen las etiquetas <meta> que
// llegan en el primer HTML. Por eso esta función corre en el servidor
// (no en el navegador) y arma esas etiquetas con los datos reales de la
// noticia ANTES de responder.
//
// No requiere clave de administrador: usa el mismo API key público de
// Firebase que ya usa diario.html para leer Firestore (las reglas de
// seguridad del proyecto ya permiten lectura pública de "noticias").

const FIREBASE_PROJECT_ID = 'smbinrtv-diario';
const FIREBASE_API_KEY = 'AIzaSyAMKZ1an2qj7i1Imb6QK2GY_zbxb6aTqSg';
const PORTAL_URL = 'https://smbinrtv.vercel.app';
const IMAGEN_INSTITUCIONAL = `${PORTAL_URL}/assets/og-image.jpg`; // 1200x630 recomendado
const SITE_NAME = 'SMBINRTV Diario Digital';

module.exports = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    res.writeHead(302, { Location: `${PORTAL_URL}/diario.html` });
    return res.end();
  }

  let noticia = null;
  try {
    noticia = await obtenerNoticia(id);
  } catch (e) {
    console.error('Error al leer Firestore:', e);
  }

  if (!noticia) {
    // Noticia no encontrada / eliminada: redirige a la portada general.
    res.writeHead(302, { Location: `${PORTAL_URL}/diario.html` });
    return res.end();
  }

  const titulo = limpiarTexto(noticia.titulo) || SITE_NAME;
  const descripcion = generarDescripcion(noticia.resumen || noticia.cuerpo || '');
  const imagen = elegirImagen(noticia.mediaURL, noticia.mediaType);
  const urlCanonica = `${PORTAL_URL}/noticia/${id}`;
  const urlDestino = `${PORTAL_URL}/diario.html?n=${encodeURIComponent(id)}`;

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHTML(titulo)} | ${SITE_NAME}</title>
<meta name="description" content="${escapeHTML(descripcion)}" />
<link rel="canonical" href="${urlCanonica}" />

<!-- Open Graph -->
<meta property="og:type" content="article" />
<meta property="og:site_name" content="${SITE_NAME}" />
<meta property="og:locale" content="es_PE" />
<meta property="og:title" content="${escapeHTML(titulo)}" />
<meta property="og:description" content="${escapeHTML(descripcion)}" />
<meta property="og:image" content="${imagen}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="${urlCanonica}" />

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@SMBINRTV" />
<meta name="twitter:creator" content="@SMBINRTV" />
<meta name="twitter:title" content="${escapeHTML(titulo)}" />
<meta name="twitter:description" content="${escapeHTML(descripcion)}" />
<meta name="twitter:image" content="${imagen}" />

<!-- Redirección para visitantes humanos (los bots ignoran esto y solo leen las meta de arriba) -->
<meta http-equiv="refresh" content="0; url=${urlDestino}" />
<script>window.location.replace(${JSON.stringify(urlDestino)});</script>
</head>
<body>
  <p>Redirigiendo a <a href="${urlDestino}">${escapeHTML(titulo)}</a> en ${SITE_NAME}…</p>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  // Cachea la vista previa 5 min en el edge para no golpear Firestore en cada share,
  // pero revalida rápido si el editor corrige la noticia.
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=600');
  res.status(200).send(html);
};

// ── Helpers ──────────────────────────────────────────────

async function obtenerNoticia(id) {
  const url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/noticias/${encodeURIComponent(id)}?key=${FIREBASE_API_KEY}`;
  const resp = await fetch(url);
  if (!resp.ok) return null;
  const data = await resp.json();
  if (!data.fields) return null;
  return {
    titulo: campoTexto(data.fields.titulo),
    resumen: campoTexto(data.fields.resumen),
    cuerpo: campoTexto(data.fields.cuerpo),
    mediaURL: campoTexto(data.fields.mediaURL),
    mediaType: campoTexto(data.fields.mediaType),
    activa: campoBool(data.fields.activa)
  };
}

function campoTexto(field) {
  return field && typeof field.stringValue === 'string' ? field.stringValue : '';
}

function campoBool(field) {
  return !!(field && field.booleanValue);
}

function elegirImagen(mediaURL, mediaType) {
  if (mediaURL && (!mediaType || mediaType.startsWith('image/'))) return mediaURL;
  return IMAGEN_INSTITUCIONAL; // sin imagen, o es un video: usar imagen institucional de respaldo
}

// Resumen periodístico de 120–180 caracteres, cortado en un espacio (no a mitad de palabra).
function generarDescripcion(textoBase) {
  const limpio = limpiarTexto(textoBase);
  const sufijo = ' Lee la nota completa en SMBINRTV.';
  const maxSinSufijo = 180 - sufijo.length;

  if (!limpio) return 'Entérate de todos los detalles de esta noticia en SMBINRTV Diario Digital.';
  if (limpio.length <= 180 && limpio.length >= 60) return limpio;

  if (limpio.length > maxSinSufijo) {
    let corte = limpio.slice(0, maxSinSufijo);
    const ultimoEspacio = corte.lastIndexOf(' ');
    if (ultimoEspacio > 80) corte = corte.slice(0, ultimoEspacio);
    return corte.trim() + '…' + sufijo;
  }
  return limpio + sufijo;
}

function limpiarTexto(t) {
  return (t || '').replace(/\s+/g, ' ').trim();
}

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
