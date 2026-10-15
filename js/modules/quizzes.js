// ==========================================
// MOTOR DE QÜESTIONARIS I TESTS (PER BLOC I FINAL)
// ==========================================

        function getStageQuizScore(stageNum) {
            if (!stageQuizzesData[stageNum]) return 0;
            const answers = (appState.stageQuizAnswers && appState.stageQuizAnswers[stageNum]) || (stageNum === 2 ? appState.repte1TestAnswers : {}) || {};
            let count = 0;
            stageQuizzesData[stageNum].forEach(item => {
                if (answers[item.id] === item.correct) count++;
            });
            return count;
        }

        function renderStageQuiz(stageNum) {
            const containerId = stageNum === 2 ? 'repte1-quiz-container' : `stage-quiz-${stageNum}-container`;
            const badgeId = stageNum === 2 ? 'repte1-test-badge' : `stage-quiz-${stageNum}-badge`;
            const container = document.getElementById(containerId);
            if (!container) return;

            if (!appState.stageQuizAnswers) appState.stageQuizAnswers = { 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {} };
            if (!appState.stageQuizAnswers[stageNum]) appState.stageQuizAnswers[stageNum] = {};
            if (stageNum === 2 && appState.repte1TestAnswers) {
                Object.assign(appState.stageQuizAnswers[2], appState.repte1TestAnswers);
            }

            const quizData = stageQuizzesData[stageNum] || [];
            let html = '';
            let correctCount = 0;

            quizData.forEach((item, idx) => {
                const userChoice = appState.stageQuizAnswers[stageNum][item.id];
                const isAnswered = (userChoice !== undefined);
                const isCorrect = (userChoice === item.correct);
                if (isCorrect) correctCount++;

                html += `
                    <div class="quiz-card" style="margin-bottom:1.15rem; background:white; border:1px solid #cbd5e1; border-radius:var(--radius-md); padding:1.15rem; box-shadow:0 1px 3px rgba(0,0,0,0.03);">
                        <div style="font-size:0.8rem; font-weight:700; color:var(--primary); margin-bottom:0.35rem;">Pregunta ${idx + 1} de ${quizData.length}</div>
                        <h5 style="margin:0 0 0.85rem; font-size:0.98rem; color:var(--text-main); line-height:1.45;">${item.q}</h5>
                        <div class="quiz-options">
                `;

                item.opts.forEach((optText, optIdx) => {
                    let cls = 'quiz-opt';
                    let radioDot = 'border:2px solid #cbd5e1; background:white;';

                    if (isAnswered) {
                        if (optIdx === item.correct) {
                            cls += ' correct';
                            radioDot = 'border:2px solid #10b981; background:#10b981; color:white;';
                        } else if (userChoice === optIdx) {
                            cls += ' incorrect';
                            radioDot = 'border:2px solid #ef4444; background:#ef4444; color:white;';
                        }
                    } else if (userChoice === optIdx) {
                        cls += ' selected';
                        radioDot = 'border:2px solid #2563eb; background:#2563eb; color:white;';
                    }

                    html += `
                        <button type="button" class="${cls}" onclick="selectStageQuizAns(${stageNum}, ${item.id}, ${optIdx})" ${isAnswered ? 'disabled' : ''} style="font-size:0.88rem; padding:0.7rem 0.95rem; margin-bottom:0.45rem; display:flex; align-items:flex-start; text-align:left; border-radius:8px; width:100%; border:1px solid #cbd5e1; cursor:${isAnswered ? 'default' : 'pointer'}; pointer-events:${isAnswered ? 'none' : 'auto'};">
                            <span style="display:inline-flex; align-items:center; justify-content:center; width:22px; height:22px; border-radius:50%; margin-right:0.75rem; flex-shrink:0; font-size:0.75rem; ${radioDot}">
                                ${isAnswered ? (optIdx === item.correct ? '✓' : (userChoice === optIdx ? '✕' : ['A','B','C'][optIdx])) : ['A','B','C'][optIdx]}
                            </span>
                            <span style="flex:1; line-height:1.4;">${optText}</span>
                        </button>
                    `;
                });

                html += `
                        </div>
                        <div class="quiz-feedback ${isAnswered ? 'show' : ''}" style="${isCorrect ? 'background:#dcfce7; color:#166534;' : 'background:#fee2e2; color:#991b1b;'} margin-top:0.6rem; padding:0.65rem 0.85rem; font-size:0.85rem; border-radius:var(--radius-sm); border-left:4px solid ${isCorrect ? '#10b981' : '#ef4444'}; display:${isAnswered ? 'block' : 'none'};">
                            ${isAnswered ? (isCorrect ? "✅ " + item.fb : "❌ Resposta incorrecta. La correcta és l'opció indicada en verd. " + item.fb) : ""}
                        </div>
                    </div>
                `;
            });

            container.innerHTML = html;

            if (stageNum === 2) {
                appState.repte1TestScore = correctCount;
            }

            const badgeEl = document.getElementById(badgeId);
            if (badgeEl) {
                badgeEl.textContent = `${correctCount}/${quizData.length} Encerts (${Math.round((correctCount / quizData.length) * 100)}%)`;
                if (correctCount === quizData.length) badgeEl.className = 'badge-pill badge-pill-emerald';
                else badgeEl.className = 'badge-pill badge-pill-amber';
            }
        }

        function selectStageQuizAns(stageNum, qId, optIdx) {
            if (!appState.stageQuizAnswers) appState.stageQuizAnswers = { 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {} };
            if (!appState.stageQuizAnswers[stageNum]) appState.stageQuizAnswers[stageNum] = {};
            // Si ja s'ha respost prèviament, no permetre canviar de resposta
            if (appState.stageQuizAnswers[stageNum][qId] !== undefined) {
                return;
            }
            appState.stageQuizAnswers[stageNum][qId] = optIdx;
            if (stageNum === 2) {
                if (!appState.repte1TestAnswers) appState.repte1TestAnswers = {};
                appState.repte1TestAnswers[qId] = optIdx;
            }
            saveState();
            renderStageQuiz(stageNum);
            if (stageNum === 1 && typeof updateSimProgressStatus === 'function') updateSimProgressStatus();
            if (stageNum === 2 && typeof updateRepte1ProgressStatus === 'function') updateRepte1ProgressStatus();
            if (stageNum === 3 && typeof updateStage3ProgressStatus === 'function') updateStage3ProgressStatus();
            if (stageNum === 4 && typeof updateTMProgressStatus === 'function') updateTMProgressStatus();
            if (stageNum === 5 && typeof updateStage4ProgressStatus === 'function') updateStage4ProgressStatus();
            if (stageNum === 6 && typeof updatePromptLab === 'function') updatePromptLab();
        }

        function renderRepte1Quiz() {
            renderStageQuiz(2);
        }

        function selectRepte1QuizAns(qId, optIdx) {
            selectStageQuizAns(2, qId, optIdx);
        }

        function renderQuizUI() {
            const list = document.getElementById('quiz-questions-list');
            if (!list) return;

            let html = '';
            quizQuestions.forEach(item => {
                const userAns = appState.quizAnswers[item.id];
                const isAnswered = (userAns !== undefined);

                html += `
                    <div class="quiz-card" id="qcard-${item.id}">
                        <span class="quiz-q-num">Pregunta ${item.id} · Bloc ${item.block}</span>
                        <h4 style="font-size:1.05rem; margin-bottom:1rem;">${item.q}</h4>
                        <div class="quiz-options">
                `;

                item.opts.forEach((optText, idx) => {
                    let cls = 'quiz-opt';
                    let iconHtml = '<span style="display:inline-flex; align-items:center; justify-content:center; width:22px; height:22px; border-radius:50%; border:2px solid #cbd5e1; background:white; margin-right:0.75rem; flex-shrink:0; font-size:0.75rem; transition:all 0.2s;"></span>';

                    if (appState.quizCompleted) {
                        if (idx === item.correct) {
                            cls += ' correct';
                            iconHtml = '<span style="display:inline-flex; align-items:center; justify-content:center; width:22px; height:22px; border-radius:50%; background:#10b981; color:white; margin-right:0.75rem; flex-shrink:0; font-size:0.85rem; font-weight:800;">✓</span>';
                        } else if (userAns === idx) {
                            cls += ' incorrect';
                            iconHtml = '<span style="display:inline-flex; align-items:center; justify-content:center; width:22px; height:22px; border-radius:50%; background:#ef4444; color:white; margin-right:0.75rem; flex-shrink:0; font-size:0.85rem; font-weight:800;">✕</span>';
                        }
                    } else if (userAns === idx) {
                        cls += ' selected';
                        iconHtml = '<span style="display:inline-flex; align-items:center; justify-content:center; width:22px; height:22px; border-radius:50%; border:2px solid #2563eb; background:#2563eb; color:white; margin-right:0.75rem; flex-shrink:0; font-size:0.75rem; box-shadow:0 0 0 3px rgba(37,99,235,0.25);">●</span>';
                    }

                    html += `
                        <button class="${cls}" onclick="selectQuizAns(${item.id}, ${idx})" ${(isAnswered || appState.quizCompleted) ? 'disabled style="cursor:default; pointer-events:none;"' : ''}>
                            ${iconHtml}
                            <span style="flex:1;"><strong>${['A', 'B', 'C', 'D'][idx]})</strong> ${optText}</span>
                        </button>
                    `;
                });

                html += `
                        </div>
                        <div class="quiz-feedback ${appState.quizCompleted ? 'show' : ''}" id="qfb-${item.id}" style="${userAns === item.correct ? 'background:#dcfce7; color:#166534;' : 'background:#fee2e2; color:#991b1b;'}">
                            ${appState.quizCompleted ? (userAns === item.correct ? '✅ ' + item.fb : '❌ Resposta incorrecta. La solució correcta és la opció indicada en verd. ' + item.fb) : ''}
                        </div>
                    </div>
                `;
            });

            list.innerHTML = html;
            updateQuizProgressBadge();

            const btnDiploma = document.getElementById('btn-goto-diploma');
            if (btnDiploma && (appState.quizCompleted || (typeof isTeacherMode === 'function' && isTeacherMode()))) {
                btnDiploma.disabled = false;
                btnDiploma.innerHTML = (typeof isTeacherMode === 'function' && isTeacherMode()) 
                    ? "🎓 Mode Docent: Veure el Diploma Oficial ➡️" 
                    : "🎓 Veure el Diploma Oficial i Dossier d'Avaluació ➡️";
                btnDiploma.setAttribute('onclick', 'goToStage(8)');
            }
        }

        function selectQuizAns(qId, optIdx) {
            if (!appState.quizAnswers) appState.quizAnswers = {};
            // Si ja s'ha respost o el test està completat, no permetre canvis
            if (appState.quizAnswers[qId] !== undefined || appState.quizCompleted) {
                return;
            }
            appState.quizAnswers[qId] = optIdx;
            saveState();
            renderQuizUI();
        }

        function updateQuizProgressBadge() {
            const answeredCount = Object.keys(appState.quizAnswers).length;
            const totalQ = quizQuestions.length;
            const badge = document.getElementById('quiz-progress-badge');
            if (badge) badge.textContent = `${answeredCount} / ${totalQ} Respostes`;
        }

        function submitQuiz() {
            const totalQ = quizQuestions.length;
            const answeredCount = Object.keys(appState.quizAnswers).length;
            if (answeredCount < totalQ) {
                if (!confirm(`⚠️ Has respost ${answeredCount} de ${totalQ} preguntes. Vols corregir-lo ara o prefereixes acabar de respondre les que falten?`)) {
                    return;
                }
            }

            let correctCount = 0;
            quizQuestions.forEach(item => {
                if (appState.quizAnswers[item.id] === item.correct) {
                    correctCount++;
                }
            });

            appState.quizScore = correctCount;
            appState.quizCompleted = true;

            if (!appState.completedStages.includes(7)) {
                appState.completedStages.push(7);
            }
            appState.unlockedStage = 8;

            saveState();
            renderQuizUI();

            const scoreBadge = document.getElementById('quiz-score-badge');
            if (scoreBadge) {
                scoreBadge.style.display = 'inline-flex';
                const pct = Math.round((correctCount / totalQ) * 100);
                const mark10 = ((correctCount / totalQ) * 10).toFixed(1);
                scoreBadge.textContent = `Nota: ${mark10}/10 (${correctCount}/${totalQ} Encerts · ${pct}%)`;
            }

            const btnDiploma = document.getElementById('btn-goto-diploma');
            if (btnDiploma) {
                btnDiploma.disabled = false;
                btnDiploma.innerHTML = "🎓 Veure el Diploma Oficial i Dossier d'Avaluació ➡️";
                btnDiploma.setAttribute('onclick', 'goToStage(8)');
            }

            alert(`🎉 Qüestionari completat! Has obtingut ${correctCount} / ${totalQ} encerts (${Math.round((correctCount / totalQ) * 100)}%).\nJa pots consultar el teu Diploma Oficial i el dossier d'activitats per al professorat!`);
        }
