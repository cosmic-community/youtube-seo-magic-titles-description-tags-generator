# YouTube SEO Magic – Titles, Description & Tags Generator

![App Banner](https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=300&fit=crop&auto=format)

A powerful, intelligent YouTube SEO content generator that creates optimized titles, descriptions, tags, hashtags, video chapters, and intro scripts in seconds. Built with Next.js 15, TypeScript, and Cosmic CMS.

## ✨ Features

- **🎯 Smart SEO Generation**: Generate 3-4 optimized video titles, complete descriptions, 10 relevant tags, and hashtags in one AI call
- **🌍 Multi-Language Support**: Create content in English, Hindi, or Hinglish with appropriate cultural context
- **🎭 Tone Customization**: Choose from Casual, Professional, Funny, or Motivational tones
- **📏 Flexible Title Lengths**: Select Short (≤50), Medium (50-80), or Long (≤90) character titles
- **🔄 Smart Regeneration**: Regenerate specific elements (titles only) or full content sets without losing context
- **📋 Advanced Features**: Generate video chapter outlines and camera-ready intro scripts
- **💾 Export & Save**: Download complete JSON output with copy functionality
- **📊 Usage Tracking**: Built-in free tier (5 topics/day) with upgrade options
- **🎨 Clean UI**: Modern, responsive design with violet accent and emoji indicators
- **💡 SEO Tips**: Built-in best practices and optimization suggestions

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68f3c1532b77a3b88e2f2802&clone_repository=68f3c410a88d7093bd13c047)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "💎 ROLE: You are "Loveable Assistant" — a professional AI app builder expert in creating no-code SaaS websites with interactive UI and optimized credit usage. Your task: Create a **fully functional YouTube SEO Content Generator SaaS App** from this single prompt. App should generate 3–4 SEO-friendly titles, 1 optimized video description, 10 tags, hashtags, chapters & intro — all with minimal AI token cost. --- 🎯 APP NAME: **YouTube SEO Magic – Titles, Description & Tags Generator** --- 🧩 GOAL: Create an interactive, step-by-step YouTube SEO content generator website where user enters a topic → selects preferences → gets ready SEO content instantly. App should be visually clean, credit-efficient, and beginner-friendly. --- 🏗️ STRUCTURE / FLOW: ### STEP 0: LANDING SCREEN **Text shown:** > "Namaste! 👋 Main aapka YouTube SEO Magic Assistant hoon. > Bas topic bataiye — main aapko 3-4 SEO-friendly titles, ek perfect description aur 10 tags dunga. > Aap apni language (Hindi/English/Hinglish), tone aur title length customize kar sakte hain." **Button:** "Start Now 🚀" → go to Step 1. --- ### STEP 1: USER INPUT PAGE Collect the following: 1. **Topic input:** Placeholder → "Enter your video topic (e.g., How to bake chocolate cake)" 2. **Language:** Dropdown → [English, Hindi, Hinglish] (Default: English) 3. **Tone:** Buttons → [Casual, Professional, Funny, Motivational] (Default: Casual) 4. **Title Length:** Dropdown → [Short ≤50, Medium 50–80, Long ≤90] (Default: Short) 5. **Target Keywords (optional):** Text box → "Enter comma-separated keywords or leave blank" **Button:** "Generate SEO Content 🔮" → go to Step 2. --- ### STEP 2: BACKEND AI PROMPT LOGIC Use **one single text generation call** to save credits. Here's the generation instruction: **Show output:** ✅ Readable formatted text (titles, description, tags) ✅ Collapsible JSON block labeled OUTPUT_V1_JSON ✅ Buttons: - 🔁 Regenerate - ➡️ Next Step --- ### STEP 3: MENU OPTIONS After initial generation, show interactive menu: 1. 🔁 Regenerate only Titles 2. ♻️ Regenerate Full Set (Titles + Description + Tags) 3. ✏️ Change Tone/Language/Length (back to Step 1) 4. 🧭 Generate Video Outline / Chapters 5. 🎙️ Generate 30s Intro Script 6. 📦 Finalize & Export JSON --- ### STEP 4A: If user picks (1) Regenerate **only 4 new titles** (short, unique). Output compact JSON: ### STEP 4B: If user picks (2) Repeat Step 2 full generation logic. ### STEP 4C: If user picks (3) Return user to Step 1 with filled fields for editing. ### STEP 4D: If user picks (4) Generate **Video Outline / Chapters**: Add to main JSON key "chapters". ### STEP 4E: If user picks (5) Generate 30–45 second spoken **intro script** (ready to speak on camera) + one short camera direction line. Add as "script_intro": "..." in JSON. ### STEP 4F: If user picks (6) Finalize and display complete export JSON: Under JSON, display: > 💡 *Tips:* > ✅ Keep title under 70 chars > ✅ Place keywords early in description > ✅ Mix broad + long-tail tags > ✅ Add CTA in first 2 lines Buttons: 📋 "Copy All JSON" | 💾 "Download JSON" | 🔄 "New Topic" --- ### STEP 5: UI DESIGN INSTRUCTIONS ✅ Clean minimal UI (white + pastel accent) ✅ Big buttons, emoji indicators ✅ Responsive layout for mobile & desktop ✅ Collapsible JSON view ✅ Regenerate instantly without full reload ✅ Memory persistence (remember user input) --- ### STEP 6: PERFORMANCE OPTIMIZATION - Use one AI block for full generation (titles, desc, tags) - Cache repeated topic results - Truncate overly long responses - Token limit: 300–400 max per generation - Maintain JSON consistency --- ### STEP 7: MONETIZATION (optional) - Free tier: 5 topics/day - Paid tier: unlimited - Add "Upgrade Plan 💳" button on export screen --- ### STEP 8: VOICE & STYLE RULES - Hinglish default tone unless user picks English/Hindi. - No clickbait or false claims. - Friendly, helpful, clean format. - Always output human + JSON. - Minimal AI token usage. --- ### STEP 9: APP BUILD INSTRUCTION (for Loveable) Now automatically create: - Landing Page (Step 0) - Input Form (Step 1) - Generator Engine (Step 2) - Menu & Regeneration (Step 3–4) - Export Page (Step 4F) Connect them as interactive pages in sequence. Deploy in "Website Mode" with automatic hosting. Set model temperature: 0.7 (balanced creativity). Set theme: "Modern clean white + violet accent". --- ✅ END OF PROMPT ✅ Build this entire app from the above instructions and name it: **"YouTube SEO Magic – Titles, Description & Tags Generator"**"

### Code Generation Prompt

> Build a fully functional YouTube SEO content generator application based on the content model above.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **Lucide React** - Modern icon library
- **OpenAI API** - AI-powered content generation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- Cosmic account with bucket access
- OpenAI API key (for content generation)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd youtube-seo-magic
```

2. **Install dependencies**
```bash
bun install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
OPENAI_API_KEY=your-openai-api-key
```

4. **Run the development server**
```bash
bun run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Cosmic SDK Examples

### Fetch App Settings

```typescript
import { cosmic } from '@/lib/cosmic'

const settings = await cosmic.objects
  .findOne({
    type: 'app-settings',
    slug: 'youtube-seo-magic-settings'
  })
  .props(['id', 'title', 'metadata'])
  .depth(0)

const welcomeMessage = settings.object.metadata.welcome_message
const freeLimit = settings.object.metadata.free_tier_limit
```

### Create New Topic Entry

```typescript
const newTopic = await cosmic.objects.insertOne({
  type: 'topics',
  title: userTopic,
  metadata: {
    topic: userTopic,
    language: { key: 'en', value: 'English' },
    tone: { key: 'casual', value: 'Casual' },
    title_length: { key: 'short', value: 'Short ≤50' },
    target_keywords: keywords,
    generated_data: generatedContent,
    user_id: userId
  }
})
```

### Fetch User's Topic History

```typescript
const userTopics = await cosmic.objects
  .find({
    type: 'topics',
    'metadata.user_id': userId
  })
  .props(['id', 'title', 'slug', 'metadata', 'created_at'])
  .depth(0)
  .limit(10)

const topicCount = userTopics.objects.length
```

## 🔗 Cosmic CMS Integration

This application uses Cosmic CMS to manage:

1. **App Settings** (`app-settings` type)
   - Welcome message configuration
   - Free tier limit settings
   - Feature toggles (chapters, intro script)
   - Theme color customization

2. **Topics** (`topics` type)
   - User-submitted video topics
   - Language, tone, and length preferences
   - Generated SEO content (titles, description, tags)
   - Complete JSON output with chapters and scripts
   - User tracking for usage limits

### Content Model Structure

**App Settings:**
- `welcome_message` (textarea) - Landing page greeting
- `free_tier_limit` (number) - Daily topic limit for free users
- `app_status` (switch) - Enable/disable app
- `enable_chapters` (switch) - Chapter generation feature
- `enable_intro_script` (switch) - Intro script generation feature
- `theme_color` (color) - Primary accent color

**Topics:**
- `topic` (text) - Video topic entered by user
- `language` (select-dropdown) - English, Hindi, or Hinglish
- `tone` (select-dropdown) - Casual, Professional, Funny, Motivational
- `title_length` (select-dropdown) - Short, Medium, or Long
- `target_keywords` (text) - Comma-separated keywords
- `generated_data` (json) - Complete SEO output
- `user_id` (text) - For usage tracking

## 🌐 Deployment Options

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Deploy to Netlify

1. Push your code to GitHub
2. Connect repository to Netlify
3. Add environment variables
4. Configure build settings:
   - Build command: `bun run build`
   - Publish directory: `.next`

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

For questions or support, please visit [Cosmic Docs](https://www.cosmicjs.com/docs) or open an issue in this repository.

---

Built with ❤️ using [Cosmic](https://www.cosmicjs.com)
<!-- README_END -->