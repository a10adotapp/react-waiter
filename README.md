# React Waiter

![NPM Version](https://img.shields.io/npm/v/%40a10adotapp%2Freact-waiter)
![NPM Downloads](https://img.shields.io/npm/dy/%40a10adotapp%2Freact-waiter)

[![Lint and Test](https://github.com/a10adotapp/react-waiter/actions/workflows/ci.yml/badge.svg)](https://github.com/a10adotapp/react-waiter/actions/workflows/ci.yml)

<img src="assets/image.jpg" alt="react-waiter" width="500" height="273">

a react component to resolve promises

```tsx
import { Waiter } from "@a10adotapp/react-waiter";

async function getUser(): Promise<{ name: string }> {
  "use server";

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "John Doe",
      });
    }, 500);
  });
}

export async function ComponentSample() {
  return (
    // use <Waiter> component when you want to render components after some promises are resolved.
    <Waiter
      // pass promises with keys
      orders={{
        getUserResult: getUser(),
      }}
      // sideshow component is shown until all orders are ready
      sideshow={<div>Loading...</div>}
      // serve will called when all orders are ready
      // resolved values are passed with order key
      serve={({
        getUserResult,
      }) => (
        <p>{getUserResult.value?.name || getUserResult.error?.message || "-"}</p>
      )} />
  );
}
```

## Usage

```shell
npm install @a10adotapp/react-waiter
```

## Props

| Prop | Description |
| :-- | :-- |
| `orders` | promises to resolve |
| `serve` | called when all promises are resolved |
| `sideshow` | fallback component shown until all promises resolved |

## Links

- npm
    - https://www.npmjs.com/package/@a10adotapp/react-waiter
- GitHub
    - https://github.com/a10adotapp/react-waiter
- Storybook
    - https://a10adotapp.github.io/react-waiter/
