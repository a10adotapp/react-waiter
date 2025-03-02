<img src="assets/image.jpg" alt="react-waiter" width="500" height="273">

![NPM Version](https://img.shields.io/npm/v/%40a10adotapp%2Freact-waiter)

# React Waiter

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
    <Waiter
      orders={{
        getUserResult: getUser(),
      }}
      sideshow={<div>Loading...</div>}
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
