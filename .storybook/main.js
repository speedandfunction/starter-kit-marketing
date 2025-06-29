/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-docs"
  ],
  "framework": {
    "name": "@storybook/html-vite",
    "options": {}
  },
  "docs": {
    "autodocs": "tag"
  },
  "staticDirs": [
    {
      "from": "./assets",
      "to": "/assets"
    }
  ],
  "viteFinal": async (config) => {
    return {
      ...config,
      optimizeDeps: {
        ...config.optimizeDeps,
        exclude: ["@apostrophecms/ui"]
      }
    };
  }
};
export default config;