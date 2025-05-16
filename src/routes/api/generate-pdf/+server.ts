import { DateTime } from "luxon";
import { jsPDF } from "jspdf";
import { error, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { mockGeneratePdfResponse } from "$lib/mock-data";

// Define some reflection questions by month
const reflectionQuestions = {
  1: [
    // January
    "What new beginnings are you looking forward to this year?",
    "How can you establish better habits this month?",
    "What would make this year different from the last?",
    "What's one skill you'd like to develop this year?",
    "How can you make more time for self-reflection this month?",
  ],
  2: [
    // February
    "How are you progressing on your goals for the year?",
    "What relationships would you like to nurture this month?",
    "What self-care practices have been most effective for you lately?",
    "How can you show more compassion to yourself and others?",
    "What habits would you like to leave behind this month?",
  ],
  3: [
    // March
    "What signs of new growth do you see in your life?",
    "How can you bring more balance into your daily routine?",
    "What limiting beliefs are holding you back right now?",
    "What can you do to feel more energized this month?",
    "How might you welcome change rather than resist it?",
  ],
  4: [
    // April
    "What aspects of your life need refreshing or renewal?",
    "How can you bring more play and creativity into your days?",
    "What's one small step you could take toward a big goal?",
    "What obstacles have you overcome recently?",
    "How can you better nurture your physical well-being this month?",
  ],
  5: [
    // May
    "What are you most grateful for in this season of your life?",
    "How can you create more space for what truly matters?",
    "What do you want to accomplish before the year is halfway over?",
    "How can you incorporate more nature into your daily routine?",
    "What would bring you more joy right now?",
  ],
  6: [
    // June
    "How has the first half of your year unfolded?",
    "What do you want to experience more of in the coming months?",
    "What are you learning about yourself lately?",
    "How can you better align your actions with your values?",
    "What would make this summer meaningful for you?",
  ],
  7: [
    // July
    "What adventure would you like to have before summer ends?",
    "How can you find more moments of rest and relaxation?",
    "What's something you've been putting off that you could tackle now?",
    "How can you express more gratitude in your daily life?",
    "What boundary do you need to establish or reinforce?",
  ],
  8: [
    // August
    "What has been your biggest lesson so far this year?",
    "How can you prepare for the transition to autumn?",
    "What habits would you like to establish before the busy fall season?",
    "How can you better connect with your community?",
    "What would make you feel more fulfilled in your work or studies?",
  ],
  9: [
    // September
    "What new routine would benefit your wellbeing this season?",
    "How can you create more structure in your days?",
    "What goal would you like to accomplish before year's end?",
    "How can you continue learning and growing this month?",
    "What can you let go of to make room for new opportunities?",
  ],
  10: [
    // October
    "What transformation are you currently experiencing?",
    "How can you embrace change rather than resist it?",
    "What brings you comfort during times of transition?",
    "How can you better honor your needs and limitations?",
    "What deeper questions have been on your mind lately?",
  ],
  11: [
    // November
    "What are you most grateful for in this season of life?",
    "How can you express more appreciation to those around you?",
    "What traditions bring you the most meaning?",
    "How do you want to feel as the year draws to a close?",
    "What can you do now to reduce stress during the holiday season?",
  ],
  12: [
    // December
    "How have you grown or changed this year?",
    "What are you most proud of accomplishing?",
    "What lessons will you carry forward into the new year?",
    "How can you create moments of peace amid the holiday bustle?",
    "What intentions would you like to set for the coming year?",
  ],
};

/**
 * Generate a PDF document with reflection questions for each day of the month
 * @param {number} month - Month (1-12)
 * @param {number} year - Year (e.g., 2025)
 * @param {object} userData - User data for personalization
 * @returns {Uint8Array} - PDF file as a byte array
 */
function generateDiary(month: number, year: number, userData: any) {
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

  doc.setFontSize(12);
  doc.text(
    `Generated on ${DateTime.now().toFormat("MMMM d, yyyy")}`,
    105,
    270,
    { align: "center" }
  );

  // @ts-ignore
  const monthQuestions = reflectionQuestions[month] || reflectionQuestions[1];

  // @ts-ignore
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
    const questionIndex = (day - 1) % monthQuestions.length;
    const question = monthQuestions[questionIndex];

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

    //@ts-ignore
    doc.text(`Page ${day + 1} of ${daysInMonth + 1}`, 105, 287, {
      align: "center",
    });
  }

  return doc.output("arraybuffer");
}

export const GET: RequestHandler = ({ url, locals }) => {
  // Check if user is logged in
  if (!locals.user) {
    throw redirect(302, "/login");
  }

  // Get query parameters
  const monthParam = url.searchParams.get("month");
  const yearParam = url.searchParams.get("year");

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

  // Get month name for filename
  const monthName = DateTime.local(year, month).toFormat("MMMM");

  // Generate PDF
  const pdfData = generateDiary(month, year, locals.user);

  // Return mock PDF response for development
  return new Response(JSON.stringify(mockGeneratePdfResponse), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
