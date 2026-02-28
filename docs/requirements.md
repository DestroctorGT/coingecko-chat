### Objetvo

Construir una mini app en **Next.js** (con TS y **Tailwind**) que permita consultar datos de criptomonedas desde **Coingecko** y que, además, tenga un **chat de IA** conectado a **Vercel AI Gateway** capaz de ejecutar una de dos tools para responder con:

1. **El listado de las 10 criptomonedas con mayor market cap** (más valuadas), y
2. **El detalle de una criptomoneda específica.**

Es decir que la IA debe poder decidir cuál tool ejecutar.

---

## Requerimientos funcionales

### 1) Integración con Coingecko

Tu app debe poder obtener:

**A. Top 10 por market cap**

- Lista de las 10 criptos con mayor capitalización.
- Mostrar al menos:
  - Nombre
  - Símbolo
  - Precio actual (USD)
  - Market cap
  - Variación 24h (%)
  - Logo/imagen (si está disponible)
- Debe estar ordenado descendentemente por market cap.

- Endpoint de coingecko a usar
  - const options = {method: 'GET', headers: {'x-cg-demo-api-key': 'api-key'}};

fetch('<https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page=1&order=market_cap_desc&sparkline=false>', options)
.then(res => res.json())
.then(res => console.log(res))
.catch(err => console.error(err));

- ## Respuesta

  - [{"id":"bitcoin","symbol":"btc","name":"Bitcoin","image":"https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400","current_price":65610,"market_cap":1312155114762,"market_cap_rank":1,"fully_diluted_valuation":1312157214665,"total_volume":43631967321,"high_24h":68116,"low_24h":65224,"price_change_24h":-2001.222474821203,"price_change_percentage_24h":-2.95991,"market_cap_change_24h":-38914687127.9895,"market_cap_change_percentage_24h":-2.88029,"circulating_supply":19995671.0,"total_supply":19995703.0,"max_supply":21000000.0,"ath":126080,"ath_change_percentage":-47.96185,"ath_date":"2025-10-06T18:57:42.558Z","atl":67.81,"atl_change_percentage":96656.54093,"atl_date":"2013-07-06T00:00:00.000Z","roi":null,"last_updated":"2026-02-27T22:50:40.941Z"},{"id":"ethereum","symbol":"eth","name":"Ethereum","image":"https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628","current_price":1921.27,"market_cap":232142240224,"market_cap_rank":2,"fully_diluted_valuation":232142240224,"total_volume":21206385127,"high_24h":2059.75,"low_24h":1898.54,"price_change_24h":-114.50242795677423,"price_change_percentage_24h":-5.62453,"market_cap_change_24h":-13431590441.0784,"market_cap_change_percentage_24h":-5.46947,"circulating_supply":120692267.571508,"total_supply":120692267.571508,"max_supply":null,"ath":4946.05,"ath_change_percentage":-61.15553,"ath_date":"2025-08-24T19:21:03.333Z","atl":0.432979,"atl_change_percentage":443632.12024,"atl_date":"2015-10-20T00:00:00.000Z","roi":{"times":38.18363330475411,"currency":"btc","percentage":3818.363330475411},"last_updated":"2026-02-27T22:50:41.068Z"},{"id":"tether","symbol":"usdt","name":"Tether","image":"https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661","current_price":1.0,"market_cap":183557246716,"market_cap_rank":3,"fully_diluted_valuation":189024409655,"total_volume":71211541734,"high_24h":1.0,"low_24h":0.999928,"price_change_24h":5.856e-05,"price_change_percentage_24h":0.00586,"market_cap_change_24h":-3439710.1094970703,"market_cap_change_percentage_24h":-0.00187,"circulating_supply":183549673295.2683,"total_supply":189016610662.9562,"max_supply":null,"ath":1.32,"ath_change_percentage":-24.42033,"ath_date":"2018-07-24T00:00:00.000Z","atl":0.572521,"atl_change_percentage":74.66452,"atl_date":"2015-03-02T00:00:00.000Z","roi":null,"last_updated":"2026-02-27T22:50:22.696Z"},{"id":"binancecoin","symbol":"bnb","name":"BNB","image":"https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970","current_price":611.72,"market_cap":83393858526,"market_cap_rank":4,"fully_diluted_valuation":83393857921,"total_volume":1103592937,"high_24h":633.37,"low_24h":607.48,"price_change_24h":-13.996948183318977,"price_change_percentage_24h":-2.23693,"market_cap_change_24h":-1914117854.2341614,"market_cap_change_percentage_24h":-2.24377,"circulating_supply":136358814.39,"total_supply":136358813.4,"max_supply":200000000.0,"ath":1369.99,"ath_change_percentage":-55.34841,"ath_date":"2025-10-13T08:41:24.131Z","atl":0.0398177,"atl_change_percentage":1536209.47077,"atl_date":"2017-10-19T00:00:00.000Z","roi":null,"last_updated":"2026-02-27T22:50:40.776Z"},{"id":"ripple","symbol":"xrp","name":"XRP","image":"https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442","current_price":1.35,"market_cap":82579949995,"market_cap_rank":5,"fully_diluted_valuation":135157372409,"total_volume":3141876099,"high_24h":1.42,"low_24h":1.34,"price_change_24h":-0.05031857830632491,"price_change_percentage_24h":-3.58338,"market_cap_change_24h":-3004330642.3271637,"market_cap_change_percentage_24h":-3.51038,"circulating_supply":61090376977.0,"total_supply":99985708785.0,"max_supply":100000000000.0,"ath":3.65,"ath_change_percentage":-62.86993,"ath_date":"2025-07-18T03:40:53.808Z","atl":0.00268621,"atl_change_percentage":50302.02456,"atl_date":"2014-05-22T00:00:00.000Z","roi":null,"last_updated":"2026-02-27T22:50:22.539Z"},{"id":"usd-coin","symbol":"usdc","name":"USDC","image":"https://coin-images.coingecko.com/coins/images/6319/large/USDC.png?1769615602","current_price":0.999988,"market_cap":75224778914,"market_cap_rank":6,"fully_diluted_valuation":75224814355,"total_volume":7693251441,"high_24h":1.0,"low_24h":0.999822,"price_change_24h":0.00010891,"price_change_percentage_24h":0.01089,"market_cap_change_24h":-84947016.05197144,"market_cap_change_percentage_24h":-0.1128,"circulating_supply":75227404663.70256,"total_supply":75227440106.0554,"max_supply":null,"ath":1.17,"ath_change_percentage":-14.72762,"ath_date":"2019-05-08T00:40:28.300Z","atl":0.877647,"atl_change_percentage":13.94045,"atl_date":"2023-03-11T08:02:13.981Z","roi":null,"last_updated":"2026-02-27T22:50:22.928Z"},{"id":"solana","symbol":"sol","name":"Solana","image":"https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756","current_price":81.39,"market_cap":46272226948,"market_cap_rank":7,"fully_diluted_valuation":50536655986,"total_volume":3981766230,"high_24h":88.1,"low_24h":81.1,"price_change_24h":-4.802117276895544,"price_change_percentage_24h":-5.57166,"market_cap_change_24h":-2731455329.0877,"market_cap_change_percentage_24h":-5.57398,"circulating_supply":568901886.7061346,"total_supply":621331646.0981412,"max_supply":null,"ath":293.31,"ath_change_percentage":-72.25268,"ath_date":"2025-01-19T11:15:27.957Z","atl":0.500801,"atl_change_percentage":16151.20357,"atl_date":"2020-05-11T19:35:23.449Z","roi":null,"last_updated":"2026-02-27T22:50:22.513Z"},{"id":"tron","symbol":"trx","name":"TRON","image":"https://coin-images.coingecko.com/coins/images/1094/large/tron-logo.png?1696502193","current_price":0.282681,"market_cap":26783990166,"market_cap_rank":8,"fully_diluted_valuation":26784056571,"total_volume":449115928,"high_24h":0.285687,"low_24h":0.281939,"price_change_24h":-0.002934088556810543,"price_change_percentage_24h":-1.02729,"market_cap_change_24h":-259385258.86873627,"market_cap_change_percentage_24h":-0.95915,"circulating_supply":94738524494.97679,"total_supply":94738759380.33339,"max_supply":null,"ath":0.431288,"ath_change_percentage":-34.45669,"ath_date":"2024-12-04T00:10:40.323Z","atl":0.00180434,"atl_change_percentage":15566.69176,"atl_date":"2017-11-12T00:00:00.000Z","roi":{"times":147.7792853508089,"currency":"usd","percentage":14777.92853508089},"last_updated":"2026-02-27T22:50:45.258Z"},{"id":"figure-heloc","symbol":"figr_heloc","name":"Figure Heloc","image":"https://coin-images.coingecko.com/coins/images/68480/large/figure.png?1755863954","current_price":1.048,"market_cap":16180724077,"market_cap_rank":9,"fully_diluted_valuation":16180724077,"total_volume":178314321,"high_24h":1.048,"low_24h":1.017,"price_change_24h":0.0250886,"price_change_percentage_24h":2.45242,"market_cap_change_24h":394984980,"market_cap_change_percentage_24h":2.50216,"circulating_supply":15438097551.037,"total_supply":15438097551.037,"max_supply":null,"ath":1.37,"ath_change_percentage":-23.47392,"ath_date":"2025-10-28T06:05:38.345Z","atl":0.155357,"atl_change_percentage":574.64369,"atl_date":"2025-10-31T14:27:24.456Z","roi":null,"last_updated":"2026-02-27T22:50:45.705Z"},{"id":"dogecoin","symbol":"doge","name":"Dogecoin","image":"https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png?1696501409","current_price":0.093069,"market_cap":15711524371,"market_cap_rank":10,"fully_diluted_valuation":15712369898,"total_volume":1008092551,"high_24h":0.098974,"low_24h":0.092724,"price_change_24h":-0.004025658243104455,"price_change_percentage_24h":-4.14614,"market_cap_change_24h":-672928002.9347572,"market_cap_change_percentage_24h":-4.10711,"circulating_supply":168909873126.579,"total_supply":168918963126.579,"max_supply":null,"ath":0.731578,"ath_change_percentage":-87.27839,"ath_date":"2021-05-08T05:08:23.458Z","atl":8.69e-05,"atl_change_percentage":106993.80877,"atl_date":"2015-05-06T00:00:00.000Z","roi":null,"last_updated":"2026-02-27T22:50:45.531Z"}]

**B. Consulta individual**

- Permitir consultar una cripto específica (por ID/símbolo/nombre; tú defines la estrategia y lo documentas).
- Mostrar al menos:
  - Nombre, símbolo y Logo/imagen (si está disponible)
  - Precio actual (USD)
  - Market cap
  - Variación 24h (%)
  - Última actualización (si la API la da)
- Debe manejar casos donde el usuario pide algo que no existe (“no encontré esa cripto”).

- Endpoint coingecko a usar
  - const options = {method: 'GET', headers: {'x-cg-demo-api-key': 'api-key'}};

fetch('<https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin>', options)
.then(res => res.json())
.then(res => console.log(res))
.catch(err => console.error(err));

- ## Respuesta

  - [{"id":"bitcoin","symbol":"btc","name":"Bitcoin","image":"https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400","current_price":65603,"market_cap":1308856140801,"market_cap_rank":1,"fully_diluted_valuation":1308858235424,"total_volume":43094179496,"high_24h":68116,"low_24h":65224,"price_change_24h":-2007.8751529152069,"price_change_percentage_24h":-2.96975,"market_cap_change_24h":-42061123262.118164,"market_cap_change_percentage_24h":-3.11352,"circulating_supply":19995671.0,"total_supply":19995703.0,"max_supply":21000000.0,"ath":126080,"ath_change_percentage":-47.96712,"ath_date":"2025-10-06T18:57:42.558Z","atl":67.81,"atl_change_percentage":96646.73003,"atl_date":"2013-07-06T00:00:00.000Z","roi":null,"last_updated":"2026-02-27T22:46:51.129Z"}]

> Importante: no queremos “mock data”. Debe ser consumo real de Coingecko.

---

## 2) UI principal: Chat de IA (con Tools)

La **pantalla principal** debe ser un **chat tipo asistente**.

### Flujo esperado

- El usuario escribe preguntas del estilo:
  - “¿Cuáles son las criptos más valuadas?”
  - “Muéstrame el top 10”
  - “¿A cuánto está Ethereum?”
  - “Precio de SOL”
  - “Dame info de Bitcoin”
- El chat debe llamar al modelo vía **Vercel AI Gateway** y el modelo debe poder decidir si:
  - Ejecuta la tool de “top10”
  - Ejecuta la tool de “precio/detalle”
  - O responde normalmente si la pregunta no aplica

### Tools requeridas (mínimo)

Define e implementa al menos estas 2 tools:

1. `getTop10Cryptos()`
   - Retorna la lista formateada/normalizada para renderizar (no crudo).
   - El chat debe mostrarla en UI (tabla/cards) dentro del hilo.
2. `getCryptoByQuery(query: string)`
   - Recibe un texto (ej: “eth”, “ethereum”, “btc”, “solana”).
   - Resuelve a una cripto concreta y trae sus datos.
   - Si hay ambigüedad, la tool debe devolver opciones o pedir aclaración (tu decisión, pero que sea consistente).

> Requisito clave: La IA **no** debe inventar precios. Si habla de precios, deben venir de una tool que consultó Coingecko.

---

## Requerimientos técnicos (obligatorios)

- **Next.js** (idealmente App Router).
- **TailwindCSS**.
- Buenas prácticas reales:
  - TypeScript.
  - Manejo correcto de estados: loading / error / empty.
  - Separación clara de capas (UI vs data fetching vs lógica).
  - Accesibilidad básica (labels, focus, contraste razonable).
  - Código limpio y consistente.
- Seguridad:
  - Nada de exponer secretos en el cliente (si usas llaves o gateway config, va por server).
- Performance:
  - Evitar waterfalls obvios.
  - Cache/revalidate donde tenga sentido (al menos explica tu decisión).
- Deploy:
  - Debe estar deployado (Vercel recomendado) (Yo lo hago manualmente).

---

## Alcance UI (mínimo esperado)

- Vista tipo chat con:
  - Input para el prompt
  - Historial de mensajes
  - Mensajes del “assistant”
  - Render especial para resultados de tools (cards/tabla)
  - Skeleton loaders.
- Una forma clara de identificar que el resultado vino de datos reales (ej: “Fuente: Coingecko”, timestamp, etc.)

Opcional (suma puntos si está bien hecho, no si está a medias):

- Búsqueda/autocomplete para criptos.

---

## README (obligatorio)

Debe incluir:

1. **Cómo correr el proyecto local**
   - Requisitos
   - Instalación
   - Variables de entorno
   - Comandos
2. **Arquitectura / decisiones**
   - Cómo estás consumiendo Coingecko (rutas, endpoints, normalización).
   - Cómo evitaste/waterfalls o problemas comunes.
3. **Cómo usaste IA para programar**
   - Herramienta(s) usadas (Cursor, Claude Code, ChatGPT, etc.)
   - Ejemplos concretos de prompts que usaste (2–5)
   - Qué partes generó la IA y qué corregiste tú (criterio y validación)
   - Cómo verificaste que no haya alucinaciones (especialmente en precios)
4. **Link del deploy**
   - URL pública (vercel)

## Recursos para crear la app

Para componentes usa radix ui
