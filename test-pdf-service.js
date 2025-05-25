// Test script to verify PDF service connection to backend
// This will test the data flow between the service and endpoint

const testData = {
  month: 5,
  year: 2025,
  content: {
    questions: [
      "What are you most grateful for today?",
      "What is one small win you can celebrate from today?",
      "What challenge did you face today, and how did you respond?"
    ],
    monthlyMantra: "In this May of 2025, I embrace growth and change with an open heart.",
    weeklyFocus: [
      "Focus on gratitude and mindfulness",
      "Prioritize health and wellness",
      "Strengthen relationships and connections",
      "Pursue creative expression"
    ]
  },
  chatgptLinks: [
    {
      id: "1",
      userId: "test-user",
      url: "https://chat.openai.com/share/abc123",
      title: "Morning Reflection Chat",
      createdAt: "2025-05-15T08:00:00.000Z"
    },
    {
      id: "2", 
      userId: "test-user",
      url: "https://chat.openai.com/share/def456",
      title: "Evening Journaling Session",
      createdAt: "2025-05-14T20:00:00.000Z"
    }
  ]
};

async function testPdfServiceConnection() {
  try {
    console.log('Testing PDF service connection...');
    console.log('Sending data:', JSON.stringify(testData, null, 2));
    
    const response = await fetch('http://localhost:5000/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const responseData = await response.text();
    console.log('Response body:', responseData);
    
    if (response.ok) {
      console.log('✅ PDF service connection successful!');
      try {
        const parsedData = JSON.parse(responseData);
        console.log('Parsed response:', parsedData);
      } catch (e) {
        console.log('Response is not JSON, which is expected for some endpoints');
      }
    } else {
      console.log('❌ PDF service connection failed');
    }
    
  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
  }
}

testPdfServiceConnection();