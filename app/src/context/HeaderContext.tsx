// HeaderContext.tsx
import { createContext, useContext } from "react";

export const HeaderContext = createContext<{ hasBack: boolean }>({
  hasBack: false,
});

export function useHeader() {
  return useContext(HeaderContext);
}
