import { getConfig } from '../../config';

const getComponentsDir = () => {
  const config = getConfig();

  return `${config.srcDir}/${config.componentsDir}`;
};

export default getComponentsDir;
