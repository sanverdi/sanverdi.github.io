import { BookOpen, Brain, CheckCircle, Lightbulb, Monitor, Target, Users, Zap, Award, HelpCircle, Layers, Settings } from 'lucide-react';

export type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  icon: any;
  content: ContentSection[];
  quiz: Question[];
};

export type ContentSection = {
  type: 'text' | 'list' | 'definition' | 'comparison' | 'interactive-card' | 'image-placeholder' | 'scenario' | 'image' | 'accordion' | 'process' | 'diagram';
  title?: string;
  content?: string | string[];
  items?: { term: string; definition: string }[]; // For definitions or comparisons
  data?: any; // Flexible data for specific interactive elements
  variant?: 'default' | 'pro-con' | 'versus' | 'grid' | 'cards' | 'golden-circle' | 'pyramid'; // Visual variant
  src?: string; // For images
  alt?: string; // For images
  caption?: string; // For images
  accordionItems?: { title: string; content: string }[]; // For accordion
  scenario?: {
    title: string;
    description: string;
    steps: { title: string; description: string; content: string }[];
  };
  steps?: { title: string; description: string }[]; // For process
};

export const courseData: Lesson[] = [
  {
    id: 'lektion-1',
    title: 'Lektion 1: Grundlagen des E-Learning',
    description: 'Definitionen, Merkmale und die Debatte um Effektivität vs. Effizienz.',
    icon: Monitor,
    content: [
      {
        type: 'definition',
        title: 'Was ist E-Learning?',
        content: 'Alle Formen des Lernens, bei denen elektronische oder digitale Medien zum Einsatz kommen. Es ist der Überbegriff für sämtliches Lernen in digitaler Form, bei der verschiedene Methoden zum Einsatz kommen können.',
      },
      {
        type: 'list',
        title: 'Die 4 Merkmale von E-Learning',
        variant: 'cards',
        content: [
          'Interaktivität: z.B. Quizze, Diskussionsforen oder andere Mittel zur aktiven Einbindung.',
          'Zugänglichkeit: Materialien stehen orts- und zeitunabhängig zur Verfügung.',
          'Multimedialität & Multimodalität: Nutzung verschiedener Medien (Text, Audio, Video) spricht verschiedene Sinne an.',
          'Bewertung & Fortschrittsverfolgung: Messung des Lernfortschritts und Engagements.'
        ]
      },
      {
        type: 'comparison',
        title: 'Gründe für und gegen elektronisches Lernen',
        variant: 'pro-con',
        items: [
          { 
            term: 'Pro (Dafür)', 
            definition: '• Zeitgeist (Innovation)\n• Individuelle Lerngeschwindigkeit\n• Flexible Lernpfade\n• Größere Reichweite\n• Kostengünstiger ab ca. 300 Teilnehmern' 
          },
          { 
            term: 'Contra (Dagegen)', 
            definition: '• Hohe Selbstdisziplin erforderlich\n• Fehlende Gruppendynamik/soziale Kontakte\n• Technische Hürden\n• Aufmerksamkeitsspanne oft geringer (max. 20 Min)' 
          }
        ]
      },
      {
        type: 'comparison',
        title: 'Effektivität vs. Effizienz',
        variant: 'versus',
        items: [
          { term: 'Effektivität (Das "Was")', definition: 'Wie gut unterstützt die Methode das Erreichen der Lernziele? Bezieht sich auf Qualität und Tiefe des Lernens.\n\n(Bsp: Online-Lehre mit bestandener Prüfung, aber ohne nachhaltiges Wissen = nicht effektiv)' },
          { term: 'Effizienz (Das "Wie")', definition: 'Verhältnis von Aufwand (Zeit, Kosten, Ressourcen) zum Ertrag.\n\n(Bsp: Informationsvermittlung an eine sehr große Gruppe per Video ist sehr effizient)' }
        ]
      },
      {
        type: 'accordion',
        title: 'Wissenschaftliche Einordnung & Mythen',
        accordionItems: [
          { title: 'Wissenschaftliche Einordnung', content: 'E-Learning ist ein interdisziplinäres Feld an der Schnittstelle von **Pädagogik**, **Psychologie** und **Informatik**. Es ist ein zentraler Bestandteil der **Mediendidaktik**, die sich mit dem Lehren und Lernen unter Verwendung von Medien beschäftigt.' },
          { title: 'Mythos: Ist E-Learning effektiver?', content: 'Es gibt keine pauschalen Belege, dass E-Learning per se effektiver ist. Es kommt entscheidend auf die didaktische Gestaltung an, nicht auf das Medium allein.' },
          { title: 'Mythos: Ersetzt es den Lehrer?', content: 'Nein, die Rolle wandelt sich vom reinen Wissensvermittler zum Lernbegleiter (Coach/Tutor), der den Prozess unterstützt.' },
          { title: 'Mythos: Ist es immer billiger?', content: 'Nicht zwingend. Die Erstellung hochwertiger Inhalte (WBTs, Videos) ist teuer. Es rechnet sich meist erst bei hohen Teilnehmerzahlen (Skalierung).' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'Welches Merkmal gehört NICHT zu den 4 Hauptmerkmalen von E-Learning?',
        options: ['Interaktivität', 'Zugänglichkeit', 'Präsenzzwang', 'Multimedialität'],
        correctAnswer: 2,
        explanation: 'E-Learning zeichnet sich gerade durch Zugänglichkeit (orts- und zeitunabhängig) aus, nicht durch Präsenzzwang.'
      },
      {
        id: 'q1-2',
        question: 'Worauf bezieht sich "Effizienz" im Lernkontext?',
        options: ['Auf die Qualität der Lernziele', 'Auf das Verhältnis von Aufwand und Ertrag', 'Auf die Tiefe des Verständnisses', 'Auf die Motivation der Lernenden'],
        correctAnswer: 1,
        explanation: 'Effizienz beschreibt das Verhältnis von Ressourcenaufwand (Zeit, Kosten) zum erzielten Ergebnis.'
      },
      {
        id: 'q1-3',
        question: 'Ab welcher Teilnehmerzahl gilt E-Learning oft als kostengünstiger?',
        options: ['Ab 10 Teilnehmern', 'Ab 50 Teilnehmern', 'Ab 300 Teilnehmern', 'Es ist immer teurer'],
        correctAnswer: 2,
        explanation: 'Faustregel: Ab ca. 300 Teilnehmern amortisieren sich die oft hohen Initialkosten für die Erstellung digitaler Inhalte im Vergleich zu Präsenztrainings.'
      }
    ]
  },
  {
    id: 'lektion-2',
    title: 'Lektion 2: Begriffe & Formate',
    description: 'LMS vs. LXP, Mobile Learning und moderne Lernformate im Detail.',
    icon: Layers,
    content: [
      {
        type: 'text',
        title: 'Lernmanagementsysteme im Vergleich',
        content: 'Die Infrastruktur für E-Learning ist entscheidend. Wir unterscheiden klassische LMS und moderne LXP.'
      },
      {
        type: 'comparison',
        title: 'LMS vs. LXP',
        items: [
          { term: 'LMS (Learning Management System)', definition: 'Fokus: Verwaltung & Compliance\n• Kursbereitstellung\n• Struktur & Kontrolle\n• Lehrerzentriert\n• Ideal für Pflichtschulungen\n(z.B. Moodle, SAP SuccessFactors)' },
          { term: 'LXP (Learning Experience Platform)', definition: 'Fokus: Lernerlebnis (UX)\n• Personalisierte Inhalte\n• KI-Empfehlungen\n• Soziales Lernen\n• Lernerzentriert\n(z.B. LinkedIn Learning)' }
        ]
      },
      {
        type: 'list',
        title: 'Wichtige E-Learning Formate',
        content: [
          'WBT (Web Based Training): Der Klassiker. Multimedial, interaktiv, meist asynchron im Browser.',
          'Mobile Learning: Lernen "To Go" mit Smartphones/Tablets. Ideal für "Microlearning" (kleine Wissenshappen zwischendurch).',
          'Blended Learning: Der "Mix". Kombination aus Präsenzphasen und Online-Lernphasen. Verbindet soziale Interaktion mit Flexibilität.',
          'Flipped Classroom: Theorie zu Hause (Video), Praxis & Diskussion im Unterricht. Dreht das klassische Prinzip um.',
          'Game Based Learning: Lernen durch Spiele (z.B. Minecraft Education). Nutzt Spielmechaniken für Motivation.',
          'MOOC (Massive Open Online Course): Offene Kurse für sehr viele Teilnehmer (z.B. Coursera, edX).',
          'Electronic Performance Support Systems (EPSS): "Lernen im Moment des Bedarfs" (z.B. Hilfefunktion in Software).'
        ]
      },
      {
        type: 'interactive-card',
        title: 'Begriffe vertiefen',
        data: [
          { title: 'Serious Games', text: 'Spiele mit ernsthaftem Lernziel\n• Simulationen\n• Planspiele\n• Nicht nur Unterhaltung' },
          { title: 'Learning Analytics', text: 'Datenanalyse im Lernen\n• Messung von Lernprozessen\n• Optimierung durch Daten\n• Verständnis des Lernverhaltens' },
          { title: 'Adaptives Lernen', text: 'Individuelle Anpassung\n• System passt sich an\n• Niveau variiert automatisch\n• Maßgeschneiderte Inhalte' },
          { title: 'OER', text: 'Open Educational Resources\n• Freie Bildungsmaterialien\n• Kostenlos nutzbar\n• Veränderbar & teilbar' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'Was ist der Hauptfokus eines LXP (Learning Experience Platform)?',
        options: ['Verwaltung von Zertifikaten', 'Lernerlebnis und Personalisierung', 'Abrechnung von Kursgebühren', 'Präsenzverwaltung'],
        correctAnswer: 1,
        explanation: 'Ein LXP stellt den Lernenden in den Mittelpunkt und bietet personalisierte, oft KI-gestützte Inhalte.'
      },
      {
        id: 'q2-2',
        question: 'Was versteht man unter "Flipped Classroom"?',
        options: ['Unterricht findet draußen statt', 'Theorie zu Hause, Praxis im Unterricht', 'Lehrer und Schüler tauschen Rollen', 'Nur Videos schauen'],
        correctAnswer: 1,
        explanation: 'Beim Flipped Classroom wird die Wissensvermittlung (Hausaufgabe) vorverlagert, um die Präsenzzeit für Übung und Diskussion zu nutzen.'
      },
      {
        id: 'q2-3',
        question: 'Was kennzeichnet "Mobile Learning"?',
        options: ['Lernen im Auto', 'Lernen mit mobilen Endgeräten, oft in kleinen Einheiten', 'Lernen über Mobilfunkverträge', 'Lernen im Gehen'],
        correctAnswer: 1,
        explanation: 'Mobile Learning nutzt Smartphones/Tablets für flexibles Lernen, oft in Form von "Microlearning".'
      }
    ]
  },
  {
    id: 'lektion-3',
    title: 'Lektion 3: Wie wir lernen (Psychologie)',
    description: 'Gedächtnis, Lerntheorien und Kompetenzarten.',
    icon: Brain,
    content: [
      {
        type: 'interactive-card',
        title: 'Das Gedächtnis-Modell',
        data: [
          { title: 'Sensorisches Gedächtnis', text: 'Ultrakurzzeitgedächtnis\n• Filtert unwichtige Reize\n• Hält Infos nur Millisekunden\n• "Pförtner" des Gehirns' },
          { title: 'Kurzzeitgedächtnis', text: 'Auch Arbeitsgedächtnis genannt\n• Speichert für Sekunden/Minuten\n• Begrenzte Kapazität (ca. 7 Items)\n• Aktive Verarbeitung' },
          { title: 'Langzeitgedächtnis', text: 'Der dauerhafte Speicher\n• Riesige Kapazität\n• Deklarativ (Fakten)\n• Implizit (Abläufe/Können)' }
        ]
      },
      {
        type: 'text',
        content: 'Der Weg vom reinen Wissen zum praktischen Können verläuft über spezifische kognitive Phasen, die aufeinander aufbauen.'
      },
      {
        type: 'list',
        title: 'Vom Wissen zum Können',
        variant: 'cards',
        content: [
          'Elaboration: **Verknüpfung** neuer Informationen mit bestehendem Vorwissen.',
          'Kompilierung: **Verfestigung** von Wissen durch Wiederholung und Übung.',
          'Schemata-Bildung: Aufbau komplexer **Wissensstrukturen** im Gehirn.'
        ]
      },
      {
        type: 'comparison',
        title: 'Die 3 großen Lerntheorien',
        items: [
          { term: 'Behaviorismus', definition: 'Reiz-Reaktion-Schema\n• Lernen durch **Belohnung/Bestrafung**\n• "Drill & Practice"\n• Lehrer steuert alles\n• Bsp: Vokabeltrainer' },
          { term: 'Kognitivismus', definition: 'Informationsverarbeitung\n• Lernen durch **Einsicht**\n• Gehirn als Computer\n• Problemlösung im Fokus\n• Bsp: Erklärvideos' },
          { term: 'Konstruktivismus', definition: 'Wissenskonstruktion\n• **Aktiver, individueller Prozess**\n• Entdeckendes Lernen\n• Realitätsnahe Probleme\n• Bsp: Simulationen' }
        ]
      },
      {
        type: 'interactive-card',
        title: 'Kompetenzarten (nach Bath)',
        data: [
          { title: 'Fachkompetenz', text: 'Wissen & Verstehen\n• Fachwissen anwenden\n• Zusammenhänge herstellen\n• Gut digital vermittelbar' },
          { title: 'Methodenkompetenz', text: 'Wie tue ich etwas?\n• Wissen beschaffen\n• Probleme lösen\n• Ergebnisse strukturieren' },
          { title: 'Selbstkompetenz', text: 'Persönlichkeit\n• Leistungsbereitschaft\n• Selbstreflexion\n• Schwer digital zu lehren' },
          { title: 'Sozialkompetenz', text: 'Miteinander\n• Teamfähigkeit\n• Kommunikation\n• Konfliktlösung' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q3-1',
        question: 'Welche Kompetenz ist mittels reinem E-Learning am schwersten zu vermitteln?',
        options: ['Fachkompetenz', 'Methodenkompetenz', 'Selbstkompetenz', 'Medienkompetenz'],
        correctAnswer: 2,
        explanation: 'Selbstkompetenz (z.B. Persönlichkeitsentwicklung) erfordert oft tiefe Reflexion und persönliche Reifeprozesse, die digital schwer zu triggern sind.'
      },
      {
        id: 'q3-2',
        question: 'Was passiert im "Sensorischen Gedächtnis"?',
        options: ['Dauerhafte Speicherung', 'Logische Verknüpfung', 'Filtern von unwichtigen Reizen', 'Träumen'],
        correctAnswer: 2,
        explanation: 'Das sensorische Gedächtnis ist der "Pförtner", der entscheidet, welche Reize überhaupt weiterverarbeitet werden.'
      },
      {
        id: 'q3-3',
        question: 'Welche Lerntheorie vergleicht das Gehirn mit einem Computer (Informationsverarbeitung)?',
        options: ['Behaviorismus', 'Kognitivismus', 'Konstruktivismus', 'Humanismus'],
        correctAnswer: 1,
        explanation: 'Der Kognitivismus betrachtet innere Prozesse der Informationsverarbeitung, ähnlich wie bei einem Computer.'
      }
    ]
  },
  {
    id: 'lektion-4',
    title: 'Lektion 4: Planung & Konzeption',
    description: 'ADDIE-Modell, Lernziele und didaktisches Design.',
    icon: Target,
    content: [
      {
        type: 'process',
        title: 'Instruktionsdesign (ADDIE)',
        content: 'Das ADDIE-Modell ist ein iterativer Prozess, bei dem die Ergebnisse der Evaluation oft wieder in die Analyse-Phase einfließen. Es dient als bewährter Leitfaden, um strukturierte und effektive Lernangebote zu entwickeln.',
        steps: [
          { title: 'Analyse', description: 'Bedarfsanalyse, Zielgruppenanalyse, technische Voraussetzungen klären.' },
          { title: 'Design', description: 'Lernziele definieren, Grobkonzept erstellen, Medienauswahl treffen.' },
          { title: 'Development', description: 'Erstellung der Lernmaterialien (Texte, Videos, Grafiken), Programmierung.' },
          { title: 'Implementation', description: 'Rollout des Kurses, Bereitstellung auf der Lernplattform (LMS).' },
          { title: 'Evaluation', description: 'Qualitätssicherung, Feedback einholen, Lernerfolg messen.' }
        ]
      },
      {
        type: 'diagram',
        title: 'Golden Circle of Communication (Simon Sinek)',
        variant: 'golden-circle',
        data: [
          { title: 'WHY', text: 'Warum? (Sinn, Zweck, Überzeugung)' },
          { title: 'HOW', text: 'Wie? (Prozess, Vorgehen)' },
          { title: 'WHAT', text: 'Was? (Produkt, Ergebnis)' }
        ]
      },
      {
        type: 'text',
        title: 'Anwendung des Golden Circle',
        content: 'Bei der Konzeption von Lernangeboten sollte man mit dem WHY starten, um die Lernenden emotional abzuholen und zu motivieren, bevor man Fakten (WHAT) präsentiert.'
      },
      {
        type: 'text',
        title: 'Lernziele definieren',
        content: 'Lernziele beschreiben präzise, welches Wissen, welche Fähigkeiten oder Einstellungen die Lernenden nach Abschluss der Lerneinheit erworben haben sollen. Sie machen den Erfolg messbar.'
      },
      {
        type: 'interactive-card',
        title: 'Die Bausteine eines Lernziels',
        data: [
          { title: 'Akteur (Wer?)', text: '**Die Personen**, die etwas lernen.' },
          { title: 'Verhalten (Was?)', text: '**Eine Handlung**, die als Ergebnis des Lernprozesses beherrscht werden soll.' },
          { title: 'Gegenstand (Worauf?)', text: '**Den Gegenstand**, auf den sich die Handlung bezieht.' }
        ]
      },
      {
        type: 'list',
        title: 'S.M.A.R.T. Formel',
        variant: 'cards',
        content: [
          'Spezifisch: Eindeutig definiert, nicht vage.',
          'Messbar: Überprüfbar (Qualität/Quantität).',
          'Attraktiv: Motivierend für den Lernenden.',
          'Realistisch: Machbar mit den Ressourcen.',
          'Terminiert: Bis zu einem Zeitpunkt erreichbar.'
        ]
      },
      {
        type: 'text',
        title: 'Beispiel eines Lernziels',
        content: '"Die Teilnehmenden (Akteur) können drei Vorteile von E-Learning (Gegenstand) benennen (Verhalten)."'
      },
      {
        type: 'diagram',
        title: 'Bloomsche Taxonomie (Lernzielstufen)',
        variant: 'pyramid',
        content: 'Diese Hierarchie verdeutlicht, dass komplexere Denkprozesse (wie das Erschaffen) auf fundamentalen Fähigkeiten (wie dem Erinnern) aufbauen. Lernziele sollten idealerweise verschiedene Stufen abdecken, um tiefgreifendes Verständnis zu fördern.',
        data: [
          { title: 'Erschaffen', text: 'Neues kreieren, planen, entwickeln' },
          { title: 'Evaluieren', text: 'Beurteilen, prüfen, entscheiden' },
          { title: 'Analysieren', text: 'Zerlegen, strukturieren, differenzieren' },
          { title: 'Anwenden', text: 'Nutzen, durchführen, implementieren' },
          { title: 'Verstehen', text: 'Erklären, zusammenfassen, interpretieren' },
          { title: 'Erinnern', text: 'Wiedergeben, definieren, auflisten' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q4-1',
        question: 'Wofür steht das "A" in ADDIE?',
        options: ['Anwendung', 'Analyse', 'Auswertung', 'Aufgabe'],
        correctAnswer: 1,
        explanation: 'A steht für Analyse (Bedarfsanalyse, Zielgruppenanalyse) - der erste Schritt im Designprozess.'
      },
      {
        id: 'q4-2',
        question: 'Was steht im Zentrum des "Golden Circle" (Simon Sinek)?',
        options: ['WHAT (Was)', 'HOW (Wie)', 'WHY (Warum)', 'WHEN (Wann)'],
        correctAnswer: 2,
        explanation: 'Das WHY (Warum/Sinn) steht im Zentrum und ist der stärkste Motivator, da es Emotionen anspricht.'
      },
      {
        id: 'q4-3',
        question: 'Welche Stufe ist die HÖCHSTE in der Bloomschen Taxonomie?',
        options: ['Wissen', 'Anwenden', 'Erzeugen/Kreieren', 'Verstehen'],
        correctAnswer: 2,
        explanation: 'Erzeugen (Kreieren) steht an der Spitze, da es das Erschaffen von etwas Neuem basierend auf dem Gelernten erfordert.'
      }
    ]
  },
  {
    id: 'lektion-5',
    title: 'Lektion 5: Methoden & Qualität',
    description: 'Didaktische Methoden, 3-2-1 Modell und Qualitätsstandards.',
    icon: Lightbulb,
    content: [
      {
        type: 'comparison',
        title: 'Didaktische Methoden',
        items: [
          { term: 'Expositorisch (Darbietend)', definition: 'Lehrerzentriert\n• Lehrer erklärt, Lerner konsumiert\n• Hierarchisch strukturiert\n• Effizient für Grundlagen\n• Bsp: Vortrag, WBT' },
          { term: 'Explorativ (Entdeckend)', definition: 'Lernerzentriert\n• Selbstständiges Erarbeiten\n• Hohe Eigenaktivität\n• Fördert Transfer & Problemlösung\n• Bsp: Projektarbeit' }
        ]
      },
      {
        type: 'definition',
        title: 'Das 3-2-1 Modell',
        content: 'Ein didaktisches Modell speziell für hybride oder digitale Lernformate. Es strukturiert den Lernprozess in drei Phasen, die unterschiedliche Grade an Interaktivität und Selbststeuerung erfordern. Es hilft dabei, expositorische und explorative Anteile sinnvoll zu mischen.',
      },
      {
        type: 'scenario',
        title: 'Praxisbeispiel: Das 3-2-1 Modell',
        scenario: {
          title: 'Wartung & Reparatur von Haushaltsgeräten',
          description: 'Ein elektronisches Lernangebot nach dem 3-2-1 Modell für expositorische Inhalte.',
          steps: [
            {
              title: 'Phase 3: Präsentation & Information (Pflicht)',
              description: 'Grundwissen vermitteln.',
              content: 'Hier werden die Grundlagen gelegt. Inhalte: Einführungsvideo (Übersicht über Geräte), Interaktive PDF (Werkzeuge & Sicherheit), Erklärtexte (Elektrische Komponenten).'
            },
            {
              title: 'Phase 2: Anleitung & Demonstration (Optional)',
              description: 'Umsetzung durch geführtes Handeln.',
              content: 'Der Lernende sieht, wie es geht. Inhalte: Schritt-für-Schritt-Video (Austausch einer Pumpe), Simulation (Elektrische Prüfung), Quiz zur Fehleranalyse.'
            },
            {
              title: 'Phase 1: Anwendung & Vertiefung (Optional)',
              description: 'Eigenständige Problemlösung.',
              content: 'Der Lernende wendet Wissen an. Inhalte: Virtuelles Reparatur-Tool (Lösen einer komplexen Aufgabe in der Simulation), Reflexion mit Musterlösung.'
            }
          ]
        }
      },
      {
        type: 'definition',
        title: 'PAS 1032-1',
        content: 'Eine "Public Available Specification". Sie dient als Kriterienkatalog und Richtlinie für Qualitätssicherung bei E-Learning-Prozessen. Sie deckt den gesamten Lebenszyklus ab: Analyse, Konzeption, Produktion, Einführung, Durchführung, Evaluation.',
      },
      {
        type: 'list',
        title: 'Wichtige Qualitätskriterien',
        content: [
          'Klare Lernziele: Was soll am Ende gekonnt werden?',
          'Nutzerfreundlichkeit (Usability): Einfache Bedienung.',
          'Medienqualität: Hochwertige Audio/Video/Texte.',
          'Interaktivität: Aktive Einbindung der Lernenden statt passives Konsumieren.',
          'Evaluation & Feedback: Wirksamkeit prüfen.'
        ]
      }
    ],
    quiz: [
      {
        id: 'q5-1',
        question: 'Wann ist eine expositorische (darbietende) Methode sinnvoll?',
        options: ['Wenn Lernende Experten sind', 'Für Grundlagenwissen und Einführungen', 'Um Kreativität zu fördern', 'Bei komplexen Problemlösungen'],
        correctAnswer: 1,
        explanation: 'Expositorische Methoden (z.B. Vortrag) sind effizient, um Basiswissen schnell an viele zu vermitteln.'
      },
      {
        id: 'q5-2',
        question: 'Wozu dient die PAS 1032-1?',
        options: ['Zur Abrechnung', 'Als Qualitätssicherungs-Richtlinie', 'Zur Programmierung', 'Als Design-Tool'],
        correctAnswer: 1,
        explanation: 'Sie ist ein Standard zur Qualitätssicherung von E-Learning-Angeboten und definiert Prozesse.'
      },
      {
        id: 'q5-3',
        question: 'Welche Phase im 3-2-1 Modell dient der Vermittlung von Grundwissen?',
        options: ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 0'],
        correctAnswer: 2,
        explanation: 'Phase 3 (Präsentation & Information) legt die Grundlagen und vermittelt das Basiswissen.'
      }
    ]
  }
];

export const bonusQuestions: Question[] = [
  {
    id: 'b1',
    question: 'Was ist ein "Serious Game"?',
    options: ['Ein Spiel ohne Spaßfaktor', 'Ein Spiel, das primär Lernziele verfolgt, neben der Unterhaltung', 'Ein Spiel nur für Erwachsene', 'Ein Glücksspiel'],
    correctAnswer: 1,
    explanation: 'Serious Games nutzen Spielmechaniken, um ernsthafte Inhalte (Bildung, Training) zu vermitteln.'
  },
  {
    id: 'b2',
    question: 'Was besagt das 70:20:10 Modell?',
    options: ['70% Theorie, 20% Praxis, 10% Pause', '70% Erfahrung (Job), 20% Austausch, 10% Formales Lernen', '70% Online, 20% Präsenz, 10% Hybrid', '70% Lehrer, 20% Schüler, 10% Eltern'],
    correctAnswer: 1,
    explanation: 'Es besagt, dass der Großteil des Lernens (70%) informell "on the job" passiert, 20% durch Austausch und nur 10% durch formale Kurse.'
  },
  {
    id: 'b3',
    question: 'Welches Format eignet sich am besten für "Microlearning"?',
    options: ['90-minütige Vorlesung', 'Mobile Learning Apps', 'Umfangreiche Lehrbücher', 'Ganztägige Workshops'],
    correctAnswer: 1,
    explanation: 'Mobile Learning ist prädestiniert für kleine Lerneinheiten (Nuggets) zwischendurch.'
  },
  {
    id: 'b4',
    question: 'Was ist der Hauptvorteil von "Blended Learning"?',
    options: ['Man spart sich den Lehrer komplett', 'Kombination aus sozialer Interaktion (Präsenz) und Flexibilität (Online)', 'Es ist immer kostenlos', 'Man braucht kein Internet'],
    correctAnswer: 1,
    explanation: 'Blended Learning verbindet das Beste aus beiden Welten: Die soziale Komponente der Präsenzlehre und die zeitliche/örtliche Flexibilität des E-Learnings.'
  },
  {
    id: 'b5',
    question: 'Was versteht man unter "Gamification"?',
    options: ['Computerspiele spielen', 'Anwendung von Spielmechaniken in spieluntypischen Kontexten', 'Spiele programmieren', 'Glücksspiel im Unterricht'],
    correctAnswer: 1,
    explanation: 'Gamification nutzt Elemente wie Punkte, Badges oder Ranglisten in Lernkontexten, um die Motivation zu steigern.'
  }
];
