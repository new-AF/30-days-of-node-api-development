import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
    resolve: {
        alias: [
            {
                find: "@",
                replacement: resolve(__dirname, "./src/"),
            },
        ],
    },
    // test: {
    //     include: ["day-7-api-testing/tests/**/*.test.ts"],
    //     globals: true,
    //     setupFiles: [resolve(__dirname, "tests/setupEnv.ts")],
    // },
});
