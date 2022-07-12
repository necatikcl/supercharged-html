[![NPM Status](https://img.shields.io/npm/v/@craco/craco.svg)](https://www.npmjs.com/package/supercharged-html)
# Supercharged HTML
Pure HTML files with statically rendering components.

#### What is the use of it?
In traditional HTML, you cannot split HTML codes into multiple files. If you want to update header component, you must also update the other 10+ page files. `supercharged-html` gives you the opportunity to make **static HTML components.**

Most of the features are inspired from VueJS.

#### What is "static components"
Unlike Vue or React components, static components cannot be updated in runtime, so only use of them is to split HTML codes in order to reduce complexity of a single page file.

For an example; lets say you have a button element, which basically includes a content, icon and a text.
```js
<button class="button">
  <span class="button-content">
    <svg class="button-icon"></svg>
    Button
  </span>
</button>
```
If you want to use it, you must copy and paste this HTML code to everywhere you use the button.

In `supercharged-html`, you can create a `components/button.html`:
```js
<button class="button">
  <span class="button-content">
    <slot name="icon" class="button-icon"></slot>
    <slot></slot>
  </span>
</button>
```  
Now, you can just use it like:
```js
<s-button>
  <template #icon>
    <svg></svg>
  </template>
  Button
</s-button>
```

The slot functionality of `supercharged-html` is similar to [VueJS slots](https://vuejs.org/guide/components/slots.html). One difference is, you cannot pass attributes to slots in Vue, but `supercharged-html` does. 

```html
<!-- component -->
<div>
  <slot></slot>
  <slot name="slotName" class="slot-name"></slot>
  <slot name="otherSlotName"></slot>
</div>

<!-- page -->
<s-component>
  Default slot
  <template #slotName>
    <div>slotName</div>
  </template>
  <template name="otherSlotName">
    otherSlotName
  </template>
</s-component>

<!-- output -->
<div>
  Default slot
  <div class="slotName">slotName</div>
  otherSlotName
</div>
```

## Get started
To get started, you need to install `supercharged-html`:

<sub>
  <sup>
    NPM
  </sub>
</sup>
```bash
npm install supercharged-html --dev
```

<sub>
  <sup>
    YARN
  </sub>
</sup>
```bash
yarn add -D supercharged-html
```

Now, you can add these scripts:
```json
{
  "scripts": {
    "dev": "supercharged-html",
    "build": "supercharged-html build"
  }
}
```

`dev` command can be used for watching HTML files and rebuilding them when they are changed.

`build` command can be used for building the HTML files, it also beautifies the output files.

## Page structure

Before running the scripts, you **must** have these directories:
```js
- src
--- pages
--- components
```

<sub>
  <sup>
    Currently, there is no way to change directories.
  </sub>
</sup>

#### /src/components
- All the files in `components` directory will be regarded as a "component" and won't be seen as an individual file in `dist`.
- In order to use a component, you should use the "s" prefix: `<s-{componentName}>`
- Each component tag must be closed:
```html
<!-- INVALID -->
<s-button>

<!-- INVALID -->
<s-button />

<!-- VALID -->
<s-button></s-button>
```
- Each component file must have a single root **element**.

#### /src/pages
- All the files in `pages` directory will be regarded as a "page" and will be compiled onto `dist` folder.
- Pages cannot be nested (for example, you cannot have a `src/pages/shop/single-product.html` file).

## Component props
Like Vue, you can pass props to components.
- The use of props is also similar to VueJS, you can use a prop like `{{ propName }}`
- If you don't use the passed props in template, it will be passed as an HTML attribute. For example:
```html
<!-- component -->
<button>
  Button
</button>

<!-- page -->
<s-button label="title"></s-button>

<!-- output -->
<button label="title">Button</button>
```
But if you use a prop in template, it won't be passed as an HTML attribute.
```html
<!-- component -->
<button>
  {{ label }}
</button>

<!-- page -->
<s-button label="title"></s-button>

<!-- output -->
<button>title</button>
```
- (soon) Inside brackets you can use Javascript expressions, like `{{ propName === "case" ? "case1": "case2" }}`

## Examples
Simple component
```html
<!-- component -->
<button class="button button-{{size}} button-{{type}} button-{{theme}}">
  <div class="button-content">
    <slot></slot>
  </div>
</button>

<!-- page -->
<s-button
  size="small" 
  type="outline" 
  theme="secondary"
>
  Button
</s-button>

<!-- output -->
<button class="button button-small button-outline button-secondary">
  <div class="button-content">Button</div>
</button>
```

A layout (for sharing the style and script imports)
```html
<!-- component -->
<html>
  <head>
    <title>{{ title }}</title>
    <link rel="stylesheet" href="assets/main.css">
  </head>
  <body>
    <slot></slot>

    <script src="assets/main.js"></script>
  </body>
</html>


<!-- page -->
<s-layout title="Login page">
  Login to your account
  <s-login-form></s-login-form>
</s-layout>

<!-- output -->
<html>
  <head>
    <title>Login page</title>
    <link rel="stylesheet" href="assets/main.css">
  </head>
  <body>
    Login to your account
    <form class="login-form"></form>

    <script src="assets/main.js"></script>
  </body>
</html>
```