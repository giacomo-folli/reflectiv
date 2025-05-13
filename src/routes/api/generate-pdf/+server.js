import { generateDiaryPDF } from '$lib/utils/pdfGenerator.js';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, locals }) {
  // Check if user is logged in
  if (!locals.user) {
    throw redirect(303, '/login');
  }
  
  // Get query parameters
  const month = parseInt(url.searchParams.get('month') || '0', 10);
  const year = parseInt(url.searchParams.get('year') || '0', 10);
  
  // Validate month and year
  if (month < 1 || month > 12 || year < 2000 || year > 2100) {
    return new Response('Invalid month or year', { status: 400 });
  }
  
  try {
    // Generate PDF
    const pdfBlob = generateDiaryPDF(month, year, locals.user);
    
    // Convert Blob to ArrayBuffer
    const arrayBuffer = await pdfBlob.arrayBuffer();
    
    // Format month name for the filename
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = monthNames[month - 1];
    
    // Create filename
    const filename = `${monthName}_${year}_Reflection_Diary.pdf`;
    
    // Return PDF as a downloadable file
    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': arrayBuffer.byteLength.toString()
      }
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return new Response('Error generating PDF', { status: 500 });
  }
}