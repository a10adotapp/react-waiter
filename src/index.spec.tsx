import { expect, test } from "@playwright/experimental-ct-react";
import { Waiter } from ".";

test("run as expected", async ({ mount }) => {
  const delay = async (delay: number, error?: string | undefined) => {
    return new Promise<number>((resolve, reject) => {
      setTimeout(() => {
        if (error) {
          return reject(new Error(error))
        }

        resolve(delay);
      }, delay);
    });
  };

  const component = await mount(
    <Waiter
      orders={{
        delay1000: delay(1000),
        delay2000: delay(2000),
        delayError: delay(3000, "resolve error"),
      }}
      sideshow={<div>Loading...</div>}
      serve={({
        delay1000,
        delay2000,
        delayError,
      }) => {
        return (
          <ul>
            <li id="delay-1000">{delay1000.value?.toFixed(0) || delay1000.error?.message || "delay1000"}</li>
            <li id="delay-2000">{delay2000.value?.toFixed(0) || delay2000.error?.message || "delay2000"}</li>
            <li id="delay-error">{delayError.value?.toFixed(0) || delayError.error?.message || "delayError"}</li>
          </ul>
        );
      }}
    />
  );

  await expect(component).toContainText("Loading...");
  await expect(component).not.toContainText("delay1000");
  await expect(component).not.toContainText("delay2000");
  await expect(component).not.toContainText("resolve error");

  // TODO: add test for rendering after all orders are ready
  // this is not implemented by not knowing how.
});
