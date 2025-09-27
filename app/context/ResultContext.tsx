// context/ResultContext.tsx
import { createContext, useContext } from "react";

export const ResultContext = createContext<any>(null);
export const useResult = () => useContext(ResultContext);