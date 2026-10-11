// ==========================================
// FASE 3: TEACHABLE MACHINE (CLASSES I REPTES 2 I 3)
// ==========================================

        const classPresets = {
            material: ['Bolígraf', 'Llapis', 'Retolador'],
            reciclatge: ['Plàstic', 'Paper', 'Orgànic'],
            mans: ['Pedra', 'Paper', 'Tisora'],
            emocions: ['Somriure', 'Serietat', 'Sorpresa'],
            objectes: ['Claus', 'Mòbil', 'Calculadora'],
            custom: ['Classe A', 'Classe B', 'Classe C']
        };

        function selectClassPreset(key) {
            const preset = classPresets[key];
            if (!preset) return;

            document.querySelectorAll('.preset-pill-btn').forEach(btn => btn.classList.remove('active'));
            const activeBtn = document.getElementById(`preset-btn-${key}`);
            if (activeBtn) activeBtn.classList.add('active');

            const c1 = document.getElementById('tm-class-1');
            const c2 = document.getElementById('tm-class-2');
            const c3 = document.getElementById('tm-class-3');

            if (c1) c1.value = preset[0];
            if (c2) c2.value = preset[1];
            if (c3) c3.value = preset[2];

            appState.tmClasses = [preset[0], preset[1], preset[2]];
            saveState();
            if (typeof updateTMProgressStatus === 'function') {
                updateTMProgressStatus();
            }
        }

        function updateCustomClasses() {
            const c1 = (document.getElementById('tm-class-1')?.value || 'Classe 1').trim();
            const c2 = (document.getElementById('tm-class-2')?.value || 'Classe 2').trim();
            const c3 = (document.getElementById('tm-class-3')?.value || 'Classe 3').trim();

            appState.tmClasses = [c1, c2, c3];

            document.querySelectorAll('.preset-pill-btn').forEach(btn => btn.classList.remove('active'));
            const customBtn = document.getElementById('preset-btn-custom');
            if (customBtn) customBtn.classList.add('active');

            saveState();
            if (typeof updateTMProgressStatus === 'function') {
                updateTMProgressStatus();
            }
        }

        function restoreTMClasses() {
            if (Array.isArray(appState.tmClasses) && appState.tmClasses.length === 3) {
                const c1 = document.getElementById('tm-class-1');
                const c2 = document.getElementById('tm-class-2');
                const c3 = document.getElementById('tm-class-3');
                if (c1) c1.value = appState.tmClasses[0];
                if (c2) c2.value = appState.tmClasses[1];
                if (c3) c3.value = appState.tmClasses[2];
            }
        }

        function saveRepte2Data() {
            appState.repte2Data = {
                p1_fons: document.getElementById('r2-p1-fons')?.value || '',
                p1_res: document.getElementById('r2-p1-result')?.value || '',
                p1_hip: document.getElementById('r2-p1-hip')?.value || '',
                p2_var: document.getElementById('r2-p2-var')?.value || '',
                p2_res: document.getElementById('r2-p2-result')?.value || '',
                p2_hip: document.getElementById('r2-p2-hip')?.value || '',
                p3_part: document.getElementById('r2-p3-part')?.value || '',
                p3_res: document.getElementById('r2-p3-result')?.value || '',
                p3_hip: document.getElementById('r2-p3-hip')?.value || ''
            };
            saveState();
            if (typeof updateTMProgressStatus === 'function') {
                updateTMProgressStatus();
            }
        }

        function saveRepte3Data() {
            appState.repte3Data = {
                chk1: document.getElementById('chk-r3-1')?.checked || false,
                chk2: document.getElementById('chk-r3-2')?.checked || false,
                chk3: document.getElementById('chk-r3-3')?.checked || false,
                chk4: document.getElementById('chk-r3-4')?.checked || false,
                millora: document.getElementById('r3-millora')?.value || '',
                falla: document.getElementById('r3-falla')?.value || '',
                futur: document.getElementById('r3-futur')?.value || ''
            };
            saveState();
            if (typeof updateTMProgressStatus === 'function') {
                updateTMProgressStatus();
            }
        }

        function updateTMProgressStatus() {
            const statusEl = document.getElementById('stage3-progress-status');
            const nextBtn = document.getElementById('btn-complete-stage-3');
            if (!statusEl) return;

            const classesOk = appState.tmClasses && appState.tmClasses.length === 3 && appState.tmClasses.every(c => c && c.trim().length > 0);
            const r2 = appState.repte2Data || {};
            const r3 = appState.repte3Data || {};

            const p1Ok = !!((r2.p1_res && r2.p1_res.trim().length > 0) && (r2.p1_hip && r2.p1_hip.trim().length > 0));
            const p2Ok = !!((r2.p2_res && r2.p2_res.trim().length > 0) && (r2.p2_hip && r2.p2_hip.trim().length > 0));
            const p3Ok = !!((r2.p3_res && r2.p3_res.trim().length > 0) && (r2.p3_hip && r2.p3_hip.trim().length > 0));
            const r2DoneCount = [p1Ok, p2Ok, p3Ok].filter(Boolean).length;

            const chkCount = [r3.chk1, r3.chk2, r3.chk3, r3.chk4].filter(Boolean).length;
            const testCount = Object.keys((appState.stageQuizAnswers && appState.stageQuizAnswers[3]) || {}).length;
            const wMillora = countWords(r3.millora || (document.getElementById('r3-millora')?.value || ''));
            const wFalla = countWords(r3.falla || (document.getElementById('r3-falla')?.value || ''));
            const wFutur = countWords(r3.futur || (document.getElementById('r3-futur')?.value || ''));
            const r3RefsOk = (wMillora >= 5 && wFalla >= 5 && wFutur >= 5);

            const isReady = (classesOk && r2DoneCount === 3 && chkCount === 4 && testCount === 5 && r3RefsOk);

            if (isReady) {
                statusEl.innerHTML = `<span style="color:#059669; font-weight:700;">✅ Fase 3 completada amb èxit!</span> 3 classes definides, 3 proves registrades al Repte 2, checklist completa (4/4), test (5/5) i les 3 reflexions del Repte 3 completades. Ja pots avançar a la Fase 4!`;
                if (nextBtn) {
                    nextBtn.className = "btn btn-success";
                    nextBtn.style.opacity = "1";
                    nextBtn.style.cursor = "pointer";
                }
            } else {
                statusEl.innerHTML = `⏳ <strong>Progrés de Teachable Machine:</strong> Classes: ${classesOk ? '✅' : '❌'} · Proves Repte 2: (${r2DoneCount}/3) · Checklist Repte 3: (${chkCount}/4) · Test Bloc 3: (${testCount}/5) · Reflexions Repte 3: (${[wMillora>=5, wFalla>=5, wFutur>=5].filter(Boolean).length}/3).`;
                if (nextBtn) {
                    nextBtn.className = "btn btn-secondary";
                    nextBtn.style.opacity = "0.7";
                }
            }
        }
