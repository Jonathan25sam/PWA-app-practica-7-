- Interfaz PWA

Frontend desarrollado con React y Vite para la visualización del inventario de la carnicería en tiempo real. Esta aplicación está diseñada como una Progressive Web App (PWA), lo que permite su instalación en dispositivos móviles y escritorio.

## Tecnologías utilizadas
* **React 18** (Vite como bundler)
* **Tailwind CSS v4**: Para el diseño de la interfaz comercial.
* **GSAP**: Para las animaciones de entrada y transiciones de los productos.
* **Vite PWA Plugin**: Gestión de Service Workers y manifiesto para la instalación.

## Instalación

1. Clonar el repositorio.
2. Instalar las dependencias (necesario usar el flag de compatibilidad por las versiones de Vite):
   ```bash
   npm install --legacy-peer-deps

Comandos disponibles
Desarrollo: npm run dev para levantar el servidor local en el puerto 5173.

Construcción: npm run build para generar la carpeta de distribución (dist) con el Service Worker listo.

Vista previa: npm run preview para probar la versión de producción e instalar la app.

La aplicación se comunica con el backend a través del API Gateway en http://localhost:8080. Es indispensable que los microservicios estén activos para que el catálogo de productos se visualice correctamente.

