import React, { useState } from 'react';
import { QUIZ_QUESTIONS, COFFEE_BEANS } from '../data/coffeeData';
import type { CoffeeBean } from '../types/coffee';
import { SparklesIcon, StarIcon, ShoppingBagIcon, TimerIcon, RotateCcwIcon } from './CoffeeIcons';
import { sound } from '../utils/audio';

interface CupFinderQuizProps {
  onNavigateBrew: (beanId: string) => void;
  onAddToCart: (bean: CoffeeBean, grind: string) => void;
}

export const CupFinderQuiz: React.FC<CupFinderQuizProps> = ({ onNavigateBrew, onAddToCart }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [matchedBean, setMatchedBean] = useState<CoffeeBean | null>(null);
  const [matchScore, setMatchScore] = useState<number>(96);

  const currentQ = QUIZ_QUESTIONS[currentStepIndex];
  const isLastQuestion = currentStepIndex === QUIZ_QUESTIONS.length - 1;

  const handleSelectOption = (optionIndex: number, favoredBeanIds: string[]) => {
    sound.playClick();
    const newAnswers = { ...answers, [currentQ.id]: `${optionIndex}` };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Calculate best match
      sound.playSuccess();
      const randomTopFav = favoredBeanIds[0] || 'ethiopia-yirgacheffe';
      const found = COFFEE_BEANS.find((b) => b.id === randomTopFav) || COFFEE_BEANS[0];
      setMatchedBean(found);
      setMatchScore(Math.floor(Math.random() * 5) + 95); // 95% - 99%
      setCurrentStepIndex(QUIZ_QUESTIONS.length);
    } else {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleRestart = () => {
    sound.playClick();
    setAnswers({});
    setMatchedBean(null);
    setCurrentStepIndex(0);
  };

  const progressPct = ((currentStepIndex) / QUIZ_QUESTIONS.length) * 100;

  return (
    <section className="quiz-section">
      {/* Section Head */}
      <div className="section-head">
        <div className="section-badge">
          <SparklesIcon size={14} color="#f4a261" />
          <span>SENSORY PALATE PROFILER</span>
        </div>
        <h2 className="section-title">Find Your Ideal Specialty Cup</h2>
        <p className="section-subtitle">
          Answer 4 quick sensory questions to discover the exact single-origin micro-lot and brew method tailored to your tastebuds.
        </p>
      </div>

      <div className="quiz-card-wrapper">
        {matchedBean ? (
          /* Result Card */
          <div className="quiz-result-card">
            <div className="result-top-badge">
              <span className="affinity-badge">🎯 {matchScore}% Palate Match Found</span>
              <span className="sca-badge">
                <StarIcon size={14} color="#f4a261" />
                {matchedBean.scaScore} SCA Score
              </span>
            </div>

            <h3 className="result-headline">Your Ideal Match: {matchedBean.name}</h3>
            <span className="result-origin">{matchedBean.region}, {matchedBean.country} • {matchedBean.elevation}</span>

            <p className="result-story">{matchedBean.description}</p>

            {/* Tasting Notes */}
            <div className="result-notes-row">
              <span className="notes-lbl">Tasting Notes:</span>
              <div className="notes-pill-group">
                {matchedBean.tastingNotes.map((note, idx) => (
                  <span key={idx} className="t-pill">
                    ✨ {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Pairing parameters */}
            <div className="result-params-grid">
              <div className="r-param-item">
                <span className="r-lbl">Recommended Brewer</span>
                <span className="r-val">{matchedBean.recommendedBrew}</span>
              </div>
              <div className="r-param-item">
                <span className="r-lbl">Roast Profile</span>
                <span className="r-val">{matchedBean.roastLevel} Roast</span>
              </div>
              <div className="r-param-item">
                <span className="r-lbl">Process Method</span>
                <span className="r-val">{matchedBean.process}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="result-actions-row">
              <button
                className="btn btn-primary"
                onClick={() => {
                  sound.playSuccess();
                  onAddToCart(matchedBean, 'Whole Bean (Recommended)');
                }}
              >
                <ShoppingBagIcon size={18} />
                <span>Add to Bag (${matchedBean.price.toFixed(2)})</span>
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => {
                  sound.playClick();
                  onNavigateBrew(matchedBean.id);
                }}
              >
                <TimerIcon size={18} />
                <span>Dial In with Brew Timer</span>
              </button>

              <button
                className="btn btn-ghost"
                onClick={handleRestart}
              >
                <RotateCcwIcon size={16} />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        ) : (
          /* Question Card */
          <div className="quiz-question-card">
            {/* Progress Bar */}
            <div className="quiz-progress-bar">
              <div className="quiz-progress-fill" style={{ width: `${progressPct}%` }}></div>
            </div>

            <div className="quiz-step-count">
              Question {currentStepIndex + 1} of {QUIZ_QUESTIONS.length}
            </div>

            <h3 className="quiz-q-title">{currentQ.question}</h3>
            <p className="quiz-q-sub">{currentQ.subtitle}</p>

            <div className="quiz-options-list">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  className="quiz-option-btn"
                  onClick={() => handleSelectOption(idx, opt.favors)}
                >
                  <div className="opt-marker">
                    <span className="opt-letter">{String.fromCharCode(65 + idx)}</span>
                  </div>
                  <div className="opt-text-col">
                    <span className="opt-title">{opt.label}</span>
                    <span className="opt-desc">{opt.description}</span>
                  </div>
                </button>
              ))}
            </div>

            {currentStepIndex > 0 && (
              <button
                className="btn-quiz-back"
                onClick={() => {
                  sound.playClick();
                  setCurrentStepIndex(currentStepIndex - 1);
                }}
              >
                ← Back to previous question
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
