// ==========================================
// ESTAT DE L'APLICACIÓ AMB AUTOSAVE (LOCALSTORAGE) I NAVEGACIÓ
// ==========================================

// Helper per comptar paraules
function countWords(str) {
    if (!str) return 0;
    return str.trim().split(/\s+/).filter(w => w.length > 0).length;
}

// Helper per escapar HTML
function escapeHtml(text) {
    if (!text) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

        const STORAGE_KEY = 'ia_didactica_capsula_v3';

        let appState = {
            studentName: '',
            studentGroup: '1r ESO A',
            avatar: '🤖',
            currentStage: 1,
            unlockedStage: 1,
            completedStages: [],
            // Tracking del Simulador (Fase 1)
            simStepsVisited: [1],
            simTrained: false,
            simTested: false,
            simReflection: '',
            b1Refl2: '',
            b1Refl3: '',
            // Dades Fase 2 (CAPTCHA i Casos Frontera)
            repte1Answers: {}, // key: imgId -> { stripes: 'SI'|'NO', triangles: 'SI'|'NO', circle: 'SI'|'NO' }
            repte1Notes: '',
            repte1NoiseReflection: '',
            b2Refl3: '',
            repte1ConsensusChecked: false,
            moralChoices: {}, // retrocompatibilitat
            repte1TestAnswers: {},
            repte1TestScore: 0,
            // Dades Fase 3 (Cotxes Autònoms i Moral Machine)
            b3Refl1: '',
            b3Refl2: '',
            b3Refl3: '',
            moralMachineExplored: false,
            // Dades Fase 4 (Teachable Machine: 3 classes + Quadern)
            tmClasses: ['Bolígraf', 'Llapis', 'Retolador'],
            repte2Data: {},
            repte3Data: {}, // { chk1, chk2, chk3, chk4, millora, falla, futur }
            // Dades Fase 5 (Riscos, Biaixos i Algorismes de Manipulació)
            hallucinationsAnswered: {},
            algoMode: 'manipulative',
            algoPhoneScreen: 1,
            manipulationExplored: false,
            manipEmotion: '',
            manipTeenFeeling: '',
            manipTeenExperience: '',
            manipulationReflection: '',
            manipCriticalReflection: '',
            // Dades Fase 6 (Prompt Engineering Guerra Civil)
            promptLabData: { obj: '', ctx: '', fmt: '', lim: '' },
            promptReflectionEval: '',
            b5Refl2: '',
            b5Refl3: '',
            // Respostes tests per blocs (Fases 1 a 6)
            stageQuizAnswers: { 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {} },
            // Dades Fase 7 (Qüestionari Final)
            quizAnswers: {},
            quizCompleted: false,
            quizScore: 0,
            certId: 'IA-ESO-2026-' + Math.floor(1000 + Math.random() * 9000)
        };

        // Carrega inicial
        function loadState() {
            let saved = localStorage.getItem(STORAGE_KEY);
            let isV2 = false;
            if (!saved) {
                saved = localStorage.getItem('ia_didactica_capsula_v2');
                if (saved) isV2 = true;
            }
            if (!saved) {
                saved = localStorage.getItem('ia_didactica_capsula_v1');
            }

            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    // Si migrem de v2 (on Teachable Machine era Fase 3 i Riscos Fase 4):
                    if (isV2 && parsed.stageQuizAnswers) {
                        const oldQuizzes = parsed.stageQuizAnswers;
                        parsed.stageQuizAnswers = {
                            1: oldQuizzes[1] || {},
                            2: oldQuizzes[2] || {},
                            3: {}, // Nova Fase 3 (Cotxes Autònoms)
                            4: oldQuizzes[3] || {}, // Teachable Machine (abans 3)
                            5: oldQuizzes[4] || {}, // Riscos (abans 4)
                            6: oldQuizzes[5] || {}  // Prompts (abans 5)
                        };
                        if (Array.isArray(parsed.completedStages)) {
                            parsed.completedStages = parsed.completedStages.map(s => (s >= 3 ? s + 1 : s));
                        }
                        if (parsed.currentStage && parsed.currentStage >= 3) {
                            parsed.currentStage = Math.min(8, parsed.currentStage + 1);
                        }
                        if (parsed.unlockedStage && parsed.unlockedStage >= 3) {
                            parsed.unlockedStage = Math.min(8, parsed.unlockedStage + 1);
                        }
                    }

                    appState = Object.assign(appState, parsed);
                    if (!Array.isArray(appState.simStepsVisited)) appState.simStepsVisited = [1];
                    if (!Array.isArray(appState.completedStages)) appState.completedStages = [];
                    if (!Array.isArray(appState.tmClasses) || appState.tmClasses.length !== 3) {
                        appState.tmClasses = ['Bolígraf', 'Llapis', 'Retolador'];
                    }
                    if (!appState.stageQuizAnswers || typeof appState.stageQuizAnswers !== 'object') {
                        appState.stageQuizAnswers = { 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {} };
                    }
                    for (let s = 1; s <= 6; s++) {
                        if (!appState.stageQuizAnswers[s]) appState.stageQuizAnswers[s] = {};
                    }
                    if (appState.repte1TestAnswers && Object.keys(appState.repte1TestAnswers).length > 0) {
                        Object.assign(appState.stageQuizAnswers[2], appState.repte1TestAnswers);
                    }
                } catch(e) {
                    console.error("Error carregant estat de localStorage:", e);
                }
            }

            updateHeaderUI();
            updateNavigationUI();
            restoreSavedFormFields();

            if (!appState.studentName || appState.studentName.trim() === '') {
                openProfileModal();
            } else {
                goToStage(appState.currentStage || 1);
            }
        }

        function saveState() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
            updateHeaderUI();
            updateNavigationUI();
        }

        function updateHeaderUI() {
            const nameEl = document.getElementById('header-name');
            const groupEl = document.getElementById('header-group');
            const avatarEl = document.getElementById('header-avatar');

            if (nameEl) nameEl.textContent = appState.studentName || "Alumne/a sense nom";
            if (groupEl) groupEl.textContent = appState.studentGroup || "1r ESO A";
            if (avatarEl) avatarEl.textContent = appState.avatar || "🤖";
        }

        function updateNavigationUI() {
            const stageTitles = {
                1: "1. Com aprèn una IA?",
                2: "2. Dades i CAPTCHA",
                3: "3. Cotxes Autònoms i Moral Machine 🚗",
                4: "4. Teachable Machine",
                5: "5. Riscos, Biaixos i Manipulació",
                6: "6. L'Art dels Prompts",
                7: "7. Qüestionari Final",
                8: "8. Diploma Oficial"
            };

            for (let i = 1; i <= 8; i++) {
                const btn = document.getElementById(`tab-btn-${i}`);
                const label = document.getElementById(`nav-label-stage-${i}`);
                if (!btn || !label) continue;

                const isLocked = i > appState.unlockedStage && !(i === 8 && appState.completedStages.includes(7));
                btn.classList.toggle('locked', isLocked);
                btn.classList.toggle('completed', appState.completedStages.includes(i));

                const titleText = stageTitles[i] || `Fase ${i}`;

                if (isLocked) {
                    label.textContent = `🔒 ${titleText}`;
                } else if (appState.completedStages.includes(i)) {
                    label.textContent = `✅ ${titleText}`;
                } else {
                    label.textContent = titleText;
                }
            }
        }

        function goToStage(stageNum) {
            if (stageNum > appState.unlockedStage && !(stageNum === 8 && appState.completedStages.includes(7))) {
                alert(`🔒 La Fase ${stageNum} està bloquejada! Has de completar les activitats de la fase anterior per poder avançar.`);
                return;
            }

            appState.currentStage = stageNum;
            saveState();

            document.querySelectorAll('.section-view').forEach(v => v.classList.remove('active'));
            const targetView = document.getElementById(`stage-view-${stageNum}`);
            if (targetView) targetView.classList.add('active');

            document.querySelectorAll('.stage-nav-btn').forEach((b, idx) => {
                b.classList.toggle('active', idx + 1 === stageNum);
            });

            window.scrollTo({ top: 0, behavior: 'smooth' });

            if (typeof renderStageQuiz === 'function' && stageNum >= 1 && stageNum <= 6) {
                renderStageQuiz(stageNum);
            }
            if (stageNum === 1 && typeof updateSimProgressStatus === 'function') updateSimProgressStatus();
            if (stageNum === 2) {
                renderCaptchaUI();
                if (typeof updateRepte1ProgressStatus === 'function') updateRepte1ProgressStatus();
            }
            if (stageNum === 3) {
                if (typeof updateStage3ProgressStatus === 'function') updateStage3ProgressStatus();
            }
            if (stageNum === 4) {
                restoreTMClasses();
                if (typeof updateTMProgressStatus === 'function') updateTMProgressStatus();
            }
            if (stageNum === 5) {
                restoreManipulationTask();
                if (typeof updateStage4ProgressStatus === 'function') updateStage4ProgressStatus();
            }
            if (stageNum === 6 && typeof updatePromptLab === 'function') updatePromptLab();
            if (stageNum === 7) renderQuizUI();
            if (stageNum === 8) renderDiploma();
        }

        // CONTROL D'ACCÉS I GATING OBLIGATORI ENTRE CAPÍTOLS (STRICT GATING)
        function completeStageAndGo(current, next) {
            // Validació Fase 1: Cal haver explorat el simulador completament, respost el test (5/5) i les 3 reflexions
            if (current === 1) {
                const visited = appState.simStepsVisited || [];
                const visitedAll = [1, 2, 3, 4].every(s => visited.includes(s));
                const trained = appState.simTrained || trainingEpoch >= 10;
                const tested = appState.simTested;
                const test1Count = Object.keys((appState.stageQuizAnswers && appState.stageQuizAnswers[1]) || {}).length;
                const simRef = (document.getElementById('sim-reflection')?.value || appState.simReflection || '').trim();
                const b1Ref2 = (document.getElementById('b1-refl-2')?.value || appState.b1Refl2 || '').trim();
                const b1Ref3 = (document.getElementById('b1-refl-3')?.value || appState.b1Refl3 || '').trim();
                const w1 = countWords(simRef);
                const w2 = countWords(b1Ref2);
                const w3 = countWords(b1Ref3);

                if (!visitedAll || !trained || !tested || test1Count < 5 || w1 < 5 || w2 < 5 || w3 < 5) {
                    const missing = [];
                    if (!visitedAll) missing.push(`Explorar els 4 passos del simulador (has vist ${visited.length}/4).`);
                    if (!trained) missing.push("Entrenar el model al Pas 3 (com a mínim fins a l'època 10).");
                    if (!tested) missing.push("Provar una predicció amb animals reals al Pas 4.");
                    if (test1Count < 5) missing.push(`Respondre les 5 preguntes del test del Bloc 1 (en portes ${test1Count}/5).`);
                    if (w1 < 5) missing.push(`Escriure la reflexió 1 sobre casos parany (mínim 5 paraules, en portes ${w1}).`);
                    if (w2 < 5) missing.push(`Escriure la reflexió 2 sobre programari clàssic vs IA (mínim 5 paraules, en portes ${w2}).`);
                    if (w3 < 5) missing.push(`Escriure la reflexió 3 sobre Human in the Loop (mínim 5 paraules, en portes ${w3}).`);

                    alert("🔒 No pots avançar a la Fase 2 fins que completis totes les activitats del Bloc 1:\n\n• " + missing.join("\n• "));
                    return;
                }
            }

            // Validació Fase 2: Cal haver etiquetat les 12 imatges, comprovat el consens, respost el test (5/5) i les 3 reflexions
            if (current === 2) {
                let fullyTaggedCount = 0;
                for (let i = 1; i <= 12; i++) {
                    const ans = appState.repte1Answers[i] || {};
                    if (ans.stripes && ans.triangles && ans.circle) {
                        fullyTaggedCount++;
                    }
                }
                const test2Count = Object.keys((appState.stageQuizAnswers && appState.stageQuizAnswers[2]) || appState.repte1TestAnswers || {}).length;
                const consensusChecked = !!appState.repte1ConsensusChecked;
                const notes = (document.getElementById('repte1-notes')?.value || appState.repte1Notes || '').trim();
                const noise = (document.getElementById('repte1-noise-reflection')?.value || appState.repte1NoiseReflection || '').trim();
                const b2r3 = (document.getElementById('b2-refl-3')?.value || appState.b2Refl3 || '').trim();
                const w1 = countWords(notes);
                const w2 = countWords(noise);
                const w3 = countWords(b2r3);

                if (fullyTaggedCount < 12 || !consensusChecked || test2Count < 5 || w1 < 5 || w2 < 5 || w3 < 5) {
                    const missing = [];
                    if (fullyTaggedCount < 12) missing.push(`Etiquetar completament les 12 imatges al visor CAPTCHA (actualment en portes ${fullyTaggedCount}/12).`);
                    if (!consensusChecked) missing.push("Comprovar com has votat respecte al consens general clicant el botó '📊 Comprova com has votat'.");
                    if (test2Count < 5) missing.push(`Respondre les 5 preguntes del test del Bloc 2 (en portes ${test2Count}/5).`);
                    if (w1 < 5) missing.push(`Escriure la reflexió 1 sobre regles i criteris (mínim 5 paraules, en portes ${w1}).`);
                    if (w2 < 5) missing.push(`Escriure la reflexió 2 sobre soroll d'etiquetes (mínim 5 paraules, en portes ${w2}).`);
                    if (w3 < 5) missing.push(`Escriure la reflexió 3 sobre prevenció de biaixos (mínim 5 paraules, en portes ${w3}).`);

                    alert("🔒 No pots avançar a la Fase 3 fins que completis totes les activitats del Bloc 2:\n\n• " + missing.join("\n• "));
                    return;
                }
            }

            // Validació Fase 3: Cotxes Autònoms i Moral Machine (Test 5/5 i 3 reflexions)
            if (current === 3) {
                const test3Count = Object.keys((appState.stageQuizAnswers && appState.stageQuizAnswers[3]) || {}).length;
                const b3r1 = (document.getElementById('b3-refl-1')?.value || appState.b3Refl1 || '').trim();
                const b3r2 = (document.getElementById('b3-refl-2')?.value || appState.b3Refl2 || '').trim();
                const b3r3 = (document.getElementById('b3-refl-3')?.value || appState.b3Refl3 || '').trim();
                const w1 = countWords(b3r1);
                const w2 = countWords(b3r2);
                const w3 = countWords(b3r3);

                if (test3Count < 5 || w1 < 5 || w2 < 5 || w3 < 5) {
                    const missing = [];
                    if (test3Count < 5) missing.push(`Respondre les 5 preguntes del test del Bloc 3 (en portes ${test3Count}/5).`);
                    if (w1 < 5) missing.push(`Escriure la reflexió 1 sobre comprar un cotxe que et sacrifiqués (mínim 5 paraules, en portes ${w1}).`);
                    if (w2 < 5) missing.push(`Escriure la reflexió 2 sobre diferències morals i xoc cultural (mínim 5 paraules, en portes ${w2}).`);
                    if (w3 < 5) missing.push(`Escriure la reflexió 3 sobre assignació de responsabilitat davant la justícia (mínim 5 paraules, en portes ${w3}).`);

                    alert("🔒 No pots avançar a la Fase 4 fins que completis totes les activitats del Bloc 3:\n\n• " + missing.join("\n• "));
                    return;
                }
            }

            // Validació Fase 4: Classes definides, 3 proves completades, checklist, test (5/5) i 3 reflexions
            if (current === 4) {
                const classesOk = appState.tmClasses && appState.tmClasses.length === 3 && appState.tmClasses.every(c => c && c.trim().length > 0);
                const r2 = appState.repte2Data || {};
                const r3 = appState.repte3Data || {};
                
                const p1Ok = (r2.p1_res && r2.p1_res.trim().length > 0) && (r2.p1_hip && r2.p1_hip.trim().length > 0);
                const p2Ok = (r2.p2_res && r2.p2_res.trim().length > 0) && (r2.p2_hip && r2.p2_hip.trim().length > 0);
                const p3Ok = (r2.p3_res && r2.p3_res.trim().length > 0) && (r2.p3_hip && r2.p3_hip.trim().length > 0);
                const r2AllOk = p1Ok && p2Ok && p3Ok;

                const chkAll = !!(r3.chk1 && r3.chk2 && r3.chk3 && r3.chk4);
                const test4Count = Object.keys((appState.stageQuizAnswers && appState.stageQuizAnswers[4]) || {}).length;
                const r3MilloraWords = countWords((document.getElementById('r3-millora')?.value || r3.millora || '').trim());
                const r3FallaWords = countWords((document.getElementById('r3-falla')?.value || r3.falla || '').trim());
                const r3FuturWords = countWords((document.getElementById('r3-futur')?.value || r3.futur || '').trim());
                const r3RefsOk = (r3MilloraWords >= 5 && r3FallaWords >= 5 && r3FuturWords >= 5);

                if (!classesOk || !r2AllOk || !chkAll || test4Count < 5 || !r3RefsOk) {
                    const missing = [];
                    if (!classesOk) missing.push("Definir les 3 classes a entrenar amb Teachable Machine.");
                    if (!r2AllOk) missing.push("Completar el resultat i hipòtesi de les 3 proves del Quadern del Repte 2 (Fons, Angle i Objecte Tapat).");
                    if (!chkAll) missing.push("Marcar els 4 punts de la llista de comprovació de variabilitat del Repte 3.");
                    if (test4Count < 5) missing.push(`Respondre les 5 preguntes del test del Bloc 4 (en portes ${test4Count}/5).`);
                    if (r3MilloraWords < 5) missing.push(`Escriure la reflexió 1 sobre millores observades al Repte 3 (mínim 5 paraules, en portes ${r3MilloraWords}).`);
                    if (r3FallaWords < 5) missing.push(`Escriure la reflexió 2 sobre casos que encara fallen al Repte 3 (mínim 5 paraules, en portes ${r3FallaWords}).`);
                    if (r3FuturWords < 5) missing.push(`Escriure la reflexió 3 sobre propostes futures al Repte 3 (mínim 5 paraules, en portes ${r3FuturWords}).`);

                    alert("🔒 No pots avançar a la Fase 5 fins que completis totes les activitats del Bloc 4:\n\n• " + missing.join("\n• "));
                    return;
                }
            }

            // Validació Fase 5: Prova de 3 al·lucinacions, simulador mòbil, test (5/5) i 3 reflexions crítiques
            if (current === 5) {
                const hallCount = Object.keys(appState.hallucinationsAnswered || {}).length;
                const algoExplored = appState.manipulationExplored;
                const test5Count = Object.keys((appState.stageQuizAnswers && appState.stageQuizAnswers[5]) || {}).length;
                const feelingRef = (document.getElementById('manip-teen-feeling')?.value || appState.manipTeenFeeling || '').trim();
                const expRef = (document.getElementById('manip-teen-experience')?.value || appState.manipTeenExperience || '').trim();
                const critRef = (document.getElementById('manip-critical-reflection')?.value || appState.manipCriticalReflection || appState.manipulationReflection || '').trim();
                const w1 = countWords(feelingRef);
                const w2 = countWords(expRef);
                const w3 = countWords(critRef);

                if (hallCount < 3 || !algoExplored || test5Count < 5 || w1 < 5 || w2 < 5 || w3 < 5) {
                    const missing = [];
                    if (hallCount < 3) missing.push(`Resoldre els 3 casos d'al·lucinació i biaix (en portes ${hallCount}/3).`);
                    if (!algoExplored) missing.push("Provar els dos enfocaments al simulador mòbil (Mode Manipulatiu vs Mode Ètic AI Act).");
                    if (test5Count < 5) missing.push(`Respondre les 5 preguntes del test del Bloc 5 (en portes ${test5Count}/5).`);
                    if (w1 < 5) missing.push(`Escriure la reflexió 1 sobre impacte emocional del mòbil (mínim 5 paraules, en portes ${w1}).`);
                    if (w2 < 5) missing.push(`Escriure la reflexió 2 sobre xarxes socials i adolescents (mínim 5 paraules, en portes ${w2}).`);
                    if (w3 < 5) missing.push(`Escriure la reflexió 3 sobre pautes personals de verificació crítica (mínim 5 paraules, en portes ${w3}).`);

                    alert("🔒 No pots avançar a la Fase 6 fins que completis totes les activitats del Bloc 5:\n\n• " + missing.join("\n• "));
                    return;
                }
            }

            // Validació Fase 6: 100% de qualitat al prompt, test (5/5) i 3 reflexions
            if (current === 6) {
                const score = calculatePromptScore();
                const test6Count = Object.keys((appState.stageQuizAnswers && appState.stageQuizAnswers[6]) || {}).length;
                const evalRef = (document.getElementById('prompt-reflection-eval')?.value || appState.promptReflectionEval || '').trim();
                const b5r2 = (document.getElementById('b5-refl-2')?.value || appState.b5Refl2 || '').trim();
                const b5r3 = (document.getElementById('b5-refl-3')?.value || appState.b5Refl3 || '').trim();
                const w1 = countWords(evalRef);
                const w2 = countWords(b5r2);
                const w3 = countWords(b5r3);

                if (score < 100 || test6Count < 5 || w1 < 5 || w2 < 5 || w3 < 5) {
                    const missing = [];
                    if (score < 100) missing.push("Assolir el 100% de qualitat al teu prompt (com a mínim 8 paraules a cadascun dels 4 components: Objectiu, Context, Format i Límits).");
                    if (test6Count < 5) missing.push(`Respondre les 5 preguntes del test del Bloc 6 (en portes ${test6Count}/5).`);
                    if (w1 < 5) missing.push(`Escriure la reflexió 1 sobre context i especificitat (mínim 5 paraules, en portes ${w1}).`);
                    if (w2 < 5) missing.push(`Escriure la reflexió 2 sobre meta-prompting i verificació (mínim 5 paraules, en portes ${w2}).`);
                    if (w3 < 5) missing.push(`Escriure la reflexió 3 sobre la IA com a copilot d'aprenentatge (mínim 5 paraules, en portes ${w3}).`);

                    alert("🔒 No pots avançar a la Fase 7 fins que completis el Laboratori de Prompts:\n\n• " + missing.join("\n• "));
                    return;
                }
            }

            // Validació Fase 7: Qüestionari completat amb les 12 preguntes
            if (current === 7) {
                const quizCount = Object.keys(appState.quizAnswers || {}).length;
                if (!appState.quizCompleted || quizCount < 12) {
                    alert("🔒 Has de respondre i corregir les 12 preguntes del Qüestionari Teòric Final abans d'accedir al Diploma Oficial!");
                    return;
                }
            }

            if (!appState.completedStages.includes(current)) {
                appState.completedStages.push(current);
            }
            if (appState.unlockedStage < next) {
                appState.unlockedStage = next;
            }
            saveState();
            goToStage(next);
        }

        // ==========================================
        // MODAL PERFIL
        // ==========================================
        let selectedModalAvatar = '🤖';

        function openProfileModal() {
            const modal = document.getElementById('profile-modal');
            const inputName = document.getElementById('modal-input-name');
            const inputGroup = document.getElementById('modal-input-group');

            if (inputName) inputName.value = appState.studentName || '';
            if (inputGroup) inputGroup.value = appState.studentGroup || '1r ESO A';
            selectedModalAvatar = appState.avatar || '🤖';

            document.querySelectorAll('.avatar-opt').forEach(opt => {
                opt.classList.toggle('selected', opt.textContent.trim() === selectedModalAvatar);
            });

            if (modal) modal.classList.add('active');
        }

        function closeProfileModal() {
            const modal = document.getElementById('profile-modal');
            if (modal) modal.classList.remove('active');
        }

        function selectAvatar(av) {
            selectedModalAvatar = av;
            document.querySelectorAll('.avatar-opt').forEach(opt => {
                opt.classList.toggle('selected', opt.textContent.trim() === av);
            });
        }

        function saveProfileModal() {
            const inputName = document.getElementById('modal-input-name');
            const inputGroup = document.getElementById('modal-input-group');
            const name = (inputName ? inputName.value.trim() : '');

            if (!name) {
                alert("Si us plau, introdueix el teu nom o el dels membres del grup per continuar.");
                return;
            }

            appState.studentName = name;
            appState.studentGroup = inputGroup ? inputGroup.value : '1r ESO A';
            appState.avatar = selectedModalAvatar;

            saveState();
            closeProfileModal();
        }

        function confirmResetModal() {
            if (confirm("⚠️ Vols reiniciar tot el progrés? Es perdran les respostes dels reptes i el qüestionari.")) {
                localStorage.removeItem(STORAGE_KEY);
                localStorage.removeItem('ia_didactica_capsula_v2');
                localStorage.removeItem('ia_didactica_capsula_v1');
                location.reload();
            }
        }

        function getStudentReflectionsList() {
            const r3 = appState.repte3Data || {};
            return [
                // BLOC 1: COM APRÈN UNA IA?
                {
                    phase: "Bloc 1: Simulador",
                    prompt: "1. Casos parany (l'ós panda i per què la IA no sap dir 'no ho sé'):",
                    text: appState.simReflection || ""
                },
                {
                    phase: "Bloc 1: Simulador",
                    prompt: "2. Programes clàssics vs IAs que aprenen mirant exemples:",
                    text: appState.b1Refl2 || ""
                },
                {
                    phase: "Bloc 1: Simulador",
                    prompt: "3. Per què cal supervisió humana en decisions importants:",
                    text: appState.b1Refl3 || ""
                },
                // BLOC 2: DADES I CAPTCHA
                {
                    phase: "Bloc 2: Dades",
                    prompt: "1. La importància de tenir regles clares per etiquetar dades:",
                    text: appState.repte1Notes || ""
                },
                {
                    phase: "Bloc 2: Dades",
                    prompt: "2. Opinions diferents entre persones i com afecten la màquina:",
                    text: appState.repte1NoiseReflection || ""
                },
                {
                    phase: "Bloc 2: Dades",
                    prompt: "3. Com evitar que faltin grups de persones a les dades:",
                    text: appState.b2Refl3 || ""
                },
                // BLOC 3: COTXES AUTÒNOMS I MORAL MACHINE
                {
                    phase: "Bloc 3: Cotxes Autònoms",
                    prompt: "1. Comprar un cotxe autònom que et podria sacrificar:",
                    text: appState.b3Refl1 || ""
                },
                {
                    phase: "Bloc 3: Cotxes Autònoms",
                    prompt: "2. Valors morals de la IA i diferències segons la cultura del país:",
                    text: appState.b3Refl2 || ""
                },
                {
                    phase: "Bloc 3: Cotxes Autònoms",
                    prompt: "3. Assignació de responsabilitat i culpa davant de la justícia:",
                    text: appState.b3Refl3 || ""
                },
                // BLOC 4: TEACHABLE MACHINE
                {
                    phase: "Bloc 4: Teachable Machine",
                    prompt: "1. Diferències entre entrenar amb 1 foto o amb 5 fotos variades:",
                    text: r3.millora || ""
                },
                {
                    phase: "Bloc 4: Teachable Machine",
                    prompt: "2. En quines situacions aconsegueixes enganyar la càmera:",
                    text: r3.falla || ""
                },
                {
                    phase: "Bloc 4: Teachable Machine",
                    prompt: "3. Com milloraries la col·lecció de fotos perquè no falli mai:",
                    text: r3.futur || ""
                },
                // BLOC 5: RISCOS I MANIPULACIÓ
                {
                    phase: "Bloc 5: Riscos i Ètica",
                    prompt: "1. Com t'ha fet sentir el mòbil amb l'algorisme manipulador:",
                    text: (appState.manipEmotion ? `[${appState.manipEmotion}] ` : '') + (appState.manipTeenFeeling || "")
                },
                {
                    phase: "Bloc 5: Riscos i Ètica",
                    prompt: "2. La teva experiència a les xarxes socials (vídeos per enfadar, filtres):",
                    text: appState.manipTeenExperience || ""
                },
                {
                    phase: "Bloc 5: Riscos i Ètica",
                    prompt: "3. Com comprovar si una resposta de la IA és veritat o inventada:",
                    text: [appState.manipCriticalReflection, appState.manipulationReflection].filter(Boolean).join('\n---\n') || ""
                },
                // BLOC 6: L'ART DELS PROMPTS
                {
                    phase: "Bloc 6: Prompts",
                    prompt: "1. Diferència entre demanar una frase curta o donar context i límits:",
                    text: appState.promptReflectionEval || ""
                },
                {
                    phase: "Bloc 6: Prompts",
                    prompt: "2. Com demanar a la IA que citi d'on ha tret la informació:",
                    text: appState.b5Refl2 || ""
                },
                {
                    phase: "Bloc 6: Prompts",
                    prompt: "3. Com fer servir la IA per aprendre sense copiar i enganxar:",
                    text: appState.b5Refl3 || ""
                }
            ];
        }

        function saveB3Refl1() {
            const val = document.getElementById('b3-refl-1')?.value || '';
            appState.b3Refl1 = val;
            saveState();
            const statusEl = document.getElementById('b3-refl-1-status');
            if (statusEl) {
                statusEl.style.display = countWords(val) >= 5 ? 'block' : 'none';
            }
            if (typeof updateStage3ProgressStatus === 'function') updateStage3ProgressStatus();
        }

        function saveB3Refl2() {
            const val = document.getElementById('b3-refl-2')?.value || '';
            appState.b3Refl2 = val;
            saveState();
            const statusEl = document.getElementById('b3-refl-2-status');
            if (statusEl) {
                statusEl.style.display = countWords(val) >= 5 ? 'block' : 'none';
            }
            if (typeof updateStage3ProgressStatus === 'function') updateStage3ProgressStatus();
        }

        function saveB3Refl3() {
            const val = document.getElementById('b3-refl-3')?.value || '';
            appState.b3Refl3 = val;
            saveState();
            const statusEl = document.getElementById('b3-refl-3-status');
            if (statusEl) {
                statusEl.style.display = countWords(val) >= 5 ? 'block' : 'none';
            }
            if (typeof updateStage3ProgressStatus === 'function') updateStage3ProgressStatus();
        }

        function updateStage3ProgressStatus() {
            const statusEl = document.getElementById('stage3-progress-status');
            if (!statusEl) return;
            const test3Count = Object.keys((appState.stageQuizAnswers && appState.stageQuizAnswers[3]) || {}).length;
            const w1 = countWords((document.getElementById('b3-refl-1')?.value || appState.b3Refl1 || '').trim());
            const w2 = countWords((document.getElementById('b3-refl-2')?.value || appState.b3Refl2 || '').trim());
            const w3 = countWords((document.getElementById('b3-refl-3')?.value || appState.b3Refl3 || '').trim());
            const refsDone = (w1 >= 5 ? 1 : 0) + (w2 >= 5 ? 1 : 0) + (w3 >= 5 ? 1 : 0);

            if (test3Count >= 5 && refsDone === 3) {
                statusEl.innerHTML = `<span style="color:#059669; font-weight:700;">✅ Fase 3 completada amb èxit!</span> Test resolt (5/5) i 3 reflexions escrites. Ja pots avançar a Teachable Machine!`;
            } else {
                statusEl.innerHTML = `⏳ Progrés: Test (${test3Count}/5) · Reflexions escrites (${refsDone}/3). Cal completar el test i les 3 reflexions per avançar.`;
            }
        }

        function renderDiplomaReflections() {
            const refListEl = document.getElementById('diploma-reflections-list');
            if (!refListEl) return;

            const list = getStudentReflectionsList();
            refListEl.innerHTML = list.map((r, i) => `
                <div style="background:white; border:1px solid #e2e8f0; border-radius:6px; padding:0.6rem 0.85rem; font-size:0.8rem; box-shadow:0 1px 2px rgba(0,0,0,0.02);">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.25rem; flex-wrap:wrap; gap:0.25rem;">
                        <strong style="color:#1e1b4b; font-size:0.82rem;">${i + 1}. ${r.prompt}</strong>
                        <span style="background:#e0e7ff; color:#3730a3; font-size:0.7rem; font-weight:700; padding:1px 6px; border-radius:4px; flex-shrink:0;">${r.phase}</span>
                    </div>
                    <div style="color:${r.text ? '#334155' : '#94a3b8'}; font-style:italic; line-height:1.45;">
                        "${escapeHtml(r.text) || 'Sense reflexió registrada'}"
                    </div>
                </div>
            `).join('');
        }
