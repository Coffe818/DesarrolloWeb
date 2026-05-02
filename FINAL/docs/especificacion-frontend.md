# Arquitectura Frontend - Aprendizaje VARK y Test de Personalidad

---

## 📝 CONVENCIONES DE CÓDIGO Y ESTILOS

## Reglas de Nombrado
Para mantener la consistencia en el proyecto Angular, se seguirán las siguientes reglas de nombrado:

1. **Archivos**: Deben estar en minúsculas. Si el nombre requiere separación, usar guiones medios (`-`).
   - Ejemplo: `gasto-detalle.component.ts`, `usuario.service.ts`, `test-vark.component.ts`

2. **Clases (Services, Models, Componentes, etc.)**: Se debe usar `PascalCase` (camelCase empezando por mayúscula) con el sufijo correspondiente.
   - Ejemplo: `LogInService`, `UsuarioModel`, `GastoDetalleComponent`, `TestVarkComponent`

3. **Variables**: Se debe usar `camelCase` empezando por minúscula.
   - Ejemplo: `usuario`, `usuarioDetalle`, `gastosList`, `testActual`

4. **Métodos**: Se debe usar `camelCase` empezando por mayúscula.
   - Ejemplo: `ValidarUsuario()`, `LogIn()`, `CargarGastos()`, `EnviarTest()`

## Estilos (CSS)
- **No se utilizará CSS personalizado**. 
- Todo el diseño y estilos se manejarán exclusivamente con **Bootstrap 5** para agilizar el desarrollo.
- Se usarán clases utilitarias de Bootstrap y componentes predefinidos.

---

## 🚀 ARQUITECTURA DE RUTAS (LAZY LOADING)

Para mejorar el rendimiento y la velocidad de carga inicial, todas las páginas se cargarán mediante **Lazy Loading** (Carga Perezosa) utilizando el sistema de rutas de Angular.

*   **Tecnología**: `loadComponent` en el archivo `app.routes.ts`.
*   **Beneficio**: El código de la Landing Page, Tests, Admin, etc., no se descarga hasta que el usuario navega a esa ruta.
*   **Ejemplo de configuración**:
    ```typescript
    export const routes: Routes = [
      {
        path: '',
        loadComponent: () => import('./landing/landing').then(m => m.LandingComponent)
      },
    ];
    ```

---

## 🎨 PALETA DE COLORES

### Modo Claro (Light Mode)

| Uso | Color | Hex |
|-----|-------|-----|
| **Primario** | Azul Profundo | `#1E3A5F` |
| **Secundario** | Verde Teal | `#2A9D8F` |
| **Acento** | Coral | `#E76F51` |
| **Fondo Principal** | Blanco Humo | `#F8F9FA` |
| **Fondo Secundario** | Gris Claro | `#E9ECEF` |
| **Texto Principal** | Gris Oscuro | `#212529` |
| **Texto Secundario** | Gris Medio | `#6C757D` |
| **Bordes** | Gris Suave | `#DEE2E6` |
| **Éxito** | Verde | `#52B788` |
| **Error** | Rojo | `#E63946` |
| **Advertencia** | Amarillo | `#E9C46A` |
| **Información** | Azul | `#457B9D` |

### Modo Oscuro (Dark Mode)

| Uso | Color | Hex |
|-----|-------|-----|
| **Primario** | Azul Claro | `#4895EF` |
| **Secundario** | Verde Teal Claro | `#56D4B5` |
| **Acento** | Coral Claro | `#F4A261` |
| **Fondo Principal** | Azul Muy Oscuro | `#0D1B2A` |
| **Fondo Secundario** | Gris Oscuro | `#1B263B` |
| **Fondo Tarjetas** | Gris Medio Oscuro | `#415A77` |
| **Texto Principal** | Blanco | `#F8F9FA` |
| **Texto Secundario** | Gris Claro | `#B0B0B0` |
| **Bordes** | Gris Oscuro Suave | `#415A77` |
| **Éxito** | Verde Claro | `#74C69D` |
| **Error** | Rojo Claro | `#F28482` |
| **Advertencia** | Amarillo Claro | `#F4D160` |
| **Información** | Azul Claro | `#78C6F5` |

### Transiciones

- Transición suave entre modos: `0.3s ease-in-out`
- Toggle: Icono de sol/luna en la barra de navegación
- Estado guardado en `localStorage` para persistencia

---

## 📱 ESTRUCTURA DE PÁGINAS

---

### 1. PÁGINA DE INICIO (Landing / Intro)

**Ruta Angular:** `/`
**Componente:** `LandingComponent`

#### Descripción:
Página principal que presenta la plataforma, explica qué es el modelo VARK y el test de personalidad, y guía al usuario hacia los tests.

#### Elementos de la Página:

##### Header/Navbar
- Logo del proyecto (izquierda)
- Menú: Inicio | Test VARK | Test Personalidad | Resultados | Contacto
- Toggle Dark/Light Mode (derecha)
- Botón "Iniciar Sesión" (si no está logueado)
- Avatar + Dropdown con opciones: Mis Resultados, Perfil, Cerrar Sesión (si está logueado)

##### Hero Section
- Título grande: "Descubre Tu Estilo de Aprendizaje y Personalidad"
- Subtítulo: "Realiza los test VARK y Jung-Myers Briggs para conocerte mejor"
- Botón principal: "Comenzar Test" (lleva a selección de tests)
- Botón secundario: "Saber Más" (scroll a sección de explicación)

##### Sección: ¿Qué es el modelo VARK?
- Título: "Modelo VARK - Estilos de Aprendizaje"
- Breve explicación de las 4 modalidades:
  - **V**isual - Aprende mejor con imágenes y gráficos
  - **A**uditivo - Aprende mejor escuchando
  - **R**ead/Write - Aprende mejor leyendo y escribiendo
  - **K**inestésico - Aprende mejor haciendo
- Iconos ilustrativos para cada estilo
- Botón: "Realizar Test VARK"

##### Sección: ¿Qué es el Test de Personalidad?
- Título: "Test de Personalidad Jung-Myers Briggs"
- Breve explicación de las 4 dimensiones:
  - **E/I** - Extraversión vs Introversión
  - **S/N** - Sensación vs Intuición
  - **T/F** - Pensamiento vs Sentimiento
  - **J/P** - Juzgamiento vs Percepción
- Mención de los 16 tipos de personalidad
- Botón: "Realizar Test de Personalidad"

##### Sección: Video Explicativo
- Título: "¿Cómo Funciona la Plataforma?"
- Video embebido (YouTube/Vimeo/Local) de 2-4 minutos
- Thumbnail personalizado con botón de play
- Descripción debajo del video

##### Sección: Beneficios
- Título: "¿Por Qué Realizar Estos Tests?"
- 3-4 cards con beneficios:
  - Conoce cómo aprendes mejor
  - Descubre tu tipo de personalidad
  - Mejora tu rendimiento académico
  - Comprende a los demás

##### Footer
- Logo
- Enlaces rápidos
- Formulario de contacto rápido (nombre, email, mensaje)
- Redes sociales
- Créditos del proyecto
- Copyright

---

### 2. PÁGINA DE SELECCIÓN DE TESTS

**Ruta Angular:** `/tests`
**Componente:** `TestSelectionComponent`

#### Descripción:
Página intermedia donde el usuario elige qué test quiere realizar. Si no está logueado, se le pide login primero.

#### Elementos de la Página:

##### Header/Navbar
- Igual que la Landing Page
- Breadcrumb: Inicio > Selección de Test

##### Sección Principal: Elige Tu Test
- Título: "¿Qué Test Deseas Realizar?"
- Subtítulo: "Selecciona uno de los siguientes tests para comenzar"

##### Card: Test VARK
- Icono grande (ojos, oído, libro, mano)
- Título: "Test VARK - Estilos de Aprendizaje"
- Descripción: "Descubre si eres visual, auditivo, lectura/escritura o kinestésico"
- Detalles: "16 preguntas | Tiempo estimado: 5-10 minutos"
- Botón: "Iniciar Test VARK" (lleva al test o al login si no está logueado)

##### Card: Test de Personalidad
- Icono grande (cerebro, personalidad)
- Título: "Test de Personalidad Jung-Myers Briggs"
- Descripción: "Descubre cuál de los 16 tipos de personalidad te define"
- Detalles: "32 preguntas | Tiempo estimado: 10-15 minutos"
- Botón: "Iniciar Test de Personalidad" (lleva al test o al login si no está logueado)

##### Sección: Historial de Tests (solo si está logueado)
- Título: "Tus Últimos Resultados"
- Muestra los últimos tests realizados con:
  - Tipo de test
  - Fecha
  - Resultado principal
  - Botón: "Ver Detalle"
- Si no ha realizado tests: "Aún no has realizado ningún test"

---

### 3. PÁGINA DE LOGIN / REGISTRO

**Ruta Angular:** `/auth/login` y `/auth/register`
**Componentes:** `LoginComponent` y `RegisterComponent`

#### Descripción:
Página para iniciar sesión o crear una cuenta nueva. Diseño limpio y centrado.

#### Elementos de la Página:

##### Diseño General
- Pantalla dividida en dos (desktop):
  - Izquierda: Imagen decorativa o ilustración con logo
  - Derecha: Formulario de login/registro
- Mobile: Solo el formulario

##### Formulario de Login
- Título: "Iniciar Sesión"
- Campo: Correo electrónico (con icono)
- Campo: Contraseña (con icono de ojo para mostrar/ocultar)
- Checkbox: "Recordarme"
- Enlace: "¿Olvidaste tu contraseña?"
- Botón principal: "Ingresar"
- Separador con texto: "¿No tienes cuenta?"
- Enlace: "Crear Cuenta"

##### Formulario de Registro (toggle)
- Título: "Crear Cuenta"
- Campo: Nombre completo (con icono)
- Campo: Correo electrónico (con icono)
- Campo: Contraseña (con requisitos: mínimo 8 caracteres, mayúscula, número)
- Campo: Confirmar contraseña
- Checkbox: "Acepto los términos y condiciones"
- Botón principal: "Registrarse"
- Enlace: "¿Ya tienes cuenta? Iniciar Sesión"

##### Validaciones Visuales
- Campos vacíos: borde rojo + mensaje de error
- Email inválido: borde rojo + mensaje
- Contraseña no cumple requisitos: lista de requisitos con checkmarks
- Usuario existente: mensaje de error
- Registro exitoso: mensaje de éxito + redirección a login

---

### 4. PÁGINA DE TEST VARK

**Ruta Angular:** `/test/vark`
**Componente:** `TestVarkComponent`

#### Descripción:
Página donde el usuario responde las 16 preguntas del test VARK mediante un carousel horizontal deslizable.

#### Elementos de la Página:

##### Header/Navbar
- Logo (sin menú completo, solo logo)
- Indicador de progreso
- Botón de salir (con confirmación modal)

##### Sección: Progreso
- Barra de progreso: "Pregunta 3 de 16"
- Barra visual animada con porcentaje completado
- Tiempo transcurrido (opcional, timer en esquina)

##### Sección: Instrucciones (pantalla inicial antes del carousel)
- Título: "Test VARK - Estilos de Aprendizaje"
- Instrucciones claras:
  - "Lee cada situación y selecciona la respuesta que mejor te represente"
  - "Puedes seleccionar **más de una respuesta** si ninguna captura perfectamente tu preferencia"
  - "No hay respuestas correctas o incorrectas"
- Botón: "Comenzar Test" (inicia el carousel)

##### 🃏 CAROUSEL DE PREGUNTAS (Diseño Principal)

**Layout de cada slide:**
```
┌─────────────────────────────────────────────────┐
│                   PROGRESO                       │
│  Pregunta 3 de 16  ─────▓▓▓▓░░░░░░░░  18%      │
├─────────────────────────────────────────────────┤
│                                                 │
│        ¿Cómo elegís qué ordenar                 │
│        en un restaurante nuevo?                 │
│       (texto grande, centrado)                  │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │  ◉  Mirar las fotos del menú            │   │
│  └─────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────┐   │
│  │     Pedirle al mesero recomendaciones   │   │
│  └─────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────┐   │
│  │     Leer la descripción detallada       │   │
│  └─────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────┐   │
│  │     Probar algo nuevo y diferente       │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│      ← Anterior          Siguiente →            │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Comportamiento del Carousel:**
- **Slide horizontal** con transición suave (`0.3s ease-in-out`)
- **Swipe en mobile** (drag con el dedo para deslizar)
- **Botones** `← Anterior` (deshabilitado en primera) y `Siguiente →`
- **La(s) opción(es) seleccionada(s)** se resaltan con:
  - Borde del color primario (`#1E3A5F` light / `#4895EF` dark)
  - Fondo sutil del color secundario
  - Icono ✓ en la esquina superior derecha
- **No se puede avanzar** sin seleccionar al menos una opción → toast de aviso: "Selecciona al menos una opción"
- **Última pregunta**: el botón cambia a `✓ Enviar Test` con modal de confirmación

**Opciones tipo checkbox estilizado (multiselección):**
- Cada opción es una card clickeable
- Puede seleccionar 1, 2, 3 o las 4 opciones
- Visualmente se distinguen claramente las seleccionadas de las no seleccionadas

**Implementación Angular:**
- Componente principal: `TestQuestionCarouselComponent`
- Cada slide: `QuestionCardComponent` (reutilizable para ambos tests)
- Navegación: Angular CDK o Swiper.js para el carousel
- Estado de respuestas: `TestStateService` (BehaviorSubject con las respuestas)
- Al cambiar de pregunta → guarda automáticamente la selección en el service
- Indicador de progreso con barra animada (`<progress>` o div con width %)

##### Sección: Confirmación de Envío
- Modal centrado: "¿Estás seguro de enviar el test?"
- Resumen: "Has respondido 15 de 16 preguntas"
- Lista de preguntas sin responder (si las hay) con warning
- Botones: "Revisar respuestas" (lleva a la primera sin responder) | "Enviar"

##### Sección: Cargando Resultado
- Pantalla completa con overlay
- Spinner animado grande
- Mensaje: "Calculando tu resultado..."
- Sub-mensaje rotativo: "Analizando tu estilo de aprendizaje...", "Preparando tu perfil..."

---

### 5. PÁGINA DE TEST DE PERSONALIDAD

**Ruta Angular:** `/test/personality`
**Componente:** `TestPersonalityComponent`

#### Descripción:
Página donde el usuario responde las 32 preguntas del test de personalidad mediante un carousel horizontal deslizable. Mismo patrón visual que VARK pero con opciones binarias.

#### Elementos de la Página:

##### Header/Navbar
- Igual que el test VARK

##### Sección: Progreso
- Barra de progreso: "Pregunta 8 de 32"
- Indicadores de las 4 dimensiones con mini-pills (la dimensión actual resaltada):
  - `E/I` | `S/N` | `T/F` | `J/P`
- Tiempo transcurrido (opcional)

##### Sección: Instrucciones (pantalla inicial antes del carousel)
- Título: "Test de Personalidad Jung-Myers Briggs"
- Instrucciones claras:
  - "Lee cada afirmación y selecciona la opción que mejor te represente"
  - "No hay respuestas correctas o incorrectas"
  - "Responde con honestidad para obtener resultados precisos"
  - "En cada pregunta solo podés elegir UNA opción"
- Botón: "Comenzar Test"

##### 🃏 CAROUSEL DE PREGUNTAS (Mismo patrón visual que VARK)

**Layout de cada slide:**
```
┌─────────────────────────────────────────────────┐
│  E/I  S/N  T/F  J/P                             │
│  Pregunta 8 de 32  ────▓▓▓▓░░░░░░░░  25%       │
├─────────────────────────────────────────────────┤
│                                                 │
│     🔵 Dimensión: Extraversión vs Introversión  │
│                                                 │
│        En una reunión social, tú usually:       │
│       (texto grande, centrado)                  │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │  ◉  Eres el centro de la atención       │   │
│  │      y hablas con muchos                │   │
│  └─────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────┐   │
│  │     Prefieres hablar con grupos         │   │
│  │     pequeños o quedarte en un rincón    │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│      ← Anterior          Siguiente →            │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Comportamiento del Carousel:**
- **Idéntico a VARK**: swipe + botones + transición `0.3s ease-in-out`
- **Solo UNA opción seleccionable** por pregunta (radio button estilizado)
- **Indicador de dimensión actual** arriba de la pregunta con badge de color:
  - Preguntas 1-8: 🔵 `Extraversión vs Introversión`
  - Preguntas 9-16: 🟢 `Sensación vs Intuición`
  - Preguntas 17-24: 🟡 `Pensamiento vs Sentimiento`
  - Preguntas 25-32: 🟣 `Juzgamiento vs Percepción`
- Al pasar de una dimensión a otra → mini animación de transición + toast: "Nueva dimensión: Sensación vs Intuición"
- **No se puede avanzar** sin seleccionar una opción → toast de aviso
- **Última pregunta**: botón `✓ Enviar Test` con modal de confirmación

**Opciones tipo radio button estilizado (selección única):**
- Dos cards grandes (opción A y opción B)
- Al seleccionar: borde primario + fondo sutil + check icon
- Al deseleccionar (al elegir la otra): vuelve a estado normal

**Implementación Angular:**
- Reutiliza `TestQuestionCarouselComponent` y `QuestionCardComponent` del test VARK
- Se inyecta configuración diferente (32 preguntas, modo single-select, dimensiones)
- `TestStateService` maneja el estado de ambos tests de forma genérica
- Las dimensiones se calculan: `Math.floor(currentQuestion / 8)`

##### Sección: Confirmación de Envío
- Misma lógica que VARK pero con 32 preguntas
- "Has respondido 30 de 32 preguntas"

##### Sección: Cargando Resultado
- Idéntico a VARK
- Mensajes: "Analizando tu personalidad...", "Calculando tus dimensiones..."

---

### 6. PÁGINA DE RESULTADOS (Usuario Normal)

**URL:** `/resultados` o `/resultados.html`

#### Descripción:
Página donde el usuario ve sus resultados de los tests. Siempre muestra el último test realizado primero.

#### Elementos de la Página:

##### Header/Navbar
- Menú completo con opciones de usuario

##### Sección: Últimos Resultados (Siempre visible primero)
- Título: "Tus Últimos Resultados"
- Subtítulo: "Se muestra el último test realizado"

##### Card: Resultado VARK (si ha realizado el test)
- Título: "Test VARK - Resultado"
- Fecha del test
- Resultado principal grande: "VISUAL" (con icono)
- Puntuación de cada estilo:
  - Visual: 8 respuestas (barra de progreso)
  - Auditivo: 3 respuestas (barra de progreso)
  - Lectura/Escritura: 2 respuestas (barra de progreso)
  - Kinestésico: 3 respuestas (barra de progreso)
- Gráfico circular o de barras
- Interpretación breve: "Prefieres aprender con imágenes, diagramas y videos"
- Botón: "Ver Historial Completo"
- Botón: "Repetir Test"

##### Card: Resultado Personalidad (si ha realizado el test)
- Título: "Test de Personalidad - Resultado"
- Fecha del test
- Tipo de personalidad grande: "INTJ" (con color especial)
- Nombre del tipo: "El Arquitecto"
- Descripción breve del tipo
- Puntuación de cada dimensión:
  - Extraversión vs Introversión: 75% I (barra visual)
  - Sensación vs Intuición: 60% N
  - Pensamiento vs Sentimiento: 80% T
  - Juzgamiento vs Percepción: 55% J
- Gráfico radar o barras horizontales
- Características principales (3-4 bullet points)
- Botón: "Ver Historial Completo"
- Botón: "Repetir Test"

##### Sección: Historial Completo (expandible)
- Título: "Historial de Tests"
- Tabla o lista cronológica:
  | Fecha | Test | Resultado | Acción |
  |-------|------|-----------|--------|
  | 15/03/2026 | VARK | Visual | Ver |
  | 10/03/2026 | Personalidad | INTJ | Ver |
- Botón "Ver" en cada fila lleva a detalle del test específico

##### Sección: Estado Vacío
- Si no ha realizado ningún test:
  - Icono de test
  - Texto: "Aún no has realizado ningún test"
  - Botón: "Comenzar Test"

---

### 7. PÁGINA DE DETALLE DE RESULTADO (Usuario Normal)

**URL:** `/resultado-detalle` o `/resultado-detalle.html`

#### Descripción:
Página con el detalle completo de un test específico realizado.

#### Elementos de la Página:

##### Header/Navbar
- Breadcrumb: Inicio > Resultados > Detalle

##### Sección: Encabezado del Resultado
- Tipo de test (VARK o Personalidad)
- Fecha y hora
- Botón: "Imprimir Resultado"
- Botón: "Descargar PDF" (opcional)

##### Contenido Detallado (VARK):
- Resultado principal destacado
- Gráfico de barras o circular
- Tabla con puntuaciones
- Interpretación completa
- Recomendaciones para el estilo de aprendizaje
- Comparación con resultados anteriores (si aplica)

##### Contenido Detallado (Personalidad):
- Tipo de personalidad destacado (con color especial)
- Nombre del tipo y descripción
- Gráfico de las 4 dimensiones
- Descripción completa del tipo
- Fortalezas y debilidades
- Carreras recomendadas
- Comparación con resultados anteriores (si aplica)

---

### 8. PÁGINA DE ADMIN DASHBOARD

**URL:** `/admin` o `/admin.html`

#### Descripción:
Panel de administración donde el admin puede ver y gestionar todos los resultados de todos los usuarios.

#### Elementos de la Página:

##### Header/Navbar
- Logo + "Panel de Administración"
- Menú admin: Dashboard | Usuarios | Resultados VARK | Resultados Personalidad | Configuración
- Avatar del admin + Logout

##### Sección: Resumen General (KPIs)
- Cards con estadísticas rápidas:
  - Total de usuarios registrados
  - Total de tests VARK realizados
  - Total de tests Personalidad realizados
  - Promedio de estilos VARK (gráfico mini)
  - Distribución de tipos de personalidad (gráfico mini)

##### Sección: Gráficos Estadísticos
- Gráfico de barras: Distribución de estilos VARK (todos los usuarios)
- Gráfico de torta: Distribución de tipos de personalidad
- Gráfico de líneas: Tests realizados por mes
- Gráfico de barras: Comparación E/I, S/N, T/F, J/P

##### Sección: Tabla de Usuarios
- Búsqueda por nombre/email
- Filtros: rol, fecha de registro, tests realizados
- Tabla:
  | Usuario | Email | Rol | Fecha Registro | Tests Realizados | Acciones |
  |---------|-------|-----|----------------|------------------|----------|
  | Juan Pérez | juan@mail.com | Usuario | 15/03/2026 | VARK, Personalidad | Ver | Editar | Eliminar |
- Acciones: Ver perfil, Editar, Eliminar, Ver resultados

##### Sección: Tabla de Resultados
- Filtros: tipo de test, fecha, usuario
- Tabla con todos los resultados
- Acciones: Ver detalle, Exportar

##### Sección: Gestión de Usuarios (CRUD)
- Crear nuevo usuario (con rol admin/usuario)
- Editar usuario existente
- Desactivar/activar usuario
- Cambiar rol

##### Sección: Exportar Datos
- Botón: "Exportar a Excel"
- Botón: "Exportar a PDF"
- Botón: "Exportar a CSV"

---

### 9. PÁGINA DE DETALLE DE USUARIO (Admin)

**URL:** `/admin/usuario/{id}` o `/admin-usuario-detalle.html`

#### Descripción:
Vista detallada de un usuario específico con todos sus resultados.

#### Elementos de la Página:

##### Sección: Perfil del Usuario
- Foto/avatar
- Nombre completo
- Email
- Fecha de registro
- Rol
- Estado (activo/inactivo)

##### Sección: Historial de Tests
- Lista cronológica de todos los tests realizados
- Cada test con:
  - Tipo
  - Fecha
  - Resultado
  - Botón: "Ver Detalle"

##### Sección: Estadísticas del Usuario
- Estilo VARK dominante
- Tipo de personalidad
- Comparación con promedios generales

##### Botones de Acción
- Editar usuario
- Desactivar/Activar
- Eliminar usuario (con confirmación)

---

### 10. GESTIÓN DE ROLES DE ADMIN (Admin Only)

**Ruta Angular:** `/admin/role-management`
**Componente:** `RoleManagementComponent`
**Guard:** `admin.guard.ts`

#### Descripción:
Página exclusiva para administradores donde pueden otorgar o revocar permisos de administrador a usuarios previamente registrados. **No se pueden crear usuarios admin desde aquí**, solo cambiar el rol de usuarios existentes.

#### Elementos de la Página:

##### Header/Navbar
- Logo + "Panel de Administración"
- Menú admin: Dashboard | Usuarios | Gestión de Roles | Resultados | Configuración
- Breadcrumb: Admin > Gestión de Roles
- Avatar del admin + Logout

##### Sección: Explicación
- Título: "Gestión de Permisos de Administrador"
- Texto explicativo: "Desde aquí podés otorgar o revocar permisos de administrador a usuarios ya registrados en el sistema. El usuario recibirá una notificación cuando su rol sea cambiado."
- Icono de info (ℹ️) con tooltip: "Solo un administrador puede modificar roles"

##### Sección: Tabla de Usuarios (no-admin)
- Filtros:
  - Búsqueda por nombre/email
  - Filtro por fecha de registro
  - Filtro por cantidad de tests realizados
- Tabla de usuarios que **NO son admin**:
  | Checkbox | Usuario | Email | Fecha Registro | Tests | Estado | Acción |
  |----------|---------|-------|----------------|-------|--------|--------|
  | ☐ | Juan Pérez | juan@mail.com | 15/03/2026 | VARK, Personalidad | Activo | [Dar Permiso] |
  | ☐ | María López | maria@mail.com | 20/03/2026 | VARK | Activo | [Dar Permiso] |

##### Botón "Dar Permiso de Admin"
- **Acción individual**: Botón `[Dar Permiso]` en cada fila
  - Click → Modal de confirmación:
    ```
    ⚠️ Confirmar Cambio de Rol
    
    ¿Estás seguro de otorgar permisos de administrador a "Juan Pérez"?
    
    Este usuario podrá:
    ✓ Acceder al panel de administración
    ✓ Ver y gestionar todos los resultados
    ✓ Administrar otros usuarios
    
    También podrá revocar sus propios permisos posteriormente.
    
    [Cancelar]  [Confirmar y Otorgar]
    ```
  - Si confirma → `PUT /api/admin/users/{id}/role` con `{role: 'admin'}`
  - Backend valida:
    1. Que quien hace la petición SEA admin (verificado por token)
    2. Que el usuario exista en la base de datos
    3. Que el usuario NO sea ya admin
  - Si todo OK → actualiza `role = 'admin'` en DB → retorna 200
  - Frontend: toast de éxito ✅ "Permisos otorgados a Juan Pérez" → tabla se actualiza (usuario desaparece de la lista)

- **Acción masiva** (opcional):
  - Checkboxes para seleccionar múltiples usuarios
  - Botón superior: "Dar Permiso a Seleccionados (3)"
  - Mismo modal de confirmación pero con lista de nombres

##### Sección: Usuarios que SON Admin (para revocar)
- Título: "Administradores Actuales"
- Tabla con usuarios que tienen rol `admin`:
  | Usuario | Email | Fecha que se volvió Admin | Acciones |
  |---------|-------|---------------------------|----------|
  | Admin Principal | admin@mail.com | 01/01/2026 | — (no se puede revocar) |
  | Juan Pérez | juan@mail.com | 25/03/2026 | [Revocar Permiso] |

- **Revocar permisos**:
  - Botón `[Revocar Permiso]` en cada fila (excepto el admin principal/root)
  - Click → Modal de confirmación:
    ```
    ⚠️ Confirmar Revocación
    
    ¿Estás seguro de revocar los permisos de administrador a "Juan Pérez"?
    
    Este usuario dejará de tener acceso al panel de administración.
    Sus resultados y datos personales se mantendrán intactos.
    
    [Cancelar]  [Confirmar Revocación]
    ```
  - Si confirma → `PUT /api/admin/users/{id}/role` con `{role: 'user'}`
  - Frontend: toast de éxito "Permisos revocados de Juan Pérez" → usuario aparece en la tabla de arriba

##### Validaciones y Reglas
1. **Solo un admin puede modificar roles** (verificado por `admin.guard.ts` + token en backend)
2. **No se puede revocar el rol del admin principal** (primer admin creado en el sistema, `is_superadmin: true`)
3. **Un usuario no puede revocar sus propios permisos** (debe otro admin hacerlo)
4. **Notificación al usuario**: cuando se le otorga/revoca un rol, el backend envía un email o se muestra un toast la próxima vez que inicie sesión

##### Sección: Historial de Cambios de Rol (log)
- Tabla con los últimos cambios realizados:
  | Fecha | Admin que hizo el cambio | Usuario afectado | Acción |
  |-------|--------------------------|------------------|--------|
  | 25/03/2026 14:30 | Admin Principal | Juan Pérez | Otorgado admin |
  | 22/03/2026 09:15 | Admin Principal | María López | Revocado admin |
- Filtros: fecha, admin, acción (otorgado/revocado)

---

### 11. PÁGINA DE CONTACTO

**Ruta Angular:** `/contact`
**Componente:** `ContactComponent`

**URL:** `/contacto` o `/contacto.html`

#### Descripción:
Formulario de contacto para que los usuarios puedan enviar mensajes.

#### Elementos de la Página:

##### Sección: Formulario de Contacto
- Título: "Contáctanos"
- Campo: Nombre completo
- Campo: Correo electrónico
- Campo: Asunto
- Campo: Mensaje (textarea grande)
- Botón: "Enviar Mensaje"

##### Sección: Información de Contacto
- Correo electrónico de soporte
- Teléfono (si aplica)
- Dirección (si aplica)
- Horario de atención

##### Sección: FAQ (Preguntas Frecuentes)
- Acordeón con preguntas comunes:
  - ¿Qué es el modelo VARK?
  - ¿Qué es el test de personalidad?
  - ¿Mis resultados son confidenciales?
  - ¿Puedo repetir los tests?

---

## 🧩 COMPONENTES REUTILIZABLES

### Barra de Navegación (Navbar)
- Logo
- Menú dinámico según rol (usuario/admin)
- Toggle dark/light mode
- Avatar + dropdown de usuario
- Responsive: hamburger menu en mobile

### Tarjetas (Cards)
- Estilo con sombra sutil
- Bordes redondeados
- Hover effect
- Variantes: info, éxito, advertencia, error

### Botones
- Primario, Secundario, Éxito, Peligro, Advertencia
- Tamaños: sm, md, lg
- Estados: normal, hover, active, disabled, loading

### Formularios
- Labels claros
- Iconos en inputs
- Validación visual (bordes rojos/verdes)
- Mensajes de error debajo del campo
- Checkbox y radio buttons estilizados

### Tablas
- Responsive
- Header con fondo destacado
- Filas alternadas (zebra)
- Acciones en última columna
- Paginación
- Búsqueda y filtros

### Gráficos
- Usar Chart.js o similar
- Barras, líneas, circular, radar
- Colores consistentes con la paleta
- Tooltips interactivos

### Modales
- Confirmación de acciones
- Detalles rápidos
- Formularios inline

### Toasts/Notificaciones
- Éxito (verde)
- Error (rojo)
- Advertencia (amarillo)
- Información (azul)
- Auto-dismiss con timer

### Spinner/Loading
- Para operaciones asíncronas
- Overlay opcional
- Mensaje contextual

---

## 📱 RESPONSIVE DESIGN

### Breakpoints
| Dispositivo | Ancho |
|-------------|-------|
| Mobile | < 576px |
| Tablet | 576px - 992px |
| Desktop | > 992px |

### Consideraciones Mobile
- Menú hamburger
- Cards en columna
- Tablas con scroll horizontal
- Botones full-width
- Formularios optimizados para touch

---

## 🔧 TECNOLOGÍAS FRONTEND

| Tecnología | Uso |
|------------|-----|
| Angular (TypeScript) | Framework y lógica del cliente |
| HTML5 | Estructura |
| Bootstrap 5 | **Único** motor de estilos (Grid, componentes y utilitarios) |
| Chart.js | Gráficos estadísticos |
| Font Awesome | Iconos |
| Google Fonts | Tipografía |

---


*Documento de especificación frontend*
*Proyecto: Aprendizaje VARK y Test de Personalidad*
*Universidad Autónoma de Coahuila - Semestre 9*
*Desarrollo WEB*
