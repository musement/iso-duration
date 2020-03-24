import analyze from "rollup-plugin-analyzer";
import typescript from "rollup-plugin-typescript2";
import pkg from "../package.json";

export default {
  input: "src/index.ts",
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true
    }),
    analyze({ stdout: true })
  ],
  output: [
    {
      file: pkg.module,
      format: `esm`
    },
    {
      file: pkg.main,
      format: `cjs`
    }
  ]
};
