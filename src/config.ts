export interface Config {
  srcDir: string,
  outputDir: string,
  componentsDir: string,
  pagesDir: string
}

const DEFAULT_CONFIG: Config = {
  srcDir: 'src',
  outputDir: 'dist',
  componentsDir: 'components',
  pagesDir: 'pages',
};

let config: Config = DEFAULT_CONFIG;

const setConfig = (value: Config) => {
  config = { ...DEFAULT_CONFIG, ...value };
};

const getConfig = () => config;

export { setConfig, getConfig };
