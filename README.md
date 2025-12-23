<div>
  <h1>mfe-runtime-z</h1>
  <p>Framework-agnostic micro-frontend runtime</p>
  <a href="https://codesandbox.io/p/sandbox/c57cwd" target="_blank">LIVE EXAMPLE</a>
</div>

---


[![NPM](https://img.shields.io/npm/v/mfe-runtime-z.svg)](https://www.npmjs.com/package/mfe-runtime-z)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![Downloads](https://img.shields.io/npm/dt/mfe-runtime-z.svg)

---

### Description

**mfe-runtime-z** is a lightweight, framework-agnostic **micro-frontend runtime**.

It provides the minimal building blocks needed to run multiple independent frontend applications (micro-frontends) together **at runtime**, without coupling them through framework internals or build-time federation.

This library focuses on **application-level integration**, not component sharing.

#### What it solves

- Load and mount remote applications dynamically
- Isolate application lifecycles (mount/unmount/reload) ✅ via Shadow DOM
- Share state safely between apps
- Synchronize routing without sharing router instances
- Communicate via a central event bus
- Work with **any framework** (React, Vue, Svelte, Vanilla JS...)

---

### Installation

```bash
npm install mfe-runtime-z
# or
yarn add mfe-runtime-z
```

---

### Core Concepts

##### Host-driven architecture

- Each micro-frontend is an **independent app**
- The host coordinates loading, routing, and shared services
- No direct imports between micro-frontends

##### Runtime contract

Micro-frontends expose a simple runtime contract:

```ts
window.myRemoteApp = { mount(el, ctx), unmount(el) }
```

- No framework or bundler assumptions.
- Compatible with React, Vue, Vanilla JS

---

### Usage

##### Host application

```ts
import { MFEHost, createSharedStore } from "mfe-runtime-z"

// shared store example
const authStore = createSharedStore({ user: null })

// create host with isolate: true for Shadow DOM + error isolation
const host = new MFEHost({
  stores: { auth: authStore },
  navigate: (path) => history.pushState({}, "", path),
  isolate: false, // => shadow
  onRemoteError: (err) => console.error("Remote error:", err)
})

// load remote apps
const productRemote = await host.load("http://localhost:3001/remote.js", "productApp")
const cartRemote = await host.load("http://localhost:3002/remote.js", "cartApp")

// mount remotes into host container divs
host.mount(productRemote, document.getElementById("product-root")!, "productApp", { isolate: true }) // shadow
host.mount(cartRemote, document.getElementById("cart-root")!, "cartApp")

// // Unmount Shadow DOM remote
// host.unmount(productRemote, document.getElementById("product-root")!, "productApp")
// // Unmount normal remote
// host.unmount(cartRemote, document.getElementById("cart-root")!, "cartApp")

```

##### Remote application (framework-agnostic)

```ts
export function mount(el: ShadowRoot) {
  let count = 0
  const div = document.createElement("div")
  const btn = document.createElement("button")
  const p = document.createElement("p")
  btn.textContent = "Add Item"
  p.textContent = count.toString()
  btn.onclick = () => (p.textContent = (++count).toString())
  div.appendChild(btn)
  div.appendChild(p)
  el.appendChild(div)
}

export function unmount(el: ShadowRoot) {
  el.innerHTML = ""
}

;(window as any).cartApp = { mount, unmount }
```

##### Remote app (framework-react-library)

```ts
import React from "react"
import ReactDOM from "react-dom/client"

type AuthStore = {
  user: { id: string; name: string } | null
  subscribe: (cb: (state:any)=>void)=>void
  setState: (s:any)=>void
}

function App({ store }: { store: AuthStore }) {
  const [user, setUser] = React.useState(store.user)
  React.useEffect(() => {
    const unsub = store.subscribe((state:any) => setUser(state.user))
    return () => unsub?.()
  }, [store])
  return (
    <div>
      {user ? <span>Hello {user.name}</span> : <button onClick={()=>store.setState({user:{id:"1",name:"Alice"}})}>Login</button>}
    </div>
  )
}

// mount/unmount compatible with Shadow DOM
export function mount(el: HTMLElement | ShadowRoot, ctx: { stores: { auth: AuthStore } }) {
  const root = ReactDOM.createRoot(el as unknown as HTMLElement)
  ;(el as any)._reactRoot = root
  root.render(<App store={ctx.stores.auth} />)
}

export function unmount(el: HTMLElement | ShadowRoot) {
  const root = (el as any)._reactRoot
  if (root) root.unmount()
  el.innerHTML = ""
}

;(window as any).productApp = { mount, unmount }
```

---

### Shared State

```ts
const store = createSharedStore({ count: 0 })
store.subscribe((state) => console.log(state.count))
store.setState({ count: 1 })
```

- Push-based, no Redux, no shared framework state

---

### Router Synchronization

```ts
import { createSharedRouter } from "mfe-runtime-z"

const router = createSharedRouter(ctx)
router.go("/cart")
router.onChange((path) => console.log("navigated to", path))

```

- Intent-based navigation
- Host owns the URL
- No shared router instances

---

### How remote applications are built

Remote applications only need to build a single JavaScript file. No Module Federation required.
- What a remote must provide
- Build a browser-loadable file (e.g. remote.js)
- Expose itself on window
- Implement mount / unmount
- Minimal remote build (Vite)


```ts
// vite.config.ts
export default {
  build: {
    lib: {
      entry: "src/index.ts",
      name: "productApp",
      formats: ["umd"],
      fileName: () => "remote.js",
    },
  },
}

// src/index.ts
import { mount, unmount } from "./app"

// see above
;(window as any).productApp = { mount, unmount }
```

👉 Copy-paste ✅: minimal remote build, browser-loadable, no Module Federation.

---

#### Dev HMR section

###### Host dev reload
```js
import { MFEHost } from "mfe-runtime-z"
import { createMFEReloadServer } from "mfe-runtime-z/dev"

// Initialize the MFE host runtime
const host = new MFEHost()

// Create a dev reload server to automatically reload remote apps on changes
const startDevReload = createMFEReloadServer(host, {
  productApp: {
    url: "http://localhost:3001/remote.js", // URL of the remote JS file
    global: "productApp",                   // Name of the global mount/unmount object exposed by remote
    el: () => document.getElementById("product-root")!, // DOM container to mount the remote
  },
})

// Only start the dev reload server in development mode
if (process.env.NODE_ENV === "development") {
  startDevReload()
}

```

###### Remote dev notify.
```ts
// Only run in development
if (import.meta.env.DEV) {
  // Connect to the host's WebSocket dev reload server
  const ws = new WebSocket("ws://localhost:3000/__mfe_reload")

  // Accept HMR updates from Vite
  import.meta.hot?.accept(() => {
    // Notify the host that this remote app has changed and should be reloaded
    ws.send(JSON.stringify({ type: "RELOAD", name: "productApp" }))
  })
}
```

✅ Summary of Comments

- Host side: sets up a WebSocket-based dev reload server that listens for changes from remotes and automatically reloads them without refreshing the host page.

- Remote side: connects to host WebSocket and sends a message when HMR triggers (code changed), so the host can remount the updated remote.

- Purpose: smooth dev experience for micro-frontends, framework-agnostic, avoids full page reload.

---

### Features

- Framework-agnostic micro-frontend runtime
- Dynamic remote loading
- Safe lifecycle management
- Central event bus
- Shared state with subscriptions
- Router synchronization
- Hot reload support for remote apps
- Shadow DOM + error isolation (optional via isolate: true)
- No build-time federation required

---

### What this library is NOT

- ❌ Not a UI component library
- ❌ Not a replacement for React/Vue routers
- ❌ Not a build-time module federation tool

---

### Micro-Frontend Runtime Comparison

| Feature / Lib                       | **mfe-runtime-z**  | Module Federation (Webpack 5)   | single-spa       | qiankun          |
| ----------------------------------- | -------------------| ------------------------------- | ---------------- | ---------------- |
| **Framework-agnostic**              | ✅ Yes             | ❌ Mostly Webpack/JS            | ✅ Yes            | ✅ Yes           |
| **Runtime loading**                 | ✅ Yes             | ❌ Build-time federation only   | ✅ Yes            | ✅ Yes           |
| **Shadow DOM support**              | ✅ Optional        | ❌ Not built-in                 | ❌ Not built-in   | ✅ Partial       |
| **Shared state / EventBus**         | ✅ Yes             | ❌ Requires external            | ✅ Yes            | ✅ Yes           |
| **Dynamic mount/unmount**           | ✅ Yes             | ❌ Build-time                   | ✅ Yes            | ✅ Yes           |
| **Dev HMR support**                 | ✅ Yes             | ❌ Limited                      | ⚠️ Needs plugin   | ⚠️ Needs plugin  |
| **Bundle size**                     | 🟢 Lightweight     | ⚠️ Depends on Webpack setup     | 🟡 Medium         | 🟡 Medium        |
| **Learning curve**                  | 🟢 Simple          | ⚠️ Medium                       | ⚠️ Medium         | ⚠️ Medium        |
| **Build-time federation required?** | ❌ No              | ✅ Yes                          | ❌ No             | ❌ No            |

---

### License

MIT
