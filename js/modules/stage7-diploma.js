// ==========================================
// FASE 7: DIPLOMA OFICIAL D'APROFITAMENT I DOSSIER DOCENT
// ==========================================

        function renderDiploma() {
            const nameEl = document.getElementById('dip-student-name');
            const groupEl = document.getElementById('dip-student-group');
            const qualEl = document.getElementById('dip-qualification');
            const gradeBadge = document.getElementById('dip-grade-badge');
            const gradeVal = document.getElementById('dip-grade-val');
            const certIdEl = document.getElementById('dip-cert-id');
            const dateEl = document.getElementById('dip-date');

            if (nameEl) nameEl.textContent = appState.studentName || "Nom de l'Alumne / Equip";
            if (groupEl) groupEl.textContent = `Curs: ${appState.studentGroup || '1r ESO A'}`;
            if (certIdEl) certIdEl.textContent = `Codi Certificat: ${appState.certId}`;

            const today = new Date();
            const dateStr = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth()+1).padStart(2, '0')}/${today.getFullYear()}`;
            if (dateEl) dateEl.textContent = dateStr;

            const score = (appState.quizScore !== undefined) ? appState.quizScore : 0;
            if (gradeVal) gradeVal.textContent = score.toFixed(1);

            let qualText = "Assoliment Excel·lent 🏆";
            let qualBg = "#dcfce7";
            let qualColor = "#15803d";

            if (score >= 9) {
                qualText = "Assoliment Excel·lent 🏆";
                qualBg = "#dcfce7"; qualColor = "#15803d";
            } else if (score >= 7) {
                qualText = "Assoliment Notable 🎖️";
                qualBg = "#e0e7ff"; qualColor = "#3730a3";
            } else if (score >= 5) {
                qualText = "Assoliment Satisfactori 🥉";
                qualBg = "#fef3c7"; qualColor = "#92400e";
            } else {
                qualText = "En Procés de Consolidació ⚠️";
                qualBg = "#fee2e2"; qualColor = "#991b1b";
            }

            if (qualEl) {
                qualEl.textContent = qualText;
                qualEl.style.background = qualBg;
                qualEl.style.color = qualColor;
            }

            if (gradeBadge) {
                gradeBadge.style.background = qualBg;
                gradeBadge.style.color = qualColor;
            }

            const strengths = [];
            const improvements = [];

            // Bloc 1: Fonaments i 4 passos
            if (appState.quizAnswers[1] === 1 && appState.quizAnswers[2] === 1) {
                strengths.push("<strong>Fonaments i Contingut Sintètic:</strong> Comprensió impecable dels 4 passos de l'aprenentatge automàtic (recollida d'exemples, patrons, ajust d'errors i predicció probabilística).");
            } else {
                improvements.push("<strong>Cicle d'aprenentatge d'IA:</strong> Cal repassar la funció del descens d'error (Loss) i la diferència entre cercar informació existent i generar contingut sintètic nou.");
            }

            // Bloc 2: Dades i CAPTCHA
            const numCaptchaDone = Object.keys(appState.repte1Answers).length;
            if (numCaptchaDone >= 6 && appState.quizAnswers[3] === 1 && appState.quizAnswers[4] === 1) {
                strengths.push("<strong>Human in the Loop i Criteris d'Etiquetatge:</strong> Domini exemplar del concepte de microtasca en els sistemes CAPTCHA i la importància de protocols consensuats per evitar soroll d'etiquetes.");
            } else {
                improvements.push("<strong>Coherència en les dades:</strong> Recorda que si les persones no tenim criteris uniformes sobre casos frontera, la màquina rep etiquetes contradictòries.");
            }

            // Bloc 3: Cotxes Autònoms i la Moral Machine
            if (appState.quizAnswers[5] === 0 && appState.quizAnswers[6] === 0) {
                strengths.push("<strong>Ètica en Vehicles Autònoms i la Moral Machine:</strong> Anàlisi profunda de la premeditació del codi davant dilemes inevitables i comprensió de les variacions morals segons el país.");
            } else {
                improvements.push("<strong>Decisions Crítiques en IA:</strong> Recorda que un vehicle autònom executa un codi decidit per endavant, i que diferents cultures prioritzen salvar col·lectius diferents.");
            }

            // Bloc 4: Teachable Machine
            if (appState.quizAnswers[7] === 1 && appState.quizAnswers[8] === 1) {
                strengths.push("<strong>Entrenament Supervisat amb Teachable Machine:</strong> Capacitat excel·lent per diagnosticar la influència del volum i variabilitat del dataset (canvis de fons, angles i mides) en la robustesa del model.");
            } else {
                improvements.push("<strong>Robustesa del Dataset:</strong> Tenir present que entrenar amb 1 sola foto per classe fa que la IA memoritzi el fons en lloc de l'objecte (sobreajust).");
            }

            // Bloc 5: Riscos, Biaixos i Manipulació
            if (appState.quizAnswers[9] === 1 && appState.quizAnswers[10] === 1) {
                strengths.push("<strong>Pensament Crític davant Al·lucinacions i Biaixos:</strong> Consciència sòlida sobre els biaixos heretats de dades històriques i la necessitat d'auditar algorismes de recomanació.");
            } else {
                improvements.push("<strong>Detecció d'Al·lucinacions:</strong> No donar mai per bona una resposta de la IA pel simple fet que estigui ben escrita o soni convincent.");
            }

            // Bloc 6: Enginyeria de Prompts
            if (appState.quizAnswers[11] === 1 && appState.quizAnswers[12] === 1) {
                strengths.push("<strong>Formulació Eficaç de Prompts:</strong> Domini dels 4 paràmetres clau (objectiu, públic, format i límits) per dirigir l'eina amb precisió i evitar desviacions.");
            } else {
                improvements.push("<strong>Estructuració de Prompts:</strong> Recorda delimitar sempre les restriccions negatives (què ha d'evitar fer la IA) per reduir invencions.");
            }

            const strList = document.getElementById('dip-strengths-list');
            const impList = document.getElementById('dip-improvements-list');
            if (strList) strList.innerHTML = strengths.map(s => `<li>${s}</li>`).join('');
            if (impList) impList.innerHTML = improvements.map(s => `<li>${s}</li>`).join('');

            renderDiplomaTestsBreakdown();
            renderDiplomaReflections();
            renderTeacherDossier();
        }

        function renderTeacherDossier() {
            const container = document.getElementById('teacher-dossier-content');
            if (!container) return;

            const score = (appState.quizScore !== undefined) ? appState.quizScore : 0;
            const r1Count = Object.keys(appState.repte1Answers).length;
            const r2 = appState.repte2Data || {};
            const r3 = appState.repte3Data || {};
            const pr = appState.promptLabData || {};
            const classes = appState.tmClasses || ['Classe 1', 'Classe 2', 'Classe 3'];

            let html = `
                <!-- IDENTIFICACIÓ I RESULTATS GLOBALS -->
                <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:var(--radius-md); padding:1.25rem; margin-bottom:1.5rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;">
                        <div>
                            <h4 style="margin:0; font-size:1.15rem; color:#1e40af;">🎓 Alumne/a o Equip: ${appState.studentName || '(Sense nom registrat)'}</h4>
                            <div style="font-size:0.88rem; color:#3b82f6; margin-top:0.25rem;">
                                <strong>Curs/Grup:</strong> ${appState.studentGroup || '1r ESO A'} &nbsp;|&nbsp; 
                                <strong>Codi Certificat:</strong> <code>${appState.certId}</code> &nbsp;|&nbsp;
                                <strong>Data:</strong> ${new Date().toLocaleDateString('ca-ES')}
                            </div>
                        </div>
                        <div style="text-align:right;">
                            <div style="font-size:1.5rem; font-weight:800; color:#15803d;">${score.toFixed(1)} / 10</div>
                            <div style="font-size:0.8rem; font-weight:700; color:#166534;">Qualificació Final (${score * 10}%)</div>
                        </div>
                    </div>
                </div>

                <!-- RESUM DELS TESTS D'AVALUACIÓ DELS 6 BLOCS -->
                <div style="margin-bottom:1.5rem; background:white; border:1px solid var(--border); border-radius:var(--radius-md); padding:1.25rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
                        <h4 style="margin:0; font-size:1.05rem; color:var(--text-main);">📝 Tests d'Avaluació per Blocs (5 Preguntes per Bloc)</h4>
                        <span class="badge-pill badge-pill-emerald">Total Formatiu: ${getStageQuizScore(1) + getStageQuizScore(2) + getStageQuizScore(3) + getStageQuizScore(4) + getStageQuizScore(5) + getStageQuizScore(6)} / 30 Encerts</span>
                    </div>
                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:0.75rem;">
                        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:0.75rem;">
                            <div style="font-size:0.78rem; font-weight:700; color:#3b82f6;">Bloc 1: Simulador</div>
                            <div style="font-size:1.1rem; font-weight:800; color:#1e293b; margin-top:0.2rem;">${getStageQuizScore(1)} / 5 encerts (${getStageQuizScore(1)*20}%)</div>
                        </div>
                        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:0.75rem;">
                            <div style="font-size:0.78rem; font-weight:700; color:#10b981;">Bloc 2: Dades i CAPTCHA</div>
                            <div style="font-size:1.1rem; font-weight:800; color:#1e293b; margin-top:0.2rem;">${getStageQuizScore(2)} / 5 encerts (${getStageQuizScore(2)*20}%)</div>
                        </div>
                        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:0.75rem;">
                            <div style="font-size:0.78rem; font-weight:700; color:#6366f1;">Bloc 3: Cotxes Autònoms</div>
                            <div style="font-size:1.1rem; font-weight:800; color:#1e293b; margin-top:0.2rem;">${getStageQuizScore(3)} / 5 encerts (${getStageQuizScore(3)*20}%)</div>
                        </div>
                        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:0.75rem;">
                            <div style="font-size:0.78rem; font-weight:700; color:#8b5cf6;">Bloc 4: Teachable Machine</div>
                            <div style="font-size:1.1rem; font-weight:800; color:#1e293b; margin-top:0.2rem;">${getStageQuizScore(4)} / 5 encerts (${getStageQuizScore(4)*20}%)</div>
                        </div>
                        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:0.75rem;">
                            <div style="font-size:0.78rem; font-weight:700; color:#f43f5e;">Bloc 5: Riscos i Ètica</div>
                            <div style="font-size:1.1rem; font-weight:800; color:#1e293b; margin-top:0.2rem;">${getStageQuizScore(5)} / 5 encerts (${getStageQuizScore(5)*20}%)</div>
                        </div>
                        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:0.75rem;">
                            <div style="font-size:0.78rem; font-weight:700; color:#0284c7;">Bloc 6: L'Art dels Prompts</div>
                            <div style="font-size:1.1rem; font-weight:800; color:#1e293b; margin-top:0.2rem;">${getStageQuizScore(6)} / 5 encerts (${getStageQuizScore(6)*20}%)</div>
                        </div>
                    </div>
                </div>

                <!-- 1. REPTE 1: DADES I CASOS FRONTERA -->
                <div style="margin-bottom:1.5rem; background:white; border:1px solid var(--border); border-radius:var(--radius-md); padding:1.25rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
                        <h4 style="margin:0; font-size:1.05rem; color:var(--text-main);">🧩 Repte 1: Dades i Criteris d'Etiquetatge (CAPTCHA)</h4>
                        <span class="badge-pill badge-pill-emerald">${r1Count} / 12 Imatges Etiquetades</span>
                    </div>
                    <p style="font-size:0.85rem; color:var(--text-sub); margin-bottom:0.75rem;">
                        <strong>Test de Casos Frontera i Discrepàncies:</strong> ${getStageQuizScore(2)} / 5 encerts correctes (${getStageQuizScore(2) * 20}%).
                    </p>
                    <div class="table-responsive" style="margin:0;">
                        <table class="edu-table" style="font-size:0.82rem;">
                            <thead>
                                <tr>
                                    <th>Imatge</th>
                                    <th>Ratlles?</th>
                                    <th>Triangles?</th>
                                    <th>Rodona gran?</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

            for (let i = 1; i <= 12; i++) {
                const a = appState.repte1Answers[i] || {};
                html += `
                    <tr>
                        <td><strong>Imatge ${i}</strong></td>
                        <td>${a.stripes || '-'}</td>
                        <td>${a.triangles || '-'}</td>
                        <td>${a.circle || '-'}</td>
                    </tr>
                `;
            }

            html += `
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- 2. COTXES AUTÒNOMS I LA MORAL MACHINE DEL MIT -->
                <div style="margin-bottom:1.5rem; background:white; border:1px solid var(--border); border-radius:var(--radius-md); padding:1.25rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
                        <h4 style="margin:0; font-size:1.05rem; color:var(--text-main);">🚗 Cotxes Autònoms i la Moral Machine del MIT</h4>
                        <span class="badge-pill badge-pill-indigo">Bloc 3 · Dilemes Morals</span>
                    </div>
                    <p style="font-size:0.85rem; color:var(--text-sub); margin-bottom:0.75rem;">
                        <strong>Test de Dilemes Morals i Ètica en IA:</strong> ${getStageQuizScore(3)} / 5 encerts correctes (${getStageQuizScore(3) * 20}%).
                    </p>
                    <div style="background:#eef2ff; border:1px solid #c7d2fe; border-radius:6px; padding:0.85rem; font-size:0.85rem; color:#3730a3; margin-bottom:0.6rem;">
                        <strong>Reflexió 1: Comprar un cotxe que et podria sacrificar:</strong><br>
                        <span style="display:block; margin-top:0.35rem; color:#1e1b4b; font-style:italic;">"${appState.b3Refl1 || '(Sense reflexió registrada)'}"</span>
                    </div>
                    <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:6px; padding:0.85rem; font-size:0.85rem; color:#166534; margin-bottom:0.6rem;">
                        <strong>Reflexió 2: Valors morals de la IA i diferències culturals:</strong><br>
                        <span style="display:block; margin-top:0.35rem; color:#14532d; font-style:italic;">"${appState.b3Refl2 || '(Sense reflexió registrada)'}"</span>
                    </div>
                    <div style="background:#fff7ed; border:1px solid #fed7aa; border-radius:6px; padding:0.85rem; font-size:0.85rem; color:#9a3412;">
                        <strong>Reflexió 3: Responsabilitat i justícia davant d'errors de la màquina:</strong><br>
                        <span style="display:block; margin-top:0.35rem; color:#7c2d12; font-style:italic;">"${appState.b3Refl3 || '(Sense reflexió registrada)'}"</span>
                    </div>
                </div>

                <!-- 3. TEACHABLE MACHINE: CLASSES I REPTES 2 I 3 -->
                <div style="margin-bottom:1.5rem; background:white; border:1px solid var(--border); border-radius:var(--radius-md); padding:1.25rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
                        <h4 style="margin:0; font-size:1.05rem; color:var(--text-main);">🤖 Teachable Machine: Quadern de Treball Oficial</h4>
                        <span class="badge-pill badge-pill-indigo">Classes: ${classes.join(' · ')}</span>
                    </div>
                    
                    <h5 style="color:var(--primary); font-size:0.92rem; margin:0 0 0.5rem;">Repte 2: Proves amb el Model Inicial (1 mostra per classe):</h5>
                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:0.75rem; margin-bottom:1rem;">
                        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:0.85rem; font-size:0.84rem;">
                            <strong>Prova 1. El Fons:</strong><br>
                            • Fons canviat: <em>${r2.p1_fons || '(No especificat)'}</em><br>
                            • Resultat: <em>${r2.p1_res || '(No registrat)'}</em><br>
                            • Hipòtesi: <em>${r2.p1_hip || '(Sense hipòtesi)'}</em>
                        </div>
                        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:0.85rem; font-size:0.84rem;">
                            <strong>Prova 2. Angle / Distància:</strong><br>
                            • Canvi: <em>${r2.p2_var || '(No especificat)'}</em><br>
                            • Resultat: <em>${r2.p2_res || '(No registrat)'}</em><br>
                            • Hipòtesi: <em>${r2.p2_hip || '(Sense hipòtesi)'}</em>
                        </div>
                        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:0.85rem; font-size:0.84rem;">
                            <strong>Prova 3. Objecte Tapat:</strong><br>
                            • Canvi: <em>${r2.p3_part || '(No especificat)'}</em><br>
                            • Resultat: <em>${r2.p3_res || '(No registrat)'}</em><br>
                            • Hipòtesi: <em>${r2.p3_hip || '(Sense hipòtesi)'}</em>
                        </div>
                    </div>

                    <h5 style="color:var(--success); font-size:0.92rem; margin:0 0 0.5rem;">Repte 3: Perfeccionament amb Dataset Ampliat (5 mostres per classe):</h5>
                    <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:6px; padding:0.85rem; font-size:0.84rem; margin-bottom:0.75rem; color:#166534;">
                        <strong>Checklist de Variabilitat Aplicada:</strong><br>
                        • 15 mostres en total: ${r3.chk1 ? '✅ Sí' : '❌ No'} &nbsp;|&nbsp;
                        • Fons variats: ${r3.chk2 ? '✅ Sí' : '❌ No'} &nbsp;|&nbsp;
                        • Angles i orientacions: ${r3.chk3 ? '✅ Sí' : '❌ No'} &nbsp;|&nbsp;
                        • Reentrenament complet: ${r3.chk4 ? '✅ Sí' : '❌ No'}
                    </div>
                    <div style="font-size:0.85rem; line-height:1.5;">
                        <p style="margin:0 0 0.4rem;"><strong>Què ha millorat respecte del Repte 2?:</strong><br>
                        <span style="background:#f8fafc; display:block; padding:0.5rem; border-radius:4px; border:1px solid #e2e8f0; color:#334155;">${r3.millora || '(Sense comentari)'}</span></p>
                        <p style="margin:0 0 0.4rem;"><strong>Hi ha algun cas en què encara falli?:</strong><br>
                        <span style="background:#f8fafc; display:block; padding:0.5rem; border-radius:4px; border:1px solid #e2e8f0; color:#334155;">${r3.falla || '(Sense comentari)'}</span></p>
                        <p style="margin:0;"><strong>Propostes futures per fer-lo més robust:</strong><br>
                        <span style="background:#f8fafc; display:block; padding:0.5rem; border-radius:4px; border:1px solid #e2e8f0; color:#334155;">${r3.futur || '(Sense comentari)'}</span></p>
                    </div>
                </div>

                <!-- 3. RISCOS, BIAIXOS I MANIPULACIÓ ALGORÍTMICA -->
                <div style="margin-bottom:1.5rem; background:white; border:1px solid var(--border); border-radius:var(--radius-md); padding:1.25rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
                        <h4 style="margin:0; font-size:1.05rem; color:var(--text-main);">🚨 Riscos, Biaixos i Dilema Ètic sobre Manipulació</h4>
                        <span class="badge-pill badge-pill-rose">${appState.algoMode === 'ethical' ? '🛡️ Mode Ètic Provat' : '🚨 Mode Manipulatiu Provat'}</span>
                    </div>
                    <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:6px; padding:0.85rem; font-size:0.85rem; color:#991b1b; margin-bottom:0.6rem;">
                        <strong>Impacte Emocional del Simulador Mòbil:</strong><br>
                        <span style="display:block; margin-top:0.35rem; color:#7f1d1d; font-style:italic;">"${(appState.manipEmotion ? '[' + appState.manipEmotion + '] ' : '') + (appState.manipTeenFeeling || '(Sense reflexió registrada)')}"</span>
                    </div>
                    <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:6px; padding:0.85rem; font-size:0.85rem; color:#1e40af; margin-bottom:0.6rem;">
                        <strong>Realitat Adolescent a les Xarxes Socials (TikTok, Instagram):</strong><br>
                        <span style="display:block; margin-top:0.35rem; color:#1e3a8a; font-style:italic;">"${appState.manipTeenExperience || '(Sense reflexió registrada)'}"</span>
                    </div>
                    <div style="background:#fff7ed; border:1px solid #fed7aa; border-radius:6px; padding:0.85rem; font-size:0.85rem; color:#9a3412; margin-bottom:0.6rem;">
                        <strong>Reflexió: Com protegir-se de la manipulació de vot i consum?:</strong><br>
                        <span style="display:block; margin-top:0.35rem; color:#7c2d12; font-style:italic;">"${appState.manipulationReflection || '(Sense reflexió registrada)'}"</span>
                    </div>
                    <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:6px; padding:0.85rem; font-size:0.85rem; color:#991b1b;">
                        <strong>Pautes Personals de Verificació Crítica davant Al·lucinacions:</strong><br>
                        <span style="display:block; margin-top:0.35rem; color:#7f1d1d; font-style:italic;">"${appState.manipCriticalReflection || '(Sense reflexió registrada)'}"</span>
                    </div>
                </div>

                <!-- 4. ENGINYERIA DE PROMPTS -->
                <div style="margin-bottom:1.5rem; background:white; border:1px solid var(--border); border-radius:var(--radius-md); padding:1.25rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
                        <h4 style="margin:0; font-size:1.05rem; color:var(--text-main);">🎯 Laboratori de Prompts: Treball de la Guerra Civil Espanyola</h4>
                        <span class="badge-pill badge-pill-emerald">100% Qualitat Assolida</span>
                    </div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.75rem; font-size:0.84rem; margin-bottom:0.75rem;">
                        <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:6px; padding:0.75rem;">
                            <strong style="color:#1e40af;">🎯 1. Objectiu:</strong>
                            <p style="margin:0.35rem 0 0; color:#1e3a8a;">${pr.obj || '(Buit)'}</p>
                        </div>
                        <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:6px; padding:0.75rem;">
                            <strong style="color:#065f46;">👥 2. Context i Públic:</strong>
                            <p style="margin:0.35rem 0 0; color:#064e3b;">${pr.ctx || '(Buit)'}</p>
                        </div>
                        <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:6px; padding:0.75rem;">
                            <strong style="color:#92400e;">📐 3. Format i Extensió:</strong>
                            <p style="margin:0.35rem 0 0; color:#78350f;">${pr.fmt || '(Buit)'}</p>
                        </div>
                        <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:6px; padding:0.75rem;">
                            <strong style="color:#991b1b;">🛡️ 4. Límits i Restriccions:</strong>
                            <p style="margin:0.35rem 0 0; color:#7f1d1d;">${pr.lim || '(Buit)'}</p>
                        </div>
                    </div>
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:0.75rem; font-size:0.84rem;">
                        <strong style="color:#1e1b4b;">💡 Avaluació Crítica de la Resposta de la IA:</strong>
                        <p style="margin:0.35rem 0 0; color:#334155; font-style:italic;">"${appState.promptReflectionEval || '(Sense reflexió registrada)'}"</p>
                    </div>
                </div>

                <!-- 5. REGISTRE ÍNTEGRE DE REFLEXIONS DE L'ALUMNE (11 ACTIVITATS) -->
                <div style="margin-bottom:1.5rem; background:white; border:1px solid var(--border); border-radius:var(--radius-md); padding:1.25rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.85rem;">
                        <h4 style="margin:0; font-size:1.05rem; color:var(--text-main);">📝 Registre Íntegre de Reflexions de l'Alumne (11 activitats)</h4>
                        <span class="badge-pill badge-pill-indigo">Pensament Crític i Metacognició</span>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:0.65rem; font-size:0.84rem;">
                        ${getStudentReflectionsList().map((r, i) => `
                            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:0.75rem;">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.25rem; flex-wrap:wrap; gap:0.25rem;">
                                    <strong style="color:#0f172a;">${i + 1}. ${r.prompt}</strong>
                                    <span style="font-size:0.72rem; color:#6366f1; font-weight:700;">[${r.phase}]</span>
                                </div>
                                <div style="color:${r.text ? '#1e293b' : '#94a3b8'}; font-style:italic; line-height:1.45;">
                                    "${escapeHtml(r.text) || '(Sense reflexió registrada)'}"
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- 6. DETALL DE RESPOSTES DEL QÜESTIONARI FINAL -->
                <div style="background:white; border:1px solid var(--border); border-radius:var(--radius-md); padding:1.25rem;">
                    <h4 style="margin:0 0 0.85rem; font-size:1.05rem; color:var(--text-main);">📝 Detall de Respostes del Qüestionari Final (10 preguntes)</h4>
                    <div style="font-size:0.84rem;">
            `;

            quizQuestions.forEach(item => {
                const userChoice = appState.quizAnswers[item.id];
                const isCorrect = (userChoice === item.correct);
                const userText = (userChoice !== undefined) ? item.opts[userChoice] : '(No contestada)';
                const correctText = item.opts[item.correct];

                html += `
                    <div style="border-bottom:1px solid #e2e8f0; padding:0.55rem 0; display:flex; justify-content:space-between; align-items:flex-start; gap:0.5rem;">
                        <div style="flex:1;">
                            <strong>P${item.id}. ${item.q}</strong><br>
                            <span style="color:${isCorrect ? '#166534' : '#991b1b'};">Resposta triada: <em>${userText}</em></span>
                            ${!isCorrect ? `<br><span style="color:#059669;">Solució correcta: <em>${correctText}</em></span>` : ''}
                        </div>
                        <span style="font-size:1.1rem; flex-shrink:0;">${isCorrect ? '✅' : '❌'}</span>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;

            container.innerHTML = html;
        }

        function renderDiplomaTestsBreakdown() {
            const container = document.getElementById('diploma-tests-breakdown');
            const badge = document.getElementById('dip-tests-summary-badge');
            if (!container) return;

            let totalEncerts = 0;
            const blockNames = {
                1: "Bloc 1: Com aprèn una IA? (Simulador i 4 Passos)",
                2: "Bloc 2: Dades, Criteris d'Etiquetatge i CAPTCHA",
                3: "Bloc 3: Cotxes Autònoms i la Moral Machine del MIT",
                4: "Bloc 4: Teachable Machine (Visió per Computador)",
                5: "Bloc 5: Riscos, Biaixos i Algorismes de Manipulació",
                6: "Bloc 6: L'Art dels Prompts i Matriu 2x2"
            };

            let html = `
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap:0.5rem; margin-bottom:1rem; text-align:center;">
            `;

            for (let s = 1; s <= 6; s++) {
                const sc = getStageQuizScore(s);
                totalEncerts += sc;
                html += `
                    <div style="background:white; border:1px solid #cbd5e1; border-radius:6px; padding:0.4rem 0.6rem;">
                        <div style="font-size:0.72rem; color:#64748b; font-weight:700;">Bloc ${s}</div>
                        <div style="font-size:0.95rem; font-weight:800; color:${sc === 5 ? '#059669' : (sc >= 3 ? '#2563eb' : '#d97706')};">${sc} / 5</div>
                    </div>
                `;
            }

            const totalFinalQ = (typeof quizQuestions !== 'undefined' ? quizQuestions.length : 12);
            const finalScore = (appState.quizScore !== undefined) ? appState.quizScore : 0;
            totalEncerts += finalScore;

            html += `
                    <div style="background:white; border:1px solid #cbd5e1; border-radius:6px; padding:0.4rem 0.6rem;">
                        <div style="font-size:0.72rem; color:#64748b; font-weight:700;">Examen Final</div>
                        <div style="font-size:0.95rem; font-weight:800; color:${finalScore >= 8 ? '#059669' : '#d97706'};">${finalScore} / ${totalFinalQ}</div>
                    </div>
                </div>
            `;

            const maxTotal = 30 + totalFinalQ;
            if (badge) {
                badge.textContent = `${totalEncerts} / ${maxTotal} Encerts (${Math.round((totalEncerts / maxTotal) * 100)}%)`;
                badge.className = totalEncerts >= Math.round(maxTotal * 0.75) ? 'badge-pill badge-pill-emerald' : 'badge-pill badge-pill-amber';
            }

            html += `<div style="display:flex; flex-direction:column; gap:0.75rem;">`;

            // Blocs 1 a 6
            for (let s = 1; s <= 6; s++) {
                const qList = (typeof stageQuizzesData !== 'undefined' && stageQuizzesData[s]) ? stageQuizzesData[s] : [];
                const ansMap = (appState.stageQuizAnswers && appState.stageQuizAnswers[s]) || (s === 2 ? appState.repte1TestAnswers : {}) || {};

                html += `
                    <div style="background:white; border:1px solid #e2e8f0; border-radius:6px; padding:0.75rem 0.9rem;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem; border-bottom:1px solid #f1f5f9; padding-bottom:0.3rem;">
                            <strong style="color:#1e1b4b; font-size:0.84rem;">${blockNames[s]}</strong>
                            <span style="font-size:0.75rem; font-weight:700; color:#4338ca;">${getStageQuizScore(s)} / 5 encerts</span>
                        </div>
                        <div style="display:flex; flex-direction:column; gap:0.4rem; font-size:0.8rem;">
                `;

                qList.forEach(qItem => {
                    const userChoice = ansMap[qItem.id];
                    const isCorrect = (userChoice === qItem.correct);
                    const userText = (userChoice !== undefined && qItem.opts[userChoice]) ? qItem.opts[userChoice] : '(No contestada)';
                    const correctText = qItem.opts[qItem.correct];

                    html += `
                        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.5rem; padding:0.25rem 0; border-bottom:1px dashed #f1f5f9;">
                            <div style="flex:1; line-height:1.4;">
                                <strong>P${qItem.id}. ${escapeHtml(qItem.q)}</strong><br>
                                <span style="color:${isCorrect ? '#166534' : '#991b1b'};">Resposta de l'alumne: <em>${escapeHtml(userText)}</em></span>
                                ${!isCorrect ? `<br><span style="color:#059669; font-weight:600;">Solució correcta: <em>${escapeHtml(correctText)}</em></span>` : ''}
                            </div>
                            <span style="flex-shrink:0; font-weight:800; font-size:0.85rem; color:${isCorrect ? '#166534' : '#991b1b'};">${isCorrect ? '✅ Encert' : '❌ Error'}</span>
                        </div>
                    `;
                });

                html += `
                        </div>
                    </div>
                `;
            }

            // Examen Final (10 preguntes)
            html += `
                <div style="background:white; border:1px solid #e2e8f0; border-radius:6px; padding:0.75rem 0.9rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem; border-bottom:1px solid #f1f5f9; padding-bottom:0.3rem;">
                        <strong style="color:#1e1b4b; font-size:0.84rem;">Examen Final (10 Preguntes Síntesi)</strong>
                        <span style="font-size:0.75rem; font-weight:700; color:#059669;">${finalScore} / 10 encerts (${finalScore * 10}%)</span>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:0.4rem; font-size:0.8rem;">
            `;

            (typeof quizQuestions !== 'undefined' ? quizQuestions : []).forEach(qItem => {
                const userChoice = appState.quizAnswers[qItem.id];
                const isCorrect = (userChoice === qItem.correct);
                const userText = (userChoice !== undefined && qItem.opts[userChoice]) ? qItem.opts[userChoice] : '(No contestada)';
                const correctText = qItem.opts[qItem.correct];

                html += `
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.5rem; padding:0.25rem 0; border-bottom:1px dashed #f1f5f9;">
                        <div style="flex:1; line-height:1.4;">
                            <strong>P${qItem.id}. ${escapeHtml(qItem.q)}</strong><br>
                            <span style="color:${isCorrect ? '#166534' : '#991b1b'};">Resposta de l'alumne: <em>${escapeHtml(userText)}</em></span>
                            ${!isCorrect ? `<br><span style="color:#059669; font-weight:600;">Solució correcta: <em>${escapeHtml(correctText)}</em></span>` : ''}
                        </div>
                        <span style="flex-shrink:0; font-weight:800; font-size:0.85rem; color:${isCorrect ? '#166534' : '#991b1b'};">${isCorrect ? '✅ Encert' : '❌ Error'}</span>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            </div>`;

            container.innerHTML = html;
        }

        function downloadFullEvaluationReport() {
            const student = appState.studentName || 'alumne';
            const group = appState.studentGroup || '1r ESO A';
            const certId = appState.certId;
            const diplomaEl = document.getElementById('printable-diploma');
            const dossierEl = document.getElementById('teacher-dossier-content');

            const diplomaContent = diplomaEl ? diplomaEl.innerHTML : '';
            const dossierContent = dossierEl ? dossierEl.innerHTML : '';

            const fullHtml = `<!DOCTYPE html>
<html lang="ca">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificat i Dossier d'Avaluació IA - ${escapeHtml(student)} (${escapeHtml(group)})</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background: #f8fafc;
            color: #1e293b;
            padding: 2rem;
            max-width: 920px;
            margin: 0 auto;
            line-height: 1.5;
        }
        .btn-print {
            background: #2563eb;
            color: white;
            border: none;
            padding: 0.65rem 1.25rem;
            border-radius: 6px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(37,99,235,0.25);
        }
        .diploma-frame {
            background: white;
            border: 8px double #0f172a;
            border-radius: 8px;
            padding: 2.5rem 2rem;
            text-align: center;
            box-shadow: 0 4px 16px rgba(0,0,0,0.06);
            margin-bottom: 2rem;
        }
        .badge-pill {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 999px;
            font-size: 0.75rem;
            font-weight: 700;
        }
        .badge-pill-emerald { background: #dcfce7; color: #15803d; }
        .badge-pill-indigo { background: #e0e7ff; color: #3730a3; }
        .edu-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 0.5rem;
            font-size: 0.85rem;
        }
        .edu-table th, .edu-table td {
            border: 1px solid #cbd5e1;
            padding: 6px 10px;
            text-align: center;
        }
        .edu-table th { background: #f1f5f9; }
        @media print {
            body { background: white; padding: 0; }
            .no-print { display: none !important; }
            .diploma-frame { border: 6px solid #0f172a; box-shadow: none; padding: 1rem; }
        }
    </style>
</head>
<body>
    <div class="no-print" style="margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 0.9rem; color: #64748b;">Dossier Oficial d'Avaluació · Càpsula "Com aprèn una IA?"</span>
        <button class="btn-print" onclick="window.print()">🖨️ Imprimir / Guardar en PDF</button>
    </div>

    <!-- CERTIFICAT OFICIAL -->
    <div class="diploma-frame">
        ${diplomaContent}
    </div>

    <!-- DOSSIER INTEGRAL D'ACTIVITATS -->
    <div style="background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 2rem; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
        <h2 style="color: #1e1b4b; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem; margin-top: 0; font-size: 1.25rem;">
            📁 Dossier Integral d'Avaluació per al Professorat
        </h2>
        ${dossierContent}
    </div>
</body>
</html>`;

            const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `Dossier_Avaluacio_IA_${student.replace(/\s+/g, '_')}.html`;
            link.click();
        }

        function downloadDiplomaImage() {
            const diplomaEl = document.getElementById('printable-diploma');
            const btn = document.getElementById('btn-download-img');
            const origText = btn ? btn.innerHTML : '';
            if (btn) btn.innerHTML = '⏳ Generant imatge...';

            if (typeof html2canvas === 'undefined') {
                alert("La llibreria de descàrrega no s'ha pogut carregar. Pots utilitzar el botó 'Imprimir en PDF' per guardar el certificat.");
                if (btn) btn.innerHTML = origText;
                return;
            }

            html2canvas(diplomaEl, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff'
            }).then(canvas => {
                const link = document.createElement('a');
                link.download = `Diploma_IA_${(appState.studentName || 'alumne').replace(/\s+/g, '_')}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
                if (btn) btn.innerHTML = origText;
            }).catch(err => {
                console.error("Error generant imatge del diploma:", err);
                alert("S'ha produït un error en generar la imatge. Pots utilitzar el botó 'Imprimir en PDF' com a alternativa.");
                if (btn) btn.innerHTML = origText;
            });
        }

        function copyTeacherReport() {
            const score = (appState.quizScore !== undefined) ? appState.quizScore : 0;
            const r2 = appState.repte2Data || {};
            const r3 = appState.repte3Data || {};
            const pr = appState.promptLabData || {};
            const classes = appState.tmClasses || ['Classe 1', 'Classe 2', 'Classe 3'];

            let report = `=== INFORME DOCENT D'AVALUACIÓ: COM APRÈN UNA IA? ===\n`;
            report += `Alumne/a: ${appState.studentName || 'Sense nom'}\n`;
            report += `Curs i Grup: ${appState.studentGroup || '1r ESO A'}\n`;
            report += `Data: ${new Date().toLocaleDateString('ca-ES')}\n`;
            report += `Codi Certificat: ${appState.certId}\n\n`;
            
            report += `==============================================\n`;
            report += `NOTA FINAL QÜESTIONARI: ${score.toFixed(1)} / 10 (${score * 10}%)\n`;
            report += `Qualificació: ${score >= 9 ? 'Excel·lent 🏆' : (score >= 7 ? 'Notable 🎖️' : (score >= 5 ? 'Aprovat 🥉' : 'En procés ⚠️'))}\n`;
            report += `==============================================\n\n`;

            REPORT_RESUM:
            report += `RESUM DELS TESTS D'AVALUACIÓ PER BLOCS (5 PREGUNTES PER BLOC):\n`;
            for (let s = 1; s <= 6; s++) {
                const sc = getStageQuizScore(s);
                report += `\n[Bloc ${s}] - ${sc}/5 encerts (${sc * 20}%):\n`;
                (typeof stageQuizzesData !== 'undefined' && stageQuizzesData[s] ? stageQuizzesData[s] : []).forEach(qItem => {
                    const ans = (appState.stageQuizAnswers && appState.stageQuizAnswers[s]) ? appState.stageQuizAnswers[s][qItem.id] : undefined;
                    const isOk = (ans === qItem.correct);
                    report += `  - P${qItem.id}: ${isOk ? '✅ Encert' : '❌ Error'} | Triada: "${ans !== undefined && qItem.opts[ans] ? qItem.opts[ans] : '(No contestada)'}"${!isOk ? ' | Solució: "' + qItem.opts[qItem.correct] + '"' : ''}\n`;
                });
            }

            const totalBlocs = getStageQuizScore(1)+getStageQuizScore(2)+getStageQuizScore(3)+getStageQuizScore(4)+getStageQuizScore(5)+getStageQuizScore(6);
            report += `\nTOTAL TESTS FORMATIUS: ${totalBlocs} / 30 encerts\n\n`;

            report += `1. REPTE 1: CAPTCHA I CASOS FRONTERA\n`;
            report += `- Imatges etiquetades: ${Object.keys(appState.repte1Answers).length}/12\n`;
            report += `- Consens comprovat: ${appState.repte1ConsensusChecked ? 'Sí' : 'No'}\n`;
            report += `- Test de Casos Frontera: ${getStageQuizScore(2)}/5 encerts\n\n`;

            report += `2. COTXES AUTÒNOMS I LA MORAL MACHINE DEL MIT\n`;
            report += `- Test de Dilemes Morals: ${getStageQuizScore(3)}/5 encerts\n`;
            report += `- Reflexió comprar cotxe que sacrifica: ${appState.b3Refl1 || '-'}\n`;
            report += `- Reflexió valors morals i xoc cultural: ${appState.b3Refl2 || '-'}\n`;
            report += `- Reflexió responsabilitat i culpa davant justícia: ${appState.b3Refl3 || '-'}\n\n`;

            report += `3. TEACHABLE MACHINE: CLASSES I REPTES 2 I 3\n`;
            report += `- Classes seleccionades: ${classes.join(', ')}\n`;
            report += `- Repte 2 (Prova Fons): ${r2.p1_fons || '-'} | Res: ${r2.p1_res || '-'} | Hipòtesi: ${r2.p1_hip || '-'}\n`;
            report += `- Repte 2 (Prova Angle): ${r2.p2_var || '-'} | Res: ${r2.p2_res || '-'} | Hipòtesi: ${r2.p2_hip || '-'}\n`;
            report += `- Repte 2 (Prova Tapat): ${r2.p3_part || '-'} | Res: ${r2.p3_res || '-'} | Hipòtesi: ${r2.p3_hip || '-'}\n`;
            report += `- Repte 3 (Checklist): 15 mostres (${r3.chk1?'Sí':'No'}), Fons (${r3.chk2?'Sí':'No'}), Angles (${r3.chk3?'Sí':'No'}), Reentrenat (${r3.chk4?'Sí':'No'})\n`;
            report += `- Repte 3 (Millora observada): ${r3.millora || '-'}\n`;
            report += `- Repte 3 (Casos que encara fallen): ${r3.falla || '-'}\n`;
            report += `- Repte 3 (Propostes futures): ${r3.futur || '-'}\n\n`;

            report += `4. RISCOS, BIAIXOS I MANIPULACIÓ ALGORÍTMICA\n`;
            report += `- Mode algorítmic explorat: ${appState.algoMode === 'ethical' ? 'Ètic (EU AI Act)' : 'Manipulatiu (Engagement)'}\n`;
            report += `- Emoció identificada: ${appState.manipEmotion || '-'}\n`;
            report += `- Impacte emocional al simulador mòbil: ${appState.manipTeenFeeling || '-'}\n`;
            report += `- Experiència adolescent a les xarxes socials: ${appState.manipTeenExperience || '-'}\n`;
            report += `- Reflexió de protecció davant manipulació: ${appState.manipulationReflection || '-'}\n`;
            report += `- Pautes crítiques de verificació: ${appState.manipCriticalReflection || '-'}\n\n`;

            report += `5. ENGINYERIA DE PROMPTS (GUERRA CIVIL ESPANYOLA)\n`;
            report += `🎯 Objectiu: ${pr.obj || '-'}\n`;
            report += `👥 Context/Públic: ${pr.ctx || '-'}\n`;
            report += `📐 Format: ${pr.fmt || '-'}\n`;
            report += `🛡️ Límits: ${pr.lim || '-'}\n`;
            report += `💡 Avaluació crítica de la resposta: ${appState.promptReflectionEval || '-'}\n\n`;

            report += `6. REGISTRE ÍNTEGRE DE LES REFLEXIONS DE L'ALUMNE (18 PREGUNTES):\n`;
            getStudentReflectionsList().forEach((r, i) => {
                report += `${i + 1}. [${r.phase}] ${r.prompt}\n   "${r.text || '(Sense reflexió)'}"\n\n`;
            });

            report += `7. DETALL DE RESPOSTES DEL QÜESTIONARI FINAL:\n`;
            (typeof quizQuestions !== 'undefined' ? quizQuestions : []).forEach(item => {
                const u = appState.quizAnswers[item.id];
                const isOk = (u === item.correct);
                report += `- P${item.id}: ${isOk ? '✅ Encert' : '❌ Error'} | Triada: ${u !== undefined ? ['A','B','C','D'][u] : '-'}${!isOk ? ' | Solució: ' + ['A','B','C','D'][item.correct] : ''}\n`;
            });

            report += `\n==============================================\n`;
            report += `Aquest resum recull totes les activitats per a la qualificació del docent.\n`;

            navigator.clipboard.writeText(report.trim()).then(() => {
                alert("📋 Dossier complet d'avaluació copiat al porta-retalls! Ja el pots enganxar al Google Classroom o al teu registre docent.");
            }).catch(() => {
                prompt("Copia manualment aquest dossier d'avaluació per al docent:", report.trim());
            });
        }

        function restoreSavedFormFields() {
            for (let s = 1; s <= 6; s++) {
                if (typeof renderStageQuiz === 'function') renderStageQuiz(s);
            }

            if (appState.simReflection) {
                const simEl = document.getElementById('sim-reflection');
                if (simEl) simEl.value = appState.simReflection;
            }
            if (appState.b1Refl2) {
                const el = document.getElementById('b1-refl-2');
                if (el) el.value = appState.b1Refl2;
            }
            if (appState.b1Refl3) {
                const el = document.getElementById('b1-refl-3');
                if (el) el.value = appState.b1Refl3;
            }

            if (appState.repte1Notes) {
                const notesEl = document.getElementById('repte1-notes');
                if (notesEl) notesEl.value = appState.repte1Notes;
            }

            if (appState.repte1NoiseReflection) {
                const noiseEl = document.getElementById('repte1-noise-reflection');
                if (noiseEl) noiseEl.value = appState.repte1NoiseReflection;
            }
            if (appState.b2Refl3) {
                const el = document.getElementById('b2-refl-3');
                if (el) el.value = appState.b2Refl3;
            }

            if (appState.b3Refl1) {
                const el = document.getElementById('b3-refl-1');
                if (el) el.value = appState.b3Refl1;
            }
            if (appState.b3Refl2) {
                const el = document.getElementById('b3-refl-2');
                if (el) el.value = appState.b3Refl2;
            }
            if (appState.b3Refl3) {
                const el = document.getElementById('b3-refl-3');
                if (el) el.value = appState.b3Refl3;
            }

            restoreTMClasses();

            if (appState.repte2Data) {
                const d = appState.repte2Data;
                if (document.getElementById('r2-p1-fons')) document.getElementById('r2-p1-fons').value = d.p1_fons || '';
                if (document.getElementById('r2-p1-result')) document.getElementById('r2-p1-result').value = d.p1_res || '';
                if (document.getElementById('r2-p1-hip')) document.getElementById('r2-p1-hip').value = d.p1_hip || '';

                if (document.getElementById('r2-p2-var')) document.getElementById('r2-p2-var').value = d.p2_var || '';
                if (document.getElementById('r2-p2-result')) document.getElementById('r2-p2-result').value = d.p2_res || '';
                if (document.getElementById('r2-p2-hip')) document.getElementById('r2-p2-hip').value = d.p2_hip || '';

                if (document.getElementById('r2-p3-part')) document.getElementById('r2-p3-part').value = d.p3_part || '';
                if (document.getElementById('r2-p3-result')) document.getElementById('r2-p3-result').value = d.p3_res || '';
                if (document.getElementById('r2-p3-hip')) document.getElementById('r2-p3-hip').value = d.p3_hip || '';
            }

            if (appState.repte3Data) {
                const d = appState.repte3Data;
                if (document.getElementById('chk-r3-1')) document.getElementById('chk-r3-1').checked = !!d.chk1;
                if (document.getElementById('chk-r3-2')) document.getElementById('chk-r3-2').checked = !!d.chk2;
                if (document.getElementById('chk-r3-3')) document.getElementById('chk-r3-3').checked = !!d.chk3;
                if (document.getElementById('chk-r3-4')) document.getElementById('chk-r3-4').checked = !!d.chk4;
                if (document.getElementById('r3-millora')) document.getElementById('r3-millora').value = d.millora || '';
                if (document.getElementById('r3-falla')) document.getElementById('r3-falla').value = d.falla || '';
                if (document.getElementById('r3-futur')) document.getElementById('r3-futur').value = d.futur || '';
            }

            if (appState.manipEmotion && typeof selectManipEmotion === 'function') {
                selectManipEmotion(appState.manipEmotion);
            }

            if (appState.manipTeenFeeling) {
                const feelEl = document.getElementById('manip-teen-feeling');
                if (feelEl) feelEl.value = appState.manipTeenFeeling;
            }

            if (appState.manipTeenExperience) {
                const expEl = document.getElementById('manip-teen-experience');
                if (expEl) expEl.value = appState.manipTeenExperience;
            }

            if (appState.manipulationReflection) {
                const manipEl = document.getElementById('manip-reflection');
                if (manipEl) manipEl.value = appState.manipulationReflection;
            }

            if (appState.manipCriticalReflection) {
                const critEl = document.getElementById('manip-critical-reflection');
                if (critEl) critEl.value = appState.manipCriticalReflection;
            }

            if (appState.promptLabData) {
                const d = appState.promptLabData;
                if (document.getElementById('prompt-obj')) document.getElementById('prompt-obj').value = d.obj || '';
                if (document.getElementById('prompt-ctx')) document.getElementById('prompt-ctx').value = d.ctx || '';
                if (document.getElementById('prompt-fmt')) document.getElementById('prompt-fmt').value = d.fmt || '';
                if (document.getElementById('prompt-lim')) document.getElementById('prompt-lim').value = d.lim || '';
            }

            if (appState.promptReflectionEval) {
                const evalEl = document.getElementById('prompt-reflection-eval');
                if (evalEl) evalEl.value = appState.promptReflectionEval;
            }
            if (appState.b5Refl2) {
                const el = document.getElementById('b5-refl-2');
                if (el) el.value = appState.b5Refl2;
            }
            if (appState.b5Refl3) {
                const el = document.getElementById('b5-refl-3');
                if (el) el.value = appState.b5Refl3;
            }

            if (typeof updateEpochUI === 'function') updateEpochUI();
            if (typeof updateSimProgressStatus === 'function') updateSimProgressStatus();
            if (typeof updateRepte1ProgressStatus === 'function') updateRepte1ProgressStatus();
            if (typeof restoreMoralDilemmasUI === 'function') restoreMoralDilemmasUI();
            if (typeof updateTMProgressStatus === 'function') updateTMProgressStatus();
            if (typeof updateStage4ProgressStatus === 'function') updateStage4ProgressStatus();
            if (typeof updatePromptLab === 'function') updatePromptLab();
        }

        window.addEventListener('DOMContentLoaded', loadState);
