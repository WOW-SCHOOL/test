/**
 * WOW SCHOOL · English File Beginner · Lesson 1A
 * SOURCE LOCK: content is limited to lesson 1A language areas:
 * verb be (I / you), numbers 0–10, /h/ /aɪ/ /iː/,
 * days of the week, introductions, café phrases, and saying goodbye.
 */
window.UNIT_DATA = {
  id: "1A",
  title: "A cappuccino, please",
  level: "Beginner",
  product: "English File",
  version: "2.0.0",
  storageKey: "wow_ef_beginner_1a_review_v2",


  audio: {
    dialogue: "assets/audio/listening_mission.mp3",
    goodbye: "assets/audio/goodbye_friday.mp3",
    numbers: {
      0:"assets/audio/number_0.mp3",1:"assets/audio/number_1.mp3",2:"assets/audio/number_2.mp3",3:"assets/audio/number_3.mp3",4:"assets/audio/number_4.mp3",5:"assets/audio/number_5.mp3",6:"assets/audio/number_6.mp3",7:"assets/audio/number_7.mp3",8:"assets/audio/number_8.mp3",9:"assets/audio/number_9.mp3",10:"assets/audio/number_10.mp3"
    },
    words: {
      "house":"assets/audio/word_house.mp3", "hi":"assets/audio/word_hi.mp3", "hello":"assets/audio/word_hello.mp3", "Helen":"assets/audio/word_helen.mp3",
      "I’m":"assets/audio/word_im.mp3", "nice":"assets/audio/word_nice.mp3", "five":"assets/audio/word_five.mp3", "nine":"assets/audio/word_nine.mp3",
      "meet":"assets/audio/word_meet.mp3", "three":"assets/audio/word_three.mp3", "tea":"assets/audio/word_tea.mp3", "please":"assets/audio/word_please.mp3"
    }
  },

  blocks: [
    { key: "phrases", label: "Words & Phrases", short: "Phrases", icon: "💬", accent: "blue" },
    { key: "grammar", label: "Grammar", short: "Grammar", icon: "⚙", accent: "violet" },
    { key: "numbers", label: "Numbers 0–10", short: "Numbers", icon: "123", accent: "cyan" },
    { key: "days", label: "Days & Goodbye", short: "Days", icon: "📅", accent: "orange" },
    { key: "pronunciation", label: "Pronunciation", short: "Sounds", icon: "♫", accent: "pink" },
    { key: "listening", label: "Listening Mission", short: "Listening", icon: "🎧", accent: "teal" }
  ],

  phrases: [
    ["Hello.", "Здравствуйте / Привет."],
    ["Hi.", "Привет."],
    ["What’s your name?", "Как тебя / вас зовут?"],
    ["Nice to meet you.", "Приятно познакомиться."],
    ["A cappuccino, please.", "Капучино, пожалуйста."],
    ["A tea, please.", "Чай, пожалуйста."],
    ["Yes.", "Да."],
    ["No.", "Нет."],
    ["OK.", "Хорошо."],
    ["Thanks.", "Спасибо."],
    ["Sorry.", "Извините."],
    ["Just a minute.", "Минутку."]
  ],

  grammar: [
    { html: "I ___ Helen.", options: ["am", "are"], answer: "am" },
    { html: "You ___ Tom.", options: ["am", "are"], answer: "are" },
    { html: "I ___ not Ellen.", options: ["am", "are"], answer: "am" },
    { html: "You ___ not Dom.", options: ["am", "are"], answer: "are" },
    { html: "___ you Helen?", options: ["Am", "Are"], answer: "Are" },
    { html: "___ I in class 2?", options: ["Am", "Are"], answer: "Am" },
    { html: "Are you Mike? — Yes, I ___.", options: ["am", "are"], answer: "am" },
    { html: "Are you Mike? — No, I’m ___.", options: ["not", "aren’t"], answer: "not" },
    { html: "Am I in your class? — Yes, you ___.", options: ["am", "are"], answer: "are" },
    { html: "Am I in room 8? — No, you ___.", options: ["aren’t", "am not"], answer: "aren’t" },
    { html: "I am Helen. → ___ Helen.", options: ["I’m", "You’re"], answer: "I’m" },
    { html: "You are Tom. → ___ Tom.", options: ["I’m", "You’re"], answer: "You’re" }
  ],

  numbers: {
    audioRounds: [7, 3, 0, 8, 9, 1, 4, 10],
    sequences: [
      { prompt: [1, 2, null], answer: 3 },
      { prompt: [7, 8, null], answer: 9 },
      { prompt: [4, 5, null], answer: 6 },
      { prompt: [8, 9, null], answer: 10 }
    ],
    words: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]
  },

  days: {
    correctOrder: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    startOrder: ["Thursday", "Monday", "Saturday", "Tuesday", "Friday", "Sunday", "Wednesday"],
    quick: [
      { q: "Monday → ?", options: ["Tuesday", "Friday", "Sunday"], answer: "Tuesday" },
      { q: "Wednesday → ?", options: ["Thursday", "Monday", "Saturday"], answer: "Thursday" },
      { q: "Friday → ?", options: ["Sunday", "Saturday", "Tuesday"], answer: "Saturday" },
      { q: "Goodbye, Tom. See you on ___.", options: ["Friday", "five", "tea"], answer: "Friday" },
      { q: "Goodbye. See you ___.", options: ["tomorrow", "cappuccino", "nine"], answer: "tomorrow" }
    ]
  },

  pronunciation: {
    bins: [
      { key: "h", symbol: "/h/", guide: "house", words: ["house", "hi", "hello", "Helen"] },
      { key: "ai", symbol: "/aɪ/", guide: "bike", words: ["I’m", "nice", "five", "nine"] },
      { key: "ee", symbol: "/iː/", guide: "tree", words: ["meet", "three", "tea", "please"] }
    ]
  },

  listening: {
    /** Original practice dialogue assembled only from language already introduced in 1A. */
    lines: [
      { speaker: "A", text: "Hello. I’m Mike. What’s your name?" },
      { speaker: "B", text: "Hi. I’m Helen." },
      { speaker: "A", text: "Nice to meet you, Helen." },
      { speaker: "B", text: "Nice to meet you." },
      { speaker: "A", text: "A tea, please." },
      { speaker: "B", text: "A cappuccino for me." },
      { speaker: "A", text: "One tea and one cappuccino. OK." },
      { speaker: "B", text: "Thanks." },
      { speaker: "A", text: "Goodbye, Helen. See you on Friday." },
      { speaker: "B", text: "Bye." }
    ],
    questions: [
      { q: "Как зовут мужчину?", options: ["Mike", "Tom", "Dom"], answer: "Mike" },
      { q: "Как зовут женщину?", options: ["Helen", "Ellen", "Sally"], answer: "Helen" },
      { q: "Что заказывает мужчина?", options: ["A tea", "A cappuccino", "Two teas"], answer: "A tea" },
      { q: "Что заказывает женщина?", options: ["A cappuccino", "A tea", "Three teas"], answer: "A cappuccino" },
      { q: "Сколько напитков в заказе?", options: ["One", "Two", "Three"], answer: "Two" },
      { q: "Какая знакомая фраза звучит?", options: ["Nice to meet you.", "Are you Diana?", "Just a minute."], answer: "Nice to meet you." },
      { q: "Какой день недели звучит?", options: ["Friday", "Monday", "Sunday"], answer: "Friday" },
      { q: "Какое последнее слово в диалоге?", options: ["Bye.", "Sorry.", "Hello."], answer: "Bye." }
    ]
  },

  resultMessages: {
    strong: "Отлично закреплено",
    medium: "Почти готово",
    weak: "Нужно повторить"
  }
};
