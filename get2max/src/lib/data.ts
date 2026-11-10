import type {
  Category,
  Course,
  Resource,
  ArticleSection,
  Goal,
} from "./models";

export const photos = {
  hero: "/images/hero.jpg",
  habit: "/images/habit.jpg",
  communication: "/images/communication.jpg",
  sleep: "/images/sleep.jpg",
  finance: "/images/finance.jpg",
  learning: "/images/learning.jpg",
  fitness: "/images/fitness.jpg",
  care: "/images/care.jpg",
};
export const categories: Category[] = [
  {
    id: "health",
    slug: "health-fitness",
    name: "Health & Fitness",
    description: "Feel stronger. Move better. Build a healthier everyday.",
    icon: "activity",
    color: "peach",
  },
  {
    id: "appearance",
    slug: "appearance-personal-care",
    name: "Appearance & Personal Care",
    description: "Care for yourself, with confidence and intention.",
    icon: "sparkles",
    color: "lavender",
  },
  {
    id: "communication",
    slug: "communication-social-skills",
    name: "Communication & Social Skills",
    description: "Find your voice and build meaningful connections.",
    icon: "messages",
    color: "blue",
  },
  {
    id: "productivity",
    slug: "productivity-discipline",
    name: "Productivity & Discipline",
    description: "Make space for what matters. Make progress that lasts.",
    icon: "zap",
    color: "yellow",
  },
  {
    id: "wellbeing",
    slug: "mental-wellbeing",
    name: "Mental Wellbeing",
    description: "A calmer mind. A more balanced perspective.",
    icon: "heart",
    color: "pink",
  },
  {
    id: "knowledge",
    slug: "knowledge-learning",
    name: "Knowledge & Learning",
    description: "Stay curious and turn new ideas into understanding.",
    icon: "book",
    color: "mint",
  },
  {
    id: "finance",
    slug: "finance-career",
    name: "Finance & Career",
    description: "Build financial clarity and a career with purpose.",
    icon: "chart",
    color: "sand",
  },
];
const section = (
  heading: string,
  text: string,
  points?: string[],
): ArticleSection => ({ heading, paragraphs: text.split("\n"), points });
const create = (
  id: string,
  title: string,
  description: string,
  categoryId: string,
  format: Resource["format"],
  durationMinutes: number,
  thumbnail: string,
  content: ArticleSection[],
  difficulty: Resource["difficulty"] = "Beginner",
  mediaUrl?: string,
  mediaCredit?: string,
): Resource => ({
  id,
  slug: id,
  title,
  description,
  categoryId,
  format,
  durationMinutes,
  thumbnail,
  content,
  difficulty,
  mediaUrl,
  mediaCredit,
});
export const resources: Resource[] = [
  create(
    "small-habits",
    "Small habits. Remarkable changes.",
    "A practical guide to making good habits easier to start—and easier to keep.",
    "productivity",
    "Text",
    6,
    photos.habit,
    [
      section(
        "Start smaller than you think",
        "A useful habit is a behavior you can repeat on an ordinary day, including a busy one. Instead of committing to an hour of reading, begin with two pages after breakfast. A small starting point reduces the effort needed to begin.\nChoose one action you care about. Give it a clear cue and a version that takes less than two minutes.",
      ),
      section(
        "Design your environment",
        "Put the things you need within reach. A book on your pillow or walking shoes beside the door can make your next action easier. You are creating a reminder, not relying on a perfect mood.",
        [
          "After I make my morning coffee, I will read two pages.",
          "Record a small check after you finish.",
          "After a missed day, return to the smallest version.",
        ],
      ),
      section(
        "Make it sustainable",
        "Review your habit after a week. If you repeatedly skip it, adjust the cue, the timing, or the size of the action. Consistency grows from a workable system, not from punishing yourself for interruptions.",
      ),
    ],
  ),
  create(
    "active-listening",
    "The art of actually listening",
    "Simple shifts that make every conversation feel more meaningful.",
    "communication",
    "Text",
    8,
    photos.communication,
    [
      section(
        "Give the other person room",
        "Listening is a skill you can practice. Begin by putting away your phone and allowing the speaker to finish a thought before preparing your response. A short pause often invites the most useful detail.",
      ),
      section(
        "Reflect before responding",
        "Try summarizing what you heard in your own words: “It sounds like the deadline is worrying you.” Ask whether you understood correctly. Reflection is a check, not an assumption about another person’s emotions.",
        [
          "Ask an open question: What has been the hardest part?",
          "Avoid immediately offering a solution.",
          "Ask: Would you like ideas, or would listening help most?",
        ],
      ),
      section(
        "Try it today",
        "In your next conversation, set yourself one intention: ask a follow-up question before sharing your own story. Afterward, consider what you learned that you might otherwise have missed.",
      ),
    ],
  ),
  create(
    "better-sleep",
    "Build a better relationship with sleep",
    "Create a realistic evening routine that supports rest and recovery.",
    "health",
    "Text",
    7,
    photos.sleep,
    [
      section(
        "Give sleep a regular place",
        "Most adults need at least seven hours of sleep, though individual needs vary. A consistent wake time can help support your body’s sleep rhythm. Choose a schedule that fits your real responsibilities.",
      ),
      section(
        "Create a wind-down routine",
        "Use the last part of your evening to lower stimulation. Dim bright lights, prepare tomorrow’s essentials, and choose a calming activity. Keep your bedroom comfortable, dark, and quiet where possible.",
        [
          "Notice whether late caffeine affects your sleep.",
          "Allow time to settle instead of forcing sleep.",
          "Keep a brief sleep diary for one week.",
        ],
      ),
      section(
        "When to seek support",
        "Persistent insomnia, heavy snoring, or daytime sleepiness deserve attention from a qualified clinician. These suggestions are general education, not treatment. Source: CDC, About Sleep (cdc.gov/sleep).",
      ),
    ],
  ),
  create(
    "mindful-pause",
    "A three-minute reset",
    "A guided pause to slow down, notice your breathing, and return with intention.",
    "wellbeing",
    "Audio",
    3,
    photos.sleep,
    [
      section(
        "Make a little space",
        "Sit in a position that feels comfortable. You can keep your eyes open. Let your breathing stay natural; there is no particular pace to achieve.",
      ),
      section(
        "Return gently",
        "If focusing on your breath feels uncomfortable, notice the contact of your feet with the floor or the sounds around you. Pause the recording whenever you need. This is an optional awareness practice, not mental health treatment.",
      ),
    ],
    "Beginner",
    "/media/mindful-pause.wav",
    "Original get2max guided practice, spoken with the Windows speech engine.",
  ),
  create(
    "focus-session",
    "Prepare for focused work",
    "An audio walkthrough for choosing one task and creating a useful focus block.",
    "productivity",
    "Audio",
    3,
    photos.habit,
    [
      section(
        "Choose one outcome",
        "Before you play the guide, have your task list and a glass of water nearby. Choose a single useful outcome that is realistic for the next 25 minutes.",
      ),
      section(
        "After the recording",
        "Set a timer, silence unnecessary notifications, and begin the first step. Take a short break at the end and note what helped you focus.",
      ),
    ],
    "Beginner",
    "/media/focus-session.wav",
    "Original get2max focus guide, spoken with the Windows speech engine.",
  ),
  create(
    "notice-nature",
    "Notice more. Slow down.",
    "Practice attentive observation with a short, quiet nature study.",
    "wellbeing",
    "Video",
    2,
    photos.sleep,
    [
      section(
        "An observation practice",
        "Watch the short nature clip once. Notice color, light, movement, and any details you initially missed. The clip repeats a simple scene so you can practice staying with one thing.",
      ),
      section(
        "Take it outside",
        "After watching, spend a minute observing a plant or the view from your window. Describe three specific details without judging them. The sample clip is brief; repeat the exercise for two minutes.",
      ),
    ],
    "Beginner",
    "/media/notice-nature.mp4",
    "Flower demonstration video from MDN, CC0. Used for an attentive observation exercise.",
  ),
  create(
    "money-map",
    "Your first personal money map",
    "Understand where your money goes and give every priority a place.",
    "finance",
    "Text",
    9,
    photos.finance,
    [
      section(
        "Start with a snapshot",
        "Write down your usual monthly take-home income and recurring costs. Include irregular expenses by dividing their annual cost by twelve. You are gathering information, not judging past decisions.",
      ),
      section(
        "Separate needs, wants, and future you",
        "Group expenses in a way that makes sense for your circumstances. There is no universal percentage split. First protect essentials and minimum debt payments, then choose achievable saving goals.",
        [
          "List income and essential costs.",
          "Identify one expense you can adjust.",
          "Choose a small amount to set aside regularly.",
        ],
      ),
      section(
        "Review, then revise",
        "Review your plan each month. If your income varies, build around a cautious estimate. This is general financial education, not individual financial advice.",
      ),
    ],
  ),
  create(
    "learning-that-sticks",
    "Learn it once. Remember it longer.",
    "Use active recall and spacing to make your learning time count.",
    "knowledge",
    "Text",
    7,
    photos.learning,
    [
      section(
        "Try remembering before rereading",
        "Close the book and write what you remember. Retrieval makes gaps visible and helps strengthen memory. Check your answer afterward and correct misunderstandings.",
      ),
      section(
        "Space the practice",
        "Revisit material across several days instead of one long session. A simple starting schedule is tomorrow, three days later, and a week later. Adjust when material feels too easy or too difficult.",
        [
          "Write three questions after each lesson.",
          "Answer without looking at your notes.",
          "Explain an idea in everyday words.",
        ],
      ),
      section(
        "Connect it to a real problem",
        "Apply one idea to something you already do. A budgeting concept can help you plan groceries; a communication technique can improve your next team meeting.",
      ),
    ],
  ),
  create(
    "daily-care",
    "A little care, every day",
    "Build a personal care routine around comfort, health, and your own preferences.",
    "appearance",
    "Text",
    5,
    photos.care,
    [
      section(
        "Keep the basics simple",
        "Choose a gentle routine you can comfortably afford and maintain. Skin, hair, and clothing needs vary. Cleanliness, comfort, and sun protection are useful foundations; appearance does not determine your worth.",
      ),
      section(
        "Introduce changes gradually",
        "For skin care, try one new product at a time and follow the label. A broad-spectrum sunscreen can help reduce UV exposure. Consult a qualified professional for persistent irritation or skin changes.",
        [
          "Choose a manageable morning routine.",
          "Use products suitable for your skin and preferences.",
          "Set aside a few minutes for preparation the night before.",
        ],
      ),
    ],
  ),
  create(
    "move-more",
    "Make everyday movement easier",
    "Build movement into the life you already have, one small step at a time.",
    "health",
    "Text",
    6,
    photos.fitness,
    [
      section(
        "Begin where you are",
        "Walking, stretching, cycling, and daily tasks all contribute to movement. Choose something you enjoy and adjust it to your abilities. Even a short activity break can be a useful start.",
      ),
      section(
        "Build gradually",
        "General WHO guidance recommends 150–300 minutes of moderate aerobic activity weekly for adults, plus muscle strengthening on two or more days. You can build toward this over time; some movement is better than none.",
        [
          "Try a ten-minute walk when it fits your day.",
          "Break up long periods of sitting.",
          "Choose a sustainable weekly rhythm.",
        ],
      ),
      section(
        "Listen to your body",
        "Stop if you feel pain, dizziness, or unusual symptoms. Seek individual guidance when needed, especially if you have a health condition. Source: WHO Physical Activity fact sheet (who.int).",
      ),
    ],
  ),
  create(
    "speak-with-clarity",
    "Say what you mean, with clarity",
    "Organize your ideas into a simple structure your listener can follow.",
    "communication",
    "Text",
    10,
    photos.communication,
    [
      section(
        "One message at a time",
        "Before speaking, ask yourself what you want the listener to understand. State that point first, give a reason, then offer a concrete example. More detail can follow if it is useful.",
      ),
      section(
        "Practice a short explanation",
        "Choose a familiar topic and explain it in one minute. Record yourself if you feel comfortable. Listen for your central point and remove details that do not support it.",
        [
          "State your main point.",
          "Give one reason and a concrete example.",
          "Finish with a specific next step or question.",
        ],
      ),
      section(
        "Make room for understanding",
        "Ask “What would be useful to clarify?” and give people time to respond. Clear communication is a shared process, not a performance.",
      ),
    ],
    "Intermediate",
  ),
  create(
    "weekly-review",
    "The weekly review that actually helps",
    "Reflect, reset, and plan a week with room to breathe.",
    "productivity",
    "Text",
    8,
    photos.habit,
    [
      section(
        "Look back with curiosity",
        "Set aside fifteen minutes. List what you finished, what remains open, and what took more energy than you expected. A review is a tool for adjustment, not a score of your personal value.",
      ),
      section(
        "Choose fewer priorities",
        "Pick up to three outcomes for the coming week. Put time for them on your calendar, then leave room for ordinary tasks, rest, and unexpected events.",
        [
          "Close or reschedule open commitments.",
          "Choose one thing to stop or simplify.",
          "Schedule a realistic first action.",
        ],
      ),
      section(
        "Keep the review useful",
        "At the next review, check whether your estimates were realistic. If the process feels burdensome, shorten it to three questions: What worked? What did not? What is next?",
      ),
    ],
    "Intermediate",
  ),
  create(
    "financial-buffer",
    "Build a financial buffer",
    "A practical approach to saving for the unexpected at your own pace.",
    "finance",
    "Text",
    6,
    photos.finance,
    [
      section(
        "Choose a first milestone",
        "A financial buffer can help with an unexpected bill or temporary loss of income. Start with a target that feels reachable, even if it is small. Your ideal amount depends on your costs and circumstances.",
      ),
      section(
        "Make the process repeatable",
        "If possible, use a separate accessible savings account and a small recurring transfer. Check account fees and access rules before choosing where to save.",
        [
          "Set a modest first milestone.",
          "Choose an amount you can maintain.",
          "Review the target after changes in income or expenses.",
        ],
      ),
      section(
        "Balance competing needs",
        "Essential costs and expensive debt may need priority. If money is tight, seek reputable local advice. This resource provides general education, not individualized financial recommendations.",
      ),
    ],
  ),
  create(
    "wind-down",
    "An evening wind-down",
    "An audio reflection to leave unfinished tasks on paper and settle into your evening.",
    "health",
    "Audio",
    3,
    photos.sleep,
    [
      section(
        "Before you begin",
        "Put a notebook nearby and sit comfortably. This guide helps you write down unfinished tasks and choose one simple cue for a calmer evening.",
      ),
      section(
        "Build your own routine",
        "After listening, lower the lights and choose a quiet activity you enjoy. If sleep problems persist, speak with a qualified clinician.",
      ),
    ],
    "Beginner",
    "/media/wind-down.wav",
    "Original get2max evening guide, spoken with the Windows speech engine.",
  ),
  create(
    "confident-conversations",
    "Make connection a practice",
    "Build confidence with small, thoughtful conversations.",
    "communication",
    "Text",
    6,
    photos.communication,
    [
      section(
        "Set a manageable intention",
        "Choose one small action, such as greeting a colleague or asking a classmate about their project. Social confidence can develop through repeated practice in situations that feel manageable.",
      ),
      section(
        "Be interested and specific",
        "Ask about something the person has chosen to share. Listen to their response and ask a natural follow-up. Respect boundaries and remember that a short exchange can be a positive interaction.",
        [
          "Start with a shared context.",
          "Ask one open question.",
          "Reflect on what went well afterward.",
        ],
      ),
    ],
  ),
];
const makeCourse = (
  id: string,
  title: string,
  description: string,
  categoryId: string,
  ids: string[],
  thumbnail: string,
): Course => ({
  id,
  slug: id,
  title,
  description,
  categoryId,
  difficulty: "Beginner",
  estimatedDuration: ids.reduce(
    (n, id) => n + (resources.find((r) => r.id === id)?.durationMinutes || 0),
    0,
  ),
  lessons: ids.map((resourceId, i) => ({
    id: `${id}-${i + 1}`,
    title: resources.find((r) => r.id === resourceId)!.title,
    resourceId,
    order: i + 1,
  })),
  thumbnail,
});
export const courses: Course[] = [
  makeCourse(
    "sustainable-habits",
    "Building Sustainable Habits",
    "Start small, build consistency, and create a routine that works for your life.",
    "productivity",
    ["small-habits", "focus-session", "weekly-review"],
    photos.habit,
  ),
  makeCourse(
    "effective-communication",
    "Foundations of Effective Communication",
    "Listen with intention, express yourself clearly, and connect with confidence.",
    "communication",
    ["active-listening", "speak-with-clarity", "confident-conversations"],
    photos.communication,
  ),
  makeCourse(
    "personal-finance",
    "Introduction to Personal Finance",
    "Understand your money and take practical steps toward a more secure future.",
    "finance",
    ["money-map", "financial-buffer", "weekly-review"],
    photos.finance,
  ),
  makeCourse(
    "sleep-quality",
    "Improving Sleep Quality",
    "Understand rest and build a gentle, sustainable evening routine.",
    "health",
    ["better-sleep", "wind-down", "mindful-pause"],
    photos.sleep,
  ),
  makeCourse(
    "productivity-fundamentals",
    "Productivity Fundamentals",
    "Create space for focused work, meaningful learning, and regular reflection.",
    "productivity",
    ["focus-session", "learning-that-sticks", "weekly-review"],
    photos.learning,
  ),
];
export function initialGoals(): Goal[] {
  const createdAt = new Date().toISOString();
  return [
    {
      id: "read-12-books",
      title: "Read 12 books this year",
      description:
        "Make a little room for reading every day. Any genre counts.",
      categoryId: "knowledge",
      targetValue: 12,
      currentValue: 4,
      unit: "books",
      deadline: "",
      status: "active",
      createdAt,
      kind: "numerical",
    },
    {
      id: "move-every-week",
      title: "Make movement a habit",
      description: "Go for 20 intentional walks at a comfortable pace.",
      categoryId: "health",
      targetValue: 20,
      currentValue: 8,
      unit: "walks",
      deadline: "",
      status: "active",
      createdAt,
      kind: "numerical",
    },
    {
      id: "communication-course",
      title: "Become a better communicator",
      description:
        "Complete Foundations of Effective Communication and try one skill in daily life.",
      categoryId: "communication",
      targetValue: 1,
      currentValue: 0,
      unit: "completed",
      deadline: "",
      status: "active",
      createdAt,
      kind: "completion",
    },
  ];
}
export const categoryFor = (id: string) => categories.find((c) => c.id === id)!;
