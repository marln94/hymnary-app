# 🎶 Himnos de la Iglesia - Web App

Una aplicación web estática para consultar y proyectar letras de cantos utilizados en nuestra congregación. Diseñada para ser extremadamente amigable en móviles y pantallas grandes, permite buscar por número, título o contenido de la letra.

> 📌 Proyecto sin backend, ideal para abrir desde navegadores con conexión lenta. Todo el contenido se encuentra pre-cargado y optimizado.

## ✨ Características principales

- 🔎 Búsqueda instantánea por título, número o contenido del canto.
- 📱 Vista tipo presentación (karaoke) para facilitar el uso en reuniones, cultos o ensayos.
- 🎨 Cambios de tema de colores para facilitar la lectura en diferentes ambientes.
- 🎹 Navegación con teclado (flechas) para una experiencia fluida en pantallas grandes.
- 📱 Botones visibles para navegación táctil en móviles.
- ⚡️ Aplicación 100% estática y ligera. Sin necesidad de conexión constante.

## 📷 Vista previa

> (Agrega aquí un gif o captura de pantalla si lo deseas)

## 📁 Estructura del proyecto

- `public/`: contiene el `hymns.json` y los archivos estáticos.
- `src/`
    - `App.tsx`: entrada principal.
    - `components/`: componentes reutilizables como `SearchBar`, `SongViewer`, etc.
    - `hooks/`: lógica compartida como el filtrado.
    - `themes.ts`: temas de colores y estilos de presentación.

## ⚖️ Licencia

Este proyecto distribuye su **código bajo la licencia MIT**.

> ⚠️ **Importante:**  
> Las letras de los cantos contenidas en este proyecto son propiedad de sus respectivos autores.  
> Este proyecto se distribuye con fines educativos, devocionales y sin ánimo de lucro.  
> No se autoriza su uso comercial sin la autorización correspondiente de los autores de los cantos.

---

## 🔧 TODO / Próximos features

- [ ] Soporte para repetición de coros
- [ ] Soporte para canciones con 2 o más coros
- [ ] Modo sin conexión (PWA).
- [ ] Compatibilidad con pantallas externas (modo proyector).
- [ ] Agregar transición entre cantos en modo presentación.
- [ ] Selector de fuente tipográfica (para lectura disléxica o de alta visibilidad).

---

## 🚀 Cómo correr el proyecto localmente

1. Clona el repositorio

    ```bash
    git clone https://github.com/marln94/hymnary-app.git
    cd hymnary-app
    ```

2. Instala las dependencias

    ```bash
    npm install
    ```

3. Ejecuta el servidor local
    ```bash
    npm run dev
    ```

## 🙌 Contribuciones

¿Tienes ideas o mejoras? ¡Bienvenido! Puedes crear un Pull Request o abrir un Issue.

## ✉️ Contacto

Para sugerencias, mejoras o permisos sobre letras, puedes escribir a:
[Marlon Calderón](mrln9eca+hymnary-app@gmail.com)
