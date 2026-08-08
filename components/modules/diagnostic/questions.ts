/**
 * The Digital Leadership Diagnostic question bank.
 *
 * Each option scores 0 to 3 on the quality of reasoning it represents, not on
 * technical vocabulary. Scores are locale neutral, labels carry both locales, so
 * a participant is measured identically in French and in English.
 */

export const COMPETENCY_CODES = [
  "C01",
  "C02",
  "C03",
  "C04",
  "C05",
  "C06",
  "C07",
  "C08",
  "C09",
  "C10",
] as const

export type CompetencyCode = (typeof COMPETENCY_CODES)[number]

export type DiagnosticLocale = "fr" | "en"

type Localized = Record<DiagnosticLocale, string>

export const competencyLabels: Record<CompetencyCode, Localized> = {
  C01: { fr: "Fluidité technologique", en: "Technology fluency" },
  C02: { fr: "Pensée systémique", en: "Systems thinking" },
  C03: { fr: "Données et décision", en: "Data and decisions" },
  C04: { fr: "Jugement IA", en: "AI judgment" },
  C05: { fr: "Pensée automatisation", en: "Automation thinking" },
  C06: { fr: "Évaluation technologique", en: "Technology evaluation" },
  C07: { fr: "Risque numérique", en: "Digital risk" },
  C08: { fr: "Expérience client", en: "Customer experience" },
  C09: { fr: "Stratégie de transformation", en: "Transformation strategy" },
  C10: { fr: "Leadership numérique", en: "Digital leadership" },
}

export interface DiagnosticOption {
  id: string
  score: 0 | 1 | 2 | 3
  label: Localized
}

export interface DiagnosticQuestion {
  id: string
  competency: CompetencyCode
  prompt: Localized
  options: DiagnosticOption[]
}

export const questions: DiagnosticQuestion[] = [
  {
    id: "q01",
    competency: "C01",
    prompt: { fr: "Un fournisseur vous annonce que sa plateforme « utilise l'IA ». Que devez-vous en comprendre ?", en: "A vendor tells you their platform \"uses AI\". What should you take from that?" },
    options: [
      { id: "a", score: 0, label: { fr: "Que la plateforme est automatiquement meilleure que ses concurrentes.", en: "That the platform is automatically better than its competitors." } },
      { id: "b", score: 1, label: { fr: "Que le fournisseur est technologiquement avancé.", en: "That the vendor is technologically advanced." } },
      { id: "c", score: 3, label: { fr: "Il faut comprendre ce que l'IA fait précisément dans le produit et si elle crée une valeur réelle pour votre usage.", en: "You need to understand what the AI actually does inside the product, and whether it creates real value for your use case." } },
      { id: "d", score: 0, label: { fr: "Qu'il faut l'adopter rapidement avant vos concurrents.", en: "That you should adopt it quickly, before your competitors do." } },
    ],
  },
  {
    id: "q02",
    competency: "C01",
    prompt: { fr: "Votre entreprise envisage de remplacer plusieurs systèmes internes déconnectés par une plateforme unique. Que devez-vous comprendre avant d'approuver le projet ?", en: "Your company is considering replacing several disconnected internal systems with a single platform. What should you understand before approving it?" },
    options: [
      { id: "a", score: 0, label: { fr: "Le langage de programmation utilisé par la plateforme.", en: "The programming language the platform is built in." } },
      { id: "b", score: 0, label: { fr: "Le nombre de développeurs employés par le fournisseur.", en: "How many developers the vendor employs." } },
      { id: "c", score: 3, label: { fr: "Comment les systèmes actuels soutiennent les processus, où sont les dépendances, et quels résultats métier la nouvelle plateforme doit améliorer.", en: "How the current systems support the processes, where the dependencies sit, and which business outcomes the new platform is meant to improve." } },
      { id: "d", score: 1, label: { fr: "Si l'interface est la plus moderne du marché.", en: "Whether the interface is the most modern on the market." } },
    ],
  },
  {
    id: "q03",
    competency: "C01",
    prompt: { fr: "Votre équipe technique propose de migrer un système vers le cloud. Quelle est la meilleure première question ?", en: "Your technical team proposes migrating a system to the cloud. What is the best first question?" },
    options: [
      { id: "a", score: 1, label: { fr: "Est-ce que « cloud » veut dire que ce sera automatiquement moins cher ?", en: "Does cloud mean this will automatically be cheaper?" } },
      { id: "b", score: 3, label: { fr: "Quel problème métier cette migration résout-elle, et quels sont les compromis en coût, sécurité et dépendance au fournisseur ?", en: "Which business problem does this migration solve, and what are the trade-offs in cost, security and vendor dependency?" } },
      { id: "c", score: 1, label: { fr: "Combien de temps cela prendra-t-il ?", en: "How long will it take?" } },
      { id: "d", score: 0, label: { fr: "Est-ce que tous nos concurrents sont déjà sur le cloud ?", en: "Are all our competitors already on the cloud?" } },
    ],
  },
  {
    id: "q04",
    competency: "C01",
    prompt: { fr: "Que signifie concrètement une « intégration » entre deux logiciels, pour un dirigeant ?", en: "What does an integration between two pieces of software actually mean, from a leader's point of view?" },
    options: [
      { id: "a", score: 0, label: { fr: "Un détail technique qui ne concerne que l'équipe IT.", en: "A technical detail that only concerns the IT team." } },
      { id: "b", score: 3, label: { fr: "Un mécanisme qui permet à deux systèmes d'échanger des informations, avec des implications sur le coût, la flexibilité et la dépendance au fournisseur.", en: "A mechanism that lets two systems exchange information, with consequences for cost, flexibility and vendor dependency." } },
      { id: "c", score: 1, label: { fr: "Une fonctionnalité que tous les logiciels modernes possèdent par défaut.", en: "A feature every modern piece of software has by default." } },
      { id: "d", score: 0, label: { fr: "Un mot marketing sans conséquence pratique.", en: "A marketing word with no practical consequence." } },
    ],
  },
  {
    id: "q05",
    competency: "C02",
    prompt: { fr: "Une banque veut réduire le temps d'approbation des demandes clients. Quelle approche est la plus solide ?", en: "A bank wants to reduce the time it takes to approve customer applications. Which approach is soundest?" },
    options: [
      { id: "a", score: 0, label: { fr: "Acheter immédiatement un logiciel.", en: "Buy software straight away." } },
      { id: "b", score: 0, label: { fr: "Ajouter plus d'employés.", en: "Add more staff." } },
      { id: "c", score: 3, label: { fr: "Cartographier l'ensemble du processus, identifier les blocages et les dépendances, puis explorer les interventions possibles.", en: "Map the whole process, identify the bottlenecks and dependencies, then explore possible interventions." } },
      { id: "d", score: 1, label: { fr: "Demander à une autre banque quel logiciel elle utilise.", en: "Ask another bank which software they use." } },
    ],
  },
  {
    id: "q06",
    competency: "C02",
    prompt: { fr: "Une entreprise automatise une tâche administrative. Trois mois plus tard, un autre service signale une charge de travail accrue. Que devez-vous investiguer ?", en: "A company automates an administrative task. Three months later another department reports a heavier workload. What should you investigate?" },
    options: [
      { id: "a", score: 0, label: { fr: "S'il faut immédiatement supprimer l'automatisation.", en: "Whether the automation should be removed immediately." } },
      { id: "b", score: 3, label: { fr: "Si l'automatisation a modifié des dépendances ailleurs dans le processus.", en: "Whether the automation shifted dependencies elsewhere in the process." } },
      { id: "c", score: 1, label: { fr: "Si les employés résistent à la technologie.", en: "Whether employees are resisting the technology." } },
      { id: "d", score: 0, label: { fr: "S'il faut remplacer le fournisseur du logiciel.", en: "Whether the software vendor should be replaced." } },
    ],
  },
  {
    id: "q07",
    competency: "C02",
    prompt: { fr: "Avant de proposer une solution numérique à un problème opérationnel, que faut-il faire en premier ?", en: "Before proposing a digital solution to an operational problem, what comes first?" },
    options: [
      { id: "a", score: 1, label: { fr: "Comparer des logiciels du marché.", en: "Compare software available on the market." } },
      { id: "b", score: 3, label: { fr: "Cartographier qui est impliqué, quelles informations circulent, et où elles se perdent ou ralentissent.", en: "Map who is involved, what information flows, and where it gets lost or slowed down." } },
      { id: "c", score: 0, label: { fr: "Demander un budget.", en: "Request a budget." } },
      { id: "d", score: 0, label: { fr: "Lancer un appel d'offres.", en: "Launch a tender." } },
    ],
  },
  {
    id: "q08",
    competency: "C03",
    prompt: { fr: "Votre équipe dit : « Les clients partent parce que notre service numérique est mauvais. » Que faites-vous en premier ?", en: "Your team says customers are leaving because the digital service is poor. What do you do first?" },
    options: [
      { id: "a", score: 0, label: { fr: "Acheter une meilleure plateforme numérique.", en: "Buy a better digital platform." } },
      { id: "b", score: 3, label: { fr: "Interroger les clients et analyser des preuves pour localiser précisément où l'expérience échoue.", en: "Talk to customers and analyse evidence to pinpoint exactly where the experience fails." } },
      { id: "c", score: 0, label: { fr: "Augmenter le budget marketing.", en: "Increase the marketing budget." } },
      { id: "d", score: 0, label: { fr: "Copier un concurrent.", en: "Copy a competitor." } },
    ],
  },
  {
    id: "q09",
    competency: "C03",
    prompt: { fr: "Un tableau de bord indique une hausse de 20 % des plaintes clients. Que devriez-vous éviter de faire ?", en: "A dashboard reports a 20 percent rise in customer complaints. What should you avoid doing?" },
    options: [
      { id: "a", score: 3, label: { fr: "Investiguer les causes.", en: "Investigate the causes." } },
      { id: "b", score: 3, label: { fr: "Segmenter les plaintes par type.", en: "Segment the complaints by type." } },
      { id: "c", score: 3, label: { fr: "Vérifier si la méthode de mesure a changé.", en: "Check whether the measurement method changed." } },
      { id: "d", score: 0, label: { fr: "Conclure immédiatement que la qualité de service s'est dégradée de précisément 20 %.", en: "Immediately conclude that service quality dropped by exactly 20 percent." } },
    ],
  },
  {
    id: "q10",
    competency: "C03",
    prompt: { fr: "Votre équipe technique vous dit que les données d'un rapport sont « incomplètes ». Quelle est la réaction la plus utile ?", en: "Your technical team tells you the data in a report is incomplete. What is the most useful response?" },
    options: [
      { id: "a", score: 0, label: { fr: "Ignorer le rapport entièrement.", en: "Ignore the report entirely." } },
      { id: "b", score: 3, label: { fr: "Comprendre ce qui manque précisément, pourquoi, et quel niveau de confiance accorder à la décision qui en dépend.", en: "Understand precisely what is missing, why, and how much confidence the dependent decision deserves." } },
      { id: "c", score: 1, label: { fr: "Demander un nouveau rapport sans poser de questions.", en: "Ask for a new report without asking questions." } },
      { id: "d", score: 0, label: { fr: "Utiliser les données telles quelles.", en: "Use the data as it is." } },
    ],
  },
  {
    id: "q11",
    competency: "C04",
    prompt: { fr: "Votre entreprise reçoit 15 000 messages clients par mois. La direction veut introduire un chatbot IA. Que doit-il se passer en premier ?", en: "Your company receives 15,000 customer messages a month. Management wants to introduce an AI chatbot. What has to happen first?" },
    options: [
      { id: "a", score: 1, label: { fr: "Comparer les modèles de chatbot les plus récents.", en: "Compare the latest chatbot models." } },
      { id: "b", score: 3, label: { fr: "Identifier les types de demandes, les données disponibles, les contraintes et les résultats attendus.", en: "Identify the request types, the available data, the constraints and the expected outcomes." } },
      { id: "c", score: 0, label: { fr: "Demander aux concurrents ce qu'ils utilisent.", en: "Ask competitors what they use." } },
      { id: "d", score: 0, label: { fr: "Choisir la démonstration la plus impressionnante.", en: "Pick the most impressive demo." } },
    ],
  },
  {
    id: "q12",
    competency: "C04",
    prompt: { fr: "Un système d'IA générative fonctionne bien en démonstration mais produit parfois des informations incorrectes. Que devez-vous considérer ?", en: "A generative AI system performs well in demos but sometimes produces incorrect information. What should you weigh?" },
    options: [
      { id: "a", score: 0, label: { fr: "Les erreurs n'ont pas d'importance si le reste est impressionnant.", en: "The errors do not matter if the rest is impressive." } },
      { id: "b", score: 0, label: { fr: "Le système devrait être utilisé sans supervision humaine.", en: "The system should be used without human supervision." } },
      { id: "c", score: 3, label: { fr: "Les conséquences des erreurs et les contrôles appropriés selon l'usage prévu.", en: "The consequences of errors and the controls appropriate to the intended use." } },
      { id: "d", score: 0, label: { fr: "Il faut communiquer plus agressivement sur les capacités de l'IA.", en: "You should market the AI capability more aggressively." } },
    ],
  },
  {
    id: "q13",
    competency: "C04",
    prompt: { fr: "Votre entreprise veut utiliser l'IA générative pour rédiger automatiquement des communications officielles aux clients. Que faut-il investiguer ?", en: "Your company wants to use generative AI to draft official customer communications automatically. What should you investigate?" },
    options: [
      { id: "a", score: 0, label: { fr: "Seulement si le texte produit est fluide.", en: "Only whether the text reads fluently." } },
      { id: "b", score: 3, label: { fr: "L'exactitude, la confidentialité, le traitement des données, la relecture humaine et la responsabilité en cas d'erreur.", en: "Accuracy, confidentiality, data handling, human review and who is accountable when it gets something wrong." } },
      { id: "c", score: 0, label: { fr: "Si les employés trouvent l'outil intéressant.", en: "Whether employees find the tool interesting." } },
      { id: "d", score: 0, label: { fr: "Si l'outil a une application mobile.", en: "Whether the tool has a mobile app." } },
    ],
  },
  {
    id: "q14",
    competency: "C04",
    prompt: { fr: "Vous devez décider si l'IA est appropriée pour un problème donné. Quel critère est le moins pertinent ?", en: "You have to decide whether AI is appropriate for a given problem. Which criterion matters least?" },
    options: [
      { id: "a", score: 3, label: { fr: "La disponibilité et la qualité des données nécessaires.", en: "The availability and quality of the required data." } },
      { id: "b", score: 3, label: { fr: "Le niveau de risque si le système se trompe.", en: "The level of risk if the system gets it wrong." } },
      { id: "c", score: 0, label: { fr: "Le fait que la technologie soit récente et médiatisée.", en: "Whether the technology is recent and widely covered in the press." } },
      { id: "d", score: 3, label: { fr: "L'existence d'un point de contrôle humain avant les décisions importantes.", en: "Whether a human checkpoint exists before important decisions." } },
    ],
  },
  {
    id: "q15",
    competency: "C05",
    prompt: { fr: "Un employé passe six heures par semaine à copier des informations d'un tableur vers un autre. Que devez-vous investiguer ?", en: "An employee spends six hours a week copying information from one spreadsheet to another. What should you investigate?" },
    options: [
      { id: "a", score: 0, label: { fr: "Si l'employé peut travailler plus vite.", en: "Whether the employee can work faster." } },
      { id: "b", score: 3, label: { fr: "Si le processus peut être éliminé, repensé ou automatisé.", en: "Whether the process can be eliminated, redesigned or automated." } },
      { id: "c", score: 0, label: { fr: "S'il faut remplacer l'employé.", en: "Whether the employee should be replaced." } },
      { id: "d", score: 0, label: { fr: "S'il faut acheter un autre tableur.", en: "Whether you should buy another spreadsheet tool." } },
    ],
  },
  {
    id: "q16",
    competency: "C05",
    prompt: { fr: "Une entreprise veut automatiser un processus qui contient plusieurs étapes de validation inutiles. Que faire d'abord ?", en: "A company wants to automate a process that contains several unnecessary approval steps. What comes first?" },
    options: [
      { id: "a", score: 0, label: { fr: "Automatiser le processus exactement tel qu'il est.", en: "Automate the process exactly as it stands." } },
      { id: "b", score: 3, label: { fr: "Repenser le processus avant de décider ce qui doit être automatisé.", en: "Redesign the process before deciding what should be automated." } },
      { id: "c", score: 1, label: { fr: "Acheter une plateforme d'automatisation.", en: "Buy an automation platform." } },
      { id: "d", score: 1, label: { fr: "Recruter un spécialiste de l'automatisation.", en: "Hire an automation specialist." } },
    ],
  },
  {
    id: "q17",
    competency: "C05",
    prompt: { fr: "Quel signal indique le plus clairement qu'un processus est prêt à être automatisé ?", en: "Which signal most clearly indicates a process is ready to be automated?" },
    options: [
      { id: "a", score: 3, label: { fr: "Il est répétitif, basé sur des règles claires et son taux d'exceptions est faible.", en: "It is repetitive, rule based, and its exception rate is low." } },
      { id: "b", score: 0, label: { fr: "Il est effectué par un employé junior.", en: "It is handled by a junior employee." } },
      { id: "c", score: 0, label: { fr: "Il existe depuis longtemps.", en: "It has been in place for a long time." } },
      { id: "d", score: 0, label: { fr: "Un concurrent l'a déjà automatisé.", en: "A competitor has already automated it." } },
    ],
  },
  {
    id: "q18",
    competency: "C06",
    prompt: { fr: "Deux fournisseurs proposent des solutions. L'un coûte 20 000 dollars, l'autre 50 000. Que devez-vous faire ?", en: "Two vendors propose solutions. One costs 20,000 dollars, the other 50,000. What should you do?" },
    options: [
      { id: "a", score: 0, label: { fr: "Choisir le moins cher.", en: "Pick the cheaper one." } },
      { id: "b", score: 0, label: { fr: "Choisir le plus cher, car un prix élevé garantit la qualité.", en: "Pick the more expensive one, since a high price guarantees quality." } },
      { id: "c", score: 3, label: { fr: "Comparer le coût total, l'adéquation métier, le risque, l'implémentation et la valeur attendue.", en: "Compare total cost, business fit, risk, implementation and expected value." } },
      { id: "d", score: 1, label: { fr: "Demander une remise plus importante.", en: "Ask for a bigger discount." } },
    ],
  },
  {
    id: "q19",
    competency: "C06",
    prompt: { fr: "Un fournisseur affirme que son produit réduira les coûts de 30 %. Que devez-vous demander ?", en: "A vendor claims their product will cut costs by 30 percent. What should you ask for?" },
    options: [
      { id: "a", score: 0, label: { fr: "Une remise supplémentaire.", en: "A further discount." } },
      { id: "b", score: 3, label: { fr: "Une preuve expliquant comment ce chiffre a été calculé et sur quelles hypothèses il repose.", en: "Evidence of how that figure was calculated and which assumptions it rests on." } },
      { id: "c", score: 0, label: { fr: "Un contrat plus long.", en: "A longer contract." } },
      { id: "d", score: 0, label: { fr: "Un second commercial.", en: "A second sales representative." } },
    ],
  },
  {
    id: "q20",
    competency: "C06",
    prompt: { fr: "Un fournisseur propose une solution attractive mais exige que la majorité de vos données opérationnelles restent dans son écosystème. Que devez-vous investiguer ?", en: "A vendor offers an attractive solution but requires most of your operational data to stay inside their ecosystem. What should you investigate?" },
    options: [
      { id: "a", score: 0, label: { fr: "Uniquement l'abonnement mensuel.", en: "Only the monthly subscription." } },
      { id: "b", score: 3, label: { fr: "La dépendance au fournisseur, la portabilité des données, les options de sortie et les coûts à long terme.", en: "Vendor dependency, data portability, exit options and long term cost." } },
      { id: "c", score: 0, label: { fr: "La couleur du tableau de bord.", en: "The colour of the dashboard." } },
      { id: "d", score: 0, label: { fr: "La rapidité de réponse du commercial.", en: "How quickly the sales rep replies." } },
    ],
  },
  {
    id: "q21",
    competency: "C06",
    prompt: { fr: "Faut-il construire une solution en interne ou l'acheter auprès d'un fournisseur ?", en: "Should you build a solution in house or buy it from a vendor?" },
    options: [
      { id: "a", score: 0, label: { fr: "Toujours construire, pour garder le contrôle total.", en: "Always build, to keep full control." } },
      { id: "b", score: 0, label: { fr: "Toujours acheter, pour aller plus vite.", en: "Always buy, to move faster." } },
      { id: "c", score: 3, label: { fr: "Cela dépend de la criticité stratégique, des compétences internes, du coût total et du délai de valeur.", en: "It depends on strategic criticality, in house skills, total cost and time to value." } },
      { id: "d", score: 0, label: { fr: "Choisir l'option la plus discutée dans les médias.", en: "Pick whichever option the press talks about most." } },
    ],
  },
  {
    id: "q22",
    competency: "C07",
    prompt: { fr: "Une entreprise veut que ses employés utilisent immédiatement un nouvel outil d'IA. Que faut-il considérer avant l'adoption ?", en: "A company wants staff to start using a new AI tool immediately. What should be weighed before adoption?" },
    options: [
      { id: "a", score: 0, label: { fr: "Uniquement l'enthousiasme des employés.", en: "Only how enthusiastic employees are." } },
      { id: "b", score: 3, label: { fr: "La confidentialité des données, les accès, l'usage acceptable, la sécurité et la gouvernance.", en: "Data confidentiality, access, acceptable use, security and governance." } },
      { id: "c", score: 0, label: { fr: "Uniquement le prix de l'abonnement.", en: "Only the subscription price." } },
      { id: "d", score: 1, label: { fr: "Uniquement les gains de productivité attendus.", en: "Only the expected productivity gains." } },
    ],
  },
  {
    id: "q23",
    competency: "C07",
    prompt: { fr: "Une entreprise découvre que des employés utilisent des outils d'IA grand public pour traiter des informations confidentielles. Quelle est la meilleure réponse initiale ?", en: "A company discovers employees are using consumer AI tools to process confidential information. What is the best initial response?" },
    options: [
      { id: "a", score: 0, label: { fr: "Ignorer la situation.", en: "Ignore the situation." } },
      { id: "b", score: 1, label: { fr: "Interdire immédiatement toute IA, sans investiguer.", en: "Ban all AI immediately, without investigating." } },
      { id: "c", score: 3, label: { fr: "Comprendre quelles informations sont concernées, évaluer l'exposition, établir une politique claire et proposer des alternatives sûres.", en: "Understand which information is affected, assess the exposure, set a clear policy and offer safe alternatives." } },
      { id: "d", score: 0, label: { fr: "Demander aux employés de supprimer leurs comptes.", en: "Ask employees to delete their accounts." } },
    ],
  },
  {
    id: "q24",
    competency: "C07",
    prompt: { fr: "Un service critique de votre organisation devient indisponible demain matin. À quelle question un dirigeant devrait-il déjà avoir une réponse préparée ?", en: "A critical service in your organisation goes down tomorrow morning. Which question should a leader already have an answer to?" },
    options: [
      { id: "a", score: 3, label: { fr: "Qui est responsable, quelles informations sont exposées, et quel est le plan de continuité.", en: "Who is accountable, what information is exposed, and what the continuity plan is." } },
      { id: "b", score: 1, label: { fr: "Qui va réparer le serveur.", en: "Who is going to fix the server." } },
      { id: "c", score: 0, label: { fr: "Combien cela va coûter en heures supplémentaires.", en: "How much it will cost in overtime." } },
      { id: "d", score: 0, label: { fr: "Comment communiquer sur les réseaux sociaux.", en: "How to post about it on social media." } },
    ],
  },
  {
    id: "q25",
    competency: "C08",
    prompt: { fr: "Les clients abandonnent régulièrement une démarche en ligne à mi-parcours. Que faire en premier ?", en: "Customers regularly abandon an online process halfway through. What comes first?" },
    options: [
      { id: "a", score: 0, label: { fr: "Refaire entièrement l'application.", en: "Rebuild the application from scratch." } },
      { id: "b", score: 3, label: { fr: "Investiguer où les clients abandonnent, recueillir leurs retours et identifier la source de friction.", en: "Investigate where customers drop out, gather their feedback and locate the source of friction." } },
      { id: "c", score: 0, label: { fr: "Augmenter la publicité.", en: "Increase advertising." } },
      { id: "d", score: 0, label: { fr: "Ajouter davantage de fonctionnalités.", en: "Add more features." } },
    ],
  },
  {
    id: "q26",
    competency: "C08",
    prompt: { fr: "Une entreprise ajoute dix nouvelles fonctionnalités à son application. La satisfaction client baisse. Que devez-vous considérer ?", en: "A company adds ten new features to its application. Customer satisfaction falls. What should you consider?" },
    options: [
      { id: "a", score: 0, label: { fr: "Les clients ne comprennent pas la technologie.", en: "Customers do not understand the technology." } },
      { id: "b", score: 0, label: { fr: "Plus de fonctionnalités est toujours préférable.", en: "More features is always better." } },
      { id: "c", score: 3, label: { fr: "La complexité supplémentaire a peut-être créé de la friction plutôt que de la valeur.", en: "The added complexity may have created friction rather than value." } },
      { id: "d", score: 0, label: { fr: "Il faut communiquer davantage sur les fonctionnalités.", en: "You should promote the features more." } },
    ],
  },
  {
    id: "q27",
    competency: "C08",
    prompt: { fr: "Quelle question guide le mieux la conception d'un parcours client numérique ?", en: "Which question best guides the design of a digital customer journey?" },
    options: [
      { id: "a", score: 1, label: { fr: "Quelle technologie devrions-nous construire ?", en: "What technology should we build?" } },
      { id: "b", score: 3, label: { fr: "Quelle expérience le client devrait-il vivre, et où se situe la friction actuelle ?", en: "What experience should the customer have, and where does the friction sit today?" } },
      { id: "c", score: 0, label: { fr: "Quel est l'outil le plus moderne disponible ?", en: "What is the most modern tool available?" } },
      { id: "d", score: 1, label: { fr: "Que font nos concurrents ?", en: "What are our competitors doing?" } },
    ],
  },
  {
    id: "q28",
    competency: "C09",
    prompt: { fr: "Une entreprise a identifié 15 initiatives numériques possibles mais ne peut en financer que trois. Que doit faire la direction ?", en: "A company has identified 15 possible digital initiatives but can only fund three. What should management do?" },
    options: [
      { id: "a", score: 0, label: { fr: "Choisir les trois technologies les plus récentes.", en: "Pick the three newest technologies." } },
      { id: "b", score: 0, label: { fr: "Choisir les trois initiatives réclamées par les managers les plus insistants.", en: "Pick the three the loudest managers are asking for." } },
      { id: "c", score: 3, label: { fr: "Prioriser selon la valeur stratégique, l'urgence, la faisabilité, le risque et l'impact attendu.", en: "Prioritise on strategic value, urgency, feasibility, risk and expected impact." } },
      { id: "d", score: 1, label: { fr: "Choisir les trois moins chères.", en: "Pick the three cheapest." } },
    ],
  },
  {
    id: "q29",
    competency: "C09",
    prompt: { fr: "Un directeur propose un projet numérique parce que « tous les concurrents le font ». Que devez-vous faire ?", en: "A director proposes a digital project because every competitor is doing it. What should you do?" },
    options: [
      { id: "a", score: 0, label: { fr: "Approuver immédiatement.", en: "Approve it immediately." } },
      { id: "b", score: 3, label: { fr: "Investiguer la raison stratégique, le problème métier réel et les preuves qui justifient l'adoption.", en: "Investigate the strategic rationale, the real business problem and the evidence that justifies adopting it." } },
      { id: "c", score: 0, label: { fr: "Rejeter automatiquement.", en: "Reject it out of hand." } },
      { id: "d", score: 0, label: { fr: "Attendre que tous les concurrents aient terminé.", en: "Wait until every competitor has finished." } },
    ],
  },
  {
    id: "q30",
    competency: "C09",
    prompt: { fr: "Un projet de transformation numérique est techniquement réussi, mais les employés utilisent à peine le nouveau système. Que cela vous indique-t-il ?", en: "A digital transformation project is technically successful, but employees barely use the new system. What does that tell you?" },
    options: [
      { id: "a", score: 0, label: { fr: "La technologie est inutile.", en: "The technology is useless." } },
      { id: "b", score: 0, label: { fr: "Les employés sont le problème.", en: "The employees are the problem." } },
      { id: "c", score: 3, label: { fr: "Une transformation réussie exige aussi de l'adoption, un changement de processus, des incitations et un accompagnement.", en: "A successful transformation also requires adoption, process change, incentives and support." } },
      { id: "d", score: 0, label: { fr: "Il faut automatiquement changer de fournisseur.", en: "You should automatically change vendor." } },
    ],
  },
  {
    id: "q31",
    competency: "C10",
    prompt: { fr: "Une équipe technique vous dit qu'une architecture est « nécessaire ». Vous ne la comprenez pas entièrement. Quelle est la meilleure réponse ?", en: "A technical team tells you an architecture is necessary. You do not fully understand it. What is the best response?" },
    options: [
      { id: "a", score: 0, label: { fr: "Approuver parce que l'équipe est technique.", en: "Approve it because the team is technical." } },
      { id: "b", score: 0, label: { fr: "Rejeter parce que vous ne comprenez pas.", en: "Reject it because you do not understand it." } },
      { id: "c", score: 3, label: { fr: "Demander d'expliquer les implications métier, les alternatives, les compromis et les risques.", en: "Ask them to explain the business implications, the alternatives, the trade-offs and the risks." } },
      { id: "d", score: 0, label: { fr: "Demander à un autre dirigeant de trancher.", en: "Ask another executive to decide." } },
    ],
  },
  {
    id: "q32",
    competency: "C10",
    prompt: { fr: "Pendant une réunion de projet, un employé junior conteste la solution proposée. Son raisonnement semble valide. Que devez-vous faire ?", en: "During a project meeting a junior employee challenges the proposed solution. Their reasoning looks sound. What should you do?" },
    options: [
      { id: "a", score: 0, label: { fr: "Clore la discussion car la décision est déjà prise.", en: "Close the discussion, since the decision is already made." } },
      { id: "b", score: 3, label: { fr: "Demander à l'employé d'expliquer son raisonnement et évaluer l'argument sur le fond.", en: "Ask them to walk through their reasoning and judge the argument on its merits." } },
      { id: "c", score: 1, label: { fr: "Demander à l'employé de soulever le sujet en privé.", en: "Ask them to raise it privately instead." } },
      { id: "d", score: 0, label: { fr: "Ignorer la remarque.", en: "Ignore the remark." } },
    ],
  },
  {
    id: "q33",
    competency: "C10",
    prompt: { fr: "Un projet de transformation numérique rencontre des difficultés. Quelle est la réponse de leadership la plus solide ?", en: "A digital transformation project is running into trouble. What is the soundest leadership response?" },
    options: [
      { id: "a", score: 0, label: { fr: "Protéger le projet car un investissement important a déjà été engagé.", en: "Protect the project because significant money has already been committed." } },
      { id: "b", score: 0, label: { fr: "Chercher un responsable à blâmer.", en: "Look for someone to blame." } },
      { id: "c", score: 3, label: { fr: "Réévaluer les preuves, les hypothèses, les objectifs et les alternatives, puis décider d'adapter, suspendre ou arrêter.", en: "Re-examine the evidence, assumptions, objectives and alternatives, then decide whether to adapt, pause or stop." } },
      { id: "d", score: 0, label: { fr: "Ajouter automatiquement davantage de ressources.", en: "Automatically throw more resources at it." } },
    ],
  },
]

/** Resolves a localized string, falling back to French for unknown locales. */
export function pick(value: Localized, locale: string) {
  return value[locale as DiagnosticLocale] ?? value.fr
}

export function competencyLabel(code: CompetencyCode, locale: string) {
  return pick(competencyLabels[code], locale)
}
