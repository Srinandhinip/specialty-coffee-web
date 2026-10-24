import React, { useState, useEffect, useRef } from 'react';
import { BREW_METHODS, COFFEE_BEANS } from '../data/coffeeData';
import type { BrewMethod, CoffeeBean } from '../types/coffee';
import { 
  PlayIcon, 
  PauseIcon, 
  RotateCcwIcon, 
  ConeIcon, 
  HourglassIcon, 
  PressIcon, 
  CarafeIcon, 
  CupIcon, 
  DropIcon, 
  SparklesIcon, 
  ThermometerIcon, 
  CheckIcon 
} from './CoffeeIcons';
import { sound } from '../utils/audio';

interface BrewLabProps {
  selectedBeanId?: string;
  onSelectBean?: (id: string) => void;
  onAddToCart?: (bean: CoffeeBean, grind: string) => void;
}

export const BrewLab: React.FC<BrewLabProps> = ({ selectedBeanId, onAddToCart }) => {
  const [selectedMethodId, setSelectedMethodId] = useState<string>('v60');
  const [activeBeanId, setActiveBeanId] = useState<string>(selectedBeanId || 'ethiopia-yirgacheffe');

  const currentMethod: BrewMethod = BREW_METHODS.find((m) => m.id === selectedMethodId) || BREW_METHODS[0];
  const currentBean: CoffeeBean = COFFEE_BEANS.find((b) => b.id === activeBeanId) || COFFEE_BEANS[0];

  // Calculator States
  const [dose, setDose] = useState<number>(currentMethod.defaultDose);
  const [ratio, setRatio] = useState<number>(currentMethod.defaultRatio);

  // Update defaults when method changes
  useEffect(() => {
    setDose(currentMethod.defaultDose);
    setRatio(currentMethod.defaultRatio);
    resetTimer();
  }, [selectedMethodId]);

  // Sync if prop changed
  useEffect(() => {
    if (selectedBeanId) {
      setActiveBeanId(selectedBeanId);
    }
  }, [selectedBeanId]);

  // Derived Calculations
  const isEspresso = currentMethod.id === 'espresso';
  const totalWater = Math.round(dose * ratio);
  const approxYield = isEspresso ? Math.round(dose * ratio) : Math.round(totalWater * 0.88);
  const estimatedCaffeine = Math.round(dose * 11.5); // ~11.5mg caffeine per gram of arabica

  // Timer States
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [brewCompleted, setBrewCompleted] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  // Steps for the current method
  const steps = currentMethod.steps;
  const currentStep = steps[currentStepIndex] || steps[0];

  // Calculate cumulative step timing
  const stepStartTimes = steps.reduce<number[]>((acc, _step, index) => {
    if (index === 0) return [0];
    return [...acc, acc[index - 1] + steps[index - 1].durationSeconds];
  }, []);

  const totalBrewDuration = steps.reduce((sum, step) => sum + step.durationSeconds, 0);

  // Run the live timer
  useEffect(() => {
    if (timerRunning) {
      timerRef.current = window.setInterval(() => {
        setSecondsElapsed((prev) => {
          const nextSec = prev + 1;

          // Check if step completed
          const nextStepIdx = stepStartTimes.findIndex((startTime, idx) => {
            const stepEnd = startTime + steps[idx].durationSeconds;
            return nextSec >= startTime && nextSec < stepEnd;
          });

          if (nextStepIdx !== -1 && nextStepIdx !== currentStepIndex) {
            setCurrentStepIndex(nextStepIdx);
            sound.playTimerBell();
          }

          if (nextSec >= totalBrewDuration) {
            // Completed!
            setTimerRunning(false);
            setBrewCompleted(true);
            sound.playSuccess();
            return totalBrewDuration;
          }

          return nextSec;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerRunning, currentStepIndex, stepStartTimes, steps, totalBrewDuration]);

  const toggleTimer = () => {
    sound.playClick();
    if (brewCompleted) {
      resetTimer();
      setTimerRunning(true);
      return;
    }
    setTimerRunning(!timerRunning);
  };

  const resetTimer = () => {
    sound.playClick();
    setTimerRunning(false);
    setSecondsElapsed(0);
    setCurrentStepIndex(0);
    setBrewCompleted(false);
  };

  const skipToStep = (index: number) => {
    sound.playClick();
    setCurrentStepIndex(index);
    setSecondsElapsed(stepStartTimes[index]);
  };

  // Format seconds mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const timerProgressPct = Math.min(100, Math.round((secondsElapsed / totalBrewDuration) * 100));

  const getMethodIcon = (iconName: string) => {
    switch (iconName) {
      case 'cone': return <ConeIcon size={24} />;
      case 'hourglass': return <HourglassIcon size={24} />;
      case 'press': return <PressIcon size={24} />;
      case 'carafe': return <CarafeIcon size={24} />;
      case 'cup': return <CupIcon size={24} />;
      case 'drop': return <DropIcon size={24} />;
      default: return <ConeIcon size={24} />;
    }
  };

  return (
    <div className="brew-lab-section">
      {/* Section Header */}
      <div className="section-head">
        <div className="section-badge">
          <SparklesIcon size={14} color="#f4a261" />
          <span>PRECISION EXTRACTION SUITE</span>
        </div>
        <h2 className="section-title">Brew Master Lab & Live Dial-in</h2>
        <p className="section-subtitle">
          Customize doses and water ratios with real-time extraction mathematics,
          then follow the dynamic guided step-by-step audio timer.
        </p>
      </div>

      {/* Select Bean Dial-in Bar */}
      <div className="bean-selector-bar">
        <div className="bar-label">
          <span>SELECT ROAST LOT TO DIAL IN:</span>
        </div>
        <div className="bean-chip-list">
          {COFFEE_BEANS.map((b) => (
            <button
              key={b.id}
              className={`bean-select-chip ${activeBeanId === b.id ? 'active' : ''}`}
              onClick={() => {
                sound.playClick();
                setActiveBeanId(b.id);
              }}
            >
              <span className="dot-indicator" style={{ backgroundColor: b.color }}></span>
              <span className="b-name">{b.name}</span>
              <span className="b-score">{b.scaScore} SCA</span>
            </button>
          ))}
        </div>
      </div>

      {/* Method Selector Grid */}
      <div className="methods-tabs-grid">
        {BREW_METHODS.map((method) => {
          const isSelected = selectedMethodId === method.id;
          return (
            <button
              key={method.id}
              className={`method-card-btn ${isSelected ? 'active' : ''}`}
              onClick={() => {
                sound.playClick();
                setSelectedMethodId(method.id);
              }}
            >
              <div className="method-icon-wrap">
                {getMethodIcon(method.icon)}
              </div>
              <div className="method-meta">
                <span className="method-title">{method.name}</span>
                <span className="method-time-tag">{method.idealTime}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Two-Column Interactive Workspace */}
      <div className="brew-lab-grid">
        {/* Left Column: Interactive Calculator & Parameters */}
        <div className="lab-card calc-card">
          <div className="card-header-flex">
            <h3 className="card-heading">
              <span>🧮 Interactive Ratio & Yield Dial</span>
            </h3>
            <span className="method-pill-tag">{currentMethod.name}</span>
          </div>

          <p className="calc-desc">{currentMethod.description}</p>

          {/* Interactive Sliders */}
          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-title">Coffee Dose (Grounds)</span>
              <span className="slider-val-badge">{dose} grams</span>
            </div>
            <input
              type="range"
              min={isEspresso ? 14 : 12}
              max={isEspresso ? 24 : 60}
              step={1}
              value={dose}
              onChange={(e) => {
                sound.playClick();
                setDose(Number(e.target.value));
              }}
              className="range-slider"
            />
            <div className="slider-scale-labels">
              <span>{isEspresso ? '14g (Single/Double)' : '12g (1 Cup)'}</span>
              <span>{isEspresso ? '18g (Standard)' : '30g (Carafe)'}</span>
              <span>{isEspresso ? '24g (Triple)' : '60g (Batch)'}</span>
            </div>
          </div>

          <div className="slider-group">
            <div className="slider-header">
              <span className="slider-title">Brew Ratio (Coffee : Water)</span>
              <span className="slider-val-badge">1 : {ratio}</span>
            </div>
            <input
              type="range"
              min={currentMethod.minRatio}
              max={currentMethod.maxRatio}
              step={isEspresso ? 0.1 : 0.5}
              value={ratio}
              onChange={(e) => {
                sound.playClick();
                setRatio(Number(e.target.value));
              }}
              className="range-slider"
            />
            <div className="slider-scale-labels">
              <span>1:{currentMethod.minRatio} (Rich/Concentrated)</span>
              <span>1:{currentMethod.defaultRatio} (Recommended)</span>
              <span>1:{currentMethod.maxRatio} (Delicate/Light)</span>
            </div>
          </div>

          {/* Dynamic Extraction Output Matrix */}
          <div className="calc-results-grid">
            <div className="calc-result-box highlight-box">
              <span className="res-label">Total Water Target</span>
              <span className="res-value">{totalWater}g</span>
              <span className="res-sub">~{totalWater} ml filtered water</span>
            </div>

            <div className="calc-result-box">
              <span className="res-label">Estimated Beverage</span>
              <span className="res-value">{approxYield}g</span>
              <span className="res-sub">Finished liquid yield</span>
            </div>

            <div className="calc-result-box">
              <span className="res-label">Water Temperature</span>
              <span className="res-value flex-val">
                <ThermometerIcon size={16} color="#e07a5f" />
                {currentMethod.waterTempC}°C
              </span>
              <span className="res-sub">{Math.round(currentMethod.waterTempC * 1.8 + 32)}°F target</span>
            </div>

            <div className="calc-result-box">
              <span className="res-label">Caffeine Level</span>
              <span className="res-value">~{estimatedCaffeine} mg</span>
              <span className="res-sub">Approx. active caffeine</span>
            </div>
          </div>

          {/* Interactive Grind Visualizer */}
          <div className="grind-visualizer-box">
            <div className="grind-meta">
              <span className="grind-tag-label">Grind Size Recommendation:</span>
              <span className="grind-val">{currentMethod.grindSize}</span>
            </div>
            <div className="grind-particle-container">
              {Array.from({ length: 32 }).map((_, i) => {
                const sizePx = currentMethod.grindLevel === 'Fine' ? 3 : currentMethod.grindLevel === 'Medium-Fine' ? 5 : currentMethod.grindLevel === 'Medium' ? 7 : currentMethod.grindLevel === 'Medium-Coarse' ? 9 : 12;
                return (
                  <span
                    key={i}
                    className="grind-dot"
                    style={{
                      width: `${sizePx}px`,
                      height: `${sizePx}px`,
                      backgroundColor: currentBean.color,
                      opacity: 0.7 + (i % 4) * 0.1
                    }}
                  />
                );
              })}
            </div>
            <span className="particle-info">Micron Spec: ~{currentMethod.grindMicrons} µm</span>
          </div>

          {/* Quick Bean Pairing Card */}
          <div className="bean-pairing-card">
            <div className="pairing-header">
              <span className="pairing-label">DIALED IN WITH:</span>
              <span className="pairing-score">{currentBean.scaScore} SCA</span>
            </div>
            <div className="pairing-name">{currentBean.name} ({currentBean.country})</div>
            <div className="pairing-notes">
              {currentBean.tastingNotes.slice(0, 3).join(' • ')}
            </div>
            {onAddToCart && (
              <button
                className="btn-order-ground"
                onClick={() => {
                  sound.playSuccess();
                  onAddToCart(currentBean, currentMethod.grindLevel);
                }}
              >
                Order this bean ground for {currentMethod.name} (${currentBean.price.toFixed(2)})
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Live Step-by-Step Interactive Timer */}
        <div className="lab-card timer-card">
          <div className="card-header-flex">
            <h3 className="card-heading">
              <span>⏱️ Guided Step Extraction Timer</span>
            </h3>
            <span className="stage-badge">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
          </div>

          {/* Circular Countdown Progress Display */}
          <div className="timer-display-wrapper">
            <div className={`timer-ring-box ${timerRunning ? 'brewing-active' : ''}`}>
              <svg className="timer-ring-svg" viewBox="0 0 200 200">
                <circle
                  className="ring-bg"
                  cx="100"
                  cy="100"
                  r="85"
                  strokeWidth="8"
                />
                <circle
                  className="ring-progress"
                  cx="100"
                  cy="100"
                  r="85"
                  strokeWidth="8"
                  strokeDasharray={534}
                  strokeDashoffset={534 - (534 * timerProgressPct) / 100}
                  strokeLinecap="round"
                />
              </svg>

              <div className="timer-inner-content">
                {timerRunning && (
                  <div className="animated-pour-stream">
                    <span className="pour-drop drop-1"></span>
                    <span className="pour-drop drop-2"></span>
                  </div>
                )}
                <div className="time-digits">{formatTime(secondsElapsed)}</div>
                <div className="total-target-time">Target: {formatTime(totalBrewDuration)}</div>
                <div className="current-step-label">{currentStep.title}</div>
              </div>
            </div>
          </div>

          {/* Timer Control Buttons */}
          <div className="timer-button-row">
            <button
              className={`btn btn-timer-main ${timerRunning ? 'btn-pause' : 'btn-play'}`}
              onClick={toggleTimer}
            >
              {timerRunning ? (
                <>
                  <PauseIcon size={20} />
                  <span>Pause Timer</span>
                </>
              ) : (
                <>
                  <PlayIcon size={20} />
                  <span>{brewCompleted ? 'Brew Again' : secondsElapsed > 0 ? 'Resume Brew' : 'Start Brew Guide'}</span>
                </>
              )}
            </button>

            <button
              className="btn btn-timer-reset"
              onClick={resetTimer}
              title="Reset Timer to 0:00"
            >
              <RotateCcwIcon size={18} />
              <span>Reset</span>
            </button>
          </div>

          {/* Step Timeline & Instructions */}
          <div className="steps-accordion">
            <div className="steps-accordion-title">BREWING STAGES & TARGET WEIGHTS:</div>
            <div className="steps-list">
              {steps.map((step, idx) => {
                const isActive = idx === currentStepIndex;
                const isPast = idx < currentStepIndex;
                return (
                  <div
                    key={step.id}
                    className={`step-item ${isActive ? 'active-step' : ''} ${isPast ? 'past-step' : ''}`}
                    onClick={() => skipToStep(idx)}
                  >
                    <div className="step-num-col">
                      <div className="step-num-badge">
                        {isPast ? <CheckIcon size={14} color="#52b788" /> : idx + 1}
                      </div>
                    </div>
                    <div className="step-body-col">
                      <div className="step-headline">
                        <span className="step-name">{step.title}</span>
                        <div className="step-timing-tag">
                          {step.durationSeconds}s
                          {step.targetWaterGrams > 0 && ` • Scale: ${Math.round((step.targetWaterGrams / currentMethod.defaultDose) * dose)}g`}
                        </div>
                      </div>
                      <p className="step-desc">{step.description}</p>
                      {step.tip && (
                        <div className="step-barista-tip">
                          <span>💡 Barista Tip:</span> {step.tip}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Brew Finished Banner */}
          {brewCompleted && (
            <div className="brew-celebration-box">
              <div className="celeb-icon">🏆</div>
              <div className="celeb-title">Extraction Complete!</div>
              <p className="celeb-desc">
                Your {currentBean.name} brewed via {currentMethod.name} is ready. Swirl server to oxygenate and enjoy subtle notes of {currentBean.tastingNotes.slice(0, 2).join(' & ')}!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
