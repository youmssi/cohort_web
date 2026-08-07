/**
 * The Digital Leadership Diagnostic question bank.
 *
 * Each option scores 0–3 based on the quality of reasoning it represents, not on
 * technical vocabulary — see Document 16 of the strategy brief. French only for
 * now (site is French-first); English translation is a tracked follow-up, not
 * fabricated here. The Diagnostic UI renders this content regardless of the
 * active locale until that pass happens.
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

export const competencyLabels: Record<CompetencyCode, string> = {
  C01: "Fluidité technologique",
  C02: "Pensée systémique",
  C03: "Données et décision",
  C04: "Jugement IA",
  C05: "Pensée automatisation",
  C06: "Évaluation technologique",
  C07: "Risque numérique",
  C08: "Expérience client",
  C09: "Stratégie de transformation",
  C10: "Leadership numérique",
}

export interface DiagnosticOption {
  id: string
  label: string
  score: 0 | 1 | 2 | 3
}

export interface DiagnosticQuestion {
  id: string
  competency: CompetencyCode
  prompt: string
  options: DiagnosticOption[]
}

export const questions: DiagnosticQuestion[] = [
  // C01 — Fluidité technologique
  {
    id: "q01",
    competency: "C01",
    prompt:
      "Un fournisseur vous annonce que sa plateforme « utilise l'IA ». Que devez-vous en comprendre ?",
    options: [
      { id: "a", label: "Que la plateforme est automatiquement meilleure que ses concurrentes.", score: 0 },
      { id: "b", label: "Que le fournisseur est technologiquement avancé.", score: 1 },
      { id: "c", label: "Il faut comprendre ce que l'IA fait précisément dans le produit et si elle crée une valeur réelle pour votre usage.", score: 3 },
      { id: "d", label: "Qu'il faut l'adopter rapidement avant vos concurrents.", score: 0 },
    ],
  },
  {
    id: "q02",
    competency: "C01",
    prompt:
      "Votre entreprise envisage de remplacer plusieurs systèmes internes déconnectés par une plateforme unique. Que devez-vous comprendre avant d'approuver le projet ?",
    options: [
      { id: "a", label: "Le langage de programmation utilisé par la plateforme.", score: 0 },
      { id: "b", label: "Le nombre de développeurs employés par le fournisseur.", score: 0 },
      { id: "c", label: "Comment les systèmes actuels soutiennent les processus, où sont les dépendances, et quels résultats métier la nouvelle plateforme doit améliorer.", score: 3 },
      { id: "d", label: "Si l'interface est la plus moderne du marché.", score: 1 },
    ],
  },
  {
    id: "q03",
    competency: "C01",
    prompt:
      "Votre équipe technique propose de migrer un système vers le cloud. Quelle est la meilleure première question ?",
    options: [
      { id: "a", label: "Est-ce que « cloud » veut dire que ce sera automatiquement moins cher ?", score: 1 },
      { id: "b", label: "Quel problème métier cette migration résout-elle, et quels sont les compromis en coût, sécurité et dépendance au fournisseur ?", score: 3 },
      { id: "c", label: "Combien de temps cela prendra-t-il ?", score: 1 },
      { id: "d", label: "Est-ce que tous nos concurrents sont déjà sur le cloud ?", score: 0 },
    ],
  },
  {
    id: "q04",
    competency: "C01",
    prompt: "Que signifie concrètement une « intégration » entre deux logiciels, pour un dirigeant ?",
    options: [
      { id: "a", label: "Un détail technique qui ne concerne que l'équipe IT.", score: 0 },
      { id: "b", label: "Un mécanisme qui permet à deux systèmes d'échanger des informations — avec des implications sur le coût, la flexibilité et la dépendance au fournisseur.", score: 3 },
      { id: "c", label: "Une fonctionnalité que tous les logiciels modernes possèdent par défaut.", score: 1 },
      { id: "d", label: "Un mot marketing sans conséquence pratique.", score: 0 },
    ],
  },

  // C02 — Pensée systémique
  {
    id: "q05",
    competency: "C02",
    prompt: "Une banque veut réduire le temps d'approbation des demandes clients. Quelle approche est la plus solide ?",
    options: [
      { id: "a", label: "Acheter immédiatement un logiciel.", score: 0 },
      { id: "b", label: "Ajouter plus d'employés.", score: 0 },
      { id: "c", label: "Cartographier l'ensemble du processus, identifier les blocages et les dépendances, puis explorer les interventions possibles.", score: 3 },
      { id: "d", label: "Demander à une autre banque quel logiciel elle utilise.", score: 1 },
    ],
  },
  {
    id: "q06",
    competency: "C02",
    prompt:
      "Une entreprise automatise une tâche administrative. Trois mois plus tard, un autre service signale une charge de travail accrue. Que devez-vous investiguer ?",
    options: [
      { id: "a", label: "S'il faut immédiatement supprimer l'automatisation.", score: 0 },
      { id: "b", label: "Si l'automatisation a modifié des dépendances ailleurs dans le processus.", score: 3 },
      { id: "c", label: "Si les employés résistent à la technologie.", score: 1 },
      { id: "d", label: "S'il faut remplacer le fournisseur du logiciel.", score: 0 },
    ],
  },
  {
    id: "q07",
    competency: "C02",
    prompt: "Avant de proposer une solution numérique à un problème opérationnel, que faut-il faire en premier ?",
    options: [
      { id: "a", label: "Comparer des logiciels du marché.", score: 1 },
      { id: "b", label: "Cartographier qui est impliqué, quelles informations circulent, et où elles se perdent ou ralentissent.", score: 3 },
      { id: "c", label: "Demander un budget.", score: 0 },
      { id: "d", label: "Lancer un appel d'offres.", score: 0 },
    ],
  },

  // C03 — Données et décision
  {
    id: "q08",
    competency: "C03",
    prompt: "Votre équipe dit : « Les clients partent parce que notre service numérique est mauvais. » Que faites-vous en premier ?",
    options: [
      { id: "a", label: "Acheter une meilleure plateforme numérique.", score: 0 },
      { id: "b", label: "Interroger les clients et analyser des preuves pour localiser précisément où l'expérience échoue.", score: 3 },
      { id: "c", label: "Augmenter le budget marketing.", score: 0 },
      { id: "d", label: "Copier un concurrent.", score: 0 },
    ],
  },
  {
    id: "q09",
    competency: "C03",
    prompt: "Un tableau de bord indique : « Les plaintes clients ont augmenté de 20 %. » Que devriez-vous éviter de faire ?",
    options: [
      { id: "a", label: "Investiguer les causes.", score: 3 },
      { id: "b", label: "Segmenter les plaintes par type.", score: 3 },
      { id: "c", label: "Vérifier si la méthode de mesure a changé.", score: 3 },
      { id: "d", label: "Conclure immédiatement que la qualité de service s'est dégradée de précisément 20 %.", score: 0 },
    ],
  },
  {
    id: "q10",
    competency: "C03",
    prompt: "Votre équipe technique vous dit que les données d'un rapport sont « incomplètes ». Quelle est la réaction la plus utile ?",
    options: [
      { id: "a", label: "Ignorer le rapport entièrement.", score: 0 },
      { id: "b", label: "Comprendre ce qui manque précisément, pourquoi, et quel niveau de confiance accorder à la décision qui en dépend.", score: 3 },
      { id: "c", label: "Demander un nouveau rapport sans poser de questions.", score: 1 },
      { id: "d", label: "Utiliser les données telles quelles.", score: 0 },
    ],
  },

  // C04 — Jugement IA
  {
    id: "q11",
    competency: "C04",
    prompt: "Votre entreprise reçoit 15 000 messages clients par mois. La direction veut introduire un chatbot IA. Que doit-il se passer en premier ?",
    options: [
      { id: "a", label: "Comparer les modèles de chatbot les plus récents.", score: 1 },
      { id: "b", label: "Identifier les types de demandes, les données disponibles, les contraintes et les résultats attendus.", score: 3 },
      { id: "c", label: "Demander aux concurrents ce qu'ils utilisent.", score: 0 },
      { id: "d", label: "Choisir la démonstration la plus impressionnante.", score: 0 },
    ],
  },
  {
    id: "q12",
    competency: "C04",
    prompt: "Un système d'IA générative fonctionne bien en démonstration mais produit parfois des informations incorrectes. Que devez-vous considérer ?",
    options: [
      { id: "a", label: "Les erreurs n'ont pas d'importance si le reste est impressionnant.", score: 0 },
      { id: "b", label: "Le système devrait être utilisé sans supervision humaine.", score: 0 },
      { id: "c", label: "Les conséquences des erreurs et les contrôles appropriés selon l'usage prévu.", score: 3 },
      { id: "d", label: "Il faut communiquer plus agressivement sur les capacités de l'IA.", score: 0 },
    ],
  },
  {
    id: "q13",
    competency: "C04",
    prompt: "Votre entreprise veut utiliser l'IA générative pour rédiger automatiquement des communications officielles aux clients. Que faut-il investiguer ?",
    options: [
      { id: "a", label: "Seulement si le texte produit est fluide.", score: 0 },
      { id: "b", label: "L'exactitude, la confidentialité, le traitement des données, la relecture humaine et la responsabilité en cas d'erreur.", score: 3 },
      { id: "c", label: "Si les employés trouvent l'outil intéressant.", score: 0 },
      { id: "d", label: "Si l'outil a une application mobile.", score: 0 },
    ],
  },
  {
    id: "q14",
    competency: "C04",
    prompt: "Vous devez décider si l'IA est appropriée pour un problème donné. Quel critère est le moins pertinent ?",
    options: [
      { id: "a", label: "La disponibilité et la qualité des données nécessaires.", score: 3 },
      { id: "b", label: "Le niveau de risque si le système se trompe.", score: 3 },
      { id: "c", label: "Le fait que la technologie soit récente et médiatisée.", score: 0 },
      { id: "d", label: "L'existence d'un point de contrôle humain avant les décisions importantes.", score: 3 },
    ],
  },

  // C05 — Pensée automatisation
  {
    id: "q15",
    competency: "C05",
    prompt: "Un employé passe six heures par semaine à copier des informations d'un tableur vers un autre. Que devez-vous investiguer ?",
    options: [
      { id: "a", label: "Si l'employé peut travailler plus vite.", score: 0 },
      { id: "b", label: "Si le processus peut être éliminé, repensé ou automatisé.", score: 3 },
      { id: "c", label: "S'il faut remplacer l'employé.", score: 0 },
      { id: "d", label: "S'il faut acheter un autre tableur.", score: 0 },
    ],
  },
  {
    id: "q16",
    competency: "C05",
    prompt: "Une entreprise veut automatiser un processus qui contient plusieurs étapes de validation inutiles. Que faire d'abord ?",
    options: [
      { id: "a", label: "Automatiser le processus exactement tel qu'il est.", score: 0 },
      { id: "b", label: "Repenser le processus avant de décider ce qui doit être automatisé.", score: 3 },
      { id: "c", label: "Acheter une plateforme d'automatisation.", score: 1 },
      { id: "d", label: "Recruter un spécialiste de l'automatisation.", score: 1 },
    ],
  },
  {
    id: "q17",
    competency: "C05",
    prompt: "Quel signal indique le plus clairement qu'un processus est prêt à être automatisé ?",
    options: [
      { id: "a", label: "Il est répétitif, basé sur des règles claires et son taux d'exceptions est faible.", score: 3 },
      { id: "b", label: "Il est effectué par un employé junior.", score: 0 },
      { id: "c", label: "Il existe depuis longtemps.", score: 0 },
      { id: "d", label: "Un concurrent l'a déjà automatisé.", score: 0 },
    ],
  },

  // C06 — Évaluation technologique
  {
    id: "q18",
    competency: "C06",
    prompt: "Deux fournisseurs proposent des solutions. L'un coûte 20 000 $, l'autre 50 000 $. Que devez-vous faire ?",
    options: [
      { id: "a", label: "Choisir le moins cher.", score: 0 },
      { id: "b", label: "Choisir le plus cher, car un prix élevé garantit la qualité.", score: 0 },
      { id: "c", label: "Comparer le coût total, l'adéquation métier, le risque, l'implémentation et la valeur attendue.", score: 3 },
      { id: "d", label: "Demander une remise plus importante.", score: 1 },
    ],
  },
  {
    id: "q19",
    competency: "C06",
    prompt: "Un fournisseur affirme que son produit « réduira les coûts de 30 % ». Que devez-vous demander ?",
    options: [
      { id: "a", label: "Une remise supplémentaire.", score: 0 },
      { id: "b", label: "Une preuve expliquant comment ce chiffre a été calculé et sur quelles hypothèses il repose.", score: 3 },
      { id: "c", label: "Un contrat plus long.", score: 0 },
      { id: "d", label: "Un second commercial.", score: 0 },
    ],
  },
  {
    id: "q20",
    competency: "C06",
    prompt: "Un fournisseur propose une solution attractive mais exige que la majorité de vos données opérationnelles restent dans son écosystème. Que devez-vous investiguer ?",
    options: [
      { id: "a", label: "Uniquement l'abonnement mensuel.", score: 0 },
      { id: "b", label: "La dépendance au fournisseur, la portabilité des données, les options de sortie et les coûts à long terme.", score: 3 },
      { id: "c", label: "La couleur du tableau de bord.", score: 0 },
      { id: "d", label: "La rapidité de réponse du commercial.", score: 0 },
    ],
  },
  {
    id: "q21",
    competency: "C06",
    prompt: "Faut-il construire une solution en interne ou l'acheter auprès d'un fournisseur ?",
    options: [
      { id: "a", label: "Toujours construire, pour garder le contrôle total.", score: 0 },
      { id: "b", label: "Toujours acheter, pour aller plus vite.", score: 0 },
      { id: "c", label: "Cela dépend de la criticité stratégique, des compétences internes, du coût total et du délai de valeur.", score: 3 },
      { id: "d", label: "Choisir l'option la plus discutée dans les médias.", score: 0 },
    ],
  },

  // C07 — Risque numérique
  {
    id: "q22",
    competency: "C07",
    prompt: "Une entreprise veut que ses employés utilisent immédiatement un nouvel outil d'IA. Que faut-il considérer avant l'adoption ?",
    options: [
      { id: "a", label: "Uniquement l'enthousiasme des employés.", score: 0 },
      { id: "b", label: "La confidentialité des données, les accès, l'usage acceptable, la sécurité et la gouvernance.", score: 3 },
      { id: "c", label: "Uniquement le prix de l'abonnement.", score: 0 },
      { id: "d", label: "Uniquement les gains de productivité attendus.", score: 1 },
    ],
  },
  {
    id: "q23",
    competency: "C07",
    prompt: "Une entreprise découvre que des employés utilisent des outils d'IA grand public pour traiter des informations confidentielles. Quelle est la meilleure réponse initiale ?",
    options: [
      { id: "a", label: "Ignorer la situation.", score: 0 },
      { id: "b", label: "Interdire immédiatement toute IA, sans investiguer.", score: 1 },
      { id: "c", label: "Comprendre quelles informations sont concernées, évaluer l'exposition, établir une politique claire et proposer des alternatives sûres.", score: 3 },
      { id: "d", label: "Demander aux employés de supprimer leurs comptes.", score: 0 },
    ],
  },
  {
    id: "q24",
    competency: "C07",
    prompt: "Un service critique de votre organisation devient indisponible demain matin. Quelle question un dirigeant devrait-il déjà avoir une réponse préparée ?",
    options: [
      { id: "a", label: "Qui est responsable, quelles informations sont exposées, et quel est le plan de continuité.", score: 3 },
      { id: "b", label: "Qui va réparer le serveur.", score: 1 },
      { id: "c", label: "Combien cela va coûter en heures supplémentaires.", score: 0 },
      { id: "d", label: "Comment communiquer sur les réseaux sociaux.", score: 0 },
    ],
  },

  // C08 — Expérience client
  {
    id: "q25",
    competency: "C08",
    prompt: "Les clients abandonnent régulièrement une démarche en ligne à mi-parcours. Que faire en premier ?",
    options: [
      { id: "a", label: "Refaire entièrement l'application.", score: 0 },
      { id: "b", label: "Investiguer où les clients abandonnent, recueillir leurs retours et identifier la source de friction.", score: 3 },
      { id: "c", label: "Augmenter la publicité.", score: 0 },
      { id: "d", label: "Ajouter davantage de fonctionnalités.", score: 0 },
    ],
  },
  {
    id: "q26",
    competency: "C08",
    prompt: "Une entreprise ajoute dix nouvelles fonctionnalités à son application. La satisfaction client baisse. Que devez-vous considérer ?",
    options: [
      { id: "a", label: "Les clients ne comprennent pas la technologie.", score: 0 },
      { id: "b", label: "Plus de fonctionnalités est toujours préférable.", score: 0 },
      { id: "c", label: "La complexité supplémentaire a peut-être créé de la friction plutôt que de la valeur.", score: 3 },
      { id: "d", label: "Il faut communiquer davantage sur les fonctionnalités.", score: 0 },
    ],
  },
  {
    id: "q27",
    competency: "C08",
    prompt: "Quelle question guide le mieux la conception d'un parcours client numérique ?",
    options: [
      { id: "a", label: "Quelle technologie devrions-nous construire ?", score: 1 },
      { id: "b", label: "Quelle expérience le client devrait-il vivre, et où se situe la friction actuelle ?", score: 3 },
      { id: "c", label: "Quel est l'outil le plus moderne disponible ?", score: 0 },
      { id: "d", label: "Que font nos concurrents ?", score: 1 },
    ],
  },

  // C09 — Stratégie de transformation
  {
    id: "q28",
    competency: "C09",
    prompt: "Une entreprise a identifié 15 initiatives numériques possibles mais ne peut en financer que trois. Que doit faire la direction ?",
    options: [
      { id: "a", label: "Choisir les trois technologies les plus récentes.", score: 0 },
      { id: "b", label: "Choisir les trois initiatives réclamées par les managers les plus insistants.", score: 0 },
      { id: "c", label: "Prioriser selon la valeur stratégique, l'urgence, la faisabilité, le risque et l'impact attendu.", score: 3 },
      { id: "d", label: "Choisir les trois moins chères.", score: 1 },
    ],
  },
  {
    id: "q29",
    competency: "C09",
    prompt: "Un directeur propose un projet numérique parce que « tous les concurrents le font ». Que devez-vous faire ?",
    options: [
      { id: "a", label: "Approuver immédiatement.", score: 0 },
      { id: "b", label: "Investiguer la raison stratégique, le problème métier réel et les preuves qui justifient l'adoption.", score: 3 },
      { id: "c", label: "Rejeter automatiquement.", score: 0 },
      { id: "d", label: "Attendre que tous les concurrents aient terminé.", score: 0 },
    ],
  },
  {
    id: "q30",
    competency: "C09",
    prompt: "Un projet de transformation numérique est techniquement réussi, mais les employés utilisent à peine le nouveau système. Que cela vous indique-t-il ?",
    options: [
      { id: "a", label: "La technologie est inutile.", score: 0 },
      { id: "b", label: "Les employés sont le problème.", score: 0 },
      { id: "c", label: "Une transformation réussie exige aussi de l'adoption, un changement de processus, des incitations et un accompagnement.", score: 3 },
      { id: "d", label: "Il faut automatiquement changer de fournisseur.", score: 0 },
    ],
  },

  // C10 — Leadership numérique
  {
    id: "q31",
    competency: "C10",
    prompt: "Une équipe technique vous dit qu'une architecture est « nécessaire ». Vous ne la comprenez pas entièrement. Quelle est la meilleure réponse ?",
    options: [
      { id: "a", label: "Approuver parce que l'équipe est technique.", score: 0 },
      { id: "b", label: "Rejeter parce que vous ne comprenez pas.", score: 0 },
      { id: "c", label: "Demander d'expliquer les implications métier, les alternatives, les compromis et les risques.", score: 3 },
      { id: "d", label: "Demander à un autre dirigeant de trancher.", score: 0 },
    ],
  },
  {
    id: "q32",
    competency: "C10",
    prompt: "Pendant une réunion de projet, un employé junior conteste la solution proposée. Son raisonnement semble valide. Que devez-vous faire ?",
    options: [
      { id: "a", label: "Clore la discussion car la décision est déjà prise.", score: 0 },
      { id: "b", label: "Demander à l'employé d'expliquer son raisonnement et évaluer l'argument sur le fond.", score: 3 },
      { id: "c", label: "Demander à l'employé de soulever le sujet en privé.", score: 1 },
      { id: "d", label: "Ignorer la remarque.", score: 0 },
    ],
  },
  {
    id: "q33",
    competency: "C10",
    prompt: "Un projet de transformation numérique rencontre des difficultés. Quelle est la réponse de leadership la plus solide ?",
    options: [
      { id: "a", label: "Protéger le projet car un investissement important a déjà été engagé.", score: 0 },
      { id: "b", label: "Chercher un responsable à blâmer.", score: 0 },
      { id: "c", label: "Réévaluer les preuves, les hypothèses, les objectifs et les alternatives, puis décider d'adapter, suspendre ou arrêter.", score: 3 },
      { id: "d", label: "Ajouter automatiquement davantage de ressources.", score: 0 },
    ],
  },
]
