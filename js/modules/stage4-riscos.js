// ==========================================
// FASE 4: RISCOS, BIAIXOS I MANIPULACIÓ ALGORÍTMICA
// ==========================================

        function checkHallucinationCase(caseId, option) {
            const badge = document.getElementById(`case-badge-${caseId}`);
            const fb = document.getElementById(`case-feedback-${caseId}`);
            if (!badge || !fb) return;

            fb.style.display = 'block';

            if (option === 'ok') {
                badge.className = 'badge-pill badge-pill-emerald';
                badge.textContent = 'Correcte! Identificat';
                
                if (caseId === 1) {
                    fb.innerHTML = `
                        <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:6px; padding:0.75rem; color:#065f46; font-size:0.83rem; line-height:1.45;">
                            <strong style="display:block; margin-bottom:0.35rem; color:#047857; font-size:0.88rem;">✅ Exacte! És una al·lucinació o confabulació històrica total.</strong>
                            <p style="margin:0 0 0.4rem;"><strong>Per què passa?</strong> Els models de llenguatge (LLMs) no consulten fets en una enciclopèdia: prediuen estadísticament la següent paraula (<em>token</em>) més probable. Com que "Jaume I", "París", "Tractat" i "Napoleó" apareixen sovint en textos històrics, el model els combina de manera sintàcticament impecable.</p>
                            <p style="margin:0; font-size:0.8rem; color:#064e3b;"><strong>L'anacronisme:</strong> Jaume I va viure al segle XIII (1208-1276) i Napoleó va morir el 1821 (el 1845 ja feia 24 anys que era mort!). Una IA no té noció de la veritat; només calcula coherència probabilística.</p>
                        </div>
                    `;
                } else if (caseId === 2) {
                    fb.innerHTML = `
                        <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:6px; padding:0.75rem; color:#065f46; font-size:0.83rem; line-height:1.45;">
                            <strong style="display:block; margin-bottom:0.35rem; color:#047857; font-size:0.88rem;">✅ Molt ben vist! És un biaix d'entrenament (Training Bias).</strong>
                            <p style="margin:0 0 0.4rem;"><strong>Per què passa?</strong> La IA no té prejudicis ni moral: aprèn dels milions d'imatges i textos que extreu d'Internet. Si a la xarxa històricament els caps d'equip solien ser homes i la infermeria estava associada a noies joves, el model assumeix que aquesta és la distribució "més probable".</p>
                            <p style="margin:0; font-size:0.8rem; color:#064e3b;"><strong>La solució:</strong> Els desenvolupadors han d'auditar els conjunts de dades i aplicar tècniques de desbiaixament (<em>debiasing</em>) per no perpetuar estereotips socials discriminatoris.</p>
                        </div>
                    `;
                } else if (caseId === 3) {
                    fb.innerHTML = `
                        <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:6px; padding:0.75rem; color:#065f46; font-size:0.83rem; line-height:1.45;">
                            <strong style="display:block; margin-bottom:0.35rem; color:#047857; font-size:0.88rem;">✅ Identificat amb èxit! Al·lucinació de referències acadèmiques.</strong>
                            <p style="margin:0 0 0.4rem;"><strong>Per què passa?</strong> Els models generatius coneixen l'estructura formal d'una cita científica: revista de prestigi (ex: <em>Nature</em>), any, codi DOI i noms d'autors reals. Com que no comproven la biblioteca mèdica, "inventen" una cita que sona autèntica però que no existeix a la realitat.</p>
                            <p style="margin:0; font-size:0.8rem; color:#064e3b;"><strong>Pauta per a treballs:</strong> Mai citis una font d'una IA sense comprovar el DOI o títol a cercadors científics reals com Google Scholar, Dialnet o PubMed.</p>
                        </div>
                    `;
                }
                appState.hallucinationsAnswered[caseId] = true;
            } else {
                badge.className = 'badge-pill badge-pill-rose';
                badge.textContent = 'Incorrecte';

                if (caseId === 1) {
                    fb.innerHTML = `
                        <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:6px; padding:0.75rem; color:#991b1b; font-size:0.83rem; line-height:1.45;">
                            <strong style="display:block; margin-bottom:0.35rem; color:#b91c1c; font-size:0.88rem;">❌ Compte! Has caigut a la trampa de l'al·lucinació.</strong>
                            <p style="margin:0 0 0.4rem;">Aquest tractat és 100% inventat. Jaume I (s. XIII) i Napoleó (segles XVIII-XIX) van viure amb més de 500 anys de diferència, i Napoleó ja havia mort el 1821!</p>
                            <p style="margin:0; font-size:0.8rem; color:#7f1d1d;"><strong>Per què sembla real?</strong> Perquè la IA redacta amb seguretat i estil acadèmic. Mai donis per bona una dada històrica sense contrastar-la.</p>
                        </div>
                    `;
                } else if (caseId === 2) {
                    fb.innerHTML = `
                        <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:6px; padding:0.75rem; color:#991b1b; font-size:0.83rem; line-height:1.45;">
                            <strong style="display:block; margin-bottom:0.35rem; color:#b91c1c; font-size:0.88rem;">❌ No és neutral! És un biaix d'entrenament clar.</strong>
                            <p style="margin:0 0 0.4rem;">Assignar automàticament el líder científic a un home madur i el rol d'infermera a una noia jove no és neutralitat: reflecteix els estereotips de gènere apresos a Internet.</p>
                            <p style="margin:0; font-size:0.8rem; color:#7f1d1d;"><strong>Principi bàsic:</strong> <em>Garbage in, garbage out</em>. Si les dades tenen biaixos socials, la IA els aprèn i els amplifica.</p>
                        </div>
                    `;
                } else if (caseId === 3) {
                    fb.innerHTML = `
                        <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:6px; padding:0.75rem; color:#991b1b; font-size:0.83rem; line-height:1.45;">
                            <strong style="display:block; margin-bottom:0.35rem; color:#b91c1c; font-size:0.88rem;">❌ Perill! Mai et fiïs d'una cita bibliogràfica sense verificar-la.</strong>
                            <p style="margin:0 0 0.4rem;">Aquest és un dels errors més habituals en treballs d'estudiants: copiar referències que semblen reals perquè porten DOI o revista prestigiosa, però que són completament inventades per la IA.</p>
                            <p style="margin:0; font-size:0.8rem; color:#7f1d1d;"><strong>Verificació obligatòria:</strong> Cerca sempre el títol i autors a bases de dades acadèmiques abans d'utilitzar-los.</p>
                        </div>
                    `;
                }
                appState.hallucinationsAnswered[caseId] = false;
            }
            saveState();
            if (typeof updateStage4ProgressStatus === 'function') {
                updateStage4ProgressStatus();
            }
        }

        // SIMULADOR DE TELÈFON MÒBIL I ALGORISMES (FASE 4)
        function switchAlgoPhoneScreen(screenNum) {
            appState.algoPhoneScreen = screenNum;
            renderAlgoPhoneContent();
        }

        function nextAlgoPhoneScreen() {
            const mode = appState.algoMode || 'manipulative';
            const max = (mode === 'manipulative' ? 6 : 5);
            let cur = appState.algoPhoneScreen || 1;
            cur = (cur >= max ? 1 : cur + 1);
            switchAlgoPhoneScreen(cur);
        }

        function prevAlgoPhoneScreen() {
            const mode = appState.algoMode || 'manipulative';
            const max = (mode === 'manipulative' ? 6 : 5);
            let cur = appState.algoPhoneScreen || 1;
            cur = (cur <= 1 ? max : cur - 1);
            switchAlgoPhoneScreen(cur);
        }

        function renderAlgoPhoneContent() {
            const screenBody = document.getElementById('phone-screen-body');
            const tabButtons = document.querySelectorAll('.phone-tab-btn');
            const currentTab = appState.algoPhoneScreen || 1;
            const mode = appState.algoMode || 'manipulative';

            tabButtons.forEach(btn => {
                const num = parseInt(btn.getAttribute('data-screen') || '1', 10);
                if (num === currentTab) {
                    btn.classList.add('active');
                    if (mode === 'ethical') btn.classList.add('ethical-tab');
                } else {
                    btn.classList.remove('active');
                    btn.classList.remove('ethical-tab');
                }
            });

            const ind = document.getElementById('phone-screen-indicator');
            const maxScreens = (mode === 'manipulative' ? 6 : 5);
            if (ind) ind.textContent = `${currentTab} / ${maxScreens}`;

            if (!screenBody) return;

            if (mode === 'manipulative') {
                if (currentTab === 1) {
                    // TAB 1: FOMO & NOTIFICACIONS NOCTURNES
                    screenBody.innerHTML = `
                        <div class="phone-push-notif">
                            <div style="display:flex; justify-content:space-between; margin-bottom:3px;">
                                <strong style="color:#b91c1c;">🚨 InstaTok · Ara mateix</strong>
                                <span style="font-size:0.7rem; color:#94a3b8;">Fa 2 min</span>
                            </div>
                            <strong>3 companys han comentat una foto on surts tu!</strong>
                            <p style="margin:2px 0 0; color:#475569;">Entra abans de 10 minuts per veure les respostes abans que s'esborrin.</p>
                        </div>

                        <div class="phone-push-notif" style="border-left-color:#f59e0b;">
                            <div style="display:flex; justify-content:space-between; margin-bottom:3px;">
                                <strong style="color:#b45309;">🔥 Ratxa de 154 dies en perill!</strong>
                                <span style="font-size:0.7rem; color:#94a3b8;">Fa 12 min</span>
                            </div>
                            <p style="margin:0; color:#475569;">Queden menys de 2 hores per perdre la ratxa amb en Marc. Envia un snap ara mateix!</p>
                        </div>

                        <div class="phone-push-notif" style="border-left-color:#8b5cf6;">
                            <div style="display:flex; justify-content:space-between; margin-bottom:3px;">
                                <strong style="color:#6d28d9;">👀 Visita anònima al teu perfil</strong>
                                <span style="font-size:0.7rem; color:#94a3b8;">Fa 35 min</span>
                            </div>
                            <p style="margin:0; color:#475569;">Algú del teu institut ha mirat les teves fotos 4 vegades aquesta matinada.</p>
                        </div>

                        <div style="margin-top:auto; background:#fee2e2; border-radius:8px; padding:8px; font-size:0.72rem; color:#991b1b; text-align:center;">
                            🎯 <strong>Objectiu Algorítmic:</strong> Generar por a quedar-se fora (FOMO) per fer que l'adolescent no tanqui l'aplicació ni per anar a dormir.
                        </div>
                    `;
                } else if (currentTab === 2) {
                    // TAB 2: DEEPFAKES & CONTINGUT SINTÈTIC VIRAL
                    screenBody.innerHTML = `
                        <div class="phone-post-card">
                            <div class="phone-post-author">
                                <span class="phone-avatar" style="background:#dc2626;">🎭</span>
                                <div>
                                    <div style="font-size:0.75rem; color:#0f172a; font-weight:700;">@noticies_virals_ia</div>
                                    <div style="font-size:0.65rem; color:#dc2626; font-weight:700;">⚡ Vídeo Filtrat · 890K reproduccions</div>
                                </div>
                            </div>
                            <div style="background:#0f172a; color:#f8fafc; border-radius:8px; padding:12px 10px; margin-bottom:8px; text-align:center; position:relative;">
                                <div style="font-size:1.6rem; margin-bottom:4px;">▶️</div>
                                <div style="font-size:0.75rem; font-weight:700; color:#f87171;">"ÀUDIO FILTRAT DEL DIRECTOR DE L'INSTITUT"</div>
                                <div style="font-size:0.68rem; color:#cbd5e1; margin-top:2px;">[Clonació de veu sintètica generada amb IA generativa]</div>
                            </div>
                            <p style="margin:0 0 6px; font-size:0.77rem; color:#1e293b; font-weight:600;">
                                "🔴 URGENT: El director anuncia que se suspenen tots els exàmens de final de curs i es repeteix el trimestre per falta de pressupost!"
                            </p>
                            <div style="font-size:0.7rem; color:#64748b; display:flex; justify-content:space-between; border-top:1px solid #f1f5f9; padding-top:6px;">
                                <span>😱 74.2K compartits</span>
                                <span>💬 15.3K comentaris d'angoixa</span>
                            </div>
                        </div>

                        <div class="phone-post-card" style="background:#fef2f2; border-color:#fecaca;">
                            <strong style="color:#b91c1c; font-size:0.72rem;">⚠️ Alerta Algorítmica Amagada:</strong>
                            <p style="margin:2px 0 0; font-size:0.71rem; color:#7f1d1d;">
                                L'algorisme recomana aquest deepfake perquè les alarmes i vídeos falsos generen un <strong>600% més de retenció i comparticions</strong> abans de poder ser verificats.
                            </p>
                        </div>

                        <div style="margin-top:auto; background:#fee2e2; border-radius:8px; padding:8px; font-size:0.72rem; color:#991b1b; text-align:center;">
                            🎯 <strong>Objectiu Algorítmic:</strong> Prioritzar l'impacte emocional de la falsedat abans que la veritat per multiplicar el trànsit web.
                        </div>
                    `;
                } else if (currentTab === 3) {
                    // TAB 3: OCULTANT ARGUMENTS & CAMBRA DE RESSONÀNCIA
                    screenBody.innerHTML = `
                        <div class="phone-post-card">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                                <span style="font-size:0.7rem; font-weight:700; color:#475569;">FEED PERSONALITZAT: DEBAT ESCOLAR</span>
                                <span style="background:#fee2e2; color:#b91c1c; font-size:0.62rem; font-weight:700; padding:2px 6px; border-radius:4px;">100% Afin</span>
                            </div>
                            <div class="phone-post-author">
                                <span class="phone-avatar" style="background:#6366f1;">🗣️</span>
                                <div>
                                    <div style="font-size:0.74rem; color:#0f172a; font-weight:700;">@protesta_estudiantil</div>
                                    <div style="font-size:0.64rem; color:#64748b;">Opinió que coincideix amb la teva</div>
                                </div>
                            </div>
                            <p style="margin:0 0 6px; font-size:0.76rem; color:#1e293b;">
                                "Els deures i els exàmens haurien d'estar prohibits per llei! Tothom al carrer i a les xarxes pensa el mateix!"
                            </p>
                            <div style="font-size:0.7rem; color:#64748b;">
                                ❤️ 34.5K · 💬 8.2K d'acord
                            </div>
                        </div>

                        <div class="phone-post-card" style="background:#fff7ed; border-color:#ffedd5;">
                            <div style="display:flex; align-items:center; gap:5px; margin-bottom:3px;">
                                <span style="font-size:0.85rem;">🔒</span>
                                <strong style="color:#c2410c; font-size:0.72rem;">12 arguments contraris ocultats pel filtre:</strong>
                            </div>
                            <p style="margin:0; font-size:0.71rem; color:#7c2d12; line-height:1.4;">
                                L'algorisme <strong>amaga activament</strong> estudis pedagògics i opinions matisades perquè ha detectat que si et mostra arguments oposats, tanques l'app un 35% més ràpid.
                            </p>
                        </div>

                        <div style="margin-top:auto; background:#fee2e2; border-radius:8px; padding:8px; font-size:0.72rem; color:#991b1b; text-align:center;">
                            🎯 <strong>Objectiu Algorítmic:</strong> Cambres de ressonància: encapsular l'adolescent en bombolles ideològiques per no incomodar-lo mai.
                        </div>
                    `;
                } else if (currentTab === 4) {
                    // TAB 4: RAGEBAIT & POLARITZACIÓ
                    screenBody.innerHTML = `
                        <div class="phone-post-card">
                            <div class="phone-post-author">
                                <span class="phone-avatar" style="background:#ef4444;">⚡</span>
                                <div>
                                    <div style="font-size:0.75rem; color:#0f172a; font-weight:700;">@polemica_diaria (Bot d'Engagement)</div>
                                    <div style="font-size:0.65rem; color:#64748b;">Publicat fa 18 min · Viral</div>
                                </div>
                            </div>
                            <p style="margin:0 0 8px; font-weight:600; color:#1e293b; font-size:0.8rem;">
                                "Els adolescents d'ara són una generació de vidre que no sap concentrar-se ni 10 segons sense el mòbil. Canvieu la meva opinió!"
                            </p>
                            <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:#64748b; border-top:1px solid #f1f5f9; padding-top:6px;">
                                <span>😡 18.4K reaccions</span>
                                <span>💬 9.2K comentaris agressius</span>
                            </div>
                        </div>

                        <div class="phone-post-card" style="background:#fff7ed; border-color:#ffedd5;">
                            <div style="font-size:0.7rem; font-weight:700; color:#c2410c; margin-bottom:4px;">Comentari amplificat per l'algorisme:</div>
                            <p style="margin:0; font-size:0.74rem; color:#7c2d12;">"Això és una vergonya i una falta de respecte! Vosaltres no sabeu la pressió que tenim!"</p>
                        </div>

                        <div style="margin-top:auto; background:#fee2e2; border-radius:8px; padding:8px; font-size:0.72rem; color:#991b1b; text-align:center;">
                            🎯 <strong>Objectiu Algorítmic:</strong> Ragebait. La indignació activa el sistema d'alerta i triplica el temps de permanència als debats.
                        </div>
                    `;
                } else if (currentTab === 5) {
                    // TAB 5: COMERCIALS DE COMPRA & DARK PATTERNS
                    screenBody.innerHTML = `
                        <div class="phone-post-card">
                            <div class="phone-post-author">
                                <span class="phone-avatar" style="background:#8b5cf6;">👟</span>
                                <div>
                                    <div style="font-size:0.75rem; color:#0f172a; font-weight:700;">@hype_sneakers_drop · Patrocinat</div>
                                    <div style="font-size:0.64rem; color:#dc2626;">Publicitat Microdirigida (Perfil Jove)</div>
                                </div>
                            </div>
                            <div style="background:#faf5ff; border:1px solid #e9d5ff; border-radius:8px; padding:8px; margin-bottom:6px;">
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <strong style="font-size:0.8rem; color:#581c87;">Sabatilles 'Air Hype 2026'</strong>
                                    <span style="background:#f43f5e; color:white; font-size:0.62rem; font-weight:700; padding:2px 5px; border-radius:4px;">EDICIÓ LIMITADA</span>
                                </div>
                                <div style="margin-top:4px; font-size:0.88rem; font-weight:800; color:#0f172a;">
                                    89,90 € <span style="font-size:0.7rem; color:#94a3b8; text-decoration:line-through; font-weight:400;">49,90 €</span>
                                    <div style="font-size:0.65rem; color:#b91c1c; font-weight:600;">(Preu dinàmic inflat: l'app detecta el teu interès repetit)</div>
                                </div>
                            </div>
                            <div style="background:#fee2e2; border:1px solid #fecaca; border-radius:6px; padding:6px; margin-bottom:6px; font-size:0.7rem; color:#991b1b; font-weight:700; text-align:center;">
                                ⏳ COMPTADOR D'URGÈNCIA: 03:42 MINUTS RESTANTS!
                                <div style="font-size:0.64rem; font-weight:400; color:#7f1d1d; margin-top:2px;">⚠️ Només queda 1 parell a la teva talla! 34 persones ho estan mirant!</div>
                            </div>
                            <div style="background:#e11d48; color:white; font-size:0.75rem; font-weight:700; text-align:center; padding:7px; border-radius:6px; cursor:pointer;">
                                🛒 COMPRAR ARA EN 1 CLIC
                            </div>
                            <div style="font-size:0.62rem; color:#64748b; margin-top:4px; line-height:1.3; text-align:center;">
                                *Lletra petita oculta: Inclou subscripció VIP automàtica de 39,99 €/mes després de 7 dies de prova gratuïta.
                            </div>
                        </div>

                        <div style="margin-top:auto; background:#fee2e2; border-radius:8px; padding:8px; font-size:0.72rem; color:#991b1b; text-align:center;">
                            🎯 <strong>Objectiu Algorítmic:</strong> Patrons foscos comercials: preus inflats dinàmicament, falsa urgència i subscripcions trampa.
                        </div>
                    `;
                } else if (currentTab === 6) {
                    // TAB 6: FILTRES D'IA & INSEGURETAT ESTÈTICA
                    screenBody.innerHTML = `
                        <div class="phone-post-card">
                            <div class="phone-post-author">
                                <span class="phone-avatar" style="background:#ec4899;">✨</span>
                                <div>
                                    <div style="font-size:0.75rem; color:#0f172a; font-weight:700;">@filtre_glow_ia · Patrocinat</div>
                                    <div style="font-size:0.65rem; color:#64748b;">Publicitat Microdirigida (01:47 AM)</div>
                                </div>
                            </div>
                            <div style="background:#fce7f3; border-radius:8px; padding:10px; text-align:center; margin-bottom:8px;">
                                <div style="font-size:0.74rem; font-weight:700; color:#9d174d;">Filtre 'Cutis Perfecte IA'</div>
                                <div style="font-size:0.7rem; color:#be185d;">Elimina taques i dissimula la teva cara real en 1 clic</div>
                            </div>
                            <p style="margin:0 0 6px; font-size:0.76rem; color:#475569;">
                                "El 94% de noies i nois del teu entorn ja utilitzen el filtre. Oferta especial: Crema eliminadora de porus per 14,99 €."
                            </p>
                            <div style="background:#f43f5e; color:white; font-size:0.72rem; font-weight:700; text-align:center; padding:6px; border-radius:6px;">
                                ⏳ OFERTA ACABA EN 08:34 MINUTS (Últimes 2 unitats!)
                            </div>
                        </div>

                        <div style="margin-top:auto; background:#fee2e2; border-radius:8px; padding:8px; font-size:0.72rem; color:#991b1b; text-align:center;">
                            🎯 <strong>Objectiu Algorítmic:</strong> Explota la vulnerabilitat d'autoestima de matinada amb patrons foscos de pressió corporal.
                        </div>
                    `;
                }
            } else {
                // ETHICAL MODE (5 TABS)
                if (currentTab === 1) {
                    // TAB 1: BENESTAR DIGITAL & DESCANS NOCTURN
                    screenBody.innerHTML = `
                        <div class="phone-push-notif ethical">
                            <div style="display:flex; justify-content:space-between; margin-bottom:3px;">
                                <strong style="color:#047857;">⏱️ Benestar Digital</strong>
                                <span style="font-size:0.7rem; color:#94a3b8;">Avís saludable</span>
                            </div>
                            <strong>Portes 30 minuts de pantalla avui.</strong>
                            <p style="margin:2px 0 0; color:#475569;">L'aplicació et recomana fer una pausa, descansar la vista, beure aigua o fer una volta a l'aire lliure.</p>
                        </div>

                        <div class="phone-push-notif ethical" style="border-left-color:#0284c7;">
                            <div style="display:flex; justify-content:space-between; margin-bottom:3px;">
                                <strong style="color:#0369a1;">🌙 Mode Descans Nocturn</strong>
                                <span style="font-size:0.7rem; color:#94a3b8;">Programat (22:00 - 08:00)</span>
                            </div>
                            <p style="margin:0; color:#475569;">Totes les notificacions no urgents es silenciaran automàticament per garantir un son reparador.</p>
                        </div>

                        <div style="margin-top:auto; background:#dcfce7; border-radius:8px; padding:8px; font-size:0.72rem; color:#166534; text-align:center;">
                            🛡️ <strong>Normativa Europea AI Act:</strong> Prohibits els dissenys dissenyats per crear addicció o dependència compulsiva a menors d'edat.
                        </div>
                    `;
                } else if (currentTab === 2) {
                    // TAB 2: VERIFICACIÓ & DETECCIO DE DEEPFAKES
                    screenBody.innerHTML = `
                        <div class="phone-post-card">
                            <div class="phone-post-author">
                                <span class="phone-avatar" style="background:#0284c7;">🔍</span>
                                <div>
                                    <div style="font-size:0.75rem; color:#0f172a; font-weight:700;">@verificacio_educativa</div>
                                    <div style="font-size:0.65rem; color:#0369a1; font-weight:700;">Fact-Checking Independent</div>
                                </div>
                            </div>
                            <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:8px; margin-bottom:6px;">
                                <div style="font-size:0.75rem; font-weight:700; color:#1e40af;">🏷️ Etiqueta Oficial de Contingut Sintètic</div>
                                <div style="font-size:0.71rem; color:#1e3a8a; margin-top:2px;">
                                    L'àudio viral sobre la cancel·lació d'exàmens ha estat identificat com a <strong>Deepfake clonat amb IA</strong>. El calendari d'exàmens segueix vigent.
                                </div>
                            </div>
                            <p style="margin:0 0 6px; font-size:0.75rem; color:#334155;">
                                "Les plataformes ètiques etiqueten automàticament el contingut generat per IA i enllacen a la font contrastada de la notícia."
                            </p>
                            <div style="font-size:0.7rem; color:#059669; font-weight:700;">
                                ✅ Font contrastada per l'equip directiu del centre
                            </div>
                        </div>

                        <div style="margin-top:auto; background:#dcfce7; border-radius:8px; padding:8px; font-size:0.72rem; color:#166534; text-align:center;">
                            🛡️ <strong>Transparència de Deepfakes:</strong> Dret dels usuaris a saber quan un àudio, vídeo o imatge ha estat fabricat artificialment.
                        </div>
                    `;
                } else if (currentTab === 3) {
                    // TAB 3: PLURALITAT DE DEBAT & TRENCAMENT DE BOMBOLLES
                    screenBody.innerHTML = `
                        <div class="phone-post-card">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                                <span style="font-size:0.7rem; font-weight:700; color:#047857;">DEBAT OBERT: PUNTS DE VISTA DIVERSOS</span>
                                <span style="background:#dcfce7; color:#166534; font-size:0.62rem; font-weight:700; padding:2px 6px; border-radius:4px;">Sense Biaix</span>
                            </div>
                            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:6px; margin-bottom:6px;">
                                <div style="font-size:0.72rem; font-weight:700; color:#0f172a;">Perspectiva A: Racionalització del temps lliure</div>
                                <div style="font-size:0.69rem; color:#475569;">Experts recomanen reduir tasques a casa per afavorir l'esport i el descans.</div>
                            </div>
                            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:6px; margin-bottom:6px;">
                                <div style="font-size:0.72rem; font-weight:700; color:#0f172a;">Perspectiva B: Consolidació de coneixements</div>
                                <div style="font-size:0.69rem; color:#475569;">Docents assenyalen la importància de consolidar hàbits de lectura i estudi autònom.</div>
                            </div>
                            <div style="font-size:0.71rem; color:#047857; font-weight:700; margin-top:4px;">
                                🌐 L'algorisme et mostra totes dues posicions perquè puguis formar el teu propi criteri.
                            </div>
                        </div>

                        <div style="margin-top:auto; background:#dcfce7; border-radius:8px; padding:8px; font-size:0.72rem; color:#166534; text-align:center;">
                            🛡️ <strong>Pluralisme Algorítmic:</strong> No aïllar l'alumnat en cambres d'eco; oferir perspectives contrastades per fomentar el pensament crític.
                        </div>
                    `;
                } else if (currentTab === 4) {
                    // TAB 4: COMERÇ NET & SENSE PATRONS FOSCOS
                    screenBody.innerHTML = `
                        <div class="phone-post-card">
                            <div class="phone-post-author">
                                <span class="phone-avatar" style="background:#10b981;">🛍️</span>
                                <div>
                                    <div style="font-size:0.75rem; color:#0f172a; font-weight:700;">@botiga_transparent</div>
                                    <div style="font-size:0.64rem; color:#059669;">Comerç Electrònic Ètic Certificat</div>
                                </div>
                            </div>
                            <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:8px; margin-bottom:6px;">
                                <strong style="font-size:0.8rem; color:#166534;">Sabatilles Esportives Escolars</strong>
                                <div style="margin-top:4px; font-size:0.86rem; font-weight:800; color:#0f172a;">
                                    49,90 € <span style="font-size:0.68rem; color:#059669; font-weight:600;">(Preu fix transparent i garantit)</span>
                                </div>
                            </div>
                            <div style="font-size:0.72rem; color:#334155; line-height:1.45; margin-bottom:6px;">
                                🔒 <strong>Garanties de protecció de consum:</strong><br>
                                • Sense falsos comptes enrere d'urgència.<br>
                                • Sense preus dinàmics manipulats segons la teva atenció.<br>
                                • Sense subscripcions VIP amagades a la lletra petita.
                            </div>
                            <div style="background:#059669; color:white; font-size:0.74rem; font-weight:700; text-align:center; padding:7px; border-radius:6px;">
                                Compra Segura i Sense Subscripcions Trampa
                            </div>
                        </div>

                        <div style="margin-top:auto; background:#dcfce7; border-radius:8px; padding:8px; font-size:0.72rem; color:#166534; text-align:center;">
                            🛡️ <strong>Drets del Consumidor:</strong> Prohibits els patrons foscos de pressió i la publicitat que explota la immaduresa de menors.
                        </div>
                    `;
                } else if (currentTab === 5) {
                    // TAB 5: AMICS REALS & FEED CRONOLÒGIC NET
                    screenBody.innerHTML = `
                        <div class="phone-post-card">
                            <div class="phone-post-author">
                                <span class="phone-avatar" style="background:#10b981;">🌿</span>
                                <div>
                                    <div style="font-size:0.75rem; color:#0f172a; font-weight:700;">@laura_muntanya (Amiga real)</div>
                                    <div style="font-size:0.65rem; color:#64748b;">Publicat fa 32 min · Cronològic</div>
                                </div>
                            </div>
                            <p style="margin:0 0 6px; font-size:0.78rem; color:#334155;">
                                "Sortida de diumenge pel bosc amb la colla del barri 🌲🌳"
                            </p>
                            <div style="font-size:0.7rem; color:#64748b;">
                                💚 24 m'agrada dels teus amics reals
                            </div>
                        </div>

                        <div class="phone-post-card">
                            <div class="phone-post-author">
                                <span class="phone-avatar" style="background:#6366f1;">🏀</span>
                                <div>
                                    <div style="font-size:0.75rem; color:#0f172a; font-weight:700;">@marc_esport (Company de classe)</div>
                                    <div style="font-size:0.65rem; color:#64748b;">Publicat fa 1 hora · Cronològic</div>
                                </div>
                            </div>
                            <p style="margin:0; font-size:0.78rem; color:#334155;">
                                "Partit guanyat! Demà ens veiem a classe."
                            </p>
                        </div>

                        <div style="margin-top:auto; background:#dcfce7; border-radius:8px; padding:8px; font-size:0.72rem; color:#166534; text-align:center;">
                            🛡️ <strong>Feed Cronològic Net:</strong> Sense algoritmes que amplifiquin la ràbia o prioritzen desconeguts per captar atenció.
                        </div>
                    `;
                }
            }
        }

        function switchAlgoModel(mode) {
            appState.algoMode = mode;
            appState.algoPhoneScreen = 1;
            appState.manipulationExplored = true;
            saveState();
            if (typeof updateStage4ProgressStatus === 'function') {
                updateStage4ProgressStatus();
            }

            const btnManip = document.getElementById('btn-algo-manip');
            const btnEthic = document.getElementById('btn-algo-ethical');
            const panel = document.getElementById('algo-sim-panel');
            if (!panel) return;

            if (mode === 'manipulative') {
                if (btnManip) btnManip.className = 'sim-toggle-btn active-danger';
                if (btnEthic) btnEthic.className = 'sim-toggle-btn';

                panel.style.background = '#fff1f2';
                panel.style.borderColor = '#fecdd3';
                panel.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
                        <div style="display:flex; align-items:center; gap:0.5rem;">
                            <span style="font-size:1.4rem;">🚨</span>
                            <h4 style="margin:0; font-size:1.05rem; color:#991b1b;">Simulador de Mòbil: Algorisme de Manipulació i Retenció Extrema</h4>
                        </div>
                        <span class="badge-pill badge-pill-rose">Optimitzat per a Screen Time</span>
                    </div>

                    <div class="phone-mockup-wrapper">
                        <!-- TELÈFON MÒBIL SIMULAT -->
                        <div class="phone-mockup">
                            <div class="phone-screen">
                                <!-- STATUS BAR -->
                                <div class="phone-status-bar">
                                    <span>01:47 🌙</span>
                                    <div class="phone-notch"></div>
                                    <span>4G 🔋 14%</span>
                                </div>
                                <!-- NAV TABS (6 PANTALLES) -->
                                <div class="phone-nav-tabs">
                                    <button type="button" class="phone-tab-btn active" data-screen="1" onclick="switchAlgoPhoneScreen(1)">🚨 FOMO</button>
                                    <button type="button" class="phone-tab-btn" data-screen="2" onclick="switchAlgoPhoneScreen(2)">🎭 Deepfakes</button>
                                    <button type="button" class="phone-tab-btn" data-screen="3" onclick="switchAlgoPhoneScreen(3)">🧱 Bombolla</button>
                                    <button type="button" class="phone-tab-btn" data-screen="4" onclick="switchAlgoPhoneScreen(4)">🔥 Ragebait</button>
                                    <button type="button" class="phone-tab-btn" data-screen="5" onclick="switchAlgoPhoneScreen(5)">💳 Compres</button>
                                    <button type="button" class="phone-tab-btn" data-screen="6" onclick="switchAlgoPhoneScreen(6)">💄 Filtres</button>
                                </div>
                                <!-- SCREEN BODY -->
                                <div class="phone-screen-body" id="phone-screen-body"></div>
                                <!-- BOTTOM NAV -->
                                <div class="phone-bottom-nav">
                                    <button type="button" onclick="prevAlgoPhoneScreen()">◀️ Anterior</button>
                                    <span id="phone-screen-indicator" style="font-size:0.72rem; font-weight:700; color:#475569;">1 / 6</span>
                                    <button type="button" onclick="nextAlgoPhoneScreen()">Següent ▶️</button>
                                </div>
                            </div>
                        </div>

                        <!-- PANELL PEDAGÒGIC EXPLICATIU -->
                        <div class="phone-meta-explain">
                            <div>
                                <h4 style="margin:0 0 0.5rem; color:#991b1b; font-size:1rem;">⚙️ Com aprèn l'algorisme a manipular un adolescent?</h4>
                                <p style="font-size:0.84rem; color:var(--text-sub); line-height:1.5; margin-bottom:0.85rem;">
                                    El model no té emocions: <strong>només redueix la funció de pèrdua (Error)</strong> que li han programat. Si l'objectiu és facturar més publicitat mantenint l'adolescent connectat el màxim d'hores, aprèn per assaig i error quines tècniques psicològiques retenen millor l'atenció:
                                </p>

                                <div style="display:flex; flex-direction:column; gap:0.55rem; font-size:0.82rem;">
                                    <div class="phone-meta-card-clickable" onclick="switchAlgoPhoneScreen(1)" style="background:#fff1f2; border:1px solid #fecdd3; border-radius:6px; padding:0.6rem;">
                                        <div style="display:flex; justify-content:space-between; align-items:center;">
                                            <strong style="color:#991b1b;">1. Notificacions Nocturnes i FOMO</strong>
                                            <span style="font-size:0.7rem; color:#ef4444; font-weight:700;">👆 Veure</span>
                                        </div>
                                        <span style="color:#7f1d1d;">Genera por a perdre ratxes o comentaris d'amics de matinada per evitar que tanquis l'aplicació.</span>
                                    </div>
                                    <div class="phone-meta-card-clickable" onclick="switchAlgoPhoneScreen(2)" style="background:#fef2f2; border:1px solid #fecaca; border-radius:6px; padding:0.6rem;">
                                        <div style="display:flex; justify-content:space-between; align-items:center;">
                                            <strong style="color:#b91c1c;">2. Deepfakes i Continguts Sintètics</strong>
                                            <span style="font-size:0.7rem; color:#ef4444; font-weight:700;">👆 Veure</span>
                                        </div>
                                        <span style="color:#7f1d1d;">Premia vídeos i àudios falsos d'alt impacte perquè es comparteixen massivament abans de comprovar la veracitat.</span>
                                    </div>
                                    <div class="phone-meta-card-clickable" onclick="switchAlgoPhoneScreen(3)" style="background:#fff7ed; border:1px solid #fed7aa; border-radius:6px; padding:0.6rem;">
                                        <div style="display:flex; justify-content:space-between; align-items:center;">
                                            <strong style="color:#9a3412;">3. Ocultació d'Arguments i Cambres de Ressonància</strong>
                                            <span style="font-size:0.7rem; color:#f97316; font-weight:700;">👆 Veure</span>
                                        </div>
                                        <span style="color:#7c2d12;">Amaga opinions contràries i dades científiques per mantenir-te en una bombolla que reforça els teus prejudicis.</span>
                                    </div>
                                    <div class="phone-meta-card-clickable" onclick="switchAlgoPhoneScreen(4)" style="background:#fef2f2; border:1px solid #fed7aa; border-radius:6px; padding:0.6rem;">
                                        <div style="display:flex; justify-content:space-between; align-items:center;">
                                            <strong style="color:#9a3412;">4. Polarització per Ragebait</strong>
                                            <span style="font-size:0.7rem; color:#f97316; font-weight:700;">👆 Veure</span>
                                        </div>
                                        <span style="color:#7c2d12;">Prioritza opinions que provoquen ràbia i discussions agressives perquè multipliquen les interaccions.</span>
                                    </div>
                                    <div class="phone-meta-card-clickable" onclick="switchAlgoPhoneScreen(5)" style="background:#faf5ff; border:1px solid #e9d5ff; border-radius:6px; padding:0.6rem;">
                                        <div style="display:flex; justify-content:space-between; align-items:center;">
                                            <strong style="color:#6b21a8;">5. Patrons Foscos de Compra</strong>
                                            <span style="font-size:0.7rem; color:#a855f7; font-weight:700;">👆 Veure</span>
                                        </div>
                                        <span style="color:#581c87;">Falsos comptes enrere d'urgència, preus inflats dinàmicament segons l'atenció i subscripcions ocultes a la lletra petita.</span>
                                    </div>
                                    <div class="phone-meta-card-clickable" onclick="switchAlgoPhoneScreen(6)" style="background:#fdf2f8; border:1px solid #fbcfe8; border-radius:6px; padding:0.6rem;">
                                        <div style="display:flex; justify-content:space-between; align-items:center;">
                                            <strong style="color:#9d174d;">6. Filtres d'IA i Inseguretat Corporal</strong>
                                            <span style="font-size:0.7rem; color:#ec4899; font-weight:700;">👆 Veure</span>
                                        </div>
                                        <span style="color:#831843;">Distorsiona la imatge real per vendre tractaments i cosmètics aprofitant moments de baixa autoestima nocturna.</span>
                                    </div>
                                </div>
                            </div>

                            <div style="margin-top:1rem; padding-top:0.75rem; border-top:1px solid #e2e8f0; font-size:0.8rem; color:#64748b;">
                                💡 <em>Pots fer clic directament als botons del mòbil o a les targetes explicatives per analitzar cada manipulació.</em>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                if (btnManip) btnManip.className = 'sim-toggle-btn';
                if (btnEthic) btnEthic.className = 'sim-toggle-btn active-success';

                panel.style.background = '#f0fdf4';
                panel.style.borderColor = '#bbf7d0';
                panel.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
                        <div style="display:flex; align-items:center; gap:0.5rem;">
                            <span style="font-size:1.4rem;">🛡️</span>
                            <h4 style="margin:0; font-size:1.05rem; color:#166534;">Simulador de Mòbil: Algorisme Ètic i Benestar Digital (EU AI Act)</h4>
                        </div>
                        <span class="badge-pill badge-pill-emerald">Normativa Europea de Protecció</span>
                    </div>

                    <div class="phone-mockup-wrapper">
                        <!-- TELÈFON MÒBIL SIMULAT -->
                        <div class="phone-mockup" style="background:#064e3b; box-shadow:0 16px 36px rgba(6,78,59,0.25), 0 0 0 2px #059669;">
                            <div class="phone-screen">
                                <!-- STATUS BAR -->
                                <div class="phone-status-bar" style="background:#064e3b;">
                                    <span>17:30 ☀️</span>
                                    <div class="phone-notch"></div>
                                    <span>5G 🔋 85%</span>
                                </div>
                                <!-- NAV TABS (5 PANTALLES) -->
                                <div class="phone-nav-tabs" style="grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));">
                                    <button type="button" class="phone-tab-btn active ethical-tab" data-screen="1" onclick="switchAlgoPhoneScreen(1)">⏱️ Benestar</button>
                                    <button type="button" class="phone-tab-btn" data-screen="2" onclick="switchAlgoPhoneScreen(2)">🔍 Verificació</button>
                                    <button type="button" class="phone-tab-btn" data-screen="3" onclick="switchAlgoPhoneScreen(3)">🌐 Pluralitat</button>
                                    <button type="button" class="phone-tab-btn" data-screen="4" onclick="switchAlgoPhoneScreen(4)">🛍️ Comerç Net</button>
                                    <button type="button" class="phone-tab-btn" data-screen="5" onclick="switchAlgoPhoneScreen(5)">🤝 Amics Reals</button>
                                </div>
                                <!-- SCREEN BODY -->
                                <div class="phone-screen-body" id="phone-screen-body"></div>
                                <!-- BOTTOM NAV -->
                                <div class="phone-bottom-nav">
                                    <button type="button" onclick="prevAlgoPhoneScreen()">◀️ Anterior</button>
                                    <span id="phone-screen-indicator" style="font-size:0.72rem; font-weight:700; color:#047857;">1 / 5</span>
                                    <button type="button" onclick="nextAlgoPhoneScreen()">Següent ▶️</button>
                                </div>
                            </div>
                        </div>

                        <!-- PANELL PEDAGÒGIC EXPLICATIU -->
                        <div class="phone-meta-explain" style="background:#f0fdf4; border-color:#bbf7d0;">
                            <div>
                                <h4 style="margin:0 0 0.5rem; color:#166534; font-size:1rem;">🛡️ Com protegeix l'AI Act el benestar dels joves?</h4>
                                <p style="font-size:0.84rem; color:var(--text-sub); line-height:1.5; margin-bottom:0.85rem;">
                                    La llei europea prohibeix que les plataformes dissenyin algoritmes addictius que aprofitin la vulnerabilitat de menors d'edat. L'algorisme prioritza la salut física i mental en lloc de la retenció publicitària:
                                </p>

                                <div style="display:flex; flex-direction:column; gap:0.55rem; font-size:0.82rem;">
                                    <div class="phone-meta-card-clickable" onclick="switchAlgoPhoneScreen(1)" style="background:white; border:1px solid #bbf7d0; border-radius:6px; padding:0.6rem;">
                                        <div style="display:flex; justify-content:space-between; align-items:center;">
                                            <strong style="color:#166534;">1. Benestar Digital i Son Respectat</strong>
                                            <span style="font-size:0.7rem; color:#059669; font-weight:700;">👆 Veure</span>
                                        </div>
                                        <span style="color:#14532d;">Avisos amables de pausa als 30 minuts i silenciament nocturn automàtic per protegir el descans.</span>
                                    </div>
                                    <div class="phone-meta-card-clickable" onclick="switchAlgoPhoneScreen(2)" style="background:white; border:1px solid #bbf7d0; border-radius:6px; padding:0.6rem;">
                                        <div style="display:flex; justify-content:space-between; align-items:center;">
                                            <strong style="color:#166534;">2. Verificació i Alerta de Deepfakes</strong>
                                            <span style="font-size:0.7rem; color:#059669; font-weight:700;">👆 Veure</span>
                                        </div>
                                        <span style="color:#14532d;">Etiquetes obligatòries de contingut sintètic per advertir de veus clonades o manipulacions abans que es viralitzin.</span>
                                    </div>
                                    <div class="phone-meta-card-clickable" onclick="switchAlgoPhoneScreen(3)" style="background:white; border:1px solid #bbf7d0; border-radius:6px; padding:0.6rem;">
                                        <div style="display:flex; justify-content:space-between; align-items:center;">
                                            <strong style="color:#166534;">3. Pluralitat Informativa sense Bombolles</strong>
                                            <span style="font-size:0.7rem; color:#059669; font-weight:700;">👆 Veure</span>
                                        </div>
                                        <span style="color:#14532d;">Presenta punts de vista diversos i contrastats per trencar cambres de ressonància i enriquir el debat.</span>
                                    </div>
                                    <div class="phone-meta-card-clickable" onclick="switchAlgoPhoneScreen(4)" style="background:white; border:1px solid #bbf7d0; border-radius:6px; padding:0.6rem;">
                                        <div style="display:flex; justify-content:space-between; align-items:center;">
                                            <strong style="color:#166534;">4. Comerç Transparent sense Patrons Foscos</strong>
                                            <span style="font-size:0.7rem; color:#059669; font-weight:700;">👆 Veure</span>
                                        </div>
                                        <span style="color:#14532d;">Preus estables sense pujades artificials, absència de comptes enrere falsos i prohibició de subscripcions trampa.</span>
                                    </div>
                                    <div class="phone-meta-card-clickable" onclick="switchAlgoPhoneScreen(5)" style="background:white; border:1px solid #bbf7d0; border-radius:6px; padding:0.6rem;">
                                        <div style="display:flex; justify-content:space-between; align-items:center;">
                                            <strong style="color:#166534;">5. Feed Cronològic d'Amics Reals</strong>
                                            <span style="font-size:0.7rem; color:#059669; font-weight:700;">👆 Veure</span>
                                        </div>
                                        <span style="color:#14532d;">Prioritza les publicacions autèntiques del teu cercle d'amistats, sense bots de retenció ni amplificació de toxicitat.</span>
                                    </div>
                                </div>
                            </div>

                            <div style="margin-top:1rem; padding-top:0.75rem; border-top:1px solid #bbf7d0; font-size:0.8rem; color:#166534;">
                                💡 <em>Explora les 5 pantalles ètiques per comprovar la diferència de benestar i seguretat digital.</em>
                            </div>
                        </div>
                    </div>
                `;
            }

            renderAlgoPhoneContent();
        }

        function selectManipEmotion(emotion) {
            appState.manipEmotion = emotion;
            const hiddenInput = document.getElementById('manip-emotion-hidden');
            if (hiddenInput) hiddenInput.value = emotion;

            document.querySelectorAll('.emotion-selector-btn').forEach(btn => {
                if (btn.textContent.trim() === emotion) {
                    btn.classList.add('selected');
                } else {
                    btn.classList.remove('selected');
                }
            });

            saveState();
            if (typeof updateStage4ProgressStatus === 'function') {
                updateStage4ProgressStatus();
            }
        }

        function saveManipulationTeenFeeling() {
            const el = document.getElementById('manip-teen-feeling');
            const status = document.getElementById('manip-teen-feeling-status');
            if (el) {
                appState.manipTeenFeeling = el.value;
                saveState();
                if (status) {
                    status.style.display = 'block';
                    setTimeout(() => { status.style.display = 'none'; }, 2500);
                }
                if (typeof updateStage4ProgressStatus === 'function') {
                    updateStage4ProgressStatus();
                }
            }
        }

        function saveManipulationTeenExperience() {
            const el = document.getElementById('manip-teen-experience');
            const status = document.getElementById('manip-teen-exp-status');
            if (el) {
                appState.manipTeenExperience = el.value;
                saveState();
                if (status) {
                    status.style.display = 'block';
                    setTimeout(() => { status.style.display = 'none'; }, 2500);
                }
                if (typeof updateStage4ProgressStatus === 'function') {
                    updateStage4ProgressStatus();
                }
            }
        }

        function saveManipulationReflection() {
            const input = document.getElementById('manip-reflection');
            const status = document.getElementById('manip-reflection-status');
            if (input) {
                appState.manipulationReflection = input.value;
                saveState();
                if (status) {
                    status.style.display = 'block';
                    setTimeout(() => { status.style.display = 'none'; }, 2500);
                }
                if (typeof updateStage4ProgressStatus === 'function') {
                    updateStage4ProgressStatus();
                }
            }
        }

        function saveManipulationCriticalReflection() {
            const el = document.getElementById('manip-critical-reflection');
            const status = document.getElementById('manip-critical-status');
            if (el) {
                appState.manipCriticalReflection = el.value;
                saveState();
                if (status) {
                    status.style.display = 'block';
                    setTimeout(() => { status.style.display = 'none'; }, 2500);
                }
                if (typeof updateStage4ProgressStatus === 'function') {
                    updateStage4ProgressStatus();
                }
            }
        }

        function updateStage4ProgressStatus() {
            const statusEl = document.getElementById('stage5-progress-status');
            const nextBtn = document.getElementById('btn-complete-stage-5');
            if (!statusEl) return;

            const hallCount = Object.keys(appState.hallucinationsAnswered || {}).length;
            const algoExplored = !!appState.manipulationExplored;
            const testCount = Object.keys((appState.stageQuizAnswers && appState.stageQuizAnswers[5]) || {}).length;
            const feelingWords = countWords((document.getElementById('manip-teen-feeling')?.value || appState.manipTeenFeeling || '').trim());
            const expWords = countWords((document.getElementById('manip-teen-experience')?.value || appState.manipTeenExperience || '').trim());
            const manipWords = countWords((document.getElementById('manip-reflection')?.value || appState.manipulationReflection || '').trim());
            const critWords = countWords((document.getElementById('manip-critical-reflection')?.value || appState.manipCriticalReflection || '').trim());
            const critBest = Math.max(critWords, manipWords);
            const refsOk = (feelingWords >= 5 && expWords >= 5 && critBest >= 5);

            const isReady = (hallCount >= 3 && algoExplored && testCount === 5 && refsOk);

            if (isReady) {
                statusEl.innerHTML = `<span style="color:#059669; font-weight:700;">✅ Fase 5 completada amb èxit!</span> 3 casos d'al·lucinació resolts, simulador mòbil explorat, test (5/5) i les 3 reflexions crítiques completades. Ja pots avançar a la Fase 6: L'Art dels Prompts!`;
                if (nextBtn) {
                    nextBtn.className = "btn btn-success";
                    nextBtn.style.opacity = "1";
                    nextBtn.style.cursor = "pointer";
                }
            } else {
                statusEl.innerHTML = `⏳ <strong>Progrés d'Ètica i Manipulació:</strong> Al·lucinacions: (${hallCount}/3) · Mòbil explorat: ${algoExplored ? '✅' : '❌'} · Test Bloc 5: (${testCount}/5) · Emoció: ${feelingWords >= 5 ? '✅' : `❌ (${feelingWords}/5)`} · Xarxes: ${expWords >= 5 ? '✅' : `❌ (${expWords}/5)`} · Verificació/Protecció: ${critBest >= 5 ? '✅' : `❌ (${critBest}/5)`}.`;
                if (nextBtn) {
                    nextBtn.className = "btn btn-secondary";
                    nextBtn.style.opacity = "0.7";
                }
            }
        }

        function restoreManipulationTask() {
            // Restore hallucinations feedback
            if (appState.hallucinationsAnswered) {
                [1, 2, 3].forEach(id => {
                    if (appState.hallucinationsAnswered[id] !== undefined) {
                        checkHallucinationCase(id, appState.hallucinationsAnswered[id] ? 'ok' : 'error');
                    }
                });
            }

            // Restore emotion selection
            if (appState.manipEmotion) {
                selectManipEmotion(appState.manipEmotion);
            }

            // Restore teen feeling
            const feelEl = document.getElementById('manip-teen-feeling');
            if (feelEl && appState.manipTeenFeeling) {
                feelEl.value = appState.manipTeenFeeling;
            }

            // Restore teen experience
            const expEl = document.getElementById('manip-teen-experience');
            if (expEl && appState.manipTeenExperience) {
                expEl.value = appState.manipTeenExperience;
            }

            // Restore protection reflection
            const input = document.getElementById('manip-reflection');
            if (input && appState.manipulationReflection) {
                input.value = appState.manipulationReflection;
            }

            // Restore critical reflection
            const crit = document.getElementById('manip-critical-reflection');
            if (crit && appState.manipCriticalReflection) {
                crit.value = appState.manipCriticalReflection;
            }

            switchAlgoModel(appState.algoMode || 'manipulative');
            if (typeof updateStage4ProgressStatus === 'function') {
                updateStage4ProgressStatus();
            }
        }
