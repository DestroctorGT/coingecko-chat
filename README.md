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
VERCEL_AI_GATEWAY_KEY=tu_clave_vercel_gateway
```

1. **Correr en desarrollo**

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

---

## Arquitectura

### Endpoints

| Endpoint         | Descripción                                                           |
| ---------------- | --------------------------------------------------------------------- |
| `POST /api/chat` | Recibe mensajes, ejecuta tool-calling, hace streaming de la respuesta |

### Caching

Los datos de CoinGecko se cachean 60 segundos (`next: { revalidate: 60 }`). Esto reduce el rate-limiting de la API y mantiene los datos relativamente actualizados.

### Estrategia de búsqueda de criptomonedas

`getCryptoByQuery(query)` usa una estrategia de tres pasos:

1. **ID directo**: Intenta `GET /coins/markets?ids={query}`. Si hay resultado, retorna inmediatamente.
2. **Búsqueda dinámica**: Si no hay resultado, llama a `GET /search?query={query}` para obtener el ID real (ej: "eth" → "ethereum").
3. **Fetch final**: Con el ID encontrado, obtiene los datos completos de mercado.

Esto cubre casos como `"bitcoin"`, `"BTC"`, `"eth"`, `"solana"`, `"sol"`, etc.

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
| IA         | Vercel AI SDK v4 (`ai`)                   |
| Modelo     | `openai/gpt-5-mini` vía Vercel AI Gateway |
| Datos      | CoinGecko API v3                          |
| UI         | React 19, Tailwind CSS v4, Radix UI       |
| Validación | Zod                                       |

---

## Uso de IA para programar

Esta app fue construida con la ayuda de **Claude Code**, el CLI de IA de Anthropic.

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
