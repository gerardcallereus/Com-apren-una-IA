// ==========================================
// DADES DELS TESTS PER BLOCS I FINAL
// Adaptat per a 1r-3r d'ESO (12-15 anys)
// ==========================================

const stageQuizzesData = {
    1: [
        {
            id: 1,
            q: "Com aprèn una IA durant l'entrenament?",
            opts: [
                "Modificant línia per línia el codi font escrit pel programador cada cop que s'equivoca.",
                "Mirant molts exemples, provant prediccions i corregint els seus errors pas a pas fins a encertar.",
                "Desant una fotocòpia exacta de tots els píxels a la memòria de l'ordinador."
            ],
            correct: 1,
            fb: "Molt bé! La IA no memoritza fotos ni reescriu codi: aprèn per assaig i error, ajustant les seves connexions internes cada vegada que s'equivoca."
        },
        {
            id: 2,
            q: "Què indica la 'Pèrdua' (Loss) en un entrenament?",
            opts: [
                "La quantitat de bateria o memòria que gasta l'ordinador mentre pensa.",
                "El comptador d'errors: com més baixa és la pèrdua, menys s'equivoca la màquina.",
                "El nombre de fotos que s'han esborrat del disc dur sense voler."
            ],
            correct: 1,
            fb: "Exacte! La pèrdua mesura com de lluny està la IA d'encertar. L'objectiu és que baixi el màxim possible fins a apropar-se a zero!"
        },
        {
            id: 3,
            q: "Què és una 'època' (Epoch) en l'entrenament?",
            opts: [
                "Una ronda sencera en què la IA repassa tots els exemples de la col·lecció un cop.",
                "El temps en anys que triguen els científics a crear un programa intel·ligent.",
                "La quantitat de carpetes diferents que té el disc dur."
            ],
            correct: 0,
            fb: "Correcte! Una època és una passada completa per totes les fotos. Normalment calen diverses rondes perquè la IA aprengui bé els patrons."
        },
        {
            id: 4,
            q: "Com reacciona el model davant d'un 'cas parany' (com l'ós panda si només coneix gossos i gats)?",
            opts: [
                "S'adona que és un panda i crea una categoria nova ell sol.",
                "S'atura i diu clarament amb un missatge: 'No sé què és aquest animal'.",
                "Es veu obligat a triar entre gos o gat i reparteix els percentatges, perquè no sap dir 'no ho sé'."
            ],
            correct: 2,
            fb: "Molt important! La IA no té sentit comú: està obligada a triar entre les opcions que li hem donat, encara que cap de les dues sigui la correcta!"
        },
        {
            id: 5,
            q: "Per què cal que sempre hi hagi persones supervisant la IA (Human in the loop)?",
            opts: [
                "Perquè la IA no comprèn el món real i pot cometre errors greus davant de situacions noves o estranyes.",
                "Perquè els ordinadors s'obliden de tot el que han après si no estan endollats a una persona.",
                "Perquè la llei prohibeix que els ordinadors funcionin sense vigilància."
            ],
            correct: 0,
            fb: "Molt bé! La IA busca patrons però no entén què està fent. Per això en temes seriosos com la salut o la seguretat cal sempre la supervisió d'un humà."
        }
    ],
    2: [
        {
            id: 1,
            q: "Per a què serveixen els CAPTCHA a més d'aturar robots?",
            opts: [
                "Per mesurar la velocitat de connexió de la teva xarxa wifi.",
                "Per aprofitar que milions de persones resolguin fotos dubtoses i així aconseguir dades etiquetades per entrenar IAs.",
                "Per esborrar arxius perillosos o virus del navegador."
            ],
            correct: 1,
            fb: "Exacte! Cada cop que marques passos de vianants o semàfors, estàs ajudant a ensenyar a IAs com les dels cotxes autònoms!"
        },
        {
            id: 2,
            q: "Què és un 'cas frontera o dubtós' en les dades?",
            opts: [
                "Una imatge poc clara (borrosa, tallada o amb ombres) on diferents persones poden opinar coses diferents.",
                "Una foto que s'ha fet just al límit de la frontera entre dos països.",
                "Un arxiu que pesa massa i no cap a la pantalla de l'ordinador."
            ],
            correct: 0,
            fb: "Correcte! Les situacions que no són blanques o negres creen dubtes entre les persones i són les més difícils d'aprendre per a una màquina."
        },
        {
            id: 3,
            q: "Per què pot ser perillós no posar-se d'acord en com etiquetem els casos dubtosos?",
            opts: [
                "Perquè l'ordinador es pot reiniciar sol i perdre els fitxers de text.",
                "Perquè si entrenem un cotxe autònom o una IA d'un hospital amb dades contradictòries, la màquina pot prendre decisions perilloses.",
                "Perquè els altaveus del cotxe sonaran amb menys volum."
            ],
            correct: 1,
            fb: "Molt important! Si ensenyem a una IA amb dades mal etiquetades o contradictòries, aprendrà malament i pot fallar quan més la necessitem."
        },
        {
            id: 4,
            q: "Com resolen aquests dubtes els equips que creen IAs abans de posar-se a entrenar-les?",
            opts: [
                "Deixant que cadascú faci el que vulgui sense cap criteri comú.",
                "Establint regles clares i compartides sobre què s'ha de marcar i què s'ha de descartar.",
                "Esborrant gairebé totes les fotos per no haver de pensar."
            ],
            correct: 1,
            fb: "Molt bé! Tenir regles clares i compartides és bàsic perquè tothom etiqueti amb el mateix criteri i les dades siguin fiables."
        },
        {
            id: 5,
            q: "Què és el 'biaix a les dades'?",
            opts: [
                "Quan a la col·lecció d'exemples falten fotos d'un grup de persones o situacions, fent que la IA falli més sovint amb ells.",
                "Quan les fotografies estan en blanc i negre en lloc de ser en color.",
                "Quan la pantalla de l'ordinador té poca brillantor per veure els detalls."
            ],
            correct: 0,
            fb: "Exacte! Si a una IA de reconeixement facial només li ensenyes fotos d'un tipus de persona, després fallarà amb la resta perquè mai n'ha vist suficients!"
        }
    ],
    3: [
        {
            id: 1,
            q: "Quina diferència clau hi ha entre la reacció d'un conductor humà i la d'un cotxe autònom davant d'un accident?",
            opts: [
                "L'humà reacciona per pur instint i reflexos en una fracció de segon, mentre que el cotxe autònom executa decisions que van ser calculades i programades prèviament per enginyers.",
                "El cotxe autònom mai no pot tenir cap accident perquè els ordinadors són 100% infal·libles.",
                "L'humà no sap frenar i el cotxe autònom frena sense necessitar rodes."
            ],
            correct: 0,
            fb: "Exacte! L'accident humà és fruit de l'atzar i l'instint, però en un cotxe autònom, qualsevol reacció ha estat decidida i programada abans en línies de codi!"
        },
        {
            id: 2,
            q: "Què és el 'Dilema del Tramvia' (Trolley Problem) aplicat a la Intel·ligència Artificial?",
            opts: [
                "Una situació tràgica inevitable on la màquina ha de triar matemàticament a qui salvar o sacrificar quan qualsevol opció provoca danys.",
                "Un problema tècnic quan la bateria d'un vehicle elèctric s'esgota a la via del tren.",
                "Un programa per reservar bitllets de transport públic per internet."
            ],
            correct: 0,
            fb: "Molt bé! És el clàssic dilema ètic: si l'accident és inevitable i no hi ha cap sortida bona, quines vides ha de prioritzar l'algorisme?"
        },
        {
            id: 3,
            q: "Què va descobrir l'estudi global de la revista Nature sobre les decisions de la Moral Machine del MIT?",
            opts: [
                "Que totes les persones del planeta tenen exactament els mateixos valors morals i voten el mateix.",
                "Que hi ha grans diferències culturals: a Orient es prioritza salvar la gent gran, mentre que a Occident es protegeix abans els nens.",
                "Que la gent prefereix que els cotxes atropellin sempre el conductor abans que cap animal."
            ],
            correct: 1,
            fb: "Brillant! L'estudi de Nature amb més de 40 milions de respostes va demostrar que la moral no és universal: depèn de la cultura i la societat de cada país!"
        },
        {
            id: 4,
            q: "Si un cotxe autònom ha de triar entre atropellar vianants que creuen en vermell o desviar-se i ferir un vianant innocent en verd, quin és el conflicte ètic?",
            opts: [
                "Entre respectar les normes de trànsit (qui incompleix la llei assumeix el risc) o minimitzar el nombre total de ferits sense importar qui tenia la culpa.",
                "Que el semàfor consumeix massa energia elèctrica si canvia a vermell.",
                "Que la càmera del cotxe només reconeix persones que porten roba fosca."
            ],
            correct: 0,
            fb: "Molt bé! El dilema és si el cotxe ha de castigar qui trenca les normes o si ha de salvar vides innocents encara que els altres hagin comès una imprudència!"
        },
        {
            id: 5,
            q: "Si un cotxe autònom pren una decisió fatal i causa un accident mortal, per què no es pot 'condemnar' la IA?",
            opts: [
                "Perquè la IA és un programa d'ordinador sense consciència ni drets legals; la responsabilitat ha de recaure sempre en persones o empreses (fabricant, programador o propietari).",
                "Perquè la policia no té eines per desconnectar cotxes.",
                "Perquè qualsevol màquina té immunitat diplomàtica segons la llei internacional."
            ],
            correct: 0,
            fb: "Exacte! Un algoritme no es pot posar a la presó ni té moral pròpia: la responsabilitat ètica i jurídica sempre és de les persones humanes i les empreses que creen o utilitzen la tecnologia!"
        }
    ],
    4: [
        {
            id: 1,
            q: "Com mira una imatge una IA com Teachable Machine?",
            opts: [
                "Entén què és l'objecte i per a què serveix, igual que una persona.",
                "Reconeix patrons visuals als píxels, com ara colors, línies, formes i contrastos.",
                "Llegeix el nom de l'objecte buscant-lo directament a la Viquipèdia."
            ],
            correct: 1,
            fb: "Molt bé! La màquina no sap què és un bolígraf o una tisora: només distingeix colors, vores i contrastos als píxels de la càmera!"
        },
        {
            id: 2,
            q: "Per què fallava el model quan només li posàvem 1 foto per classe al Repte 2?",
            opts: [
                "Perquè es va aprendre el fons o la posició de memòria com si formessin part de l'objecte.",
                "Perquè la càmera de l'ordinador es va espatllar en moure-la.",
                "Perquè el programa no permet reconèixer coses que no siguin de color blau."
            ],
            correct: 0,
            fb: "Correcte! Si només li dones una foto, la IA es pensa que el color de la paret o com agafes l'objecte són part obligatòria de l'objecte!"
        },
        {
            id: 3,
            q: "Què aconseguim afegint 5 fotos variades per classe (amb llums, inclinacions i fons diferents) al Repte 3?",
            opts: [
                "Que la IA aprengui quins detalls canvien (el fons o la llum) i aprengui a fixar-se només en l'objecte real.",
                "Només fa que l'ordinador vagi més lent sense millorar res.",
                "Que la màquina aprengui a escriure frases sobre el que veu."
            ],
            correct: 0,
            fb: "Exacte! Com més varietat d'exemples veu la màquina, més fàcil li és descobrir què té d'especial l'objecte i no confondre's!"
        },
        {
            id: 4,
            q: "Què passa si entrenes una classe amb 50 fotos i una altra amb només 2 fotos?",
            opts: [
                "La IA aprèn igual de bé totes dues perquè és molt intel·ligent.",
                "La IA tendirà a endevinar quasi sempre la classe que té 50 fotos, perquè li és més fàcil encertar per quantitat.",
                "El programa es tanca i no et deixa continuar."
            ],
            correct: 1,
            fb: "Molt bé! Si una classe té molts més exemples que l'altra, la màquina es torna gandula i diu gairebé sempre la classe majoritària!"
        },
        {
            id: 5,
            q: "Què vol dir que un model d'IA 'ha après bé'?",
            opts: [
                "Que s'ha après de memòria exactament les fotos d'assaig sense fallar cap píxel.",
                "Que sap reconèixer objectes nous de la vida real que no sortien exactament igual a les fotos amb què va aprendre.",
                "Que és capaç de parlar en cinc idiomes diferents."
            ],
            correct: 1,
            fb: "Brillant! L'objectiu no és que memoritzi, sinó que sàpiga reconèixer l'objecte a la vida real encara que la llum o l'angle siguin nous!"
        }
    ],
    5: [
        {
            id: 1,
            q: "Què és una 'al·lucinació' d'una Intel·ligència Artificial generativa?",
            opts: [
                "Un tall de connexió quan es desconnecta el cable de xarxa.",
                "Quan la IA s'inventa dades, noms o respostes falses però les diu amb una seguretat total.",
                "Un filtre de colors que fa veure la pantalla borrosa."
            ],
            correct: 1,
            fb: "Exacte! Les IAs de text ajunten paraules que sonen bé juntes, però no saben si el que diuen és cert. Per això poden inventar-se fets amb total tranquil·litat!"
        },
        {
            id: 2,
            q: "D'on surten els prejudicis o estereotips que de vegades mostra una IA?",
            opts: [
                "Són idees pròpies que tenen els xips dels ordinadors quan s'escalfen.",
                "Dels textos i imatges d'internet amb què ha après, que reflecteixen els prejudicis de les persones que els van escriure.",
                "D'un virus informàtic que canvia les paraules."
            ],
            correct: 1,
            fb: "Molt bé! La IA és un mirall del que troba a internet: si les dades tenen prejudicis o desigualtats, la màquina els copiarà i els repetirà."
        },
        {
            id: 3,
            q: "Per què xarxes com TikTok o Instagram ens recomanen sovint vídeos polèmics o anuncis insistents?",
            opts: [
                "Perquè el seu objectiu és que estiguem enganxats a la pantalla com més temps millor per guanyar diners amb publicitat.",
                "Perquè volen que tanquem el mòbil d'hora per anar a dormir vuit hores.",
                "Perquè estan obligades per llei a ensenyar només vídeos de notícies serioses."
            ],
            correct: 0,
            fb: "Molt cert! L'algorisme prioritza allò que et manté mirant la pantalla: la polèmica, el xoc emocional o la comparació física generen moltes reaccions."
        },
        {
            id: 4,
            q: "Què és un 'Deepfake'?",
            opts: [
                "Un truc per fer que la bateria del telèfon duri més dies.",
                "Un vídeo, àudio o foto fals creat amb IA on es clona la cara o la veu d'algú fent-li dir o fer coses que mai han passat.",
                "Un tipus d'arxiu PDF que no es pot obrir sense contrasenya."
            ],
            correct: 1,
            fb: "Molt important! Els deepfakes poden ser molt perillosos perquè permeten suplantar la identitat d'algú, fer bromes pesades o escampar enganys difícils de detectar!"
        },
        {
            id: 5,
            q: "Com intenta protegir la Unió Europea a la gent jove davant dels riscos de la IA?",
            opts: [
                "Prohibint que la IA s'utilitzi per manipular persones, enganyar o fer trampes, i obligant a avisar si un contingut està fet per IA.",
                "Prohibint completament l'ús de telèfons mòbils i ordinadors a les escoles.",
                "Deixant que les grans empreses facin el que vulguin sense cap mena de control."
            ],
            correct: 0,
            fb: "Correcte! La llei europea d'IA posa línies vermelles per protegir la nostra seguretat, prohibint la manipulació i exigint que les eines siguin transparents."
        }
    ],
    6: [
        {
            id: 1,
            q: "Què és un 'Prompt'?",
            opts: [
                "El nom del processador que porta l'ordinador per dins.",
                "La pregunta, ordre o instrucció que escrivim a la IA perquè faci una feina.",
                "La velocitat amb què descarreguem un vídeo d'internet."
            ],
            correct: 1,
            fb: "Molt bé! El prompt és l'encàrrec que li dones a la IA. Com més clar i ben explicat estigui, millor serà el resultat que obtindràs!"
        },
        {
            id: 2,
            q: "Què passa si només li demanes a la IA una ordre vaga com 'Fes-me un resum de la Guerra Civil'?",
            opts: [
                "Donarà una resposta impecable amb les millors fonts històriques del món.",
                "Donarà una resposta molt genèrica i superficial, amb més risc d'inventar-se coses o cometre errors.",
                "La IA s'enfada i no respon a la pregunta."
            ],
            correct: 1,
            fb: "Exacte! Si li dones una instrucció pobra, la IA s'ho ha d'inventar tot sobre com presentar-ho i donarà un resultat que sovint no serveix per a classe."
        },
        {
            id: 3,
            q: "Quines 4 coses necessita un prompt ben fet?",
            opts: [
                "Objectiu (què vols), Context (per a qui és), Format (com ho presentes) i Límits (què NO vols que faci).",
                "El teu nom complet, la contrasenya del teu correu i el número de telèfon.",
                "Un títol en majúscules, cinc emojis i un enllaç de YouTube."
            ],
            correct: 0,
            fb: "Brillant! Aquestes 4 peces (Objectiu, Context, Format i Límits) són la clau per aconseguir exactament el que necessites!"
        },
        {
            id: 4,
            q: "Per què és molt útil posar 'Límits' (què NO vols que faci la IA)?",
            opts: [
                "Perquè evita que la IA s'enrotlli massa, que inventi fets si no els sap o que utilitzi paraules massa difícils.",
                "Perquè l'ordinador gasta el doble d'electricitat si no li poses límits.",
                "Perquè la IA no pot escriure més de cent lletres seguides."
            ],
            correct: 0,
            fb: "Molt bé! Dir-li què NO vols que faci (ex: 'no inventis dades', 'no superis 150 paraules', 'fes frases clares') és la millor manera d'evitar al·lucinacions!"
        },
        {
            id: 5,
            q: "Com hem de fer servir la IA per fer deures o estudiar?",
            opts: [
                "Copiant i enganxant la primera resposta directament al treball de classe sense llegir-la.",
                "Com un ajudant per entendre conceptes difícils o revisar textos, comprovant sempre la informació abans de donar-la per bona.",
                "Fent que la IA ens faci tots els exàmens mentre mirem vídeos al mòbil."
            ],
            correct: 1,
            fb: "Molt bé! La IA és com una calculadora: és una ajuda fantàstica per entendre coses, però l'esforç de pensar i comprovar les respostes ha de ser sempre teu!"
        }
    ]
};

const repte1QuizData = stageQuizzesData[2]; // Compatibilitat retroactiva

const quizQuestions = [
    {
        id: 1,
        block: 1,
        q: "1. Què fa la IA quan aprèn a partir d'exemples?",
        opts: [
            "Fa una còpia exacta de tots els arxius a la memòria.",
            "Busca patrons en les dades i aprèn a crear contingut nou combinant el que ha après.",
            "Esborra totes les fotos velles per deixar espai lliure."
        ],
        correct: 1,
        fb: "Correcte! La IA no copia arxius tal qual: aprèn patrons i genera respostes noves a partir del que ha vist!"
    },
    {
        id: 2,
        block: 1,
        q: "2. Quins són els 4 passos bàsics d'aprenentatge d'una IA?",
        opts: [
            "1. Escriure regles, 2. Executar, 3. Reiniciar l'ordinador, 4. Imprimir.",
            "1. Recollir exemples, 2. Buscar patrons, 3. Corregir errors entrenant, 4. Fer prediccions.",
            "1. Mirar un vídeo, 2. Buscar a Google, 3. Preguntar a un amic, 4. Desar."
        ],
        correct: 1,
        fb: "Molt bé! Primer calen exemples (dades), després buscar patrons, corregir els errors i finalment la màquina ja sap predir!"
    },
    {
        id: 3,
        block: 2,
        q: "3. Què vol dir 'Human in the loop' (persones supervisant la IA)?",
        opts: [
            "Que els robots faran totes les feines del món i no caldrà treballar.",
            "Que les persones intervenen etiquetant dades, revisant errors i supervisant que la IA no s'equivoqui.",
            "Que una persona està mirant la pantalla sense fer res."
        ],
        correct: 1,
        fb: "Exacte! El criteri humà és indispensable per ensenyar a les màquines i per evitar que cometin errors absurds o perillosos!"
    },
    {
        id: 4,
        block: 2,
        q: "4. Com ajudem a entrenar IAs quan resolem un CAPTCHA a internet?",
        opts: [
            "Comprovem si la connexió a internet és prou ràpida.",
            "Ajudem a etiquetar fotos de la vida real (semàfors, passos de vianants, bicis) que serviran per entrenar altres IAs.",
            "Netegem els virus del nostre ordinador."
        ],
        correct: 1,
        fb: "Molt bé! Cada vegada que marques semàfors o passos de vianants estàs ensenyant a IAs com les dels cotxes autònoms!"
    },
    {
        id: 5,
        block: 3,
        q: "5. Per què el dilema d'un cotxe autònom no és una reacció per instint humà?",
        opts: [
            "Perquè tota la conducta del vehicle davant d'un accident ha estat calculada i programada prèviament per enginyers.",
            "Perquè la IA no té càmeres ni sensors al sostre.",
            "Perquè el volant només gira si el conductor li dona una ordre amb la veu."
        ],
        correct: 0,
        fb: "Molt bé! A diferència de l'humà que reacciona per reflexos sobtats, el cotxe autònom executa un programa pensat i decidit abans en un despatx!"
    },
    {
        id: 6,
        block: 3,
        q: "6. Què va descobrir l'estudi global de la 'Moral Machine' publicat a Nature?",
        opts: [
            "Que no hi ha una moral universal: a Orient es prioritza salvar la gent gran, mentre que a Occident es protegeix abans els nens.",
            "Que tothom a la Terra està d'acord en quines decisions ha de prendre la màquina.",
            "Que els cotxes autònoms no haurien de circular mai per països amb carreteres estretes."
        ],
        correct: 0,
        fb: "Exacte! L'estudi del MIT amb milions de dades va revelar que els valors morals d'una IA depenen directament de la cultura del país on s'aplica!"
    },
    {
        id: 7,
        block: 4,
        q: "7. Al Repte 2 de Teachable Machine, per què fallava la càmera quan canviàvem el fons?",
        opts: [
            "Perquè la càmera web estava trencada.",
            "Perquè amb només 1 foto per objecte, la màquina es va aprendre el fons de memòria en comptes de fixar-se en l'objecte.",
            "Perquè el programa no sap reconèixer bolígrafs ni retoladors."
        ],
        correct: 1,
        fb: "Correcte! Si només poses una foto, la IA es pensa que el color de la taula o de la paret és part de l'objecte!"
    },
    {
        id: 8,
        block: 4,
        q: "8. Com vam solucionar les fallades del model al Repte 3?",
        opts: [
            "Fent servir un altre programa de dibuix.",
            "Afegint 5 fotos variades per classe, amb diferents angles, inclinacions i fons.",
            "Esborrant les categories per deixar només una sola classe."
        ],
        correct: 1,
        fb: "Molt bé! La varietat d'exemples és la clau perquè la IA aprengui què és de debò l'objecte i no es confongui amb el fons!"
    },
    {
        id: 9,
        block: 5,
        q: "9. Què és una 'al·lucinació' d'una Intel·ligència Artificial generativa?",
        opts: [
            "Quan l'ordinador s'escalfa tant que comença a sortir fum.",
            "Quan la màquina dona informació falsa o inventada però redactada amb un to molt segur i convincent.",
            "Un filtre que canvia els colors de la pantalla."
        ],
        correct: 1,
        fb: "Molt bé! Les al·lucinacions són invencions de la màquina que sonen totalment creïbles, per això cal comprovar sempre la informació!"
    },
    {
        id: 10,
        block: 5,
        q: "10. Per què una IA pot mostrar prejudicis o estereotips?",
        opts: [
            "Perquè la màquina té sentiments i odia determinats grups de persones.",
            "Perquè aprèn de dades i textos d'internet que contenen aquests mateixos prejudicis de la societat.",
            "Perquè un virus ha canviat les paraules del programa."
        ],
        correct: 1,
        fb: "Exacte! La IA no té opinions pròpies: només reflecteix les dades amb què ha après. Si les dades tenen biaixos, la màquina els repetirà!"
    },
    {
        id: 11,
        block: 6,
        q: "11. Quines 4 coses necessita un prompt complet per funcionar bé?",
        opts: [
            "1. Salutació, 2. La teva firma, 3. La data d'avui, 4. Un arxiu adjunt.",
            "1. Objectiu clar, 2. Context (per a qui és), 3. Format de resposta, 4. Límits (què evitar).",
            "1. Contrasenya, 2. Nom d'usuari, 3. Adreça IP, 4. Telèfon."
        ],
        correct: 1,
        fb: "Impecable! Objectiu, context, format i límits són la fórmula màgica per obtenir bones respostes!"
    },
    {
        id: 12,
        block: 6,
        q: "12. Quina és la millor manera d'utilitzar la IA quan estudiem?",
        opts: [
            "Confiar-hi a cegues perquè els ordinadors mai no s'equivoquen.",
            "Utilitzar-la amb esperit crític, comprovant sempre la informació i fent servir la màquina per aprendre, no per copiar.",
            "Copiar i enganxar directament els treballs sense llegir-los per acabar abans."
        ],
        correct: 1,
        fb: "Absolutament! La IA és una eina fantàstica per aprendre, però el pensament crític de les persones és insubstituïble!"
    }
];
