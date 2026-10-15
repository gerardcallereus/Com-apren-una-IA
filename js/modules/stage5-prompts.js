// ==========================================
// FASE 5: L'ART DELS PROMPTS (GUERRA CIVIL ESPANYOLA)
// ==========================================

        function calculatePromptScore() {
            const obj = document.getElementById('prompt-obj')?.value || appState.promptLabData?.obj || '';
            const ctx = document.getElementById('prompt-ctx')?.value || appState.promptLabData?.ctx || '';
            const fmt = document.getElementById('prompt-fmt')?.value || appState.promptLabData?.fmt || '';
            const lim = document.getElementById('prompt-lim')?.value || appState.promptLabData?.lim || '';

            const wObj = countWords(obj);
            const wCtx = countWords(ctx);
            const wFmt = countWords(fmt);
            const wLim = countWords(lim);

            let score = 0;
            if (wObj >= 8) score += 25;
            if (wCtx >= 8) score += 25;
            if (wFmt >= 8) score += 25;
            if (wLim >= 8) score += 25;

            return score;
        }

        function savePromptReflection() {
            const el = document.getElementById('prompt-reflection-eval');
            if (el) {
                appState.promptReflectionEval = el.value;
                saveState();
                const st = document.getElementById('prompt-reflection-eval-status');
                if (st) st.style.display = el.value.trim().length > 0 ? 'block' : 'none';
                updatePromptLab();
            }
        }

        function saveB5Refl2() {
            const el = document.getElementById('b5-refl-2');
            if (el) {
                appState.b5Refl2 = el.value;
                saveState();
                const st = document.getElementById('b5-refl-2-status');
                if (st) st.style.display = el.value.trim().length > 0 ? 'block' : 'none';
                updatePromptLab();
            }
        }

        function saveB5Refl3() {
            const el = document.getElementById('b5-refl-3');
            if (el) {
                appState.b5Refl3 = el.value;
                saveState();
                const st = document.getElementById('b5-refl-3-status');
                if (st) st.style.display = el.value.trim().length > 0 ? 'block' : 'none';
                updatePromptLab();
            }
        }

        function updatePromptLab() {
            const obj = document.getElementById('prompt-obj')?.value || '';
            const ctx = document.getElementById('prompt-ctx')?.value || '';
            const fmt = document.getElementById('prompt-fmt')?.value || '';
            const lim = document.getElementById('prompt-lim')?.value || '';

            appState.promptLabData = { obj, ctx, fmt, lim };
            saveState();

            const wObj = countWords(obj);
            const wCtx = countWords(ctx);
            const wFmt = countWords(fmt);
            const wLim = countWords(lim);

            updateWordBadge('cnt-prompt-obj', wObj, 8, 'Objectiu');
            updateWordBadge('cnt-prompt-ctx', wCtx, 8, 'Context');
            updateWordBadge('cnt-prompt-fmt', wFmt, 8, 'Format');
            updateWordBadge('cnt-prompt-lim', wLim, 8, 'Límits');

            let score = 0;
            const missing = [];
            if (wObj >= 8) score += 25; else missing.push(`Objectiu (${wObj}/8 paraules)`);
            if (wCtx >= 8) score += 25; else missing.push(`Context (${wCtx}/8 paraules)`);
            if (wFmt >= 8) score += 25; else missing.push(`Format (${wFmt}/8 paraules)`);
            if (wLim >= 8) score += 25; else missing.push(`Límits (${wLim}/8 paraules)`);

            const testCount = Object.keys((appState.stageQuizAnswers && appState.stageQuizAnswers[6]) || {}).length;
            const testOk = (testCount === 5);
            const w1 = countWords((document.getElementById('prompt-reflection-eval')?.value || appState.promptReflectionEval || '').trim());
            const w2 = countWords((document.getElementById('b5-refl-2')?.value || appState.b5Refl2 || '').trim());
            const w3 = countWords((document.getElementById('b5-refl-3')?.value || appState.b5Refl3 || '').trim());
            const refsOk = (w1 >= 5 && w2 >= 5 && w3 >= 5);

            const scoreBadge = document.getElementById('prompt-score-badge');
            const scoreBar = document.getElementById('prompt-score-bar');
            const previewBox = document.getElementById('prompt-preview-box');
            const fbBox = document.getElementById('prompt-feedback-box');
            const nextBtn = document.getElementById('btn-stage6-next') || document.getElementById('btn-complete-stage-6');
            const lockHint = document.getElementById('prompt-lock-hint');
            const statusEl = document.getElementById('stage6-progress-status');

            if (scoreBadge) {
                scoreBadge.textContent = `${score} / 100%`;
                scoreBadge.style.background = score === 100 ? '#dcfce7' : (score >= 50 ? '#fef3c7' : '#fee2e2');
                scoreBadge.style.color = score === 100 ? '#15803d' : (score >= 50 ? '#92400e' : '#b91c1c');
            }

            if (scoreBar) {
                scoreBar.style.width = `${score}%`;
                scoreBar.className = 'confidence-fill ' + (score === 100 ? 'high' : (score >= 50 ? 'mid' : 'low'));
            }

            if (previewBox) {
                let fullPrompt = "";
                if (obj.trim()) fullPrompt += `🎯 Objectiu: ${obj.trim()}\n\n`;
                if (ctx.trim()) fullPrompt += `👥 Públic/Context: ${ctx.trim()}\n\n`;
                if (fmt.trim()) fullPrompt += `📐 Format: ${fmt.trim()}\n\n`;
                if (lim.trim()) fullPrompt += `🛡️ Restriccions: ${lim.trim()}\n`;
                previewBox.textContent = fullPrompt.trim() || "Omple els 4 camps de l'esquerra per veure com queda el teu prompt professional per a la feina d'història...";
            }

            if (fbBox) {
                if (score === 100) {
                    fbBox.style.background = '#dcfce7';
                    fbBox.style.borderColor = '#86efac';
                    fbBox.style.color = '#166534';
                    fbBox.innerHTML = "<strong style='color:#15803d;'>🏆 Prompt 100% Excel·lent!</strong> Has inclòs els 4 components requerits amb el volum de paraules necessari per guiar la IA de forma impecable en el treball sobre la Guerra Civil.";
                } else {
                    fbBox.style.background = '#eff6ff';
                    fbBox.style.borderColor = '#bfdbfe';
                    fbBox.style.color = '#1e40af';
                    fbBox.innerHTML = `⚠️ <strong>Qualitat actual: ${score}%</strong>. Falten paraules mínimes a: <em>${missing.join(', ')}</em>. Cal arribar al 100% per desbloquejar el qüestionari.`;
                }
            }

            const isReady = (score === 100 && testOk && refsOk) || (typeof isTeacherMode === 'function' && isTeacherMode());

            if (statusEl) {
                if (typeof isTeacherMode === 'function' && isTeacherMode()) {
                    statusEl.innerHTML = `<span style="color:#2563eb; font-weight:700;">🎓 Mode Docent actiu:</span> Totes les fases i activitats estan desbloquejades per a inspecció lliure.`;
                } else if (isReady) {
                    statusEl.innerHTML = `<span style="color:#059669; font-weight:700;">✅ Fase 6 completada amb èxit!</span> Prompt 100% excel·lent, test (5/5) i les 3 reflexions completades. Ja pots avançar a la Fase 7: Qüestionari Final!`;
                } else {
                    statusEl.innerHTML = `⏳ <strong>Progrés del Laboratori de Prompts:</strong> Qualitat prompt: ${score}%/100% · Test Bloc 6: (${testCount}/5) · Reflexions: (${[w1>=5, w2>=5, w3>=5].filter(Boolean).length}/3).`;
                }
            }

            if (nextBtn) {
                if (isReady) {
                    nextBtn.disabled = false;
                    nextBtn.className = 'btn btn-success';
                    nextBtn.style.opacity = '1';
                    nextBtn.style.cursor = 'pointer';
                    nextBtn.innerHTML = (typeof isTeacherMode === 'function' && isTeacherMode()) 
                        ? '🎓 Mode Docent: Anar a la Fase 7: Qüestionari Final ➡️'
                        : 'Completar Fase 6 i anar a la Fase 7: Qüestionari Final ➡️';
                    if (lockHint) lockHint.style.display = 'none';
                } else {
                    nextBtn.disabled = true;
                    nextBtn.className = 'btn btn-secondary';
                    nextBtn.style.opacity = '0.6';
                    nextBtn.style.cursor = 'not-allowed';
                    nextBtn.innerHTML = `🔒 Qualitat: ${score}% / 100% (Cal test 5/5 i 3 reflexions) ➡️`;
                    if (lockHint) {
                        lockHint.style.display = 'block';
                        lockHint.textContent = `🔒 Has d'assolir el 100% de qualitat al prompt, respondre el test (5/5) i completar les 3 reflexions per desbloquejar el Qüestionari Final.`;
                    }
                }
            }
        }

        function updateWordBadge(id, words, minWords, label) {
            const el = document.getElementById(id);
            if (!el) return;
            if (words >= minWords) {
                el.innerHTML = `<span style="color:#059669; font-weight:700;">✅ ${words} paraules (${label} assolit +25%)</span>`;
            } else {
                const diff = minWords - words;
                el.innerHTML = `<span style="color:#d97706;">✍️ ${words} / ${minWords} paraules mínimes (Falten ${diff})</span>`;
            }
        }
