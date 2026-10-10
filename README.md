# 🧠 Com aprèn una IA? — Càpsula Didàctica Interactiva

Càpsula didàctica interactiva per a l'**Educació Secundària Obligatòria (ESO)**, dissenyada per a l'assignatura de **Tecnologia i Digitalització**.

L'objectiu principal és que l'alumnat comprengui els fonaments de la intel·ligència artificial: com aprenen els models mitjançant dades i ajust iteratiu d'errors, la importància de la intervenció humana (*Human in the Loop*), els riscos reals com el biaix i les al·lucinacions, i com formular encàrrecs precisos (*enginyeria de prompts*).

---

## 🌟 Característiques Principals

- **Estat i Persistència:** Registre d'equip, curs/grup, avatar i desat automàtic en temps real a localStorage (no es perden les dades en refrescar).
- **Format Interactiu per Fases:** 6 fases guiades d'aprenentatge.
- **Simulador de Visió per Computador (Fase 1):** Pipeline complet d'aprenentatge supervisat (gats vs gossos) amb fotografies reals d'alta definició, filtres de convolució interactius (Sobel, mapes de calor), entrenament iteratiu per èpoques i inferència amb casos frontera (*explicabilitat XAI*).
- **Repte 1 Oficial (Fase 2):** El CAPTCHA d'aula amb les 12 imatges oficials, temporitzador de 10 segons, panell de dades comparatives d'anotació humana i test d'autoavaluació sobre *edge cases* i *label noise*.
- **Teachable Machine de Google (Fase 3):** Guia pas a pas il·lustrada per entrenar models reals d'IA d'imatges i quadern de treball digital (Reptes 2 i 3).
- **Riscos, Biaixos i Prompts (Fase 4):** Joc de detecció d'al·lucinacions, matriu ètica d'avantatges i inconvenients, guia teòrica dels 4 components clau d'un prompt i laboratori pràctic obligatori contextualitzat en un treball d'Història sobre la **Guerra Civil Espanyola**.
- **Avaluació i Qüestionari Final (Fase 5):** 10 preguntes autoavaluatives amb retroacció pedagògica immediata i botons de selecció interactius molt visuals.
- **Diploma Oficial i Dossier Docent (Fase 6):**
  - **Diploma Oficial d'Aprofitament:** Certificat institucional amb qualificació i nota final sobre 10, adaptable i descarregable en imatge PNG d'alta resolució o PDF.
  - **Dossier d'Avaluació Docent:** Recull complet de totes les respostes, proves de Teachable Machine, reflexions de l'alumnat i desglossament del qüestionari per facilitar la qualificació del professorat.
  - Botó per **Copiar Resum Docent** preparat per enganxar directament al Google Classroom o Moodle.

---

## 🚀 Com executar el projecte localment

Pots obrir directament el fitxer `index.html` en qualsevol navegador web modern o bé iniciar un servidor local:

```bash
# Amb Python 3
python3 -m http.server 8080
```

Després accedeix a:
👉 [http://localhost:8080](http://localhost:8080)

---

## 📁 Estructura del Repositori

```
├── index.html                   # Aplicació web didàctica interactiva completa
├── README.md                    # Documentació del projecte
├── js/
│   └── html2canvas.min.js       # Llibreria per exportar el diploma en imatge PNG
├── img/
│   ├── repte1/                  # Les 12 imatges oficials del repte CAPTCHA
│   ├── simulador/               # Fotografies d'alta resolució d'animals reals
│   └── teachable_screenshot_setup.png # Captura de la pantalla inicial de Teachable Machine
└── Recurs gratuït - Com aprèn una IA/ # Documents pedagògics oficials (guia docent, presentació i dossier)
```

---

## 📚 Crèdits i Marc Pedagògic

Desenvolupat a partir dels materials educatius oficials *"Entrenem i millorem un model d'IA"* per a Tecnologia i Digitalització a l'ESO.
