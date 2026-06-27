# 🎙️ SMBINRTV Canal Online

Portal de noticias regional profesional, moderno y listo para producción.

---

## 🚀 CÓMO PUBLICAR EN INTERNET (GRATIS) - PASO A PASO

### OPCIÓN 1: Vercel (Recomendado - más rápido)

1. **Crea una cuenta gratis** en https://github.com y en https://vercel.com

2. **Sube el proyecto a GitHub:**
   - Entra a https://github.com/new
   - Nombre: `smbinrtv`
   - Haz clic en "Create repository"
   - Arrastra todos los archivos de esta carpeta al repositorio

3. **Publica en Vercel:**
   - Entra a https://vercel.com
   - Clic en "Add New Project"
   - Conecta tu cuenta de GitHub
   - Selecciona el repositorio `smbinrtv`
   - Clic en "Deploy"
   - ✅ ¡Listo! Tu portal estará en: `https://smbinrtv.vercel.app`

---

### OPCIÓN 2: Netlify (Alternativa)

1. Ve a https://netlify.com y crea cuenta gratis
2. Arrastra la carpeta del proyecto al panel de Netlify
3. ✅ ¡Listo! Obtienes una URL gratis al instante

---

## 🔥 CONECTAR FIREBASE (para guardar noticias)

1. Ve a https://console.firebase.google.com
2. Crea un proyecto llamado **smbinrtv**
3. Activa: **Firestore Database** + **Storage** + **Authentication**
4. Ve a Configuración del proyecto → "Tus apps" → Web
5. Copia el objeto `firebaseConfig`
6. Pégalo en el archivo `js/firebase-config.js`
7. Descomenta las líneas de import y export

---

## 📺 CONFIGURAR EN VIVO

**YouTube:**
- Abre `pages/envivo.html`
- Busca: `channel=UCxxxxxxxxxxxxxxx`
- Reemplaza con el ID real de tu canal de YouTube

**Facebook:**
- Busca: `tu-pagina`
- Reemplaza con el nombre de tu página de Facebook

---

## 📰 CONECTAR NEWSAPI (noticias automáticas)

1. Ve a https://newsapi.org y crea cuenta gratis
2. Copia tu API Key
3. En `js/app.js` → función `loadAutoNews()`
4. Reemplaza la URL por:
   ```
   https://newsapi.org/v2/top-headlines?country=pe&apiKey=TU_API_KEY
   ```

---

## 📁 ESTRUCTURA DEL PROYECTO

```
smbinrtv/
├── index.html              ← Página principal
├── vercel.json             ← Configuración Vercel
├── sitemap.xml             ← SEO - Google indexación
├── robots.txt              ← SEO - Instrucciones bots
├── css/
│   └── style.css           ← Estilos principales
├── js/
│   ├── app.js              ← Funciones principales
│   └── firebase-config.js  ← Configuración Firebase
└── pages/
    ├── noticias.html        ← Sección noticias
    ├── envivo.html          ← Transmisión en vivo
    ├── denuncias.html       ← Formulario denuncias
    ├── contacto.html        ← Página de contacto
    ├── programas.html       ← (agregar)
    ├── investigaciones.html ← (agregar)
    ├── videos.html          ← (agregar)
    └── galeria.html         ← (agregar)
```

---

## 📱 DATOS DE CONTACTO DEL CANAL

- **Canal:** SMBINRTV Canal Online
- **Celular:** 973 753 796
- **Correo:** smbinrtvcanalonline@gmail.com

---

## ✅ CARACTERÍSTICAS INCLUIDAS

- [x] Diseño responsive Mobile First
- [x] Dark / Light Mode
- [x] SEO optimizado (Meta tags, OG, Twitter Cards, Schema.org)
- [x] Sitemap.xml y robots.txt
- [x] Formulario de denuncias con anti-spam
- [x] Página En Vivo (YouTube + Facebook)
- [x] Página de Contacto con botones directos
- [x] Headers de seguridad (XSS, CSRF, etc.)
- [x] Lazy Loading de imágenes
- [x] Firebase preparado
- [x] Listo para Vercel/Netlify

---

© 2026 SMBINRTV Canal Online
