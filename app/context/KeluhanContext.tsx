import React, { createContext, useContext, useState } from "react";

interface KeluhanContextType {
  keluhan: string;
  setKeluhan: (text: string) => void;
}

const KeluhanContext = createContext<KeluhanContextType | undefined>(undefined);

export const KeluhanProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [keluhan, setKeluhan] = useState("");

  return (
    <KeluhanContext.Provider value={{ keluhan, setKeluhan }}>
      {children}
    </KeluhanContext.Provider>
  );
};

export const useKeluhan = () => {
  const ctx = useContext(KeluhanContext);
  if (!ctx) throw new Error("useKeluhan must be used within KeluhanProvider");
  return ctx;
};
