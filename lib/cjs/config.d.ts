export interface Config {
    srcDir: string;
    outputDir: string;
    componentsDir: string;
    pagesDir: string;
}
declare const setConfig: (value: Config) => void;
declare const getConfig: () => Config;
export { setConfig, getConfig };
