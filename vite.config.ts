import react from "@vitejs/plugin-react";

import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/vite_react_phone-catalog/",
  plugins: [react()],
});
