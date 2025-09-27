import React, { createContext, ReactNode, useContext } from "react";

interface AccessibilityContextType {
  isVoiceModeEnabled: boolean;
  toggleVoiceMode: () => void;
  fontSize: "small" | "medium" | "large";
  setFontSize: (size: "small" | "medium" | "large") => void;
}

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

interface AccessibilityContextProviderProps {
  children: ReactNode;
}

export const AccessibilityContextProvider: React.FC<
  AccessibilityContextProviderProps
> = ({ children }) => {
  const [isVoiceModeEnabled, setIsVoiceModeEnabled] = React.useState(false);
  const [fontSize, setFontSize] = React.useState<"small" | "medium" | "large">(
    "medium"
  );

  const toggleVoiceMode = () => {
    setIsVoiceModeEnabled(!isVoiceModeEnabled);
  };

  const value: AccessibilityContextType = {
    isVoiceModeEnabled,
    toggleVoiceMode,
    fontSize,
    setFontSize,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityContextProvider"
    );
  }
  return context;
};

export default AccessibilityContextProvider;
