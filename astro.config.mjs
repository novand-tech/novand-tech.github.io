import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Safe wrapper around @tailwindcss/vite to prevent crashes when HMR is disabled
// or when running in SSR/server environment where environment.hot is undefined.
function safeTailwind() {
  const plugins = tailwindcss();
  for (const plugin of plugins) {
    if (plugin && typeof plugin.hotUpdate === 'function') {
      const origHotUpdate = plugin.hotUpdate;
      plugin.hotUpdate = function (options) {
        if (this?.environment && (!this.environment.hot || typeof this.environment.hot.send !== 'function')) {
          this.environment.hot = { send: () => {} };
        }
        if (options?.server) {
          if (!options.server.hot || typeof options.server.hot.send !== 'function') {
            options.server.hot = { send: () => {} };
          }
          if (!options.server.ws || typeof options.server.ws.send !== 'function') {
            options.server.ws = { send: () => {} };
          }
        }
        try {
          return origHotUpdate.call(this, options);
        } catch (err) {
          if (err instanceof TypeError && err.message?.includes('send')) {
            return [];
          }
          throw err;
        }
      };
    }
  }
  return plugins;
}

// Safe Vite client transform plugin to guard against ws being undefined in sandboxed iframes
function safeViteClient() {
  return {
    name: 'safe-vite-client',
    enforce: 'post',
    transform(code, id) {
      if (id && (id.includes('vite/dist/client/client.mjs') || id.includes('/@vite/client'))) {
        return code
          .replace(
            'ws.send(JSON.stringify(data));',
            'if (typeof ws !== "undefined" && ws && typeof ws.send === "function" && ws.readyState === ws.OPEN) { ws.send(JSON.stringify(data)); }'
          )
          .replace(
            'wsTransport.send(data);',
            'if (typeof wsTransport !== "undefined" && wsTransport && typeof wsTransport.send === "function") { try { wsTransport.send(data); } catch(e){} }'
          );
      }
      return null;
    },
  };
}

export default defineConfig({
  site: 'https://novand-tech.com',
  devToolbar: {
    enabled: false,
  },
  integrations: [react()],
  vite: {
    plugins: [safeTailwind(), safeViteClient()],
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
