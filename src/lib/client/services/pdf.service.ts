/**
 * PDF Service - Handles all PDF generation API operations
 * Provides methods to generate personalized monthly reflection diaries
 */

export interface DiaryContent {
  questions: string[];
  monthlyMantra: string;
  weeklyFocus: string[];
}

export interface ChatGptLink {
  id: string;
  userId: string;
  url: string;
  title: string;
  createdAt: string;
}

export interface PdfGenerationRequest {
  month: number;
  year: number;
  content: DiaryContent;
  chatgptLinks?: ChatGptLink[];
}

export interface PdfGenerationResponse {
  success: boolean;
  message: string;
  error?: string;
}

export class PdfService {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  /**
   * Generate a PDF diary with custom content
   * Sends diary data to server and prepares PDF for download
   */
  async generateDiary(request: PdfGenerationRequest): Promise<PdfGenerationResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/generate-pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          month: request.month,
          year: request.year,
          content: request.content,
          chatgptLinks: request.chatgptLinks || []
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        message: data.message || 'PDF generated successfully'
      };
    } catch (error) {
      console.error('Error generating PDF:', error);
      return {
        success: false,
        message: 'Failed to generate PDF',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Download the generated PDF file
   * Must be called after generateDiary() succeeds
   */
  async downloadPdf(month: number, year: number): Promise<boolean> {
    try {
      const params = new URLSearchParams({
        month: month.toString(),
        year: year.toString(),
        from_review: 'true'
      });

      const response = await fetch(`${this.baseUrl}/generate-pdf?${params}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Failed to download PDF: ${response.status}`);
      }

      // Create blob from response
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `reflection-diary-${year}-${month.toString().padStart(2, '0')}.pdf`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      window.URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error('Error downloading PDF:', error);
      return false;
    }
  }

  /**
   * Complete PDF generation flow - generate and download in one call
   * Convenience method that combines generateDiary() and downloadPdf()
   */
  async generateAndDownload(request: PdfGenerationRequest): Promise<{
    success: boolean;
    message: string;
    error?: string;
  }> {
    // First, generate the PDF content
    const generateResult = await this.generateDiary(request);
    
    if (!generateResult.success) {
      return generateResult;
    }

    // Then download the PDF
    const downloadSuccess = await this.downloadPdf(request.month, request.year);
    
    if (!downloadSuccess) {
      return {
        success: false,
        message: 'PDF was generated but download failed',
        error: 'Download error'
      };
    }

    return {
      success: true,
      message: 'PDF generated and downloaded successfully'
    };
  }

  /**
   * Fetch user's ChatGPT links for inclusion in PDF
   */
  async getUserLinks(): Promise<ChatGptLink[]> {
    try {
      const response = await fetch(`${this.baseUrl}/links`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch links: ${response.status}`);
      }

      const data = await response.json();
      return data.links || [];
    } catch (error) {
      console.error('Error fetching user links:', error);
      return [];
    }
  }

  /**
   * Process ChatGPT conversation URLs
   * Validates and processes ChatGPT URLs for diary integration
   */
  async processChats(urls: string[]): Promise<{
    status: 'ok' | 'error';
    message?: string;
    invalidUrls?: string[];
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/process-chats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error processing chats:', error);
      return {
        status: 'error',
        message: error instanceof Error ? error.message : 'Failed to process chats'
      };
    }
  }

  /**
   * Validate PDF generation request data
   */
  private validateRequest(request: PdfGenerationRequest): string[] {
    const errors: string[] = [];

    if (!request.month || request.month < 1 || request.month > 12) {
      errors.push('Month must be between 1 and 12');
    }

    if (!request.year || request.year < 2000 || request.year > 2100) {
      errors.push('Year must be between 2000 and 2100');
    }

    if (!request.content) {
      errors.push('Content is required');
    } else {
      if (!request.content.questions || request.content.questions.length === 0) {
        errors.push('Questions are required');
      }
      if (!request.content.monthlyMantra) {
        errors.push('Monthly mantra is required');
      }
    }

    return errors;
  }

  /**
   * Generate diary with validation
   * Validates request before sending to server
   */
  async generateDiaryWithValidation(request: PdfGenerationRequest): Promise<PdfGenerationResponse> {
    const validationErrors = this.validateRequest(request);
    
    if (validationErrors.length > 0) {
      return {
        success: false,
        message: 'Validation failed',
        error: validationErrors.join(', ')
      };
    }

    return this.generateDiary(request);
  }
}

// Export a default instance for convenience
export const pdfService = new PdfService();