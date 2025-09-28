import { createContext, ReactNode, useContext, useState } from "react";

interface DataDiri {
  namaLengkap: string;
  email: string;
  nomorTelepon: string;
  alamat: string;
  tanggalLahir: string;
  nomorPolis: string;
  jenisLayanan: string;
  jenisRekening: string;
  keluhan: string;
}

interface DataDiriContextType {
  dataDiri: DataDiri;
  setDataDiri: (data: Partial<DataDiri>) => void;
  resetDataDiri: () => void;
}

const defaultData: DataDiri = {
  namaLengkap: "",
  email: "",
  nomorTelepon: "",
  alamat: "",
  tanggalLahir: "",
  nomorPolis: "",
  jenisLayanan: "",
  jenisRekening: "",
  keluhan: "",
};

const DataDiriAsuransiContext = createContext<DataDiriContextType | undefined>(
  undefined
);

export function DataDiriAsuransiProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [dataDiri, setDataDiriState] = useState<DataDiri>(defaultData);

  const setDataDiri = (data: Partial<DataDiri>) => {
    setDataDiriState((prev) => ({ ...prev, ...data }));
  };

  const resetDataDiri = () => {
    setDataDiriState(defaultData);
  };

  return (
    <DataDiriAsuransiContext.Provider
      value={{ dataDiri, setDataDiri, resetDataDiri }}
    >
      {children}
    </DataDiriAsuransiContext.Provider>
  );
}

export function useDataDiriAsuransi() {
  const context = useContext(DataDiriAsuransiContext);
  if (!context) {
    throw new Error(
      "useDataDiriAsuransi must be used within a DataDiriAsuransiProvider"
    );
  }
  return context;
}
