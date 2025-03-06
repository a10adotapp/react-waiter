# examples/nextjs

![スクリーンショット 2025-03-06](https://github.com/user-attachments/assets/2036ded9-c829-463a-b348-42fb43f0e4cf)

https://github.com/user-attachments/assets/b95b487e-630c-4343-9404-6480f513d235

You can use react's [`cache`](https://react.dev/reference/react/cache) api.

It means you do never need to:

```jsx
export default async function Page() {
  const user = await fetchUser();

  return (
    // fetch user data in page component and cascade it into child components.
    <User user={user} />

    <Calendar user={user}>
  );
}
```

With `<Waiter>` component, you can:

```jsx
export default async function Page() {
  return (
    // just place component
    <User />

    <Calendar />
  );
}
```

and

```jsx
export function User() {
  return (
    // just use Waiter in each component.
    <Waiter
      orders={{
        fetchUserResult: fetchUserCached(),
      }}
      serve={({
        fetchUserResult,
      }) => (
        <div>{user.name}</div>
      )}
    />
  );
}
```

```jsx
export function Calendar() {
  return (
    // data fetching will not be to called twice if cached.
    <Waiter
      orders={{
        fetchUserResult: fetchUserCached(),
      }}
      serve={({
        fetchUserResult,
      }) => (
        <div>{user.name}'s schedule here!</div>
      )}
    />
  );
}
```
