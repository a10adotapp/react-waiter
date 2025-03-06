import { ReactElement, Suspense } from "react";

/**
 * props accepted by {@link Waiter}.
 */
export type WaiterProps<T> = ChefProps<T> & {
  /**
   * fallback component shown until all orders get ready
   */
  sideshow?: ReactElement | undefined;
}

/**
 * wait until all orders are ready
 * 
 * @example
 * 
 * ```tsx
 * import { Waiter } from "@a10adotapp/react-waiter";
 * 
 * async function getUser(): Promise<{ name: string }> {
 *   "use server";
 * 
 *   return new Promise((resolve) => {
 *     setTimeout(() => {
 *       resolve({
 *         name: "John Doe",
 *       });
 *     }, 500);
 *   });
 * }
 * 
 * export async function ComponentSample() {
 *   return (
 *     <Waiter
 *       orders={{
 *         getUserResult: getUser(),
 *       }}
 *       sideshow={<div>Loading...</div>}
 *       serve={({
 *         getUserResult,
 *       }) => (
 *         <p>{getUserResult.value?.name || getUserResult.error?.message || "-"}</p>
 *       )} />
 *   );
 * }
 * ```
 */
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

/**
 * error thrown when failed to resolve order
 */
export interface OrderResolveError extends Error {
  reason: PromiseRejectedResult["reason"];
}

/**
 * props accepted by {@link Chef}.
 */
export type ChefProps<T extends {
  [K in keyof T]: T[K];
}> = {
  /**
   * orders to be resolved
   */
  orders: {
    [K in keyof T]: Promise<T[K]>;
  };

  /**
   * run when all orders are ready
   */
  serve: (arg0: {
    [K in keyof T]: {
      value?: T[K] | undefined;
      error: OrderResolveError | null;
    };
  }) => ReactElement;
};

/**
 * accept orders and serve dishes
 */
export async function Chef<T>({
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
        let message = "failed to resolve order";

        if (resolvedOrder.reason instanceof Error) {
          message = resolvedOrder.reason.message;
        }

        result[key] = {
          error: {
            name: "OrderResolveError",
            message,
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
