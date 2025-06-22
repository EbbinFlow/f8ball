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
  "Nope. Not today.",
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
    let userQuestion = questionInput.textContent.trim();

    if (userQuestion === '') {
      answerEl.textContent = "Ask a question first!";
      answerEl.classList.add('show');
      return;
    }

    // Normalize question for logic
    const cleanedQuestion = userQuestion.toLowerCase().replace(/\?$/, '').trim();

    // === CURTIS VIDEO TRIGGER ===
    if (cleanedQuestion === "is curtis gay") {
      window.open("https://youtube.com/shorts/6xed7PDbGKI?feature=share", "_blank");
      return;
    }

    // Prevent same question
    if (cleanedQuestion === lastQuestion) {
      answerEl.textContent = "You already asked that!";
      answerEl.classList.add('show');
      return;
    }

    // Validate yes/no style
    if (!isYesNoQuestion(cleanedQuestion)) {
      answerEl.textContent = "Try a yes or no question!";
      answerEl.classList.add('show');
      return;
    }

    // Shake and show new answer
    answerEl.classList.remove('show');
    shakeWrapper.classList.remove('shake');
    void shakeWrapper.offsetWidth;
    shakeWrapper.classList.add('shake');

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * answers.length);
      const newAnswer = answers[randomIndex];
      answerEl.textContent = newAnswer;
      lastQuestion = cleanedQuestion;

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
