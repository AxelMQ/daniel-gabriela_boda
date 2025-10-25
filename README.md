# 💒 Invitación de Boda - Daniel & Gabriela

Una invitación de boda elegante y moderna desarrollada con HTML, CSS y JavaScript puro (VANILLA).

## 🎯 Características

- **Diseño Responsive**: Se adapta perfectamente a móviles, tablets y desktop
- **Animaciones Suaves**: Efectos visuales elegantes y profesionales
- **Sistema RSVP**: Confirmación de asistencia con validación
- **Navegación Fluida**: Scroll suave entre secciones
- **Optimizado**: Carga rápida y rendimiento excelente

## 📁 Estructura del Proyecto

```
daniel-gabriela-boda/
├── index.html              # Página principal
├── css/
│   ├── main.css           # Estilos principales y variables
│   ├── components.css     # Estilos de componentes
│   └── responsive.css     # Media queries responsive
├── js/
│   ├── main.js           # Funcionalidades principales
│   ├── rsvp.js           # Sistema de confirmación RSVP
│   └── animations.js     # Efectos y animaciones
├── assets/
│   ├── images/           # Fotos de la pareja
│   ├── fonts/            # Fuentes personalizadas
│   └── icons/            # Iconos y elementos gráficos
└── README.md             # Documentación
```

## 🚀 Cómo Usar

1. **Abrir la invitación**: Simplemente abre `index.html` en cualquier navegador
2. **Personalizar**: Edita los textos, fechas y ubicación en el HTML
3. **Agregar fotos**: Coloca las fotos en la carpeta `assets/images/`
4. **Subir a internet**: Sube todos los archivos a tu servidor web

## 🎨 Personalización

### Cambiar Colores
Edita las variables CSS en `css/main.css`:

```css
:root {
    --color-primary: #2D5A4A;        /* Verde principal */
    --color-secondary: #4A7C59;     /* Verde secundario */
    --color-gold: #D4AF37;           /* Dorado para acentos */
    --color-cream: #F5F5DC;         /* Fondo crema */
}
```

### Cambiar Fechas y Ubicación
Edita en `index.html`:

```html
<!-- Fecha de la boda -->
<div class="hero__date">
    <span class="date__day">31</span>
    <span class="date__month">OCTUBRE</span>
    <span class="date__year">2025</span>
</div>

<!-- Ubicación -->
<p class="info__location">
    Condominio Torres Solaris<br>
    Radial 19, 5to. Anillo.
</p>
```

### Agregar Fotos
1. Coloca las fotos en `assets/images/`
2. Actualiza las rutas en el HTML:
```html
<img src="assets/images/couple-photo.jpg" alt="Daniel y Gabriela">
```

## 📱 Responsive Design

La invitación se adapta automáticamente a:
- **Desktop**: 1024px y más
- **Tablet**: 768px - 1024px
- **Móvil**: 320px - 768px

## 🔧 Funcionalidades

### Sistema RSVP
- Formulario de confirmación con validación
- Almacenamiento local de respuestas
- Fecha límite configurable
- Exportación de datos (CSV)

### Navegación
- Header fijo con navegación suave
- Scroll automático a secciones
- Indicador de sección activa

### Animaciones
- Efectos de entrada al hacer scroll
- Animaciones de hover
- Efectos parallax
- Transiciones suaves

## 🌐 Subir a Internet

### Opciones Gratuitas:
1. **GitHub Pages**: Sube a un repositorio de GitHub y activa Pages
2. **Netlify**: Arrastra la carpeta a netlify.com
3. **Vercel**: Conecta con GitHub o sube directamente

### Opciones de Pago:
1. **Hosting tradicional**: Sube vía FTP
2. **AWS S3**: Para sitios estáticos
3. **Google Cloud**: Hosting estático

## 📊 Estadísticas RSVP

Para ver las confirmaciones:

```javascript
// En la consola del navegador
console.log(RSVP.getRSVPs());

// Exportar datos
RSVP.exportData();
```

## 🎨 Fuentes Utilizadas

- **Playfair Display**: Títulos elegantes
- **Open Sans**: Texto general
- **Dancing Script**: Texto decorativo

## 📱 Compatibilidad

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Móviles iOS/Android

## 🔒 Privacidad

- No se recopilan datos personales
- Las confirmaciones se almacenan localmente
- No hay tracking ni analytics

## 📞 Soporte

Si necesitas ayuda:
1. Revisa la documentación en el código
2. Verifica la consola del navegador para errores
3. Asegúrate de que todas las rutas de archivos sean correctas

## 🎉 ¡Felicidades!

¡Que tengan una boda maravillosa! Esta invitación está diseñada para ser memorable y fácil de usar para todos sus invitados.

---

**Desarrollado con ❤️ para Daniel & Gabriela**
