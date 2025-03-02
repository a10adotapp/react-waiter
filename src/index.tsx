import { ReactElement, Suspense } from "react";

type WaiterProps<T> = ChefProps<T> & {
  sideshow?: ReactElement | undefined;
}

export function Waiter<T>({
  orders,
  serve,
  sideshow,
}: WaiterProps<T>) {
  return (
    <Suspense fallback={sideshow}>
      <Chef orders={orders} serve={serve} />
    </Suspense>
  );
}

interface OrderResolveError extends Error {
  reason: PromiseRejectedResult["reason"];
}

type ChefProps<T extends {
  [K in keyof T]: T[K];
}> = {
  orders: {
    [K in keyof T]: Promise<T[K]>;
  };
  serve: (arg0: {
    [K in keyof T]: {
      value?: T[K] | undefined;
      error: OrderResolveError | null;
    };
  }) => ReactElement;
};

async function Chef<T>({
  orders,
  serve,
}: ChefProps<T>) {
  const cook = async () => {
    const keys = Object.keys(orders) as (keyof T)[];
    const promises = keys.map(key => orders[key]);
    const resolvedOrders = await Promise.allSettled(promises);
    const emptyDishes = {} as Parameters<ChefProps<T>["serve"]>[0];

    return keys.reduce((result, key, index) => {
      const resolvedOrder = resolvedOrders[index];

      if (resolvedOrder.status === "fulfilled") {
        result[key] = {
          value: resolvedOrder.value,
          error: null,
        }
      } else {
        result[key] = {
          error: {
            name: "DataCollectorResolveError",
            message: "failed to resolve order",
            reason: resolvedOrder.reason,
          },
        };
      }

      return result;
    }, emptyDishes);
  };

  const dishes = await cook();

  return serve(dishes);
}
