# Rodo Balderas | Web Portfolio

Sitio web tipo portfolio para Rodo Balderas, doblador y locutor. La web presenta un home visual con personajes, una seccion "Sobre mi", demo de doblaje en video, galeria de personajes interpretados, redes sociales, formulario de contacto y footer con enlaces.

## Vista General

Este proyecto es una web estatica construida con HTML, CSS y JavaScript puro. No requiere framework ni proceso de build.

Caracteristicas principales:

- Home estilo poster con personajes divididos por columnas.
- Hover global que revela una imagen grande de Rodo sobre toda la grilla.
- Seccion "Sobre mi" con foto, texto y animacion de brillo.
- Demo de doblaje embebida desde YouTube.
- Seccion de personajes interpretados con tarjetas movibles en escritorio.
- Galeria de redes con imagenes desde `assets/redes`.
- Formulario visual de contacto.
- Footer con iconos centrados y enlaces oficiales.
- Diseno responsive para desktop y mobile.

## Estructura

```text
.
|-- assets/
|   |-- aboutus/
|   |-- footer/
|   |-- home/
|   |-- personajes/
|   `-- redes/
|-- index.html
|-- styles.css
|-- script.js
|-- server.mjs
|-- serve-local.ps1
`-- design-qa.md
```

## Como Correr Localmente

La forma recomendada es abrir la web desde un servidor local, no como archivo `file://`, porque el iframe de YouTube puede fallar si no recibe un origen HTTP valido.

### Opcion 1: PowerShell

```powershell
powershell -ExecutionPolicy Bypass -File .\serve-local.ps1
```

Luego abre:

```text
http://localhost:4173/
```

### Opcion 2: Node.js

Si tienes Node.js disponible:

```powershell
node server.mjs
```

Luego abre:

```text
http://localhost:4173/
```

## Publicar en GitHub Pages

Este proyecto puede publicarse como sitio estatico en GitHub Pages.

Pasos sugeridos:

```powershell
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

Despues, en GitHub:

1. Entra al repositorio.
2. Ve a `Settings`.
3. Abre `Pages`.
4. En `Build and deployment`, selecciona `Deploy from a branch`.
5. Elige rama `main` y carpeta `/root`.
6. Guarda los cambios.

## Redes Configuradas

- YouTube: https://www.youtube.com/@RodoBalderasLocutor
- Instagram: https://www.instagram.com/rodobalderas
- TikTok: https://www.tiktok.com/@rodobalderasvoz
- X: https://x.com/rodobalderas

## Notas Para Repositorio Publico

Tecnicamente el proyecto esta listo para ser publico: no se encontraron claves, tokens ni secretos en los archivos principales.

Antes de publicar, revisa los derechos de uso de las imagenes en `assets/`, especialmente personajes, logos, retratos o material de terceros. Si alguna imagen no tiene permiso para distribucion publica, reemplazala o evita subirla.

El archivo `rodo.rar` no debe subirse al repositorio. Ya esta cubierto por `.gitignore` con la regla `*.rar`.

## Imagenes y Derechos

Este sitio usa imagenes en `assets/` para mostrar personajes, redes, retratos y material visual de la web. Antes de publicar el repositorio como publico, confirma que tienes permiso para usar y distribuir esas imagenes.

Recomendacion practica:

- Si la imagen es propia o fue entregada por el cliente, se puede mantener.
- Si la imagen pertenece a una serie, personaje, marca, plataforma o tercero, revisa permiso/licencia antes de publicarla.
- Si no estas seguro del permiso, reemplazala por una imagen propia, una captura autorizada o un asset con licencia clara.
- No declares una licencia abierta para `assets/` si no tienes derecho a sublicenciar esas imagenes.

## Creditos

Diseno y desarrollo web por Angel Nunez: http://angmolly.netlify.app/

Sitio creado para Rodo Balderas.

## Licencia

Este proyecto no incluye una licencia abierta por defecto. Todos los derechos del contenido visual, textos, marca e imagenes pertenecen a sus respectivos titulares.
