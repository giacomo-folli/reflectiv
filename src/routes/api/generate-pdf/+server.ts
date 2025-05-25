import { DateTime } from "luxon";
import { jsPDF } from "jspdf";
import { redirect } from "@sveltejs/kit";
import type { User } from "$lib/types/user.types.js";

function generateDiary(
  user: User,
  diaryContent: { mantra: string; questions: string[]; themes: string[] }
) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  // Format month name and determine days in month
  const monthName = "MONTH";
  const year = 2025;
  let daysInMonth = 30;

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
  if (user?.name) {
    doc.setFontSize(16);
    doc.text(`Created for: ${user.name}`, 105, 140, { align: "center" });
  }

  // Add monthly mantra
  if (diaryContent?.mantra) {
    doc.setFontSize(14);
    const splitMantra = doc.splitTextToSize(diaryContent.mantra, 150);
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
  if (diaryContent?.themes && diaryContent.themes.length > 0) {
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

    diaryContent.themes.forEach((focus: string, index: number) => {
      doc.setFillColor(35, 40, 55); // Slightly lighter background for each section
      doc.roundedRect(25, yPosition - 15, 160, 40, 5, 5, "F");

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

    // Page background (soft white)
    doc.setFillColor(248, 249, 250); // Soft off-white
    doc.rect(0, 0, 210, 297, "F");

    // Date header
    const dateStr = DateTime.local().toFormat("MMMM d, yyyy");
    doc.setTextColor(20, 20, 20); // Black text
    doc.setFontSize(18);
    doc.text(dateStr, 105, 25, { align: "center" });

    // Draw a subtle line
    doc.setDrawColor(180, 180, 200);
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);

    // Daily question
    // Cycle through questions to ensure we have enough for the month
    const questionIndex = (day - 1) % questions.length;
    const question = questions[questionIndex];

    doc.setFontSize(14);
    doc.setTextColor(70, 70, 180); // Muted blue for label
    doc.text("Today's Reflection Question:", 20, 50);

    doc.setTextColor(20, 20, 20); // Black for question
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

// GET endpoint for downloading the generated PDF
export async function POST({ request, locals }) {
  if (!locals.user) {
    throw redirect(302, "/login");
  }

  const content = await request.json();
  // Generate PDF with the appropriate content
  const pdf = generateDiary(locals.user, content);

  // Return the actual PDF file with appropriate headers
  return new Response(pdf, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="reflection-diary.pdf"`,
    },
  });
}
