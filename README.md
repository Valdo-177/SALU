# SALU

Facilitamos tu acceso a la salud que mereces.

SALU es una plataforma que ofrece microcréditos y opciones de ahorro digital para que las consultas médicas y odontológicas sean más accesibles para todos los colombianos.

## 🌟 ¿Por qué SALU es diferente?

En **SALU**, revolucionamos el acceso a la salud en Colombia. Nuestra misión es eliminar las barreras económicas y los largos tiempos de espera, ofreciendo un modelo innovador que te permite:

- **Elegir** al médico especialista que necesitas.
- **Solicitar** un microcrédito en minutos, sin complicaciones.
- **Asegurar** tu tranquilidad financiera mientras cuidas de tu bienestar.

## 🚀 Características principales

- **Simulación de crédito**: Permite a los usuarios calcular el crédito necesario para sus consultas médicas y odontológicas.
- **Formulario interactivo**: Recopila información del usuario como cédula de ciudadanía, teléfono móvil, nombre completo, correo electrónico y género.
- **Notificaciones por correo**: Envío automatizado de la información del formulario al administrador mediante Nodemailer.
- **Validaciones integradas**: Asegura que los datos ingresados sean correctos y completos antes del envío.

## 🛠️ Tecnologías utilizadas

Este proyecto está desarrollado utilizando las siguientes herramientas:

- **Frontend**:
  - [React](https://reactjs.org/) con [TypeScript](https://www.typescriptlang.org/)
  - [React Hook Form](https://react-hook-form.com/) para la gestión del formulario y validaciones
  - [Tailwind CSS](https://tailwindcss.com/) para el diseño responsivo
  - Componentes personalizados de la interfaz: `Dialog`, `Input`, `Label`, y `Button`
- **Backend**:
  - [Nodemailer](https://nodemailer.com/) para el envío de correos electrónicos.
- **Validaciones**:
  - RegEx y validaciones específicas para cada campo del formulario.

## 📝 Cómo usar este proyecto

### Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/Valdo-177/SALU
   cd salu
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

### Configuración

1. Configura el servidor SMTP para el envío de correos electrónicos. Crea un archivo `.env` con las siguientes variables:

   ```env
   SMTP_HOST=smtp.tu-servidor.com
   SMTP_PORT=587
   SMTP_USER=tu-correo@dominio.com
   SMTP_PASS=tu-contraseña
   ```

2. Si usas un entorno de desarrollo local, asegura que el frontend y backend puedan comunicarse correctamente.

### Ejecutar en modo desarrollo

1. Ejecuta el proyecto localmente:

   ```bash
   npm run dev
   ```

2. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Construcción para producción

1. Genera una versión optimizada para producción:

   ```bash
   npm run build
   ```

2. Inicia el servidor en producción:

   ```bash
   npm start
   ```

## 🛡️ Validaciones del formulario

- **Cédula de ciudadanía**: Campo obligatorio.
- **Teléfono móvil**: Debe contener 10 dígitos.
- **Nombre completo**: Campo obligatorio.
- **Correo electrónico**: Validación mediante expresión regular.
- **Género**: Selección obligatoria de una de las opciones disponibles.

## 📩 Envío de datos por correo electrónico

Al completar y enviar el formulario, los datos ingresados son enviados por correo electrónico al administrador. El diseño del correo incluye:

- Un saludo personalizado.
- La información proporcionada por el usuario:
  - Cédula de ciudadanía
  - Teléfono móvil
  - Nombre completo
  - Correo electrónico
  - Género

## 📷 Capturas de pantalla

### Simulación de crédito
![Formulario de simulación](ruta/a/imagen.png)

## 🏥 Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar este proyecto:

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad o corrección (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza un commit con tus cambios (`git commit -m 'Añadir nueva funcionalidad'`).
4. Haz un push a tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un pull request.

---

Desarrollado con ❤️ para mejorar el acceso a la salud en Colombia.