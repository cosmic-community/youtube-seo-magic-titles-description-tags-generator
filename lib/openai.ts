import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSEOContent(
  topic: string,
  language: string,
  tone: string,
  titleLength: string,
  keywords?: string
): Promise<any> {
  const languageMap: Record<string, string> = {
    'English': 'English',
    'Hindi': 'Hindi',
    'Hinglish': 'Hinglish (mix of Hindi and English)',
  };

  const titleLengthMap: Record<string, string> = {
    'Short ≤50': 'under 50 characters',
    'Medium 50–80': 'between 50-80 characters',
    'Long ≤90': 'between 80-90 characters',
  };

  const prompt = `You are a YouTube SEO expert. Generate SEO-optimized content for a YouTube video about: "${topic}"

Requirements:
- Language: ${languageMap[language] || 'English'}
- Tone: ${tone}
- Title length: ${titleLengthMap[titleLength] || 'under 50 characters'}
${keywords ? `- Target Keywords: ${keywords}` : ''}

Generate the following in a single JSON response:

{
  "titles": [
    "Title 1 (SEO-optimized, ${titleLengthMap[titleLength]})",
    "Title 2 (different angle)",
    "Title 3 (different angle)",
    "Title 4 (different angle)"
  ],
  "description": "A comprehensive video description (300-500 words) that includes:\n- Hook in first 2 lines\n- Key points with emojis\n- Timestamps placeholder\n- Call to action\n- Relevant hashtags at the end\n- Keywords naturally integrated",
  "tags": [
    "tag1",
    "tag2",
    "tag3",
    "tag4",
    "tag5",
    "tag6",
    "tag7",
    "tag8",
    "tag9",
    "tag10"
  ],
  "hashtags": "#Hashtag1 #Hashtag2 #Hashtag3 #Hashtag4 #Hashtag5"
}

Important:
- All titles must be unique and SEO-optimized
- Mix broad and long-tail keywords in tags
- Keep description engaging and informative
- Use appropriate language (${languageMap[language]})
- Maintain ${tone.toLowerCase()} tone throughout
- Return ONLY valid JSON, no additional text`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a YouTube SEO expert. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content generated');
    }

    // Parse JSON response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('OpenAI generation error:', error);
    throw new Error('Failed to generate content');
  }
}

export async function regenerateTitles(
  topic: string,
  language: string,
  tone: string,
  titleLength: string
): Promise<string[]> {
  const languageMap: Record<string, string> = {
    'English': 'English',
    'Hindi': 'Hindi',
    'Hinglish': 'Hinglish (mix of Hindi and English)',
  };

  const titleLengthMap: Record<string, string> = {
    'Short ≤50': 'under 50 characters',
    'Medium 50–80': 'between 50-80 characters',
    'Long ≤90': 'between 80-90 characters',
  };

  const prompt = `Generate 4 unique, SEO-optimized YouTube video titles for: "${topic}"

Requirements:
- Language: ${languageMap[language] || 'English'}
- Tone: ${tone}
- Length: ${titleLengthMap[titleLength] || 'under 50 characters'}

Return as JSON array:
["Title 1", "Title 2", "Title 3", "Title 4"]`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a YouTube SEO expert. Always respond with valid JSON array only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 300,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No titles generated');
    }

    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Title regeneration error:', error);
    throw new Error('Failed to regenerate titles');
  }
}

export async function generateChapters(topic: string, language: string): Promise<any[]> {
  const languageMap: Record<string, string> = {
    'English': 'English',
    'Hindi': 'Hindi',
    'Hinglish': 'Hinglish (mix of Hindi and English)',
  };

  const prompt = `Generate 5-7 video chapter timestamps for a YouTube video about: "${topic}"

Language: ${languageMap[language] || 'English'}

Return as JSON array:
[
  {"time": "0:00", "title": "Introduction"},
  {"time": "2:30", "title": "Chapter 1"},
  ...
]`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a YouTube content expert. Always respond with valid JSON array only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 400,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No chapters generated');
    }

    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Chapter generation error:', error);
    throw new Error('Failed to generate chapters');
  }
}

export async function generateIntroScript(topic: string, language: string, tone: string): Promise<string> {
  const languageMap: Record<string, string> = {
    'English': 'English',
    'Hindi': 'Hindi',
    'Hinglish': 'Hinglish (mix of Hindi and English)',
  };

  const prompt = `Generate a 30-45 second spoken intro script for a YouTube video about: "${topic}"

Requirements:
- Language: ${languageMap[language] || 'English'}
- Tone: ${tone}
- Include camera direction at the end in square brackets

Format:
"[Spoken script here...]

[Camera direction: ...]"`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a YouTube content creator expert."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No script generated');
    }

    return content.trim();
  } catch (error) {
    console.error('Intro script generation error:', error);
    throw new Error('Failed to generate intro script');
  }
}