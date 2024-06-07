import { makeVar, useReactiveVar } from "@apollo/client";

export const countVar = makeVar(100);

export function useCounter() {
  return useReactiveVar(countVar);
}
