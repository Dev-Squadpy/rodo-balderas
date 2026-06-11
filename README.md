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


Diseno y desarrollo web por Angel Nunez: http://angmolly.netlify.app/

Sitio creado para Rodo Balderas.

## Licencia

Este proyecto no incluye una licencia abierta por defecto. Todos los derechos del contenido visual, textos, marca e imagenes pertenecen a sus respectivos titulares.
