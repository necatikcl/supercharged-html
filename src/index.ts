import fs from 'fs';
import { parse } from 'node-html-parser';

import { Config, getConfig, setConfig } from './config';
import renderChildComponents from './lib/components/renderChildComponents';

const getPageElement = () => {
  const config = getConfig();

  const pageContent = fs.readFileSync(`${config.srcDir}/${config.pagesDir}/index.html`, 'utf-8');

  return parse(pageContent);
};

const renderPage = (config: Config) => {
  setConfig(config);

  const pageElement = getPageElement();

  renderChildComponents({ element: pageElement });

  fs.writeFileSync(`${config.outputDir}/index.html`, pageElement.toString());
};

export default renderPage;
