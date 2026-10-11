// ==========================================
// FASE 2: REPTE 1 (CAPTCHA AMB 12 IMATGES)
// ==========================================

        let captchaImgIndex = 1;
        let captchaTimerSeconds = 10;
        let captchaTimerInterval = null;
        let captchaTimerPaused = false;

        function renderCaptchaUI() {
            const imgEl = document.getElementById('captcha-current-img');
            const titleEl = document.getElementById('captcha-current-title');
            const counterEl = document.getElementById('captcha-counter-text');
            const prevBtn = document.getElementById('btn-captcha-prev');
            const nextBtn = document.getElementById('btn-captcha-next');

            if (imgEl) imgEl.src = `img/repte1/objecte_${captchaImgIndex}.png`;
            if (titleEl) titleEl.textContent = `Imatge ${captchaImgIndex} de 12`;
            if (counterEl) counterEl.textContent = `(Progrés: ${captchaImgIndex}/12)`;

            if (prevBtn) prevBtn.disabled = (captchaImgIndex === 1);
            if (nextBtn) nextBtn.textContent = (captchaImgIndex === 12 ? 'Finalitzar Etiquetatge ✅' : 'Següent Imatge ➡️');

            const savedAns = appState.repte1Answers[captchaImgIndex] || {};
            updateToggleButtons('stripes', savedAns.stripes);
            updateToggleButtons('triangles', savedAns.triangles);
            updateToggleButtons('circle', savedAns.circle);

            renderCaptchaTable();
            renderRepte1Quiz();
            resetCaptchaTimer();
        }

        function updateToggleButtons(qKey, val) {
            const yesBtn = document.getElementById(`btn-q-${qKey}-yes`) || document.getElementById(`btn-q-${qKey === 'circle' ? 'circles' : qKey}-yes`);
            const noBtn = document.getElementById(`btn-q-${qKey}-no`) || document.getElementById(`btn-q-${qKey === 'circle' ? 'circles' : qKey}-no`);

            if (yesBtn) yesBtn.className = 'btn-toggle' + (val === 'SI' ? ' selected-yes' : '');
            if (noBtn) noBtn.className = 'btn-toggle' + (val === 'NO' ? ' selected-no' : '');
        }

        function setCaptchaAns(qKey, val) {
            if (!appState.repte1Answers[captchaImgIndex]) {
                appState.repte1Answers[captchaImgIndex] = {};
            }
            appState.repte1Answers[captchaImgIndex][qKey] = val;
            saveState();
            updateToggleButtons(qKey, val);
            renderCaptchaTable();
            if (typeof updateRepte1ProgressStatus === 'function') {
                updateRepte1ProgressStatus();
            }
        }

        function nextCaptchaImg() {
            if (captchaImgIndex < 12) {
                captchaImgIndex++;
                renderCaptchaUI();
            } else {
                alert("🎉 Has completat l'etiquetatge de les 12 imatges! Revisa la taula de respostes i respon la reflexió de discrepàncies.");
            }
        }

        function prevCaptchaImg() {
            if (captchaImgIndex > 1) {
                captchaImgIndex--;
                renderCaptchaUI();
            }
        }

        function resetCaptchaTimer() {
            clearInterval(captchaTimerInterval);
            captchaTimerSeconds = 10;
            const secEl = document.getElementById('captcha-timer-sec');
            if (secEl) secEl.textContent = '10';

            if (!captchaTimerPaused) {
                captchaTimerInterval = setInterval(() => {
                    if (captchaTimerSeconds > 0) {
                        captchaTimerSeconds--;
                        if (secEl) secEl.textContent = captchaTimerSeconds;
                    } else {
                    }
                }, 1000);
            }
        }

        function toggleCaptchaTimer() {
            const btn = document.getElementById('btn-timer-toggle');
            captchaTimerPaused = !captchaTimerPaused;
            if (captchaTimerPaused) {
                clearInterval(captchaTimerInterval);
                if (btn) btn.textContent = '▶️ Reprendre';
            } else {
                if (btn) btn.textContent = '⏸️ Pausa';
                resetCaptchaTimer();
            }
        }

        function renderCaptchaTable() {
            const tbody = document.getElementById('tbody-captcha-records');
            if (!tbody) return;

            let html = '';
            for (let i = 1; i <= 12; i++) {
                const ans = appState.repte1Answers[i] || {};
                const stripes = ans.stripes || '-';
                const triangles = ans.triangles || '-';
                const circle = ans.circle || '-';
                const isComplete = (stripes !== '-' && triangles !== '-' && circle !== '-');

                html += `
                    <tr style="${i === captchaImgIndex ? 'background:#eff6ff; font-weight:700;' : ''}">
                        <td>Imatge ${i}</td>
                        <td>${formatAnsBadge(stripes)}</td>
                        <td>${formatAnsBadge(triangles)}</td>
                        <td>${formatAnsBadge(circle)}</td>
                        <td>${isComplete ? '<span style="color:#059669;">✅ Registrat</span>' : '<span style="color:#d97706;">⏳ Pendent</span>'}</td>
                    </tr>
                `;
            }
            tbody.innerHTML = html;
        }

        function formatAnsBadge(val) {
            if (val === 'SI') return '<span style="color:#059669; font-weight:700;">SÍ</span>';
            if (val === 'NO') return '<span style="color:#dc2626; font-weight:700;">NO</span>';
            return '<span style="color:#94a3b8;">-</span>';
        }

        function renderAttributeComparison(label, userVal, benchData) {
            const hasVoted = !!userVal;
            const matchesMaj = (userVal === benchData.maj);
            const badgeBg = !hasVoted ? '#f1f5f9' : (matchesMaj ? '#dcfce7' : '#fee2e2');
            const badgeCol = !hasVoted ? '#64748b' : (matchesMaj ? '#15803d' : '#991b1b');
            const icon = !hasVoted ? '⏳' : (matchesMaj ? '✅' : '⚠️');

            return `
                <div style="display:flex; justify-content:space-between; align-items:center; background:#f8fafc; padding:3px 6px; border-radius:4px; font-size:0.78rem;">
                    <span style="color:#475569; font-weight:600;">${label}:</span>
                    <div style="display:flex; align-items:center; gap:0.4rem;">
                        <span style="font-weight:700; font-size:0.75rem; padding:1px 6px; border-radius:3px; background:${badgeBg}; color:${badgeCol};">
                            ${icon} Tu: ${userVal || 'Pendent'}
                        </span>
                        <span style="font-size:0.72rem; color:#64748b;">
                            Consens: <strong>${benchData.maj}</strong> (${benchData.pct}%)
                        </span>
                    </div>
                </div>
            `;
        }

        function compareIndividualWithBenchmark() {
            const fbEl = document.getElementById('individual-comparison-feedback') || document.getElementById('team-comparison-feedback');
            if (!fbEl) return;

            let taggedCount = 0;
            let totalQuestionsAnswered = 0;
            let matchCount = 0;
            let edgeCasesChecked = 0;

            for (let i = 1; i <= 12; i++) {
                const ans = appState.repte1Answers[i] || {};
                const bench = repte1BenchmarkData[i];
                if (ans.stripes || ans.triangles || ans.circle) {
                    taggedCount++;
                }
                ['stripes', 'triangles', 'circle'].forEach(q => {
                    if (ans[q]) {
                        totalQuestionsAnswered++;
                        if (ans[q] === bench[q].maj) {
                            matchCount++;
                        }
                    }
                });
                if (bench.isEdge && (ans.stripes || ans.triangles || ans.circle)) {
                    edgeCasesChecked++;
                }
            }

            if (taggedCount === 0) {
                fbEl.style.display = 'block';
                fbEl.innerHTML = `<div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:8px; padding:1rem; color:#991b1b;">
                    ⚠️ <strong>Encara no has etiquetat cap imatge!</strong> Vés al visor CAPTCHA de dalt i respon a les 3 preguntes de les imatges per poder comparar el teu criteri amb el consens general de la classe.
                </div>`;
                return;
            }

            const matchPct = totalQuestionsAnswered > 0 ? Math.round((matchCount / totalQuestionsAnswered) * 100) : 0;

            let html = `
                <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:12px; padding:1.25rem; margin-top:0.75rem;">
                    <!-- RESUM SUPERIOR -->
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; border-bottom:1px solid #e2e8f0; padding-bottom:1rem; margin-bottom:1.25rem;">
                        <div>
                            <h4 style="margin:0; font-size:1.15rem; color:#1e1b4b; display:flex; align-items:center; gap:0.5rem;">
                                <span>📊</span> Comparativa Individual: El teu criteri vs Consens General
                            </h4>
                            <div style="font-size:0.85rem; color:#64748b; margin-top:0.25rem;">
                                Has respost <strong>${totalQuestionsAnswered}</strong> preguntes en <strong>${taggedCount}/12</strong> imatges analitzades.
                            </div>
                        </div>
                        <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
                            <div style="background:#e0e7ff; color:#3730a3; padding:0.4rem 0.8rem; border-radius:8px; font-size:0.85rem; font-weight:700; text-align:center;">
                                Coincidència amb majoria: ${matchPct}%
                            </div>
                            <div style="background:#fef3c7; color:#92400e; padding:0.4rem 0.8rem; border-radius:8px; font-size:0.85rem; font-weight:700; text-align:center;">
                                Casos frontera revisats: ${edgeCasesChecked}/7
                            </div>
                        </div>
                    </div>

                    <!-- GRAELLA DE LES 12 IMATGES -->
                    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(290px, 1fr)); gap:1rem; margin-bottom:1.25rem;">
            `;

            for (let i = 1; i <= 12; i++) {
                const ans = appState.repte1Answers[i] || {};
                const bench = repte1BenchmarkData[i];
                const isEdge = bench.isEdge;

                html += `
                    <div style="background:white; border:1px solid ${isEdge ? '#fde68a' : '#e2e8f0'}; border-radius:10px; padding:0.9rem; box-shadow:0 1px 3px rgba(0,0,0,0.03); display:flex; flex-direction:column; justify-content:space-between;">
                        <div>
                            <div style="display:flex; gap:0.75rem; align-items:center; margin-bottom:0.75rem;">
                                <div style="width:64px; height:64px; background:#0f172a; border-radius:6px; overflow:hidden; flex-shrink:0; border:1px solid #334155;">
                                    <img src="img/repte1/objecte_${i}.png" alt="Imatge ${i}" style="width:100%; height:100%; object-fit:contain; display:block;">
                                </div>
                                <div style="flex:1;">
                                    <div style="display:flex; justify-content:space-between; align-items:center;">
                                        <strong style="color:#0f172a; font-size:0.95rem;">Imatge ${i}</strong>
                                        <span style="font-size:0.7rem; font-weight:700; padding:2px 6px; border-radius:4px; ${isEdge ? 'background:#fef3c7; color:#92400e;' : 'background:#dcfce7; color:#15803d;'}">
                                            ${isEdge ? '⚠️ Cas Frontera' : '✅ Cas Clar'}
                                        </span>
                                    </div>
                                    <div style="font-size:0.75rem; color:#64748b; margin-top:2px; line-height:1.3;">${bench.desc}</div>
                                </div>
                            </div>

                            <!-- COMPARACIÓ DELS 3 ATRIBUTS -->
                            <div style="font-size:0.8rem; display:flex; flex-direction:column; gap:0.35rem;">
                                ${renderAttributeComparison('🦓 Ratlles', ans.stripes, bench.stripes)}
                                ${renderAttributeComparison('🔺 Triangles', ans.triangles, bench.triangles)}
                                ${renderAttributeComparison('⚪ Rodona gran', ans.circle, bench.circle)}
                            </div>
                        </div>
                    </div>
                `;
            }

            html += `
                    </div>

                    <!-- EXPLICACIÓ DIDÀCTICA -->
                    <div style="background:#eff6ff; border-left:4px solid #3b82f6; border-radius:6px; padding:0.9rem 1.1rem; font-size:0.86rem; color:#1e3a8a; line-height:1.5;">
                        <strong>💡 Lliçó Didàctica Clau sobre Recollida de Dades i Biaix Humà:</strong><br>
                        Fixa't que en els <strong>Casos Frontera (imatges 4, 7 i 8)</strong>, cap persona no s'equivoca! Cadascú interpreta les formes segons la seva pròpia percepció. Però si entrenem una IA amb dades on diferents persones voten oposadament per la mateixa imatge, la xarxa rep ordres matemàtiques contradictòries (<strong>soroll d'etiquetes o Label Noise</strong>). Per això la solució professional és crear una <em>Guia d'Anotació rigorosa</em> (Labeling Guidelines) amb regles unificades!
                    </div>
                </div>
            `;

            fbEl.innerHTML = html;
            fbEl.style.display = 'block';

            appState.repte1ConsensusChecked = true;
            saveState();
            updateRepte1ProgressStatus();
        }

        function compareTeamWithBenchmark() {
            compareIndividualWithBenchmark();
        }

        function saveRepte1Notes() {
            const notesEl = document.getElementById('repte1-notes');
            if (notesEl) {
                appState.repte1Notes = notesEl.value;
                saveState();
                const st = document.getElementById('repte1-notes-status');
                if (st) st.style.display = notesEl.value.trim().length > 0 ? 'block' : 'none';
                if (typeof updateRepte1ProgressStatus === 'function') {
                    updateRepte1ProgressStatus();
                }
            }
        }

        function saveRepte1NoiseReflection() {
            const el = document.getElementById('repte1-noise-reflection');
            if (el) {
                appState.repte1NoiseReflection = el.value;
                saveState();
                const st = document.getElementById('repte1-noise-status');
                if (st) st.style.display = el.value.trim().length > 0 ? 'block' : 'none';
                if (typeof updateRepte1ProgressStatus === 'function') {
                    updateRepte1ProgressStatus();
                }
            }
        }

        function saveB2Refl3() {
            const el = document.getElementById('b2-refl-3');
            if (el) {
                appState.b2Refl3 = el.value;
                saveState();
                const st = document.getElementById('b2-refl-3-status');
                if (st) st.style.display = el.value.trim().length > 0 ? 'block' : 'none';
                if (typeof updateRepte1ProgressStatus === 'function') {
                    updateRepte1ProgressStatus();
                }
            }
        }

        function updateRepte1ProgressStatus() {
            const statusEl = document.getElementById('stage2-progress-status');
            const nextBtn = document.getElementById('btn-complete-stage-2');
            if (!statusEl) return;

            let fullyTaggedCount = 0;
            for (let i = 1; i <= 12; i++) {
                const ans = appState.repte1Answers[i] || {};
                if (ans.stripes && ans.triangles && ans.circle) {
                    fullyTaggedCount++;
                }
            }
            const testCount = Object.keys((appState.stageQuizAnswers && appState.stageQuizAnswers[2]) || appState.repte1TestAnswers || {}).length;
            const consensusChecked = !!appState.repte1ConsensusChecked;
            const w1 = countWords((document.getElementById('repte1-notes')?.value || appState.repte1Notes || '').trim());
            const w2 = countWords((document.getElementById('repte1-noise-reflection')?.value || appState.repte1NoiseReflection || '').trim());
            const w3 = countWords((document.getElementById('b2-refl-3')?.value || appState.b2Refl3 || '').trim());
            const refsOk = (w1 >= 5 && w2 >= 5 && w3 >= 5);

            const isReady = (fullyTaggedCount === 12 && consensusChecked && testCount === 5 && refsOk);

            if (isReady) {
                statusEl.innerHTML = `<span style="color:#059669; font-weight:700;">✅ Repte 1 completat amb èxit!</span> Has etiquetat les 12 imatges (12/12), comprovat el consens, respost el test (5/5) i completat les 3 reflexions. Ja pots avançar a la Fase 3!`;
                if (nextBtn) {
                    nextBtn.className = "btn btn-success";
                    nextBtn.style.opacity = "1";
                    nextBtn.style.cursor = "pointer";
                }
            } else {
                statusEl.innerHTML = `⏳ <strong>Progrés del Repte 1:</strong> Imatges etiquetades (${fullyTaggedCount}/12) · Consens: ${consensusChecked ? '✅' : '❌'} · Test Bloc 2: (${testCount}/5) · Reflexions: (${[w1>=5, w2>=5, w3>=5].filter(Boolean).length}/3).`;
                if (nextBtn) {
                    nextBtn.className = "btn btn-secondary";
                    nextBtn.style.opacity = "0.7";
                }
            }
        }

