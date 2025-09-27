// contexts/ScanContext.tsx
import { createContext, ReactNode, useContext, useState } from "react";

type ScanResult = any; // bisa diganti sesuai struktur API

interface ScanContextType {
  // ============================
  // KTP
  // ============================
  resultKtp: ScanResult | null;
  setResultKtp: (res: ScanResult | null) => void;
  imageUriKtp: string | null;
  setImageUriKtp: (uri: string | null) => void;

  // ============================
  // Asuransi
  // ============================
  resultAsuransi: ScanResult | null;
  setResultAsuransi: (res: ScanResult | null) => void;
  imageUriAsuransi: string | null;
  setImageUriAsuransi: (uri: string | null) => void;

  // ============================
  // Invoicers
  // ============================
  resultInvoicers: ScanResult | null;
  setResultInvoicers: (res: ScanResult | null) => void;
  imageUriInvoicers: string | null;
  setImageUriInvoicers: (uri: string | null) => void;

  // ============================
  // Diagnosis
  // ============================
  resultDiagnosis: ScanResult | null;
  setResultDiagnosis: (res: ScanResult | null) => void;
  imageUriDiagnosis: string | null;
  setImageUriDiagnosis: (uri: string | null) => void;
}

const ScanContext = createContext<ScanContextType | undefined>(undefined);

export default function ScanProvider({ children }: { children: ReactNode }) {
  const [resultKtp, setResultKtp] = useState<ScanResult | null>(null);
  const [imageUriKtp, setImageUriKtp] = useState<string | null>(null);

  const [resultAsuransi, setResultAsuransi] = useState<ScanResult | null>(null);
  const [imageUriAsuransi, setImageUriAsuransi] = useState<string | null>(null);

  const [resultInvoicers, setResultInvoicers] = useState<ScanResult | null>(
    null
  );
  const [imageUriInvoicers, setImageUriInvoicers] = useState<string | null>(
    null
  );

  const [resultDiagnosis, setResultDiagnosis] = useState<ScanResult | null>(
    null
  );
  const [imageUriDiagnosis, setImageUriDiagnosis] = useState<string | null>(
    null
  );

  return (
    <ScanContext.Provider
      value={{
        resultKtp,
        setResultKtp,
        imageUriKtp,
        setImageUriKtp,

        resultAsuransi,
        setResultAsuransi,
        imageUriAsuransi,
        setImageUriAsuransi,

        resultInvoicers,
        setResultInvoicers,
        imageUriInvoicers,
        setImageUriInvoicers,

        resultDiagnosis,
        setResultDiagnosis,
        imageUriDiagnosis,
        setImageUriDiagnosis,
      }}
    >
      {children}
    </ScanContext.Provider>
  );
}

export function useScan() {
  const ctx = useContext(ScanContext);
  if (!ctx) throw new Error("useScan must be used within ScanProvider");
  return ctx;
}
