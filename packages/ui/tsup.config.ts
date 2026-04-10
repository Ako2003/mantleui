import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/three.ts", "src/motion.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: [
    "react",
    "react-dom",
    "three",
    "@react-three/fiber",
    "@react-three/drei",
    "framer-motion",
  ],
});
