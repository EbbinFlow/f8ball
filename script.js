document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('startButton');
  const homeScreen = document.getElementById('homeScreen');
  const introVideoContainer = document.getElementById('introVideoContainer');
  const introVideo = document.getElementById('introVideo');
  const mainApp = document.getElementById('mainApp');

  startButton.addEventListener('click', () => {
    homeScreen.classList.add('hidden');
    introVideoContainer.classList.remove('hidden');
    introVideo.play();
  });

  introVideo.addEventListener('ended', () => {
    introVideoContainer.classList.add('hidden');
    mainApp.classList.remove('hidden');
  });
});

const answers = [
  "Surprisingly, yes",
  "Sure, why not",
  "Absolutely",
  "Yuppers",
  "Maybes",
  "Yeah, I guess.",
  "I'm not sure, but I'm gonna lie. Yes.",
  "Technically... yes.",
  "Hell no!",
  "LOL, no",
  "Not in this timeline",
  "You're kidding, right?",
  "Absolutely... not",
  "Oh sweetie, no",
  "Nooooooo",
  "Ask your mom",
  "Go touch grass",
  "LMAO no",
  "Nah fam",
  "My sources say 'oof'",
];

document.addEventListener('DOMContentLoaded', () => {
  const answerEl = document.getElementById('answer');
  const questionInput = document.getElementById('question');
  const askButton = document.getElementById('askButton');
  const sound = document.getElementById('magicSound');
  let lastQuestion = "";

  function isYesNoQuestion(text) {
    const trimmed = text.trim().toLowerCase();
    const yesNoStarters = [
      'is', 'are', 'can', 'will', 'should', 'do', 'does',
      'did', 'would', 'could', 'have', 'has', 'am'
    ];
    const firstWord = trimmed.split(/\s+/)[0];
    return yesNoStarters.includes(firstWord);
  }

  const shakeBall = () => {
    const shakeWrapper = document.querySelector('.shake-wrapper');
    let rawInput = questionInput.textContent || "";
    let userQuestion = rawInput
  .replace(/[’‘]/g, "'")         // Normalize curly apostrophes
  .replace(/[^\w\s']/g, '')      // Remove punctuation except apostrophes
  .replace(/\s+/g, ' ')          // Collapse spaces
  .trim()
  .toLowerCase();


    const specialQuestions = [
  "what is the meaning of life",
  "what is the meaning of the universe",
  "whats the answer to everything",
  "what is the ultimate answer",
  "why are we here",
  "what is the purpose of existence",
  "what is the answer to life the universe and everything",
  "what is the meaning of it all",
  "is there a purpose to life"
];


    if (userQuestion === '') {
      answerEl.textContent = "Ask a question first!";
      answerEl.classList.add('show');
      return;
    }

    if (!isYesNoQuestion(userQuestion) && !specialQuestions.includes(userQuestion)) {
      answerEl.textContent = "Try a yes or no question!";
      answerEl.classList.add('show');
      return;
    }

    if (userQuestion === lastQuestion) {
      answerEl.textContent = "You already asked that!";
      answerEl.classList.add('show');
      return;
    }

    answerEl.classList.remove('show');
    shakeWrapper.classList.remove('shake');
    void shakeWrapper.offsetWidth;
    shakeWrapper.classList.add('shake');

    setTimeout(() => {
      let newAnswer;

      if (specialQuestions.includes(userQuestion)) {
        newAnswer = "42";
      } else {
        const randomIndex = Math.floor(Math.random() * answers.length);
        newAnswer = answers[randomIndex];
      }

      answerEl.textContent = newAnswer;
      lastQuestion = userQuestion;

      const utterance = new SpeechSynthesisUtterance(newAnswer);
      utterance.voice = speechSynthesis.getVoices().find(v => v.name.toLowerCase().includes("fred")) || null;
      window.speechSynthesis.speak(utterance);

      sound.load();
      sound.play().catch(e => console.error("Audio playback failed:", e));

      answerEl.classList.add('show');
      shakeWrapper.classList.remove('shake');
    }, 800);
  };

  askButton.addEventListener('click', shakeBall);

  questionInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      shakeBall();
    }
  });

  questionInput.addEventListener('blur', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
});
