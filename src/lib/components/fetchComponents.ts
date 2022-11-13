import fs from 'fs';

import { Component } from './components.types';
import getComponentsDir from './getComponentsDir';
import renderComponent from './renderComponent';

const fetchComponents = () => {
  const componentsDir = getComponentsDir();
  const componentFilePaths = fs.readdirSync(componentsDir);

  const components: Component[] = [];

  componentFilePaths.forEach((componentFilePath) => {
    const componentFile = fs.readFileSync(`${componentsDir}/${componentFilePath}`, 'utf-8');
    const componentName = componentFilePath.replace('.html', '');

    components.push({
      tag: componentName,
      render: (attributes) => renderComponent({
        componentHTML: componentFile,
        attributes,
      }),
    });
  });

  return components;
};

export default fetchComponents;
