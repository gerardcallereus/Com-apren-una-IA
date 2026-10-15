// ==========================================
// FASE 1: PLUJA D'IDEES & SIMULADOR GATS/GOSSOS
// ==========================================

        function toggleBrainstorm(num) {
            const ans = document.getElementById(`brainstorm-ans-${num}`);
            const hint = document.getElementById(`brainstorm-hint-${num}`);
            if (!ans) return;
            if (ans.style.display === 'none') {
                ans.style.display = 'block';
                if (hint) hint.textContent = 'Prem per amagar la reflexió';
            } else {
                ans.style.display = 'none';
                if (hint) hint.textContent = 'Clica aquí per descobrir-ho...';
            }
        }

        let currentSimStep = 1;
        let trainingEpoch = 0;
        let trainingAccuracy = 50.0;
        let trainingLoss = 0.693;
        let modelTrained = false;

        function switchSimStep(step) {
            currentSimStep = step;
            if (!appState.simStepsVisited.includes(step)) {
                appState.simStepsVisited.push(step);
                saveState();
            }

            for (let i = 1; i <= 4; i++) {
                const btn = document.getElementById(`sim-tab-${i}`);
                const panel = document.getElementById(`sim-step-panel-${i}`);
                if (btn) {
                    if (i === step) {
                        btn.style.background = '#4f46e5';
                        btn.style.color = '#ffffff';
                        btn.style.borderColor = '#6366f1';
                    } else {
                        btn.style.background = '#1e293b';
                        btn.style.color = '#cbd5e1';
                        btn.style.borderColor = '#334155';
                    }
                }
                if (panel) {
                    panel.style.display = (i === step ? 'block' : 'none');
                }
            }

            if (step === 3) {
                updateEpochUI();
            }

            if (step === 4) {
                testAnimalCase('cat_tabby');
            }

            updateSimProgressStatus();
        }

        function setVisualFilter(mode) {
            const img = document.getElementById('filter-preview-img');
            const overlay = document.getElementById('filter-overlay');
            const exp = document.getElementById('filter-explanation');
            if (!img || !overlay || !exp) return;

            if (mode === 'normal') {
                img.style.filter = 'none';
                overlay.style.display = 'none';
                exp.innerHTML = "<strong>Mode Normal:</strong> La imatge original en RGB. L'ull humà veu un gat; la IA només veu números de colors.";
            } else if (mode === 'edges') {
                img.style.filter = 'contrast(250%) grayscale(100%) invert(80%)';
                overlay.style.display = 'none';
                exp.innerHTML = "<strong>Filtre de Contorns (Convolució Sobel):</strong> La primera capa de la xarxa ressalta els canvis bruscos de brillantor per aïllar les orelles punxegudes i els bigotis com a segments lineals!";
            } else if (mode === 'heatmap') {
                img.style.filter = 'grayscale(40%)';
                overlay.style.display = 'block';
                overlay.style.background = 'radial-gradient(circle at 45% 25%, rgba(239, 68, 68, 0.65) 0%, rgba(234, 179, 8, 0.5) 30%, transparent 65%)';
                exp.innerHTML = "<strong>Mapa de Calor d'Atenció (Grad-CAM):</strong> En vermell/groc es mostren les zones on la xarxa neuronal 'posa el focus' per decidir: la punta de les dues orelles i el triangle del nas!";
            }
        }

        function trainOneEpoch() {
            if (trainingEpoch >= 20) return;
            trainingEpoch += 2;
            if (trainingEpoch > 20) trainingEpoch = 20;

            trainingAccuracy = Math.min(96.8, 50.0 + (trainingEpoch * 2.34));
            trainingLoss = Math.max(0.048, 0.693 - (trainingEpoch * 0.032));

            if (trainingEpoch >= 10) {
                appState.simTrained = true;
                saveState();
            }

            updateEpochUI();
            updateSimProgressStatus();
        }

        function trainFullModel() {
            const btnOne = document.getElementById('btn-train-one-epoch');
            const btnFull = document.getElementById('btn-train-full');
            const ind = document.getElementById('sim-training-indicator');

            if (btnOne) btnOne.disabled = true;
            if (btnFull) btnFull.disabled = true;
            if (ind) ind.style.display = 'inline-flex';

            let interval = setInterval(() => {
                if (trainingEpoch < 20) {
                    trainOneEpoch();
                } else {
                    clearInterval(interval);
                    if (btnOne) btnOne.disabled = false;
                    if (btnFull) btnFull.disabled = false;
                    if (ind) ind.style.display = 'none';
                    appState.simTrained = true;
                    saveState();
                    updateSimProgressStatus();
                }
            }, 90);
        }

        function renderTrainingVisuals() {
            const svgChart = document.getElementById('sim-training-svg');
            const svgTarget = document.getElementById('sim-target-svg');
            const targetStatus = document.getElementById('sim-target-status');
            const accTag = document.getElementById('sim-acc-status-tag');
            const lossTag = document.getElementById('sim-loss-status-tag');

            const history = [];
            for (let e = 0; e <= trainingEpoch; e += 2) {
                const acc = Math.min(96.8, 50.0 + (e * 2.34));
                const loss = Math.max(0.048, 0.693 - (e * 0.032));
                history.push({ epoch: e, acc: acc, loss: loss });
            }

            if (svgChart) {
                const xMin = 48, xMax = 412, xSpan = xMax - xMin;
                const yMin = 25, yMax = 175, ySpan = yMax - yMin;

                const getX = (ep) => xMin + (ep / 20) * xSpan;
                const getYAcc = (a) => yMax - ((a - 40) / 60) * ySpan;
                const getYLoss = (l) => yMin + (1 - (l / 0.70)) * ySpan;

                let svgHtml = `
                    <defs>
                        <linearGradient id="accGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="#10b981" stop-opacity="0.32"/>
                            <stop offset="100%" stop-color="#10b981" stop-opacity="0.0"/>
                        </linearGradient>
                        <linearGradient id="lossGrad" x1="0" y1="1" x2="0" y2="0">
                            <stop offset="0%" stop-color="#ef4444" stop-opacity="0.28"/>
                            <stop offset="100%" stop-color="#ef4444" stop-opacity="0.0"/>
                        </linearGradient>
                    </defs>

                    <line x1="${xMin}" y1="25" x2="${xMax}" y2="25" stroke="#1e293b" stroke-width="1" stroke-dasharray="3,3"/>
                    <line x1="${xMin}" y1="62.5" x2="${xMax}" y2="62.5" stroke="#1e293b" stroke-width="1" stroke-dasharray="3,3"/>
                    <line x1="${xMin}" y1="100" x2="${xMax}" y2="100" stroke="#1e293b" stroke-width="1" stroke-dasharray="3,3"/>
                    <line x1="${xMin}" y1="137.5" x2="${xMax}" y2="137.5" stroke="#1e293b" stroke-width="1" stroke-dasharray="3,3"/>
                    <line x1="${xMin}" y1="175" x2="${xMax}" y2="175" stroke="#334155" stroke-width="1.5"/>

                    <line x1="${getX(0)}" y1="25" x2="${getX(0)}" y2="175" stroke="#334155" stroke-width="1.5"/>
                    <line x1="${getX(5)}" y1="25" x2="${getX(5)}" y2="175" stroke="#1e293b" stroke-width="1" stroke-dasharray="3,3"/>
                    <line x1="${getX(10)}" y1="25" x2="${getX(10)}" y2="175" stroke="#1e293b" stroke-width="1" stroke-dasharray="3,3"/>
                    <line x1="${getX(15)}" y1="25" x2="${getX(15)}" y2="175" stroke="#1e293b" stroke-width="1" stroke-dasharray="3,3"/>
                    <line x1="${getX(20)}" y1="25" x2="${getX(20)}" y2="175" stroke="#1e293b" stroke-width="1" stroke-dasharray="3,3"/>

                    <text x="${xMin - 6}" y="29" fill="#4ade80" font-size="9" text-anchor="end" font-family="monospace">100%</text>
                    <text x="${xMin - 6}" y="66" fill="#4ade80" font-size="9" text-anchor="end" font-family="monospace">85%</text>
                    <text x="${xMin - 6}" y="103" fill="#4ade80" font-size="9" text-anchor="end" font-family="monospace">70%</text>
                    <text x="${xMin - 6}" y="141" fill="#4ade80" font-size="9" text-anchor="end" font-family="monospace">55%</text>
                    <text x="${xMin - 6}" y="178" fill="#4ade80" font-size="9" text-anchor="end" font-family="monospace">40%</text>

                    <text x="${xMax + 6}" y="29" fill="#f87171" font-size="9" text-anchor="start" font-family="monospace">0.70</text>
                    <text x="${xMax + 6}" y="66" fill="#f87171" font-size="9" text-anchor="start" font-family="monospace">0.52</text>
                    <text x="${xMax + 6}" y="103" fill="#f87171" font-size="9" text-anchor="start" font-family="monospace">0.35</text>
                    <text x="${xMax + 6}" y="141" fill="#f87171" font-size="9" text-anchor="start" font-family="monospace">0.17</text>
                    <text x="${xMax + 6}" y="178" fill="#f87171" font-size="9" text-anchor="start" font-family="monospace">0.00</text>

                    <text x="${getX(0)}" y="194" fill="#94a3b8" font-size="9.5" text-anchor="middle">Ep 0</text>
                    <text x="${getX(5)}" y="194" fill="#94a3b8" font-size="9.5" text-anchor="middle">Ep 5</text>
                    <text x="${getX(10)}" y="194" fill="#94a3b8" font-size="9.5" text-anchor="middle">Ep 10</text>
                    <text x="${getX(15)}" y="194" fill="#94a3b8" font-size="9.5" text-anchor="middle">Ep 15</text>
                    <text x="${getX(20)}" y="194" fill="#94a3b8" font-size="9.5" text-anchor="middle">Ep 20</text>
                `;

                if (history.length > 0) {
                    let accPath = `M ${getX(history[0].epoch)} ${getYAcc(history[0].acc)}`;
                    let lossPath = `M ${getX(history[0].epoch)} ${getYLoss(history[0].loss)}`;

                    for (let i = 1; i < history.length; i++) {
                        accPath += ` L ${getX(history[i].epoch)} ${getYAcc(history[i].acc)}`;
                        lossPath += ` L ${getX(history[i].epoch)} ${getYLoss(history[i].loss)}`;
                    }

                    const lastP = history[history.length - 1];
                    const lastX = getX(lastP.epoch);
                    const lastYAcc = getYAcc(lastP.acc);
                    const lastYLoss = getYLoss(lastP.loss);

                    if (history.length > 1) {
                        const accArea = `${accPath} L ${lastX} 175 L ${getX(history[0].epoch)} 175 Z`;
                        const lossArea = `${lossPath} L ${lastX} 175 L ${getX(history[0].epoch)} 175 Z`;
                        svgHtml += `
                            <path d="${accArea}" fill="url(#accGrad)"/>
                            <path d="${lossArea}" fill="url(#lossGrad)"/>
                        `;
                    }

                    svgHtml += `
                        <path d="${accPath}" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="${lossPath}" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    `;

                    history.forEach(p => {
                        const px = getX(p.epoch);
                        const pyAcc = getYAcc(p.acc);
                        const pyLoss = getYLoss(p.loss);
                        svgHtml += `
                            <circle cx="${px}" cy="${pyAcc}" r="3" fill="#10b981"/>
                            <circle cx="${px}" cy="${pyLoss}" r="3" fill="#ef4444"/>
                        `;
                    });

                    svgHtml += `
                        <circle cx="${lastX}" cy="${lastYAcc}" r="7" fill="none" stroke="#4ade80" stroke-width="2" class="sim-pulse-dot"/>
                        <circle cx="${lastX}" cy="${lastYAcc}" r="4" fill="#ffffff"/>
                        <text x="${lastX}" y="${Math.max(16, lastYAcc - 9)}" fill="#4ade80" font-size="10.5" font-weight="bold" text-anchor="middle" font-family="monospace">${lastP.acc.toFixed(1)}%</text>

                        <circle cx="${lastX}" cy="${lastYLoss}" r="7" fill="none" stroke="#f87171" stroke-width="2" class="sim-pulse-dot"/>
                        <circle cx="${lastX}" cy="${lastYLoss}" r="4" fill="#ffffff"/>
                        <text x="${lastX}" y="${Math.min(190, lastYLoss + 14)}" fill="#f87171" font-size="10.5" font-weight="bold" text-anchor="middle" font-family="monospace">${lastP.loss.toFixed(3)}</text>
                    `;
                }

                svgChart.innerHTML = svgHtml;
            }

            if (svgTarget) {
                const cx = 100, cy = 100;
                let targetHtml = `
                    <circle cx="${cx}" cy="${cy}" r="82" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
                    <circle cx="${cx}" cy="${cy}" r="82" fill="none" stroke="#475569" stroke-width="1" stroke-dasharray="3,3"/>
                    <circle cx="${cx}" cy="${cy}" r="56" fill="#1e3a8a" fill-opacity="0.35" stroke="#3b82f6" stroke-width="1.5"/>
                    <circle cx="${cx}" cy="${cy}" r="34" fill="#065f46" fill-opacity="0.45" stroke="#10b981" stroke-width="1.5"/>
                    <circle cx="${cx}" cy="${cy}" r="16" fill="#b45309" stroke="#fbbf24" stroke-width="2"/>
                    <circle cx="${cx}" cy="${cy}" r="4" fill="#fef08a"/>

                    <line x1="${cx}" y1="16" x2="${cx}" y2="184" stroke="#475569" stroke-width="1" stroke-dasharray="2,2" opacity="0.6"/>
                    <line x1="16" y1="${cy}" x2="184" y2="${cy}" stroke="#475569" stroke-width="1" stroke-dasharray="2,2" opacity="0.6"/>
                `;

                const dartAngles = [0.35, 1.15, 1.95, 2.75, 3.55, 4.35, 5.15, 5.95];
                const dartDistFactors = [0.88, 1.12, 0.92, 1.08, 0.95, 1.05, 0.82, 1.14];
                const baseRadius = Math.max(5, (trainingLoss / 0.693) * 70);

                targetHtml += `
                    <circle cx="${cx}" cy="${cy}" r="${baseRadius}" fill="none" stroke="${trainingLoss > 0.4 ? '#ef4444' : (trainingLoss > 0.15 ? '#f59e0b' : '#10b981')}" stroke-width="1" stroke-dasharray="2,2" opacity="0.75"/>
                `;

                let dotColor = '#ef4444';
                if (trainingEpoch >= 16) {
                    dotColor = '#4ade80';
                } else if (trainingEpoch >= 8) {
                    dotColor = '#38bdf8';
                } else if (trainingEpoch >= 2) {
                    dotColor = '#f59e0b';
                }

                dartAngles.forEach((angle, idx) => {
                    const r = Math.max(3.5, Math.min(78, baseRadius * dartDistFactors[idx]));
                    const dx = cx + r * Math.cos(angle);
                    const dy = cy + r * Math.sin(angle);
                    targetHtml += `
                        <circle cx="${dx.toFixed(1)}" cy="${dy.toFixed(1)}" r="${trainingEpoch === 20 ? 4 : 3.5}" fill="${dotColor}" stroke="#ffffff" stroke-width="0.8"/>
                    `;
                });

                svgTarget.innerHTML = targetHtml;
            }

            if (targetStatus) {
                if (trainingEpoch === 0) {
                    targetStatus.style.borderLeftColor = '#f87171';
                    targetStatus.innerHTML = `🎲 <strong>Època 0 (Atzar Pur):</strong> La xarxa fa prediccions a cegues (50% d'encert). Com que encara no ha analitzat les fotos, l'error (Loss: 0.693) és màxim i els tirs cauen lluny.`;
                } else if (trainingEpoch < 10) {
                    targetStatus.style.borderLeftColor = '#f59e0b';
                    targetStatus.innerHTML = `⚙️ <strong>Època ${trainingEpoch} (Primers retocs):</strong> La retropropagació comença a calibrar filtres de vores i contorns. L'error comença a disminuir (${trainingLoss.toFixed(3)}).`;
                } else if (trainingEpoch < 20) {
                    targetStatus.style.borderLeftColor = '#38bdf8';
                    targetStatus.innerHTML = `📈 <strong>Època ${trainingEpoch} (Afinant la punteria):</strong> Els trets facials clau (orelles triangulars vs caigudes, morros) ja sumen punts fiables. Precisió del ${trainingAccuracy.toFixed(1)}%!`;
                } else {
                    targetStatus.style.borderLeftColor = '#4ade80';
                    targetStatus.innerHTML = `🎯 <strong>Època 20 (Diana Aconseguida!):</strong> Punteria màxima del 96.8%! La pèrdua ha caigut a 0.048 (quasi 0). El model ja està preparat per al test real del Pas 4!`;
                }
            }

            if (accTag) {
                if (trainingAccuracy < 60) {
                    accTag.textContent = "Moneda a l'atzar";
                    accTag.style.color = "#f87171";
                } else if (trainingAccuracy < 85) {
                    accTag.textContent = "Aprenent patrons...";
                    accTag.style.color = "#fbbf24";
                } else {
                    accTag.textContent = "Model expert 🚀";
                    accTag.style.color = "#4ade80";
                }
            }

            if (lossTag) {
                if (trainingLoss > 0.5) {
                    lossTag.textContent = "Pèrdua molt alta ⚠️";
                    lossTag.style.color = "#f87171";
                } else if (trainingLoss > 0.2) {
                    lossTag.textContent = "Error moderat 📉";
                    lossTag.style.color = "#fbbf24";
                } else {
                    lossTag.textContent = "Pèrdua mínima (Òptim) ✅";
                    lossTag.style.color = "#4ade80";
                }
            }
        }

        function updateEpochUI() {
            const badge = document.getElementById('sim-epoch-badge');
            const accVal = document.getElementById('sim-accuracy-val');
            const accBar = document.getElementById('sim-accuracy-bar');
            const lossVal = document.getElementById('sim-loss-val');
            const lossBar = document.getElementById('sim-loss-bar');
            const log = document.getElementById('sim-training-log');
            const nextBtn = document.getElementById('btn-go-to-step-4');

            if (badge) badge.textContent = `Època ${trainingEpoch} / 20`;
            if (accVal) accVal.textContent = trainingAccuracy.toFixed(1) + '%';
            if (accBar) {
                accBar.style.width = trainingAccuracy + '%';
                accBar.className = 'confidence-fill ' + (trainingAccuracy > 85 ? 'high' : (trainingAccuracy > 65 ? 'mid' : 'low'));
            }

            if (lossVal) lossVal.textContent = trainingLoss.toFixed(3);
            if (lossBar) lossBar.style.width = Math.max(8, (trainingLoss / 0.693) * 100) + '%';

            if (log) {
                log.innerHTML += `<br>> [Època ${trainingEpoch}] Pèrdua (Error): ${trainingLoss.toFixed(3)} | Encert: ${trainingAccuracy.toFixed(1)}% (Connexions ajustades)`;
                log.scrollTop = log.scrollHeight;
            }

            if (trainingEpoch >= 10) {
                modelTrained = true;
                if (nextBtn) {
                    nextBtn.disabled = false;
                    nextBtn.innerHTML = "Passar al Pas 4: Posa a prova el model amb animals reals ➡️";
                }
            }

            renderTrainingVisuals();
        }

        function resetEpochTraining() {
            trainingEpoch = 0;
            trainingAccuracy = 50.0;
            trainingLoss = 0.693;
            modelTrained = false;

            const log = document.getElementById('sim-training-log');
            if (log) log.innerHTML = "> Model reiniciat. Torna a estar a l'atzar (50.0% d'encert).";

            const nextBtn = document.getElementById('btn-go-to-step-4');
            if (nextBtn) {
                nextBtn.disabled = true;
                nextBtn.textContent = "Passar al Pas 4: Posa a prova el model amb animals reals ➡️";
            }

            updateEpochUI();
            updateSimProgressStatus();
        }

        const animalTestCatalog = {
            cat_tabby: {
                title: "Gat Atigrat Comú (Felis catus)",
                subtitle: "Cas de referència òptim d'anatomia felina",
                img: "img/simulador/cat_tabby.jpg",
                probCat: 97,
                probDog: 3,
                verdict: "✅ PREDICCIÓ: GAT (97% de probabilitat)",
                verdictColor: "#4ade80",
                catPoints: "Orelles triangulars i punxegudes a la part alta (+55%), estructura facial compacta i nas curt (+28%), pupil·la ametllada (+14%).",
                dogPoints: "Sense trets canins significatius (3%).",
                lesson: "Els patrons coincideixen amb màxima fidelitat amb les fotos típiques del dataset d'entrenament. La xarxa pren la decisió amb màxima seguretat matemàtica."
            },
            dog_golden: {
                title: "Gos Golden Retriever (Canis lupus familiaris)",
                subtitle: "Cas de referència òptim d'anatomia canina",
                img: "img/simulador/dog_golden.jpg",
                probCat: 4,
                probDog: 96,
                verdict: "✅ PREDICCIÓ: GOS (96% de probabilitat)",
                verdictColor: "#38bdf8",
                catPoints: "Trets residuals sense rellevància (4%).",
                dogPoints: "Orelles amples i caigudes als laterals (+48%), morro allargat amb tòfona gran (+35%), proporció ampla del cap (+13%).",
                lesson: "El model detecta clarament que les orelles NO són punxegudes i que el pont nasal és prominent, sumant pràcticament tot el pes a la categoria Gos."
            },
            dog_husky: {
                title: "Gos Husky Siberià (Cas Enganyós / Parany!)",
                subtitle: "Gos autèntic però amb orelles punxegudes erectes",
                img: "img/simulador/dog_husky.jpg",
                probCat: 26,
                probDog: 74,
                verdict: "✅ PREDICCIÓ: GOS 74% (però amb un 26% de dubte felí!)",
                verdictColor: "#38bdf8",
                catPoints: "Orelles triangulars i punxegudes a la part alta (+26%). La xarxa resta certesa perquè associa aquesta forma a 'Gat'!",
                dogPoints: "Morro allargat, volum facial, mandíbula i proporcions canines clares (+74%).",
                lesson: "Un gran exemple de com aprèn la IA: com que durant l'entrenament la majoria de gats tenien orelles punxegudes, quan la màquina veu un husky dubta i li assigna un 26% de gat! Tot i així, el morro allargat i la cara de gos permeten que encerti la predicció."
            },
            cat_persian: {
                title: "Gat Persa Blanc (Cara Plana Atípica)",
                subtitle: "Gat de morro extremadament curt",
                img: "img/simulador/cat_persian.jpg",
                probCat: 88,
                probDog: 12,
                verdict: "✅ PREDICCIÓ: GAT (88% de probabilitat)",
                verdictColor: "#4ade80",
                catPoints: "Orelles petites i compactes (+45%), ulls grossos i expressió felina (+43%).",
                dogPoints: "Pelatge voluminós i cara xata que despista lleugerament els filtres facials (+12%).",
                lesson: "Tot i no tenir el perfil nasal habitual d'un gat europeu, la posició de les orelles i la distància dels ulls permeten a la xarxa encertar la classe."
            },
            fox_wild: {
                title: "Guineu Vermella (Cas Frontera / Cànid Salvatge)",
                subtitle: "Biològicament un cànid, però amb trets facials de felí",
                img: "img/simulador/fox_wild.jpg",
                probCat: 44,
                probDog: 56,
                verdict: "⚖️ CAS FRONTERA: GOS 56% | GAT 44% (Dilema visual!)",
                verdictColor: "#fbbf24",
                catPoints: "Orelles molt altes i punxegudes, pupil·les d'escletxa vertical i mirada felina (+44%).",
                dogPoints: "Morro allargat i estret de cànid i estructura òssia facial (+56%).",
                lesson: "Lliçó didàctica d'aprenentatge automàtic: La guineu és de la família dels cànids (com els gossos), però té orelles molt punxegudes i pupil·les verticals com els gats. Com que la IA no sap biologia i només reconeix formes geomètriques, el morro de gos i les orelles de gat entren en conflicte, provocant un dubte gairebé al 50%!"
            },
            lynx_wild: {
                title: "Linx Euroasiàtic (Felí Salvatge amb Plomalls)",
                subtitle: "Felí amb orelles acabades en pinzell de pèl",
                img: "img/simulador/lynx_wild.jpg",
                probCat: 86,
                probDog: 14,
                verdict: "✅ PREDICCIÓ: GAT (86% de probabilitat)",
                verdictColor: "#4ade80",
                catPoints: "Estructura òssia facial felina (+50%), forma general del cap (+36%).",
                dogPoints: "Els pinzells negres de les orelles alteren el contorn purament triangular (+14%).",
                lesson: "Tot i la presència de pèls a les puntes de les orelles, els patrons generals de felí s'imposen clarament als trets de cànid."
            },
            panda_bear: {
                title: "Ós Panda Gegant (Cas Parany / Fora de Distribució!)",
                subtitle: "Animal que NO és ni gat ni gos (Família dels úrsids)",
                img: "img/simulador/panda_bear.jpg",
                probCat: 78,
                probDog: 22,
                verdict: "⚠️ PREDICCIÓ ENGANYOSA: GAT 78% | GOS 22% (Cas Parany!)",
                verdictColor: "#f87171",
                catPoints: "Cara arrodonida, nas curt i pla, orelles petites arrodonides i taques negres als ulls (+78%). La xarxa s'enganya creient que és un gat gegant!",
                dogPoints: "Grandària corporal massiva i volum del cap (+22%).",
                lesson: "Lliçó cabdal d'Intel·ligència Artificial: L'ós panda és un cas parany (Fora de Distribució). La IA no té sentit comú ni sap dir 'Això és un panda'. Com que té la cara completament rodona, el nas curt i taques als ulls, la xarxa activa amb molta força els patrons de 'Gat' (78%) i cau a la trampa amb total seguretat!"
            }
        };

        function testAnimalCase(key) {
            document.querySelectorAll('.sim-test-card').forEach(c => {
                c.style.borderColor = (c.id === `test-card-${key}` ? '#6366f1' : '#334155');
            });

            const data = animalTestCatalog[key];
            if (!data) return;

            const box = document.getElementById('sim-test-display-box');
            if (!box) return;

            box.innerHTML = `
                <div style="display:grid; grid-template-columns:1fr 1.6fr; gap:1.5rem; align-items:center;">
                    <div style="text-align:center;">
                        <div style="background:#0f172a; border-radius:var(--radius-md); border:2px solid #334155; overflow:hidden; aspect-ratio:4/3; width:100%; max-width:320px; margin:0 auto 0.5rem;">
                            <img src="${data.img}" alt="${data.title}" style="width:100%; height:100%; object-fit:cover; display:block;">
                        </div>
                        <div style="font-weight:700; color:#f8fafc; font-size:0.95rem;">${data.title}</div>
                        <div style="font-size:0.8rem; color:#94a3b8;">${data.subtitle}</div>
                    </div>

                    <div>
                        <div style="font-size:1.1rem; font-weight:800; color:${data.verdictColor}; margin-bottom:0.75rem;">
                            ${data.verdict}
                        </div>

                        <div style="margin-bottom:0.6rem;">
                            <div style="display:flex; justify-content:space-between; font-size:0.84rem; color:#cbd5e1; margin-bottom:0.2rem;">
                                <span>🐱 Patrons coincidents amb GAT:</span>
                                <strong>${data.probCat}%</strong>
                            </div>
                            <div class="confidence-meter" style="height:14px; margin:0;">
                                <div class="confidence-fill" style="width:${data.probCat}%; background:linear-gradient(90deg, #10b981, #06b6d4);"></div>
                            </div>
                        </div>

                        <div style="margin-bottom:1rem;">
                            <div style="display:flex; justify-content:space-between; font-size:0.84rem; color:#cbd5e1; margin-bottom:0.2rem;">
                                <span>🐶 Patrons coincidents amb GOS:</span>
                                <strong>${data.probDog}%</strong>
                            </div>
                            <div class="confidence-meter" style="height:14px; margin:0;">
                                <div class="confidence-fill" style="width:${data.probDog}%; background:linear-gradient(90deg, #38bdf8, #818cf8);"></div>
                            </div>
                        </div>

                        <div style="background:#0f172a; border-radius:var(--radius-sm); padding:0.85rem; font-size:0.82rem; border:1px solid #334155;">
                            <div style="color:#a7f3d0; margin-bottom:0.35rem;"><strong>🟢 Què ha sumat punts de Gat:</strong> ${data.catPoints}</div>
                            <div style="color:#bae6fd; margin-bottom:0.5rem;"><strong>🔵 Què ha sumat punts de Gos:</strong> ${data.dogPoints}</div>
                            <div style="color:#fde68a; border-top:1px solid #334155; padding-top:0.4rem; line-height:1.4;">
                                <strong>💡 Lliçó Didàctica:</strong> ${data.lesson}
                            </div>
                        </div>
                    </div>
                </div>
            `;

            appState.simTested = true;
            saveState();
            updateSimProgressStatus();
        }

        function saveSimReflection() {
            const el = document.getElementById('sim-reflection');
            if (el) {
                appState.simReflection = el.value;
                saveState();
                const st = document.getElementById('sim-reflection-status');
                if (st) st.style.display = el.value.trim().length > 0 ? 'block' : 'none';
                updateSimProgressStatus();
            }
        }

        function saveB1Refl2() {
            const el = document.getElementById('b1-refl-2');
            if (el) {
                appState.b1Refl2 = el.value;
                saveState();
                const st = document.getElementById('b1-refl-2-status');
                if (st) st.style.display = el.value.trim().length > 0 ? 'block' : 'none';
                updateSimProgressStatus();
            }
        }

        function saveB1Refl3() {
            const el = document.getElementById('b1-refl-3');
            if (el) {
                appState.b1Refl3 = el.value;
                saveState();
                const st = document.getElementById('b1-refl-3-status');
                if (st) st.style.display = el.value.trim().length > 0 ? 'block' : 'none';
                updateSimProgressStatus();
            }
        }

        function updateSimProgressStatus() {
            const statusEl = document.getElementById('sim-progress-status');
            const nextBtn = document.getElementById('btn-complete-stage-1');
            if (!statusEl) return;

            const visited = appState.simStepsVisited || [1];
            const visitedCount = [1, 2, 3, 4].filter(s => visited.includes(s)).length;
            const trained = appState.simTrained || trainingEpoch >= 10;
            const tested = appState.simTested;
            const testCount = Object.keys((appState.stageQuizAnswers && appState.stageQuizAnswers[1]) || {}).length;
            const testOk = (testCount === 5);
            const w1 = countWords((document.getElementById('sim-reflection')?.value || appState.simReflection || '').trim());
            const w2 = countWords((document.getElementById('b1-refl-2')?.value || appState.b1Refl2 || '').trim());
            const w3 = countWords((document.getElementById('b1-refl-3')?.value || appState.b1Refl3 || '').trim());
            const refsOk = (w1 >= 5 && w2 >= 5 && w3 >= 5);
            const isReady = (visitedCount === 4 && trained && tested && testOk && refsOk);

            if (isReady) {
                statusEl.innerHTML = `<span style="color:#059669; font-weight:700;">✅ Simulador completat amb èxit!</span> Has explorat els 4 passos, entrenat el model (Època ${trainingEpoch}), provat prediccions, respost el test (5/5) i completat les 3 reflexions. Ja pots avançar a la Fase 2!`;
                if (nextBtn) {
                    nextBtn.className = "btn btn-success";
                    nextBtn.style.opacity = "1";
                    nextBtn.style.cursor = "pointer";
                }
            } else {
                statusEl.innerHTML = `⏳ <strong>Progrés del simulador:</strong> Passos (${visitedCount}/4) · Entrenat: ${trained ? '✅' : '❌'} · Predicció: ${tested ? '✅' : '❌'} · Test Bloc 1: (${testCount}/5) · Reflexions: (${[w1>=5, w2>=5, w3>=5].filter(Boolean).length}/3).`;
                if (nextBtn) {
                    nextBtn.className = "btn btn-secondary";
                    nextBtn.style.opacity = "0.7";
                }
            }
        }

