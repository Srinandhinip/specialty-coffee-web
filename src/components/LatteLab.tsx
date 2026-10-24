import React, { useState, useRef, useEffect } from 'react';
import { PaletteIcon, GaugeIcon, SparklesIcon, RotateCcwIcon, PlayIcon } from './CoffeeIcons';
import { sound } from '../utils/audio';

export const LatteLab: React.FC = () => {
  const [activeLabTab, setActiveLabTab] = useState<'latte' | 'espresso'>('espresso');

  // --- Espresso Dial Simulator States ---
  const [grindDial, setGrindDial] = useState<number>(3); // 1 = Very Fine, 3 = Perfect, 5 = Coarse
  const [doseGrams, setDoseGrams] = useState<number>(18);
  const [tampForce, setTampForce] = useState<number>(30); // lbs
  const [isPulling, setIsPulling] = useState<boolean>(false);
  const [pullTimeSecs, setPullTimeSecs] = useState<number>(0);
  const [shotYieldGrams, setShotYieldGrams] = useState<number>(0);
  const [pressureBar, setPressureBar] = useState<number>(0);
  const [shotDiagnosis, setShotDiagnosis] = useState<{
    status: 'perfect' | 'sour' | 'bitter' | 'idle';
    title: string;
    desc: string;
    score: number;
  }>({
    status: 'idle',
    title: 'Ready to Pull Shot',
    desc: 'Adjust your grind, dose, and tamp pressure then hit Pull Espresso.',
    score: 0,
  });

  const pullIntervalRef = useRef<number | null>(null);

  // --- Latte Canvas States ---
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [milkTexture, setMilkTexture] = useState<'silky' | 'dense'>('silky');
  const [pourRadius, setPourRadius] = useState<number>(14);

  // Initialize Latte canvas with crema base
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw circular cup crema background
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width / 2 - 10;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Outer ceramic rim
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 8, 0, Math.PI * 2);
    ctx.fillStyle = '#f8f5f0';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#d4a373';
    ctx.stroke();

    // Crema gradient base
    const grad = ctx.createRadialGradient(centerX - 20, centerY - 20, 10, centerX, centerY, radius);
    grad.addColorStop(0, '#a25927');
    grad.addColorStop(0.5, '#6e3917');
    grad.addColorStop(0.85, '#401e0a');
    grad.addColorStop(1, '#2c1205');

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Golden crema streaks
    ctx.strokeStyle = 'rgba(212, 163, 115, 0.25)';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.75, 0.4, 2.5);
    ctx.stroke();
  };

  useEffect(() => {
    if (activeLabTab === 'latte') {
      initCanvas();
    }
  }, [activeLabTab]);

  // Handle Espresso Extraction
  const startEspressoPull = () => {
    sound.playEspressoPump();
    setIsPulling(true);
    setPullTimeSecs(0);
    setShotYieldGrams(0);

    // Calculate theoretical parameters
    // Optimal: grind 3, dose 18, tamp 30 -> 9.0 bar, 28 sec, 38g yield
    const targetPressure = grindDial === 3 ? 9.2 : grindDial < 3 ? 11.5 : 5.8;
    const flowRate = grindDial === 3 ? 1.4 : grindDial < 3 ? 0.7 : 2.8;

    let elapsed = 0;
    if (pullIntervalRef.current) clearInterval(pullIntervalRef.current);

    pullIntervalRef.current = window.setInterval(() => {
      elapsed += 1;
      setPullTimeSecs(elapsed);

      // Pressure ramps up
      const currentPres = Math.min(targetPressure, (elapsed / 4) * targetPressure);
      setPressureBar(Number(currentPres.toFixed(1)));

      // Liquid yield
      const currentYield = Math.min(45, Math.round(elapsed * flowRate));
      setShotYieldGrams(currentYield);

      if (elapsed >= 28) {
        if (pullIntervalRef.current) clearInterval(pullIntervalRef.current);
        setIsPulling(false);
        sound.playSuccess();

        // Diagnosis
        if (grindDial === 3 && doseGrams >= 17 && doseGrams <= 19) {
          setShotDiagnosis({
            status: 'perfect',
            title: '🌟 God Shot: Sweet & Syrupy Balance!',
            desc: `Optimal 9.2 bar extraction with ${currentYield}g liquid yield in 28s. Rich tiger-stripe crema, bright citric spark, and velvet chocolate finish.`,
            score: 96,
          });
        } else if (grindDial < 3) {
          setShotDiagnosis({
            status: 'bitter',
            title: '⚠️ Over-Extracted & Choked Flow',
            desc: 'Grind was too fine for 9-bar pump pressure, creating high resistance and extracting bitter astringent tannins. Coarsen grind setting slightly.',
            score: 72,
          });
        } else {
          setShotDiagnosis({
            status: 'sour',
            title: '⚠️ Under-Extracted & Fast Channeling',
            desc: 'Grind was too coarse causing water to rush through too quickly. Cup will taste sour, watery, with pale thin crema. Fine down your grind setting.',
            score: 68,
          });
        }
      }
    }, 1000);
  };

  const stopEspressoPull = () => {
    if (pullIntervalRef.current) clearInterval(pullIntervalRef.current);
    setIsPulling(false);
    sound.playClick();
  };

  // Latte Canvas Drawing Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    drawMilkDrop(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    drawMilkDrop(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const drawMilkDrop = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    sound.playPour();

    const rad = pourRadius;
    const grad = ctx.createRadialGradient(x, y, 2, x, y, rad);
    if (milkTexture === 'silky') {
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      grad.addColorStop(0.6, 'rgba(255, 250, 240, 0.8)');
      grad.addColorStop(1, 'rgba(255, 245, 230, 0)');
    } else {
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.8, '#fdfaf2');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    }

    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  };

  // Preset Latte Art Patterns
  const drawPresetPattern = (pattern: 'heart' | 'rosetta' | 'tulip') => {
    initCanvas();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    sound.playSuccess();
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    ctx.fillStyle = '#ffffff';

    if (pattern === 'heart') {
      // Draw Heart
      ctx.beginPath();
      ctx.arc(cx - 30, cy - 20, 45, 0, Math.PI * 2);
      ctx.arc(cx + 30, cy - 20, 45, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(cx - 70, cy - 10);
      ctx.lineTo(cx + 70, cy - 10);
      ctx.lineTo(cx, cy + 85);
      ctx.closePath();
      ctx.fill();

      // Cut through line
      ctx.strokeStyle = '#6e3917';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cx, cy - 65);
      ctx.lineTo(cx, cy + 95);
      ctx.stroke();
    } else if (pattern === 'tulip') {
      // 3 Tier Tulip
      [-40, 0, 40].forEach((offsetY, i) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${0.95 - i * 0.1})`;
        ctx.beginPath();
        ctx.ellipse(cx, cy + offsetY, 55 - i * 8, 30 - i * 4, 0, 0, Math.PI * 2);
        ctx.fill();
      });
      // Stem cut
      ctx.strokeStyle = '#6e3917';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cx, cy - 70);
      ctx.lineTo(cx, cy + 75);
      ctx.stroke();
    } else if (pattern === 'rosetta') {
      // Rosetta Leaves
      for (let i = 0; i < 9; i++) {
        const y = cy + 60 - i * 16;
        const w = 60 - i * 4;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.ellipse(cx, y, w, 10, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      // Top heart leaf
      ctx.beginPath();
      ctx.arc(cx, cy - 70, 18, 0, Math.PI * 2);
      ctx.fill();

      // Stem cut
      ctx.strokeStyle = '#5a2d12';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx, cy - 85);
      ctx.lineTo(cx, cy + 80);
      ctx.stroke();
    }
  };

  return (
    <section className="latte-lab-section">
      {/* Header */}
      <div className="section-head">
        <div className="section-badge">
          <PaletteIcon size={14} color="#f4a261" />
          <span>SENSORY BARISTA WORKSHOP</span>
        </div>
        <h2 className="section-title">Espresso Pressure & Latte Art Lab</h2>
        <p className="section-subtitle">
          Test your barista skills! Dial in portafilter extraction physics on the 9-bar pressure machine,
          or pour freehand latte microfoam on fresh crema.
        </p>
      </div>

      {/* Lab Mode Toggle Switch */}
      <div className="lab-mode-switch">
        <button
          className={`mode-tab-btn ${activeLabTab === 'espresso' ? 'active' : ''}`}
          onClick={() => {
            sound.playClick();
            setActiveLabTab('espresso');
          }}
        >
          <GaugeIcon size={18} />
          <span>9-Bar Espresso Extraction Simulator</span>
        </button>

        <button
          className={`mode-tab-btn ${activeLabTab === 'latte' ? 'active' : ''}`}
          onClick={() => {
            sound.playClick();
            setActiveLabTab('latte');
          }}
        >
          <PaletteIcon size={18} />
          <span>Interactive Latte Art Canvas</span>
        </button>
      </div>

      {/* Workspace Content */}
      {activeLabTab === 'espresso' ? (
        <div className="espresso-sim-grid">
          {/* Controls */}
          <div className="sim-control-panel">
            <h3 className="sim-heading">⚙️ Dial-in Machine Parameters</h3>

            {/* Grind Slider */}
            <div className="dial-item">
              <div className="dial-label-row">
                <span>Grinder Setting (Microns)</span>
                <span className="dial-badge">
                  {grindDial === 1 ? 'Fine (200µm - Choke Risk)' : grindDial === 2 ? 'Fine-Ideal (240µm)' : grindDial === 3 ? 'Sweet Spot (260µm)' : grindDial === 4 ? 'Medium-Fine (300µm)' : 'Coarse (360µm - Sour)'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={grindDial}
                disabled={isPulling}
                onChange={(e) => {
                  sound.playClick();
                  setGrindDial(Number(e.target.value));
                }}
                className="sim-slider"
              />
            </div>

            {/* Dose Slider */}
            <div className="dial-item">
              <div className="dial-label-row">
                <span>Dose Weight</span>
                <span className="dial-badge">{doseGrams}g Precision Basket</span>
              </div>
              <input
                type="range"
                min="15"
                max="22"
                step="0.5"
                value={doseGrams}
                disabled={isPulling}
                onChange={(e) => {
                  sound.playClick();
                  setDoseGrams(Number(e.target.value));
                }}
                className="sim-slider"
              />
            </div>

            {/* Tamp Pressure */}
            <div className="dial-item">
              <div className="dial-label-row">
                <span>Tamping Force</span>
                <span className="dial-badge">{tampForce} lbs level pressure</span>
              </div>
              <input
                type="range"
                min="20"
                max="45"
                step="5"
                value={tampForce}
                disabled={isPulling}
                onChange={(e) => {
                  sound.playClick();
                  setTampForce(Number(e.target.value));
                }}
                className="sim-slider"
              />
            </div>

            {/* Extraction Trigger */}
            <div className="sim-action-row">
              <button
                className={`btn btn-pull-shot ${isPulling ? 'pulling-active' : ''}`}
                onClick={isPulling ? stopEspressoPull : startEspressoPull}
              >
                {isPulling ? (
                  <>
                    <span className="pump-spinner"></span>
                    <span>Stop Shot Flow</span>
                  </>
                ) : (
                  <>
                    <PlayIcon size={18} />
                    <span>Engage Grouphead (Pull Shot)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Real-time Machine & Glass Display */}
          <div className="sim-output-panel">
            {/* Pressure Gauge Widget */}
            <div className="gauge-widget">
              <div className="gauge-rim">
                <div
                  className="gauge-needle"
                  style={{
                    transform: `rotate(${Math.min(180, (pressureBar / 14) * 180 - 90)}deg)`
                  }}
                ></div>
                <div className="gauge-center-cap"></div>
                <div className="gauge-labels">
                  <span className="g-0">0</span>
                  <span className="g-sweet">9 BAR SWEET SPOT</span>
                  <span className="g-14">14</span>
                </div>
              </div>
              <div className="gauge-readout">
                <span className="bar-num">{pressureBar}</span>
                <span className="bar-unit">BAR PRESSURE</span>
              </div>
            </div>

            {/* Live Shot Stats */}
            <div className="live-shot-stats">
              <div className="shot-stat-card">
                <span className="s-lbl">Timer</span>
                <span className="s-val">{pullTimeSecs}s</span>
                <span className="s-sub">Target: 26-30s</span>
              </div>
              <div className="shot-stat-card">
                <span className="s-lbl">Liquid Yield</span>
                <span className="s-val">{shotYieldGrams}g</span>
                <span className="s-sub">1:2 ratio target</span>
              </div>
              <div className="shot-stat-card">
                <span className="s-lbl">Temperature</span>
                <span className="s-val">93.5°C</span>
                <span className="s-sub">PID Controlled</span>
              </div>
            </div>

            {/* Diagnostic Verdict */}
            <div className={`diagnosis-banner diagnosis-${shotDiagnosis.status}`}>
              <div className="diag-header">
                <span className="diag-title">{shotDiagnosis.title}</span>
                {shotDiagnosis.score > 0 && (
                  <span className="diag-score">Barista Score: {shotDiagnosis.score}/100</span>
                )}
              </div>
              <p className="diag-desc">{shotDiagnosis.desc}</p>
            </div>
          </div>
        </div>
      ) : (
        /* Latte Art Canvas Mode */
        <div className="latte-art-workspace">
          <div className="canvas-col">
            <div className="cup-canvas-container">
              <canvas
                ref={canvasRef}
                width={360}
                height={360}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="latte-canvas"
              />
              <span className="canvas-hint">🎨 Click & drag over cup to pour microfoam</span>
            </div>
          </div>

          {/* Latte Tools & Presets */}
          <div className="canvas-tools-col">
            <h3 className="tools-title">🥛 Milk Pitcher Controls</h3>

            <div className="tool-control-group">
              <label className="tool-lbl">Preset Barista Patterns:</label>
              <div className="pattern-btn-row">
                <button
                  className="btn btn-pattern"
                  onClick={() => drawPresetPattern('heart')}
                >
                  ❤️ Classic Heart
                </button>
                <button
                  className="btn btn-pattern"
                  onClick={() => drawPresetPattern('tulip')}
                >
                  🌷 3-Tier Tulip
                </button>
                <button
                  className="btn btn-pattern"
                  onClick={() => drawPresetPattern('rosetta')}
                >
                  🌿 Barista Rosetta
                </button>
              </div>
            </div>

            <div className="tool-control-group">
              <label className="tool-lbl">Milk Texture Stream:</label>
              <div className="texture-toggle-row">
                <button
                  className={`btn-texture ${milkTexture === 'silky' ? 'active' : ''}`}
                  onClick={() => setMilkTexture('silky')}
                >
                  Silky Microfoam (Velvet)
                </button>
                <button
                  className={`btn-texture ${milkTexture === 'dense' ? 'active' : ''}`}
                  onClick={() => setMilkTexture('dense')}
                >
                  Dense Cappuccino Foam
                </button>
              </div>
            </div>

            <div className="tool-control-group">
              <label className="tool-lbl">Pitcher Spout Flow Width ({pourRadius}px):</label>
              <input
                type="range"
                min="8"
                max="28"
                value={pourRadius}
                onChange={(e) => setPourRadius(Number(e.target.value))}
                className="sim-slider"
              />
            </div>

            <div className="canvas-actions-row">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  sound.playClick();
                  initCanvas();
                }}
              >
                <RotateCcwIcon size={16} />
                <span>Clear Cup / Fresh Crema</span>
              </button>

              <button
                className="btn btn-primary"
                onClick={() => {
                  sound.playSuccess();
                  alert("✨ Gorgeous pour! Your latte art score: 98/100 Barista Master!");
                }}
              >
                <SparklesIcon size={16} />
                <span>Rate My Latte Art</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
