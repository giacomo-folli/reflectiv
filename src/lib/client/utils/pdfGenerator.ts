import { jsPDF } from "jspdf";
import { getDaysInMonth, getMonthOptions } from "./dateUtils";

/**
 * Generate reflection questions for each day of the month
 * @param {number} month - Month number (1-12)
 * @param {number} year - Year (e.g., 2025)
 * @returns {Array} - Array of objects with day number and question
 */
function generateQuestions(month: number, year: number) {
  const daysInMonth = getDaysInMonth(month, year);
  const monthName =
    getMonthOptions().find((m) => m.value === month)?.label || "";

  const questions = [
    "What was the most important thing you accomplished today?",
    "What are you grateful for today?",
    "What was challenging today and how did you handle it?",
    "What did you learn today that you didn't know before?",
    "How did you take care of yourself today?",
    "What made you smile or laugh today?",
    "What's one thing you could have done better today?",
    "Who did you connect with today and how was it meaningful?",
    "What progress did you make toward your goals today?",
    "What's one thing that inspired you today?",
    "What worried you today and how did you manage those feelings?",
    "What act of kindness did you perform or witness today?",
    "What's one thing that surprised you today?",
    "How did you use your time effectively today?",
    "What did you do today that was outside your comfort zone?",
    "What was the most enjoyable moment of your day?",
    "What are you looking forward to tomorrow?",
    "What did you read or listen to today that was interesting?",
    "How did your actions align with your values today?",
    "What's one thing you're proud of from today?",
    "How did you contribute to someone else's wellbeing today?",
    "What decision did you make today that you feel good about?",
    "What's one problem you solved today?",
    "How did you show compassion to yourself or others today?",
    "What patterns or habits did you notice about yourself today?",
    "What's something beautiful you noticed today?",
    "How did you respond to a difficult situation today?",
    "What would you like to remember most about today?",
    "What's one thing you could do differently tomorrow?",
    "How did today contribute to your personal growth?",
  ];

  const result = [];

  // For each day in the month, assign a question
  for (let day = 1; day <= daysInMonth; day++) {
    // Cycle through the questions based on the day
    const questionIndex = (day - 1) % questions.length;
    const date = new Date(year, month - 1, day); // Month is 0-indexed in JS
    const dayOfWeek = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(date);

    result.push({
      day,
      dayOfWeek,
      question: questions[questionIndex],
    });
  }

  return result;
}

/**
 * Generate a PDF diary with reflection questions
 * @param {number} month - Month number (1-12)
 * @param {number} year - Year (e.g., 2025)
 * @param {Object} userData - User data to personalize the diary
 * @returns {Blob} - PDF file as a Blob
 */
export function generateDiaryPDF(
  month: number,
  year: number,
  userData: any = {}
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  const monthName =
    getMonthOptions().find((m) => m.value === month)?.label || "";
  const userName = userData.name || "Your";

  // Title
  doc.setFontSize(24);
  doc.setTextColor(0, 0, 128); // Dark blue
  const title = `${monthName} ${year} - Monthly Reflection Diary`;
  doc.text(title, pageWidth / 2, 20, { align: "center" });

  // Subtitle
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text(`${userName}'s Personal Reflection Journal`, pageWidth / 2, 30, {
    align: "center",
  });

  // Introduction
  doc.setFontSize(12);
  doc.setTextColor(80, 80, 80);
  const intro =
    `This diary contains daily reflection questions for ${monthName} ${year}. ` +
    `Take a few minutes each day to reflect on the question provided and write down your thoughts. ` +
    `Regular reflection can help improve mindfulness, personal growth, and emotional well-being.`;

  const splitIntro = doc.splitTextToSize(intro, contentWidth);
  doc.text(splitIntro, margin, 45);

  // Line
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, 60, pageWidth - margin, 60);

  // Questions for each day
  const questions = generateQuestions(month, year);
  let y = 70;

  for (const item of questions) {
    // Check if we need a new page
    if (y > pageHeight - 30) {
      doc.addPage();
      y = 20;
    }

    // Day number and weekday
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 128); // Dark blue
    doc.text(`Day ${item.day} - ${item.dayOfWeek}`, margin, y);

    // Question
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    const splitQuestion = doc.splitTextToSize(item.question, contentWidth);
    doc.text(splitQuestion, margin, y + 7);

    // Space for writing
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, y + 15, pageWidth - margin, y + 15);
    doc.line(margin, y + 25, pageWidth - margin, y + 25);

    y += 35; // Move down for the next day
  }

  // Add a note at the end if there's room
  if (y < pageHeight - 50) {
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text(
      "This diary was generated by Monthly Reflection Diary - Your personal reflection companion",
      margin,
      pageHeight - 20
    );
  }

  return doc.output("blob");
}

/**
 * Generate a preview of the diary content for display
 * @param {number} month - Month number (1-12)
 * @param {number} year - Year (e.g., 2025)
 * @returns {Array} - Array of days and questions to display
 */
export function getDiaryPreview(month: number, year: number) {
  // Get the first 5 days to show as a preview
  return generateQuestions(month, year).slice(0, 5);
}
