import { ExplanationRequest } from "@/types";

export class GroqService {
  private apiKey: string;
  private baseURL = "https://api.groq.com/openai/v1/chat/completions";

  constructor() {
    this.apiKey = process.env.GROQ_API_KEY!;
    if (!this.apiKey) {
      throw new Error("GROQ_API_KEY is not set in environment variables");
    }
  }

  private createPrompt(request: ExplanationRequest): string {
    const { code, language } = request;

    if (language === "kannada") {
      return `ನೀವು ತುಂಬಾ ಸ್ನೇಹಪೂರ್ಣ ಮತ್ತು ಸರಳವಾಗಿ ವಿವರಿಸುವ ಪ್ರೋಗ್ರಾಮಿಂಗ್ ಶಿಕ್ಷಕರಾಗಿದ್ದೀರಿ. ಕೆಳಗಿನ ಕೋಡ್ ಅನ್ನು ಕನ್ನಡದಲ್ಲಿ ಸುಲಭವಾಗಿ ಮತ್ತು ಮಜಾದಾರವಾಗಿ ವಿವರಿಸಿ:

**ಕೋಡ್:**
\`\`\`
${code}
\`\`\`

**ವಿವರಣೆ ಶೈಲಿ:**
- ತುಂಬಾ ಸರಳ ಭಾಷೆ (ಚಿಕ್ಕ ಮಕ್ಕಳಿಗೂ ಅರ್ಥವಾಗುವಂತೆ)
- ಸ್ನೇಹಿತರಂತೆ ಮಾತನಾಡಿ
- ಕನ್ನಡದ ಸ್ಥಳೀಯ ಉದಾಹರಣೆಗಳನ್ನು ಬಳಸಿ
- ತಂತ್ರಜ್ಞಾನ ಪದಗಳನ್ನು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲೇ ಇರಿಸಿ (JavaScript, HTML, function, variable)
- ಚಿಕ್ಕ ವಾಕ್ಯಗಳಲ್ಲಿ ಬರೆಯಿರಿ
- ಇಮೋಜಿಗಳನ್ನು ಬಳಸಿ 😊

**ರಚನೆ:**
1. 🎯 **ಇದು ಏನು ಮಾಡುತ್ತದೆ?**
2. 🔧 **ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ?**
3. 📝 **ಉದಾಹರಣೆ**
4. 💡 **ನಾವು ಏನು ಕಲಿತೆವು?**
5. 🚀 **ಇದರಿಂದ ಇನ್ನೇನು ಮಾಡಬಹುದು?**

**ವಿಶೇಷ ಸೂಚನೆಗಳು:**
- ಸ್ನೇಹಪೂರ್ಣ ಶೈಲಿ (bro, ಸ್ನೇಹಿತ)
- ಮಜಾದಾರವಾಗಿ ವಿವರಿಸಿ
- ಸರಳವಾಗಿರಲಿ, ಜಟಿಲ ಮಾಡಬೇಡಿ`;
    }

    // ✅ Default English Prompt
    return `You are a very friendly programming teacher. Explain the following code in a simple, humanized way:

**Code:**
\`\`\`
${code}
\`\`\`

**Explanation Style:**
- Very simple language
- Friendly tone
- Short sentences
- Use emojis

**Structure:**
1. 🎯 What does it do?
2. 🔧 How it works?
3. 📝 Example
4. 💡 What we learned?
5. 🚀 What can we build?`;
  }

  async explainCode(request: ExplanationRequest): Promise<string> {
    const prompt = this.createPrompt(request);

    const model = "llama-3.1-8b-instant";

    const response = await fetch(this.baseURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: "system",
            content:
              request.language === "kannada"
                ? `ನೀವು ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡುವ ಸ್ನೇಹಪೂರ್ಣ ಪ್ರೋಗ್ರಾಮಿಂಗ್ ಶಿಕ್ಷಕರು.
ಸರಳವಾಗಿ ವಿವರಿಸಿ, ಚಿಕ್ಕ ವಾಕ್ಯಗಳಲ್ಲಿ ಹೇಳಿ, ಉದಾಹರಣೆಗಳನ್ನು ನೀಡಿ.`
                : `You are a friendly programming teacher. Explain simply like a friend.`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Groq API error: ${errorData.error?.message || "Unknown error"}`
      );
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0]?.message?.content) {
      throw new Error("Invalid response format from Groq API");
    }

    return data.choices[0].message.content;
  }
}