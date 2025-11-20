// Quick test script to verify Ollama integration
// Run with: node test-ollama.js

const testCharacter = {
  name: 'Janet',
  role: 'Bartender',
  traits: 'Confident, witty, slightly sarcastic',
  background: 'Has 5 years experience at a busy downtown pub. Left her last job because the owner was micromanaging.'
};

const testQuestion = 'So Janet, why do you want to work here?';

async function testInterview() {
  console.log('🧪 Testing Ollama interview endpoint...\n');
  console.log('Character:', testCharacter.name);
  console.log('Question:', testQuestion);
  console.log('\nSending request to http://localhost:3001/api/interview...\n');

  try {
    const response = await fetch('http://localhost:3001/api/interview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        character: testCharacter,
        history: [],
        question: testQuestion
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ Error:', error);
      return;
    }

    const result = await response.json();
    console.log('✅ Success!\n');
    console.log('Response:', result.response);
    console.log('\nInternal metrics:');
    console.log('  Thinking:', result.thinking);
    console.log('  Confidence:', result.confidence);
    console.log('  Enthusiasm:', result.enthusiasm);
    console.log('  Red Flags:', result.redFlags);

  } catch (error) {
    console.error('❌ Request failed:', error.message);
    console.error('\nMake sure:');
    console.error('  1. Backend is running (npm run dev in backend folder)');
    console.error('  2. Ollama is running (ollama serve)');
    console.error('  3. llama3.2 model is installed (ollama pull llama3.2)');
  }
}

testInterview();
