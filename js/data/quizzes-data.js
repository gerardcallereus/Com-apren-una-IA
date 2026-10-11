// ==========================================
// DADES DELS TESTS PER BLOCS I FINAL
// ==========================================

        const stageQuizzesData = {
            1: [
                {
                    id: 1,
                    q: "Com aprèn i ajusta el seu coneixement una xarxa neuronal durant l'entrenament?",
                    opts: [
                        "Modificant línia per línia el codi font escrit pel programador cada vegada que s'equivoca.",
                        "Ajustant iterativament els pesos numèrics de les seves connexions per minimitzar l'error matemàtic (Loss).",
                        "Desant a la memòria una fotocòpia exacta de tots els píxels de les imatges que ha vist."
                    ],
                    correct: 1,
                    fb: "Molt bé! Les xarxes neuronals no reescriuen codi ni memoritzen fotos; calculen l'error i ajusten els pesos matemàtics (sinapsis) mitjançant el descens de gradient."
                },
                {
                    id: 2,
                    q: "Què mesura la 'funció de pèrdua' (Loss) en un model d'aprenentatge automàtic?",
                    opts: [
                        "El consum de bateria i memòria RAM de l'ordinador durant l'entrenament.",
                        "La diferència o discrepància matemàtica entre la predicció del model i el resultat correcte esperat.",
                        "El nombre de fotografies esborrades accidentalment del conjunt de dades."
                    ],
                    correct: 1,
                    fb: "Exacte! La Loss mesura com de lluny està el model de la resposta correcta. Durant l'entrenament, l'objectiu matemàtic és apropar la pèrdua el màxim possible a zero."
                },
                {
                    id: 3,
                    q: "Què és una 'època' (Epoch) en el cicle d'entrenament d'una IA?",
                    opts: [
                        "Un cicle complet en què el model analitza i aprèn de totes les mostres del conjunt d'entrenament una vegada.",
                        "El temps en anys que triga un equip d'enginyers a publicar un model a internet.",
                        "El nombre de categories o classes diferents que pot classificar el model."
                    ],
                    correct: 0,
                    fb: "Correcte! Una època és una passada completa per tot el conjunt de dades. Normalment calen diverses èpoques perquè el model ajusti els pesos de forma estable."
                },
                {
                    id: 4,
                    q: "Com reacciona el model davant d'un 'cas parany' (com l'ós panda en un classificador de només gossos i gats)?",
                    opts: [
                        "Detecta intel·ligentment que és un panda i crea una tercera classe nova per iniciativa pròpia.",
                        "S'atura i adverteix clarament que no disposa de coneixement sobre aquest animal.",
                        "Reparteix el 100% de la probabilitat entre les seves classes conegudes (ex: 60% Gos, 40% Gat) perquè no sap dir 'no ho sé'."
                    ],
                    correct: 2,
                    fb: "Importantíssim! La IA no té sentit comú ni consciència: és un classificador tancat que força una decisió probabilística entre les opcions que li han programat."
                },
                {
                    id: 5,
                    q: "Per què cal mantenir la supervisió humana ('Human in the Loop') en decisions crítiques d'IA?",
                    opts: [
                        "Perquè els models es basen en correlacions estadístiques i poden fallar greument davant dades imprevistes, casos límit o canvis d'entorn.",
                        "Perquè els ordinadors s'obliden automàticament de tot el que han après cada nit.",
                        "Perquè la tecnologia actual no permet que els models funcionin sense algú connectat per cable."
                    ],
                    correct: 0,
                    fb: "Brillant! Com que els models calculen patrons estadístics sense comprensió autèntica, en àmbits com salut, justícia o conducció la presència i criteri d'experts humans és vital."
                }
            ],
            2: [
                {
                    id: 1,
                    q: "Què és exactament un 'cas frontera' (edge case) en la recollida de dades per a una IA?",
                    opts: [
                        "Una imatge de baixa resolució que la memòria de l'ordinador no pot carregar.",
                        "Un exemple ambigu o limítrof on les regles no estan clarament definides i diferents humans apliquen criteris divergents (ex: triangle obert, cercle de mida relativa).",
                        "Qualsevol fotografia que conté exclusivament colors foscos o blanc i negre."
                    ],
                    correct: 1,
                    fb: "Molt bé! Els casos frontera són aquells exemples situats al límit de la definició (com un triangle no tancat o un cercle mitjà). Són la font número 1 de discrepàncies humanes."
                },
                {
                    id: 2,
                    q: "Quan dos grups etiqueten la mateixa imatge de forma oposada (un SÍ i l'altre NO), quin problema greu es produeix a la xarxa neuronal?",
                    opts: [
                        "La IA tria automàticament l'opció del grup que ha respost més de pressa.",
                        "Es genera soroll a les dades (Label Noise): la màquina rep ordres matemàtiques contradictòries per a imatges similars, impedint que aprengui un patró coherent.",
                        "El model aprèn el doble de ràpid perquè disposa del doble d'opinions diferents."
                    ],
                    correct: 1,
                    fb: "Exacte! La IA ajusta els pesos de les seves neurones per reduir l'error matemàtic. Si per al mateix patró visual li diem que és 'SÍ' i també que és 'NO', el gradient d'aprenentatge es cancel·la i aprèn soroll."
                },
                {
                    id: 3,
                    q: "En el món real, quina d'aquestes situacions és un risc greu causat per casos frontera no definits amb consens?",
                    opts: [
                        "Un vehicle autònom que no reconeix com a vianant una persona en cadira de rodes o amb un impermeable llarg perquè el dataset només tenia persones caminant dretes.",
                        "Que un telèfon mòbil consumeixi un 2% més de bateria en fer fotografies.",
                        "Que els altaveus del cotxe reprodueixin la música amb un to més agut."
                    ],
                    correct: 0,
                    fb: "Importantíssim! En aplicacions crítiques com cotxes autònoms o medicina (detecció de tumors en radiografies), els casos frontera sense un protocol unificat poden costar vides."
                },
                {
                    id: 4,
                    q: "Com solucionen els enginyers i científics de dades aquest dilema abans d'entrenar un model comercial?",
                    opts: [
                        "Deixant que cadascú etiqueti segons la seva opinió personal sense cap tipus de norma.",
                        "Redactant una Guia d'Anotació rigorosa (Labeling Guidelines) amb criteris quantitatius i mesurant l'Acord Inter-Anotador per consensuar o descartar casos dubtosos.",
                        "Eliminant el 90% de les fotografies de la base de dades per no complicar la feina."
                    ],
                    correct: 1,
                    fb: "Correcte! La ciència de dades professional utilitza protocols estrictes de definició (ex: mida mínima en píxels) i coeficients d'acord inter-anotador per assegurar la màxima coherència."
                },
                {
                    id: 5,
                    q: "Què és el 'biaix de representació' (Representation Bias) en un conjunt de dades d'entrenament?",
                    opts: [
                        "Quan determinats col·lectius, condicions o situacions estan infrarepresentats al dataset, fent que el model falli sistemàticament amb ells.",
                        "Quan les fotografies estan guardades en un format d'arxiu comprimit o antic.",
                        "Quan la pantalla de l'ordinador té poca brillantor per visualitzar els colors."
                    ],
                    correct: 0,
                    fb: "Molt bé! Si un dataset de reconeixement facial té un 85% de persones de pell clara, el model fallarà molt més amb persones de pell fosca perquè no ha tingut prou dades per aprendre."
                }
            ],
            3: [
                {
                    id: 1,
                    q: "Com processa una imatge una xarxa neuronal de visió per computador com la de Teachable Machine?",
                    opts: [
                        "Entén el concepte intel·lectual i la utilitat de l'objecte tal com ho fa un ésser humà.",
                        "Analitza matrius numèriques de píxels, extraient patrons geomètrics de colors, textures, contrastos i contorns.",
                        "Cerca automàticament a la Viquipèdia la descripció del producte mitjançant un lector òptic de textos."
                    ],
                    correct: 1,
                    fb: "Molt bé! Per a la IA una fotografia és una matriu de valors numèrics RGB. Extreu característiques visuals sense tenir consciència de la realitat física de l'objecte."
                },
                {
                    id: 2,
                    q: "Al Repte 2 de Teachable Machine, per què el model amb només 1 foto per classe falla en canviar el fons o l'angle?",
                    opts: [
                        "Perquè pateix sobreajust (overfitting): com que només té un exemple, memoritza el fons o la posició com si fossin part inseparable de l'objecte.",
                        "Perquè la càmera web es descalibra si l'objecte es col·loca en un angle superior a 45 graus.",
                        "Perquè el servidor de Google rebutja models que tinguin menys de 100 megabytes de codi."
                    ],
                    correct: 0,
                    fb: "Correcte! Amb només una captura, la màquina no pot distingir l'objecte del context (la paret, la mà o la taula), provocant que aprengui detalls irrellevants."
                },
                {
                    id: 3,
                    q: "Què aporta afegir 5 mostres variades per classe al Repte 3 (amb diferents fons, llums i inclinacions)?",
                    opts: [
                        "Només alenteix el navegador sense aportar cap benefici a la qualitat del model.",
                        "Ensenya a la IA a distingir quins elements varien (fons, llum) i quin patró roman constant, permetent que generalitzi amb èxit.",
                        "Fa que la IA aprengui a escriure frases gramaticals sobre cada objecte."
                    ],
                    correct: 1,
                    fb: "Molt bé! La variabilitat permet aïllar els trets essencials de l'objecte i descartar el fons com a element distintiu, fent el model molt més robust."
                },
                {
                    id: 4,
                    q: "Què passa si una classe té 50 mostres i una altra en té només 3 (Desequilibri de classes / Class Imbalance)?",
                    opts: [
                        "La IA aprèn igualment bé perquè compensa automàticament la quantitat de captures.",
                        "El model tindrà una tendència desproporcionada a predir sempre la classe majoritària, ja que matemàticament minimitza la pèrdua triant la més freqüent.",
                        "L'aplicació es bloqueja i obliga a esborrar totes les fotos preses fins al moment."
                    ],
                    correct: 1,
                    fb: "Exacte! El desequilibri de classes esbiaixa el model cap a la classe dominant, ignorant o predient amb molt poca fiabilitat la classe minoritària."
                },
                {
                    id: 5,
                    q: "Què significa que un model d'intel·ligència artificial 'generalitza bé'?",
                    opts: [
                        "Que és capaç de reconèixer i classificar correctament objectes o situacions noves que mai havia vist abans en el conjunt d'entrenament.",
                        "Que ha memoritzat exactament totes les imatges de laboratori amb una precisió del 100%.",
                        "Que és capaç de respondre preguntes en més de deu llengües estrangeres."
                    ],
                    correct: 0,
                    fb: "Brillant! Generalitzar és la veritable fita del Machine Learning: volem que el model sàpiga aplicar el patró après a la vida real i no només davant les dades d'assaig."
                }
            ],
            4: [
                {
                    id: 1,
                    q: "Què és una 'al·lucinació' en un model d'intel·ligència artificial generativa de text?",
                    opts: [
                        "Un error de connexió causat per la caiguda dels servidors al núvol.",
                        "Una afirmació falsa, inventada o inexacta que el model formula amb total seguretat perquè prediu seqüències de paraules probables i no fets verificats.",
                        "Quan la pantalla de l'ordinador mostra colors distorsionats durant la generació de text."
                    ],
                    correct: 1,
                    fb: "Molt bé! Els models de llenguatge no tenen accés a la veritat ontològica; encadenen paraules segons probabilitat estadística. Quan no disposen de dades exactes, inventen detalls plausibles."
                },
                {
                    id: 2,
                    q: "D'on sorgeixen els biaixos i prejudicis que pot manifestar una IA?",
                    opts: [
                        "Són creats directament pels xips electrònics en assolir altes temperatures.",
                        "Dels biaixos, prejudicis històrics i desigualtats presents en els textos i dades de la societat amb què ha estat entrenada la màquina.",
                        "Les IAs desenvolupen consciència pròpia i sentiments d'animadversió cap a determinats grups."
                    ],
                    correct: 1,
                    fb: "Exacte! La IA reflecteix la societat i les dades amb què aprèn. Si el contingut humà conté estereotips o discriminació, el model aprendrà a reproduir aquests mateixos biaixos."
                },
                {
                    id: 3,
                    q: "Quin és l'objectiu principal dels algorismes de retenció en xarxes socials (com TikTok, Instagram o YouTube)?",
                    opts: [
                        "Maximitzar el temps de pantalla (Engagement) per mostrar més anuncis, prioritzant sovint el contingut emocionalment extrem, la polèmica o la comparació estètica.",
                        "Fomentar que els joves tanquin el mòbil i dormin vuit hores diàries.",
                        "Assegurar una distribució equitativa de lectures de llibres científics."
                    ],
                    correct: 0,
                    fb: "Molt cert! La mètrica clau és l'atenció i el temps de retenció. Les emocions intenses (indignació, por a perdre's quelcom o FOMO) generen més clics i fan que l'algorisme les amplifiqui."
                },
                {
                    id: 4,
                    q: "Què és un 'Deepfake' i quin perill comporta per a la convivència democràtica?",
                    opts: [
                        "Un filtre que millora la resolució d'imatges submarines antigues.",
                        "Un contingut multimèdia sintètic generat amb IA on es clona la veu o el rostre d'algú fent-li dir o fer coses mai ocorregudes, facilitant estafes i desinformació massiva.",
                        "Un document PDF protegit amb una contrasenya de seguretat."
                    ],
                    correct: 1,
                    fb: "Molt bé! Els deepfakes representen una amenaça greu perquè erosionen la confiança ciutadana, faciliten la suplantació d'identitat i permeten crear enganys molt difícils de detectar a simple vista."
                },
                {
                    id: 5,
                    q: "Com actua la Unió Europea davant aquests riscos amb la Llei d'IA (EU AI Act)?",
                    opts: [
                        "Classifica les aplicacions d'IA per nivell de risc, prohibint la manipulació subliminar i la puntuació social (social scoring), i regulant els sistemes d'alt risc.",
                        "Prohibeix qualsevol ús de la intel·ligència artificial i de la informàtica a tot Europa.",
                        "Deixa que les grans corporacions tecnològiques s'autoregulin sense cap tipus d'inspecció pública."
                    ],
                    correct: 0,
                    fb: "Exacte! L'EU AI Act és pionera a escala global: estableix línies vermelles ètiques infranquejables i exigeix transparència i control humà per protegir els drets fonamentals."
                }
            ],
            5: [
                {
                    id: 1,
                    q: "Què és un 'Prompt' en el camp de la Intel·ligència Artificial generativa?",
                    opts: [
                        "El nom de la targeta gràfica que processa els càlculs a l'ordinador.",
                        "La instrucció, pregunta o conjunt d'indicacions en llenguatge humà que donem a la IA per dirigir la seva tasca.",
                        "La taxa de descàrrega de dades mesurada en gigabytes per segon."
                    ],
                    correct: 1,
                    fb: "Molt bé! El prompt és l'encàrrec o ordre que orienta la generació del model. Com millor formulat estigui, més precisa i útil serà la resposta obtinguda."
                },
                {
                    id: 2,
                    q: "Segons la Matriu 2x2 d'Eficàcia, què ocorre quan usem un prompt de Baixa Tasca i Baix Context (Quadrant 1)?",
                    opts: [
                        "La IA respon amb dades contrastades, anàlisi crítica i format impecable.",
                        "La IA dona respostes genèriques i superficials, augmentant enormement el risc d'al·lucinació o informació inventada.",
                        "El programa detecta immediatament que cal redactar un assaig universitari d'alta qualitat."
                    ],
                    correct: 1,
                    fb: "Exacte! Si donem instruccions vagues ('Fes un treball de la Guerra Civil'), la IA omple els buits d'informació amb tòpics o invencions."
                },
                {
                    id: 3,
                    q: "Quins són els 4 components indispensables de la nostra unitat per redactar un prompt complet i professional?",
                    opts: [
                        "Objectiu (tasca precisa), Context (públic i rol), Format (estructura de resposta) i Límits (restriccions negatives).",
                        "Nom, cognom, data de naixement i contrasenya de l'estudiant.",
                        "Títol en majúscules, 3 emojis obligatoris, hashtag i un enllaç a xarxes socials."
                    ],
                    correct: 0,
                    fb: "Brillant! Aquests 4 components (Objectiu, Context, Format i Límits) guien les neurones del model d'una manera inequívoca cap a la màxima qualitat."
                },
                {
                    id: 4,
                    q: "Per què és crucial incloure 'Límits i Restriccions negatives' (què NO ha de fer la IA)?",
                    opts: [
                        "Perquè acota l'espai de respostes possibles, evitant que la IA s'allargui innecessàriament, inventi dades o utilitzi un registre inadequat.",
                        "Perquè els models d'intel·ligència artificial consumeixen el doble d'energia si no els posem restriccions.",
                        "Perquè la màquina s'enfada si no li indiquem quines paraules té prohibides."
                    ],
                    correct: 0,
                    fb: "Molt bé! Establir límits clars (ex: 'no inventis fets si no els coneixes', 'màxim 150 paraules', 'no facis servir frases fetes') és la millor eina per frenar les al·lucinacions."
                },
                {
                    id: 5,
                    q: "Què és el 'Meta-prompting' o contrast crític de respostes i per què és un bon mètode d'estudi?",
                    opts: [
                        "Copiar la primera resposta que dona la IA directament a l'entrega escolar sense llegir-la.",
                        "Formular preguntes de repunt demanant a la IA que citi les fonts, exposi punts de vista contraposats o revisi les seves pròpies conclusions.",
                        "Obrir cinc pestanyes del mateix cercador web alhora."
                    ],
                    correct: 1,
                    fb: "Fantàstic! El meta-prompting i la repregunta crítica transformen la IA en una eina d'aprenentatge actiu i qüestionament socràtic, en lloc d'un simple mecanisme de 'copiar i enganxar'."
                }
            ]
        };

const repte1QuizData = stageQuizzesData[2]; // Compatibilitat retroactiva

        const quizQuestions = [
            {
                id: 1,
                block: 1,
                q: "1. Què és el 'contingut sintètic' generat per una IA?",
                opts: [
                    "Una còpia exacta piratejada d'un document original existent a internet.",
                    "Contingut nou (text, so, imatge) construït combinant patrons apresos durant l'entrenament.",
                    "Un arxiu informàtic sintètic comprimit que redueix l'espai de memòria del disc dur.",
                    "Dades numèriques en brut sense processar per cap algorisme."
                ],
                correct: 1,
                fb: "Correcte! El contingut sintètic és una producció nova que el model genera unint patrons estadístics que ha après."
            },
            {
                id: 2,
                block: 1,
                q: "2. Quins són els 4 passos ordenats del procés d'entrenament d'una IA?",
                opts: [
                    "1. Programar regles, 2. Executar, 3. Reiniciar, 4. Concloure.",
                    "1. Recull d'exemples, 2. Aprenentatge de patrons, 3. Ajust per reduir errors, 4. Predicció / generació.",
                    "1. Preguntar a Google, 2. Filtrar webs, 3. Escriure prompt, 4. Imprimir.",
                    "1. Comprar memòria RAM, 2. Capturar vídeo, 3. Fer servir càmera web, 4. Pujar al núvol."
                ],
                correct: 1,
                fb: "Exacte! Primer calen exemples (dades), després buscar patrons, ajustar els pesos per reduir errors i finalment predir."
            },
            {
                id: 3,
                block: 2,
                q: "3. Què significa el terme 'Human in the loop'?",
                opts: [
                    "Que els robots han substituït completament tots els treballadors humans.",
                    "Que les persones intervenen etiquetant dades, revisant exemples i millorant els models d'IA.",
                    "Que una persona està atrapada en un bucle infinit de programació.",
                    "Un sistema de protecció per impedir que els nens utilitzin tauletes."
                ],
                correct: 1,
                fb: "Molt bé! La intervenció humana és indispensable per proporcionar criteris i supervisar les fallades de la IA."
            },
            {
                id: 4,
                block: 2,
                q: "4. Quina funció didàctica tenen els sistemes CAPTCHA?",
                opts: [
                    "Comprovar exclusivament la velocitat de connexió de la fibra òptica.",
                    "A més de frenar els bots, aprofiten la resolució humana per etiquetar dades massivament per entrenar IAs.",
                    "Eliminar virus i arxius maliciosos del navegador de l'usuari.",
                    "Obligar l'usuari a pagar una subscripció abans de descarregar."
                ],
                correct: 1,
                fb: "Correcte! Cada vegada que marques passos de vianants o semàfors estàs generant dades etiquetades per a models de visió artificial."
            },
            {
                id: 5,
                block: 3,
                q: "5. Al Repte 2, per què el model de Teachable Machine fallava quan canviàvem el fons?",
                opts: [
                    "Perquè la càmera de l'ordinador es va espatllar.",
                    "Perquè amb només 1 mostra per classe, el model va associar el fons com a part de l'objecte en lloc d'aprendre l'objecte en si.",
                    "Perquè Google Teachable Machine no admet reconeixement de retoladors.",
                    "Perquè cal pagar una llicència per poder canviar el color de les carpetes."
                ],
                correct: 1,
                fb: "Exacte! Amb dades insuficients, la màquina memoritza patrons irrellevants com el color de la taula o de la paret de fons."
            },
            {
                id: 6,
                block: 3,
                q: "6. Com vam solucionar les fallades del model al Repte 3?",
                opts: [
                    "Canviant d'eina i fent servir un programa de disseny gràfic.",
                    "Afegint més mostres (5 per classe) amb varietat d'angles, inclinacions i fons diferents.",
                    "Eliminant dues categories per deixar només una classe.",
                    "Posant un adhesiu negre a la lent de la webcam."
                ],
                correct: 1,
                fb: "Molt bé! La varietat i quantitat de dades és el factor determinant per fer un model robust i fiable."
            },
            {
                id: 7,
                block: 4,
                q: "7. Què és una 'al·lucinació' en el context de la IA generativa?",
                opts: [
                    "Quan l'ordinador s'escalfa tant que emet fum i fa olor de cremat.",
                    "Quan el model genera informació completament falsa o inventada però redactada amb un to molt convincent.",
                    "Un filtre gràfic que canvia els colors d'una imatge a tons psicodèlics.",
                    "Quan la pantalla s'apaga sobtadament per estalviar bateria."
                ],
                correct: 1,
                fb: "Correcte! Les al·lucinacions són afirmacions falses o dades inventades que sonen totalment plausibles i segures."
            },
            {
                id: 8,
                block: 4,
                q: "8. Per què una IA pot reproduir estereotips i biaixos socials?",
                opts: [
                    "Perquè la màquina té ideologia pròpia i sentiments d'odi.",
                    "Perquè aprèn dels textos i imatges històrics de la societat, que sovint contenen aquests mateixos biaixos.",
                    "Perquè s'ha infectat amb un virus informàtic.",
                    "Perquè els cables de xarxa estan connectats a l'inrevés."
                ],
                correct: 1,
                fb: "Molt bé! Els biaixos provenen de les dades amb què ha estat alimentada: la IA no jutja, només reflecteix les dades que té."
            },
            {
                id: 9,
                block: 5,
                q: "9. Quins són els 4 components indispensables d'un bon prompt?",
                opts: [
                    "1. Salutació, 2. Firma, 3. Data, 4. Arxiu adjunt.",
                    "1. Objectiu clar, 2. Context/Públic, 3. Format/Extensió, 4. Límits/Restriccions.",
                    "1. Contrasenya, 2. Nom d'usuari, 3. IP, 4. Correu electrònic.",
                    "1. Una sola paraula curta, 2. Majúscules, 3. Signes d'exclamació, 4. Repetició."
                ],
                correct: 1,
                fb: "Impecable! Objectiu, context, format i límits són la fórmula clau per obtenir respostes útils i sense desviacions."
            },
            {
                id: 10,
                block: 5,
                q: "10. Quina ha de ser l'actitud correcta de l'alumnat davant la informació d'una IA?",
                opts: [
                    "Confiar cegament perquè els ordinadors mai no s'equivoquen.",
                    "Aplicar esperit crític, contrastar amb fonts fiables i verificar les afirmacions abans d'utilitzar-les.",
                    "Copiar i enganxar directament els treballs sense llegir-los.",
                    "Prohibir l'ús de qualsevol tecnologia a l'escola per sempre més."
                ],
                correct: 1,
                fb: "Absolutament! La IA és una eina de suport extraordinària, però el pensament crític humà és insubstituïble!"
            }
        ];

