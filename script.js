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
  "Fuck. Nah.",
  "My sources say 'oof'",
];

document.addEventListener('DOMContentLoaded', () => {
  const answerEl = document.getElementById('answer');
  const questionInput = document.getElementById('question');
  const askButton = document.getElementById('askButton');
  const sound = document.getElementById('magicSound');

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
    const userQuestion = questionInput.value.trim();

    if (userQuestion === '') {
      answerEl.textContent = "Ask a question first!";
      answerEl.classList.add('show');
      return;
    }

    if (!isYesNoQuestion(userQuestion)) {
      answerEl.textContent = "Try a yes or no question!";
      answerEl.classList.add('show');
      return;
    }

    answerEl.classList.remove('show');
    shakeWrapper.classList.remove('shake');
    void shakeWrapper.offsetWidth; // Force reflow to restart animation
    shakeWrapper.classList.add('shake');

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * answers.length);
      const newAnswer = answers[randomIndex];
      answerEl.textContent = newAnswer;

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
  questionInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') shakeBall();
  });
});


// Function to dynamically center the answer inside the ball
/*
function centerAnswerOverlay() {
  const img = document.querySelector('.ball-image');
  const answer = document.getElementById('answer');

  if (!img || !answer) return;

  const rect = img.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  answer.style.left = `${centerX -20}px`;
  answer.style.top = `${centerY + 100}px`;
}
*/
