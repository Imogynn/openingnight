// Simple wrapper for Ollama API calls
const OLLAMA_BASE_URL = 'http://localhost:11434';

export async function generateInterview(character, history, question) {
  const prompt = buildInterviewPrompt(character, history, question);
  
  const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama3.2',
      prompt: prompt,
      stream: false,
      format: 'json'
    })
  });

  if (!response.ok) {
    throw new Error(`Ollama error: ${response.statusText}`);
  }

  const data = await response.json();
  return JSON.parse(data.response);
}

function buildInterviewPrompt(character, history, question) {
  // Format strengths and flaws as bullet points
  const strengthsList = character.strengths ? character.strengths.map(s => `  • ${s}`).join('\n') : 'N/A';
  const flawsList = character.flaws ? character.flaws.map(f => `  • ${f}`).join('\n') : 'N/A';
  
  return `You are roleplaying as ${character.name}, a ${character.role} candidate being interviewed for a bar job.

FULL CHARACTER PROFILE:
Name: ${character.name}
Age: ${character.age}
Role: ${character.role}
Traits: ${character.traits}
Background: ${character.background}

STRENGTHS (showcase these!):
${strengthsList}

FLAWS (let these show through naturally):
${flawsList}

IMPORTANT ROLEPLAY INSTRUCTIONS:
- BE ENTERTAINING! This is a comedy game - make it fun and memorable
- Use an accent/dialect that fits the character's background (e.g., "Cowboy" Jim talks like a Texan, Delia is formal/scientific)
- Show STRONG personality - don't be bland or generic
- Be over-the-top with your character's quirks and traits
- LET YOUR FLAWS SHOW! If you're constantly on your phone (Zara), mention checking Instagram. If you're clumsy (Tommy), reference dropping things. If you're condescending (Delia), sound a bit superior.
- Include colorful language, slang, or catchphrases that fit the character
- Make your internal "thinking" sarcastic, witty, or reveal hidden thoughts
- Inject humor - think Ted Lasso meets The Office meets It's Always Sunny
- Be memorable! Each character should feel COMPLETELY different
- Reference your strengths when relevant (e.g., bartender showing off cocktail knowledge)

Interview history so far:
${formatHistory(history)}

The interviewer asks: "${question}"

Respond IN VALID JSON with this exact structure:
{
  "response": "what the candidate says out loud - WITH PERSONALITY, ACCENT, AND FLAWS SHOWING",
  "thinking": "what they're privately thinking - make it funny or revealing",
  "confidence": 75,
  "enthusiasm": 60,
  "redFlags": 0
}

confidence, enthusiasm, and redFlags are numbers 0-100.
Make this interview memorable and entertaining!`;
}

function formatHistory(history) {
  if (!history || history.length === 0) {
    return '(This is the first question)';
  }
  return history.map(h => `Q: ${h.question}\nA: ${h.response}`).join('\n\n');
}
