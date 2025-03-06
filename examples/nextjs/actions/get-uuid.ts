"use server";

import { randomUUID } from "node:crypto";
import { cache } from "react";

export async function getUuid(delay: number = 500): Promise<string> {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      reject(new Error(`delay: ${delay.toFixed(0)}`));
    }

    setTimeout(() => {
      resolve(randomUUID());
    }, delay);
  });
}

export const getUuidCached = cache(getUuid);
