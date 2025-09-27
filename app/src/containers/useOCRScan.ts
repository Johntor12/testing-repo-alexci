interface OCRResult {
  text: string;
  confidence: number;
  fields?: {
    [key: string]: string;
  };
}

interface OCRScanOptions {
  documentType?: 'insurance_card' | 'medical_document' | 'generic';
  language?: string;
}

export const useOCRScan = () => {
  const scanDocument = async (_imageUri: string, _options?: OCRScanOptions): Promise<OCRResult> => {
    // Placeholder implementation
    // In a real implementation, this would integrate with an OCR service
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          text: 'Sample OCR text',
          confidence: 0.95,
          fields: {
            memberNumber: '123456789',
            groupNumber: 'ABC123',
          },
        });
      }, 1000);
    });
  };

  const scanInsuranceCard = async (imageUri: string): Promise<OCRResult> => {
    return scanDocument(imageUri, { documentType: 'insurance_card' });
  };

  return {
    scanDocument,
    scanInsuranceCard,
  };
};