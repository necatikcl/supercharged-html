import { Component } from './components.types';
import fetchComponents from './fetchComponents';

let cache: Component[] | null = null;

const getComponents = () => {
  if (cache) return cache;

  cache = fetchComponents();
  return cache;
};

export default getComponents;
