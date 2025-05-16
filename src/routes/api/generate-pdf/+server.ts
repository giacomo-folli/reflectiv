import { DateTime } from "luxon";
import { jsPDF } from "jspdf";
import { error, json, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { mockGeneratePdfResponse } from "$lib/mock-data";
import { generateMockReflectionContent } from "$lib/mock-diary-content";

/**
 * Generate a PDF document with reflection questions for each day of the month
 * @param {number} month - Month (1-12)
 * @param {number} year - Year (e.g., 2025)
 * @param {object} userData - User data for personalization
 * @param {object} diaryContent - Content for the diary (questions, mantra, focus areas)
 * @returns {Uint8Array} - PDF file as a byte array
 */
function generateDiary(month: number, year: number, userData: any, diaryContent: any) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  // Format month name and determine days in month
  const monthDate = DateTime.local(year, month);
  const monthName = monthDate.toFormat("MMMM");
  const daysInMonth = monthDate.daysInMonth;

  // Set font styles
  doc.setFont("helvetica");

  // Add cover page
  doc.setFillColor(25, 30, 45); // Dark blue-gray
  doc.rect(0, 0, 210, 297, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.text(`Monthly Reflection Diary`, 105, 100, { align: "center" });

  doc.setFontSize(22);
  doc.text(`${monthName} ${year}`, 105, 120, { align: "center" });

  // If user is logged in, add their name
  if (userData?.name) {
    doc.setFontSize(16);
    doc.text(`Created for: ${userData.name}`, 105, 140, { align: "center" });
  }

  // Add monthly mantra
  if (diaryContent?.monthlyMantra) {
    doc.setFontSize(14);
    const splitMantra = doc.splitTextToSize(diaryContent.monthlyMantra, 150);
    doc.text(splitMantra, 105, 180, { align: "center" });
  }

  doc.setFontSize(12);
  doc.text(
    `Generated on ${DateTime.now().toFormat("MMMM d, yyyy")}`,
    105,
    270,
    { align: "center" }
  );

  // Weekly focus page
  if (diaryContent?.weeklyFocus && diaryContent.weeklyFocus.length > 0) {
    doc.addPage();
    
    // Page background
    doc.setFillColor(25, 30, 45); // Dark blue-gray
    doc.rect(0, 0, 210, 297, "F");
    
    // Add content
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text(`Monthly Focus Areas`, 105, 30, {
      align: "center",
    });
    
    doc.setDrawColor(99, 102, 241); // Indigo
    doc.setLineWidth(0.5);
    doc.line(30, 40, 180, 40);
    
    let yPosition = 70;
    
    diaryContent.weeklyFocus.forEach((focus: string, index: number) => {
      doc.setFillColor(35, 40, 55); // Slightly lighter background for each section
      doc.roundedRect(25, yPosition - 15, 160, 40, 5, 5, 'F');
      
      doc.setFontSize(16);
      doc.setTextColor(180, 180, 255);
      doc.text(`Week ${index + 1}`, 35, yPosition);
      
      doc.setFontSize(14);
      doc.setTextColor(255, 255, 255);
      const splitFocus = doc.splitTextToSize(focus, 140);
      doc.text(splitFocus, 35, yPosition + 10);
      
      yPosition += 60;
    });
    
    // Add page number
    doc.setFontSize(10);
    doc.setTextColor(180, 180, 180);
    doc.text(`Page 2 of ${daysInMonth + 2}`, 105, 287, {
      align: "center",
    });
  }

  // Get questions to use
  const questions = diaryContent?.questions || [];
  
  // Daily pages with questions
  for (let day = 1; day <= daysInMonth; day++) {
    doc.addPage();

    // Page background
    doc.setFillColor(25, 30, 45); // Dark blue-gray
    doc.rect(0, 0, 210, 297, "F");

    // Date header
    const dateStr = DateTime.local(year, month, day).toFormat("MMMM d, yyyy");
    doc.setTextColor(230, 230, 230);
    doc.setFontSize(18);
    doc.text(dateStr, 105, 25, { align: "center" });

    // Draw a subtle line
    doc.setDrawColor(100, 110, 150);
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);

    // Daily question
    // Cycle through questions to ensure we have enough for the month
    const questionIndex = (day - 1) % questions.length;
    const question = questions[questionIndex];

    doc.setFontSize(14);
    doc.setTextColor(180, 180, 255);
    doc.text("Today's Reflection Question:", 20, 50);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);

    // Handle multi-line questions by wrapping text
    const splitQuestion = doc.splitTextToSize(question, 170);
    doc.text(splitQuestion, 20, 60);

    // Add writing space prompt
    const yPos = 60 + splitQuestion.length * 8 + 15;
    doc.setTextColor(200, 200, 200);
    doc.setFontSize(12);
    doc.text("Use the space below for your response:", 20, yPos);

    // Add writing lines
    const startY = yPos + 10;
    const endY = 270;
    const lineGap = 10;

    doc.setDrawColor(80, 90, 120);
    doc.setLineWidth(0.2);

    for (let y = startY; y <= endY; y += lineGap) {
      doc.line(20, y, 190, y);
    }

    // Add page number
    doc.setTextColor(150, 150, 170);
    doc.setFontSize(10);
    doc.text(`Page ${day + 2} of ${daysInMonth + 2}`, 105, 287, {
      align: "center",
    });
  }

  return doc.output("arraybuffer");
}

// Store the latest user-customized diary content
let lastGeneratedContent: Map<string, any> = new Map();

// GET endpoint for downloading the generated PDF
export const GET: RequestHandler = ({ url, locals }) => {
  // Check if user is logged in
  if (!locals.user) {
    throw redirect(302, "/login");
  }

  // Get query parameters
  const monthParam = url.searchParams.get("month");
  const yearParam = url.searchParams.get("year");

  // If called directly, redirect to dashboard
  if (!url.searchParams.get("from_review")) {
    throw redirect(302, "/dashboard");
  }

  // Validate parameters
  if (!monthParam || !yearParam) {
    throw error(400, "Month and year parameters are required");
  }

  const month = parseInt(monthParam);
  const year = parseInt(yearParam);

  if (isNaN(month) || month < 1 || month > 12) {
    throw error(400, "Month must be between 1 and 12");
  }

  if (isNaN(year) || year < 2000 || year > 2100) {
    throw error(400, "Year must be between 2000 and 2100");
  }

  // Try to get user's customized content from the stored data
  const contentKey = `${locals.user.id}-${year}-${month}`;
  const userCustomContent = lastGeneratedContent.get(contentKey);
  
  // If no customized content was found, fall back to generated mock content
  const diaryContent = userCustomContent || generateMockReflectionContent(month, year);
  
  // Generate PDF with the appropriate content
  const pdfData = generateDiary(month, year, locals.user, diaryContent);

  // Return the actual PDF file with appropriate headers
  return new Response(pdfData, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="reflection-diary-${year}-${month}.pdf"`
    },
  });
};

// POST endpoint for the new interactive flow
export const POST: RequestHandler = async ({ request, locals }) => {
  // Check if user is logged in
  if (!locals.user) {
    throw error(401, "You must be logged in to generate a PDF");
  }

  try {
    const data = await request.json();
    
    // Validate the data
    if (!data.month || !data.year || !data.content) {
      throw error(400, "Missing required data for PDF generation");
    }

    const { month, year, content } = data;
    
    if (isNaN(month) || month < 1 || month > 12) {
      throw error(400, "Month must be between 1 and 12");
    }

    if (isNaN(year) || year < 2000 || year > 2100) {
      throw error(400, "Year must be between 2000 and 2100");
    }
    
    // Store the content for use in GET requests
    const contentKey = `${locals.user.id}-${year}-${month}`;
    lastGeneratedContent.set(contentKey, content);
    
    // Generate PDF with user-customized content
    const pdfData = generateDiary(month, year, locals.user, content);
    
    // Return success response
    return json({ success: true, message: "PDF content prepared for download" });
  } catch (e) {
    console.error("Error generating PDF:", e);
    throw error(500, "Failed to generate PDF");
  }
};
