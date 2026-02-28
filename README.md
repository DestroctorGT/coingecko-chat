# CryptoChat · Powered by CoinGecko

Mini-app de chat con IA sobre criptomonedas. La IA consulta datos reales de CoinGecko en tiempo real usando tool-calling.

## Demo

[Deploy en Vercel (placeholder)](https://coingecko-chat.vercel.app)

---

## Cómo correr localmente

### Requisitos

- Node.js 20+
- npm 10+
- Claves API: CoinGecko Demo API key + Vercel AI Gateway key

### Setup

1. **Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/coingecko-chat.git
cd coingecko-chat
```

1. **Instalar dependencias**

```bash
npm install
```

1. **Crear `.env.local`** en la raíz del proyecto:

```
COINGECKO_API_KEY=tu_clave_coingecko
AI_GATEWAY_KEY=tu_clave_vercel_gateway
```

1. **Correr en desarrollo**

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

---

## Arquitectura

### Endpoints

**App**

| Endpoint         | Descripción                                                           |
| ---------------- | --------------------------------------------------------------------- |
| `POST /api/chat` | Recibe mensajes, ejecuta tool-calling, hace streaming de la respuesta |

**CoinGecko API v3** (consumidos desde `lib/coingecko.ts`)

| Endpoint                                                               | Función              | Descripción                                                       |
| ---------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------- |
| `GET /coins/markets?vs_currency=usd&per_page=10&order=market_cap_desc` | `getTop10()`         | Top 10 criptos por capitalización de mercado                      |
| `GET /coins/markets?vs_currency=usd&ids={id}`                          | `getCryptoByQuery()` | Paso 1: intenta obtener la cripto directamente por ID             |
| `GET /search?query={query}`                                            | `getCryptoByQuery()` | Paso 2: si no hay resultado directo, busca el ID real del símbolo |
| `GET /coins/markets?vs_currency=usd&ids={foundId}`                     | `getCryptoByQuery()` | Paso 3: obtiene datos completos con el ID encontrado              |

### Caching

Los datos de CoinGecko se cachean 60 segundos (`next: { revalidate: 60 }`). Esto reduce el rate-limiting de la API y mantiene los datos relativamente actualizados.

### Estrategia de búsqueda de criptomonedas

`getCryptoByQuery(query)` normaliza primero el input con `query.toLowerCase().trim()` para evitar fallos por mayúsculas o espacios, y luego usa una estrategia de tres pasos:

1. **ID directo**: Intenta `GET /coins/markets?ids={query}`. Si hay resultado, retorna inmediatamente.
2. **Búsqueda dinámica**: Si no hay resultado, llama a `GET /search?query={query}` para obtener el ID real (ej: "eth" → "ethereum").
3. **Fetch final**: Con el ID encontrado, obtiene los datos completos de mercado.

Esto cubre casos como `"bitcoin"`, `"BTC"`, `"eth"`, `"solana"`, `"sol"`, etc.

### Evitar waterfalls visuales

El flujo de tool-calling tiene dos fases con latencia: esperar que la IA responda y esperar que la tool devuelva datos. Sin manejo explícito, el usuario vería el skeleton de "pensando" desaparecer abruptamente y luego reaparecer la UI real, causando un salto visual.

La solución usa dos capas de skeleton coordinadas por el estado del mensaje:

| Fase                               | Condición                                                                                   | Qué se muestra                                                              |
| ---------------------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Esperando respuesta del asistente  | `isLoading` y el último mensaje es del usuario, o el asistente aún no tiene partes visibles | `MessageSkeleton` (burbuja genérica de "pensando")                          |
| Tool invocada, esperando resultado | La part del tool existe con estado `input-streaming` o `input-available`                    | `CardSkeleton` (grid) o `DetailSkeleton`, reemplazando al `MessageSkeleton` |
| Tool con resultado                 | Estado `output-available`                                                                   | Componente real (`Top10Grid` o `CryptoDetail`)                              |

El `MessageSkeleton` desaparece exactamente cuando aparece la primera tool part, de modo que siempre hay algo visible en pantalla sin gaps ni saltos.

### Flujo de tool-calling

```
Usuario escribe → useChat → POST /api/chat
  → streamText con maxSteps: 5
    → IA decide qué tool usar
    → getTop10Cryptos() o getCryptoByQuery(query)
    → CoinGecko API
    → IA recibe datos y genera respuesta
  → streaming al cliente
→ MessageBubble renderiza Top10Grid o CryptoDetail
```

---

## Stack tecnológico

| Capa       | Tecnología                                |
| ---------- | ----------------------------------------- |
| Framework  | Next.js 16 (App Router)                   |
| IA         | Vercel AI SDK v6 (`ai`)                   |
| Modelo     | `openai/gpt-5-mini` vía Vercel AI Gateway |
| Datos      | CoinGecko API v3                          |
| UI         | React 19, Tailwind CSS v4, Radix UI       |
| Validación | Zod                                       |

---

## Uso de IA para programar

Esta app fue construida con la ayuda de **Claude Code**, el CLI de IA de Anthropic.

### Qué partes generó la IA y qué se corrigió manualmente

La IA generó la mayor parte del código: estructura del proyecto, componentes, lógica de tools, estilos y flujo de streaming. Las correcciones manuales fueron puntuales:

- **`components/chat/MessageList.tsx`** — La condición para mostrar `MessageSkeleton` que generó la IA era solo `isLoading && lastMessage.role === 'user'`. Eso hacía que el skeleton desapareciera en cuanto el asistente emitía su primer mensaje, incluso si ese mensaje llegaba vacío (sin texto ni tool parts todavía), causando un gap visual. Se corrigió manualmente para que el skeleton también se muestre cuando el último mensaje es del asistente pero aún no tiene contenido visible.

- **`components/chat/MessageBubble.tsx`** — La IA no incluyó `whitespace-pre-wrap` en las burbujas de texto del asistente, lo que causaba que los saltos de línea se ignoraran. Se agregó manualmente.

- **`app/api/chat/route.ts`** — El modelo y configuración del gateway se ajustaron manualmente: la IA inicialmente usó `anthropic/claude-3-5-sonnet-20241022`, pero se cambió a `openai/gpt-5-mini` vía Vercel AI Gateway según los requisitos del proyecto.

- **`components/chat/ChatInput.tsx`** — Se revisó y ajustó la configuración del debounce y el comportamiento del submit para asegurar que los mensajes cortos o rápidos no se perdieran.

### Cómo se verificó que no haya alucinaciones de precios

El riesgo principal de un chatbot financiero es que el modelo invente cifras. Esto se mitigó a nivel de diseño:

1. **System prompt restrictivo**: el prompt del sistema incluye explícitamente `NEVER invent or guess cryptocurrency prices, market caps, or financial data. When the user asks about prices or crypto information, always use the available tools to fetch real data.`
2. **Arquitectura tool-first**: el modelo nunca genera precios en texto directamente. Siempre invoca una tool (`getTop10Cryptos` o `getCryptoByQuery`), recibe los datos reales de CoinGecko, y solo entonces redacta su respuesta basándose en esos datos.
3. **Caso nulo explícito**: si `getCryptoByQuery` retorna `null`, el system prompt instruye al modelo a informar que la criptomoneda no fue encontrada, en lugar de inventar datos.

### Ejemplos de prompts usados

- "analiza el archivo @docs/requirements.md para implementar esta aplicacion" - se uso en modo plan para decidir el stack
  tecnológico
- \_"Implementa `getCryptoByQuery` con una estrategia multi-paso: ID directo → /search → markets" - se uso para evitar casos
  donde el usuario intente buscar por eth, btc y no por nombres exactos desde el param Id que causaria errores.
- _"Crea `MessageBubble` que renderice `Top10Grid` o `CryptoDetail` según el toolName del tool invocation"_
- _"Configura la ruta API para usar Vercel AI Gateway con tool-calling y maxSteps: 5"_
- _"El componente `ChatInput` debe usar `useDebounce` de @uidotdev/usehooks y hacer submit con Enter (Shift+Enter = nueva línea)"_
- "ahora quiero solucionar un bug visual y es que cuando le escribo al chat aparece el skeleton MessageSkeleton pero dura muy poco, osea aparece y  
   dependiendo de la respuesta de la tool se quita y luego aparece la informacion. pero si ya respondio con @components/crypto/Top10Grid.tsx o  
  @components/crypto/CryptoDetail.tsx no vuelve aparecer el skeleton del mensaje cargando. lo que describo es: Evitar waterfalls obvios"

---

## Scripts

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Lint
```
