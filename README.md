# SIJAK T0 — landing

Landing independiente de la aplicación Expo del directorio padre. Next.js 16, TypeScript estricto, Tailwind CSS 4, Framer Motion y almacenamiento privado de Vercel Blob.

## Producción

- Inglés: https://sijak-t0.vercel.app/en
- Español: https://sijak-t0.vercel.app/es
- Vercel: https://vercel.com/agencia-ai/sijak-t0
- `/` redirige a `/es`, el idioma principal.

## Desarrollo

```bash
cd landing
npm ci
npm run dev
```

Requiere Node.js 22+. La interfaz funciona sin credenciales; para guardar formularios se necesita conectar el proyecto a un **Blob store privado** y ejecutar `vercel env pull .env.local`. Sin almacenamiento configurado la API devuelve un error real: nunca confirma una inscripción que no pudo guardar.

```bash
npm run typecheck
npm test
npm run build
npm run format:check

# Con servidor local en el puerto 3101:
npm run dev -- --port 3101
npm run test:browser
# También admite TEST_BASE_URL=https://sijak-t0.vercel.app
```

Las pruebas de navegador requieren `npx playwright install chromium`. Las pruebas del formulario en navegador interceptan la respuesta; la persistencia real se comprobó por separado y los registros sintéticos fueron eliminados.

## Arquitectura

- `app/[lang]/`: páginas estáticas bilingües, contacto, privacidad y metadatos.
- `components/ui/`: botones, listas, campos y avisos reutilizables.
- `components/landing/`: secciones de la landing. Solo cabecera, montajes y formulario van al cliente. `MultiRoleSection` va después de entrenadores; sus cinco pestañas admiten teclado.
- `components/LandingPage.tsx`: compone esas secciones en el servidor.
- `components/ContactForm.tsx`: consultas y solicitudes de privacidad.
- `lib/copy.ts`: contenido heredado de ambas versiones; las traducciones nuevas se separan en `locales/{en,es}/{landing,product}.json` y se interpolan en `lib/i18n.ts`. `common.json` y `waitlist.json` quedan reservados para la migración incremental del resto del contenido.
- `lib/product.ts`, `lib/roles.ts`, `lib/media.ts`: identidad, capacidades, montajes y rutas a recursos independientes de los idiomas.
- `lib/waitlist.ts`: validación y normalización de inscripciones.
- `lib/request.ts`: comprobación de origen, tipo de contenido, honeypot y límite de 8 KB.
- `app/api/waitlist/route.ts`: persistencia privada e idempotencia por hash SHA-256 del correo.
- `app/api/contact/route.ts`: persistencia privada de mensajes.
- `app/globals.css`: estilos heredados de las secciones existentes (todavía ~2.765 líneas); la nueva sección usa Tailwind sin CSS propio. Queda pendiente migrar el resto por etapas para reducirlo.
- `public/t0-render.png`: único render del dispositivo utilizado en hero, sistema y montajes ilustrados.
- `public/images/pexels-260447.jpg`: imagen de entrenamiento de Pexels, https://www.pexels.com/photo/man-in-black-shirt-doing-a-kick-260447/. La página usa `next/image` para optimizarla.
- `public/media/roles/*.webp`: cinco ilustraciones originales de montaje (20–40 KB) con el mismo `t0-render.png`, generadas con `scripts/generate-role-media.ts`. Se identifican como conceptos, **no** fotografías ni pruebas del hardware final; antes de publicar la campaña conviene sustituirlas por fotos/renders aprobados y cambiar `media.roleMediaKind` a `photography`.
- `public/sijak-icon.svg`: favicon. `public/og-image.png`: captura del hero en español (1200 × 630).

## Inscripciones y contacto

El store privado **sijak-waitlist** está conectado a producción, preview y desarrollo.

- Inscripciones: `waitlist/<sha256-del-correo>.json`.
- Consultas y solicitudes de privacidad: `contact/<uuid>.json`.
- Acceso desde el panel Storage de Vercel, con autenticación. No hay endpoint público de lectura ni panel administrativo expuesto.
- Los reintentos de un correo ya inscrito se confirman sin sobrescribir sus datos.
- Solo se muestra el éxito después de confirmar la persistencia.
- Los datos personales y tokens no se escriben en logs.
- El firewall del proyecto limita `/api/` a **10 solicitudes por IP cada 60 segundos**. Esta regla está publicada en Vercel, no vive en el repositorio.
- Los mensajes requieren revisión manual en Vercel. No se han configurado correos automáticos, confirmación doble ni avisos por email al equipo.
- Las solicitudes de privacidad se reciben por `/es/contact` o `/en/contact` y deben gestionarse manualmente. La página de privacidad explica el tratamiento; conviene revisión legal antes de una campaña comercial.

Para listar únicamente metadatos de los registros desde el proyecto enlazado:

```bash
vercel blob list --prefix waitlist/
vercel blob list --prefix contact/
```

No publiques ni añadas al repositorio exportaciones con datos personales.

## Configuración pendiente de marca

Las URLs oficiales de Instagram y X no se proporcionaron. No se inventaron perfiles: se muestran como próximos enlaces. Configura `NEXT_PUBLIC_INSTAGRAM_URL` y `NEXT_PUBLIC_X_URL` en Vercel y vuelve a desplegar para activarlos.

`NEXT_PUBLIC_SITE_URL` permite sustituir el dominio de Vercel por el dominio definitivo; actualiza esta variable antes del despliegue para mantener canonical, hreflang, Open Graph, sitemap y robots coherentes.

Las métricas son ejemplos ilustrativos, no resultados de mediciones reales. La recuperación izquierda +24 % usa los valores solicitados, 301/242 ms, redondeados. La respuesta total ilustrativa es 397 ms (reacción + ejecución); el ciclo completo incluye recuperación y termina en 644 ms.

## Despliegue

```bash
cd landing
npx vercel --prod --yes
```

El proyecto está enlazado a `agencia-ai/sijak-t0`. `.vercel/` y `.env.local` son locales y están ignorados. No se modificaron archivos de la app Expo original.
