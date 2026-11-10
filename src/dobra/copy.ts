// Textos da versão "dobra" em 4 idiomas (pt, en, es, fr).
// Posicionamento: designer sênior generalista (sites e UX/UI, marca, direção
// de arte, editorial, informação e ilustração). Editorial é uma das áreas,
// não o centro: ela procura trabalho em qualquer área do design.
// Regras de escrita: frases curtas e concretas, sem travessão, sem fórmulas
// de texto de IA ("não só X, mas Y", "do X ao Y" repetido, adjetivos vazios).
// Só fatos já confirmados em src/data/projects.ts, src/data/profile.ts e
// src/landing/copy.ts. Nada de número, cliente ou resultado inventado.

export type Lang = 'pt' | 'en' | 'es' | 'fr';
export const LANGS: Lang[] = ['pt', 'en', 'es', 'fr'];
export type Section = 'projetos' | 'sobre' | 'contato';

/**
 * WhatsApp da Bruna: só dígitos, com código do país e DDD (ex.: 5548999999999).
 * Vazio = o WhatsApp abre e a pessoa escolhe o contato. PREENCHER COM O NÚMERO DELA.
 */
export const WHATSAPP = '5511991676166';

export interface UI {
  htmlLang: string;
  docTitle: string;
  h1: string;
  items: Record<Section, string>;
  menu: string;
  close: string;
  portfolio: string;
  loader: string[];
  hint: string;
  langLabel: string;
  // projetos
  challenge: string;
  approach: string;
  deliverables: string;
  role: string;
  visit: string;
  back: string;
  prev: string;
  next: string;
  // sobre
  about: string[];
  // perfil
  profileDeck: string;
  servicesTitle: string;
  services: { title: string; text: string }[];
  howTitle: string;
  how: string[];
  clients: string;
  tools: string;
  langs: string;
  langList: string[];
  formats: string;
  formatList: string[];
  // contato
  closing: string;
  waTitle: string;
  waName: string;
  waMessage: string;
  waMessagePh: string;
  waSend: string;
  waSendMail: string;
  waSendBoth: string;
  mailSubject: string;
  cvDownload: string;
  waGreeting: (name: string) => string;
  email: string;
  copy: string;
  copied: string;
  cv: string;
  cvAsk: string;
  cvSubject: string;
}

export const ui: Record<Lang, UI> = {
  pt: {
    htmlLang: 'pt-BR',
    docTitle: 'Bruna Marchi | Designer sênior: UX/UI, marca, direção de arte e editorial',
    h1: 'Bruna Marchi, designer sênior: sites e UX/UI, marca, direção de arte, design editorial e ilustração',
    items: { projetos: 'Projetos', sobre: 'Sobre', contato: 'Contato' },
    menu: 'Menu',
    close: 'Fechar',
    portfolio: 'Portfólio',
    loader: ['Sites', 'Marca', 'Editorial', 'Ilustração'],
    hint: 'arraste ou clique numa palavra',
    langLabel: 'Idioma',
    challenge: 'O problema',
    approach: 'O que eu fiz',
    deliverables: 'Impacto e uso',
    role: 'Função',
    visit: 'ver site',
    back: 'todos os projetos',
    prev: 'Imagem anterior',
    next: 'Próxima imagem',
    about: [
      'Sou Bruna Marchi, designer sênior com mais de dez anos de mercado. Desenho sites, interfaces, materiais de marca, livros e ilustrações. Começo todo projeto pelo que precisa ser comunicado e para quem. O formato vem depois.',
      'Meu trabalho mais recente é o site da Shell Team, uma academia de jiu-jitsu: desenhei e construí as páginas, uma área infantil com jogos e a pré-venda de um livro. Antes, fui editora de arte de coleções inteiras, coordenando ilustradores e estúdios externos para entregar no prazo. Foi ali que aprendi a criar sistemas visuais que se mantêm coerentes em qualquer tamanho de projeto.',
      'Já trabalhei com Editora do Brasil, Poliedro Educação, Saraiva, Moderna, Macmillan, Editacuja, Yoyo Books e Shell Team, e num projeto internacional para a Colômbia, com o MinTIC e a Proexport. Atendo clientes no Brasil e no exterior.',
    ],
    profileDeck: 'Designer sênior generalista: digital, marca, direção de arte e editorial.',
    servicesTitle: 'O que eu faço',
    services: [
      { title: 'Sites e UX/UI', text: 'Sites e interfaces pensados primeiro para o celular, com navegação clara e caminhos diretos até o contato. Também construo em HTML, CSS e JavaScript.' },
      { title: 'Marca e comunicação', text: 'Materiais de marca, livretos, folders e peças institucionais, do conceito à produção.' },
      { title: 'Direção de arte', text: 'Linguagem visual de projetos inteiros e coordenação de ilustradores, estúdios e fornecedores.' },
      { title: 'Design editorial', text: 'Projeto gráfico, capa e miolo de livros, kits e coleções educacionais.' },
      { title: 'Design de informação', text: 'Infográficos e guias que explicam dados e processos à primeira vista.' },
      { title: 'Ilustração e imagem', text: 'Ilustração para marcas e estampas, tratamento e adaptação de imagens.' },
    ],
    howTitle: 'Como eu trabalho',
    how: [
      'Começo pelo objetivo: quem vai usar, o que precisa entender e o que deve fazer depois.',
      'Penso em sistema: grid, estilos e componentes consistentes da primeira tela à última página.',
      'Coordeno quem está no projeto, de ilustradores a fornecedores, e entrego tudo pronto para publicar ou imprimir.',
    ],
    clients: 'Clientes',
    tools: 'Ferramentas',
    langs: 'Idiomas',
    langList: ['Português', 'Inglês', 'Espanhol', 'Francês'],
    formats: 'Formatos de trabalho',
    formatList: ['Vaga CLT', 'Contrato PJ', 'Freelance por projeto'],
    closing: 'Tem um projeto ou uma vaga? Vamos conversar.',
    waTitle: 'Mande uma mensagem',
    waName: 'Seu nome',
    waMessage: 'Mensagem',
    waMessagePh: 'Conte sobre o projeto ou a vaga',
    waSend: 'Enviar pelo WhatsApp',
    waSendMail: 'Enviar por e-mail',
    waSendBoth: 'Enviar pelos dois',
    mailSubject: 'Contato pelo portfólio',
    cvDownload: 'Baixar currículo',
    waGreeting: (n) => `Olá, Bruna! ${n ? `Sou ${n}. ` : ''}Vi seu portfólio.`,
    email: 'E-mail',
    copy: 'copiar',
    copied: 'copiado',
    cv: 'Currículo',
    cvAsk: 'pedir por e-mail',
    cvSubject: 'Pedido de currículo',
  },

  en: {
    htmlLang: 'en',
    docTitle: 'Bruna Marchi | Senior designer: UX/UI, brand, art direction and editorial',
    h1: 'Bruna Marchi, senior designer: websites and UX/UI, brand, art direction, editorial design and illustration',
    items: { projetos: 'Work', sobre: 'About', contato: 'Contact' },
    menu: 'Menu',
    close: 'Close',
    portfolio: 'Portfolio',
    loader: ['Web', 'Brand', 'Editorial', 'Illustration'],
    hint: 'drag or click a word',
    langLabel: 'Language',
    challenge: 'The problem',
    approach: 'What I did',
    deliverables: 'Impact and use',
    role: 'Role',
    visit: 'visit site',
    back: 'all work',
    prev: 'Previous image',
    next: 'Next image',
    about: [
      'I’m Bruna Marchi, a senior designer with more than ten years in the industry. I design websites, interfaces, brand materials, books and illustrations. I start every project with what needs to be communicated, and to whom. The format comes later.',
      'My latest project is the website for Shell Team, a jiu-jitsu gym: I designed and built the pages, a kids’ area with games and a pre-sale page for a book. Before that, I was art editor on entire book series, coordinating illustrators and external studios to deliver on time. That is where I learned to build visual systems that stay consistent at any project size.',
      'I’ve worked with Editora do Brasil, Poliedro Educação, Saraiva, Moderna, Macmillan, Editacuja, Yoyo Books and Shell Team, and on an international project for Colombia with MinTIC and Proexport. I work with clients in Brazil and abroad.',
    ],
    profileDeck: 'Senior multidisciplinary designer: digital, brand, art direction and editorial.',
    servicesTitle: 'What I do',
    services: [
      { title: 'Websites and UX/UI', text: 'Mobile-first websites and interfaces with clear navigation and a direct path to getting in touch. I also build them in HTML, CSS and JavaScript.' },
      { title: 'Brand and communication', text: 'Brand materials, booklets, brochures and corporate pieces, from concept to production.' },
      { title: 'Art direction', text: 'The visual language of whole projects, and coordination of illustrators, studios and suppliers.' },
      { title: 'Editorial design', text: 'Book design, covers and interiors for books, kits and educational series.' },
      { title: 'Information design', text: 'Infographics and guides that explain data and processes at a glance.' },
      { title: 'Illustration and imaging', text: 'Illustration for brands and apparel, image retouching and adaptation.' },
    ],
    howTitle: 'How I work',
    how: [
      'I start with the goal: who will use it, what they need to understand and what they should do next.',
      'I think in systems: consistent grid, styles and components from the first screen to the last page.',
      'I coordinate everyone on the project, from illustrators to suppliers, and deliver work ready to publish or print.',
    ],
    clients: 'Clients',
    tools: 'Tools',
    langs: 'Languages',
    langList: ['Portuguese', 'English', 'Spanish', 'French'],
    formats: 'Ways to work together',
    formatList: ['Full-time role', 'Contract', 'Freelance projects'],
    closing: 'Have a project or a role? Let’s talk.',
    waTitle: 'Send a message',
    waName: 'Your name',
    waMessage: 'Message',
    waMessagePh: 'Tell me about the project or the role',
    waSend: 'Send via WhatsApp',
    waSendMail: 'Send by email',
    waSendBoth: 'Send both ways',
    mailSubject: 'Message from your portfolio',
    cvDownload: 'Download CV',
    waGreeting: (n) => `Hi Bruna! ${n ? `I’m ${n}. ` : ''}I saw your portfolio.`,
    email: 'Email',
    copy: 'copy',
    copied: 'copied',
    cv: 'CV',
    cvAsk: 'request by email',
    cvSubject: 'CV request',
  },

  es: {
    htmlLang: 'es',
    docTitle: 'Bruna Marchi | Diseñadora sénior: UX/UI, marca, dirección de arte y editorial',
    h1: 'Bruna Marchi, diseñadora sénior: sitios web y UX/UI, marca, dirección de arte, diseño editorial e ilustración',
    items: { projetos: 'Proyectos', sobre: 'Sobre mí', contato: 'Contacto' },
    menu: 'Menú',
    close: 'Cerrar',
    portfolio: 'Portafolio',
    loader: ['Web', 'Marca', 'Editorial', 'Ilustración'],
    hint: 'arrastra o haz clic en una palabra',
    langLabel: 'Idioma',
    challenge: 'El problema',
    approach: 'Lo que hice',
    deliverables: 'Impacto y uso',
    role: 'Función',
    visit: 'ver sitio',
    back: 'todos los proyectos',
    prev: 'Imagen anterior',
    next: 'Imagen siguiente',
    about: [
      'Soy Bruna Marchi, diseñadora sénior con más de diez años de trayectoria. Diseño sitios web, interfaces, materiales de marca, libros e ilustraciones. Empiezo cada proyecto por lo que hay que comunicar y a quién. El formato viene después.',
      'Mi trabajo más reciente es el sitio de Shell Team, una academia de jiu-jitsu: diseñé y construí las páginas, un área infantil con juegos y la preventa de un libro. Antes fui editora de arte de colecciones enteras, coordinando ilustradores y estudios externos para entregar a tiempo. Ahí aprendí a crear sistemas visuales que se mantienen coherentes en proyectos de cualquier tamaño.',
      'He trabajado con Editora do Brasil, Poliedro Educação, Saraiva, Moderna, Macmillan, Editacuja, Yoyo Books y Shell Team, y en un proyecto internacional para Colombia con MinTIC y Proexport. Trabajo con clientes en Brasil y en el exterior.',
    ],
    profileDeck: 'Diseñadora sénior multidisciplinar: digital, marca, dirección de arte y editorial.',
    servicesTitle: 'Qué hago',
    services: [
      { title: 'Sitios web y UX/UI', text: 'Sitios e interfaces pensados primero para el móvil, con navegación clara y un camino directo al contacto. También los construyo en HTML, CSS y JavaScript.' },
      { title: 'Marca y comunicación', text: 'Materiales de marca, cuadernillos, folletos y piezas institucionales, del concepto a la producción.' },
      { title: 'Dirección de arte', text: 'El lenguaje visual de proyectos enteros y la coordinación de ilustradores, estudios y proveedores.' },
      { title: 'Diseño editorial', text: 'Proyecto gráfico, cubierta e interiores de libros, kits y colecciones educativas.' },
      { title: 'Diseño de información', text: 'Infografías y guías que explican datos y procesos de un vistazo.' },
      { title: 'Ilustración e imagen', text: 'Ilustración para marcas y estampados, retoque y adaptación de imágenes.' },
    ],
    howTitle: 'Cómo trabajo',
    how: [
      'Empiezo por el objetivo: quién lo va a usar, qué necesita entender y qué debe hacer después.',
      'Pienso en sistemas: retícula, estilos y componentes coherentes de la primera pantalla a la última página.',
      'Coordino a todo el equipo del proyecto, de ilustradores a proveedores, y entrego todo listo para publicar o imprimir.',
    ],
    clients: 'Clientes',
    tools: 'Herramientas',
    langs: 'Idiomas',
    langList: ['Portugués', 'Inglés', 'Español', 'Francés'],
    formats: 'Formas de trabajo',
    formatList: ['Puesto en plantilla', 'Contrato', 'Freelance por proyecto'],
    closing: '¿Tienes un proyecto o un puesto? Hablemos.',
    waTitle: 'Envíame un mensaje',
    waName: 'Tu nombre',
    waMessage: 'Mensaje',
    waMessagePh: 'Cuéntame sobre el proyecto o el puesto',
    waSend: 'Enviar por WhatsApp',
    waSendMail: 'Enviar por correo',
    waSendBoth: 'Enviar por los dos',
    mailSubject: 'Contacto desde el portafolio',
    cvDownload: 'Descargar CV',
    waGreeting: (n) => `¡Hola, Bruna! ${n ? `Soy ${n}. ` : ''}Vi tu portafolio.`,
    email: 'Correo',
    copy: 'copiar',
    copied: 'copiado',
    cv: 'CV',
    cvAsk: 'pedir por correo',
    cvSubject: 'Solicitud de CV',
  },

  fr: {
    htmlLang: 'fr',
    docTitle: 'Bruna Marchi | Designer senior : UX/UI, marque, direction artistique et édition',
    h1: 'Bruna Marchi, designer senior : sites web et UX/UI, marque, direction artistique, design éditorial et illustration',
    items: { projetos: 'Projets', sobre: 'À propos', contato: 'Contact' },
    menu: 'Menu',
    close: 'Fermer',
    portfolio: 'Portfolio',
    loader: ['Web', 'Marque', 'Édition', 'Illustration'],
    hint: 'faites glisser ou cliquez sur un mot',
    langLabel: 'Langue',
    challenge: 'Le problème',
    approach: 'Ce que j’ai fait',
    deliverables: 'Impact et usage',
    role: 'Rôle',
    visit: 'voir le site',
    back: 'tous les projets',
    prev: 'Image précédente',
    next: 'Image suivante',
    about: [
      'Je suis Bruna Marchi, designer senior avec plus de dix ans de métier. Je conçois des sites, des interfaces, des supports de marque, des livres et des illustrations. Je commence chaque projet par ce qu’il faut communiquer, et à qui. Le format vient ensuite.',
      'Mon projet le plus récent est le site de Shell Team, un club de jiu-jitsu : j’ai conçu et développé les pages, un espace enfants avec des jeux et la prévente d’un livre. Avant cela, j’ai été éditrice graphique de collections entières, en coordonnant illustrateurs et studios externes pour livrer dans les délais. C’est là que j’ai appris à créer des systèmes visuels qui restent cohérents, quelle que soit la taille du projet.',
      'J’ai travaillé avec Editora do Brasil, Poliedro Educação, Saraiva, Moderna, Macmillan, Editacuja, Yoyo Books et Shell Team, ainsi que sur un projet international pour la Colombie, avec le MinTIC et Proexport. Je travaille avec des clients au Brésil et à l’étranger.',
    ],
    profileDeck: 'Designer senior pluridisciplinaire : digital, marque, direction artistique et édition.',
    servicesTitle: 'Ce que je fais',
    services: [
      { title: 'Sites et UX/UI', text: 'Sites et interfaces pensés d’abord pour le mobile, avec une navigation claire et un chemin direct vers le contact. Je les développe aussi en HTML, CSS et JavaScript.' },
      { title: 'Marque et communication', text: 'Supports de marque, livrets, dépliants et documents institutionnels, du concept à la fabrication.' },
      { title: 'Direction artistique', text: 'Le langage visuel de projets entiers et la coordination d’illustrateurs, de studios et de fournisseurs.' },
      { title: 'Design éditorial', text: 'Maquette, couverture et intérieur de livres, coffrets et collections éducatives.' },
      { title: 'Design d’information', text: 'Infographies et guides qui expliquent données et processus en un coup d’œil.' },
      { title: 'Illustration et image', text: 'Illustration pour marques et textiles, retouche et adaptation d’images.' },
    ],
    howTitle: 'Ma façon de travailler',
    how: [
      'Je commence par l’objectif : qui va l’utiliser, ce qu’il doit comprendre et ce qu’il doit faire ensuite.',
      'Je pense en système : grille, styles et composants cohérents du premier écran à la dernière page.',
      'Je coordonne toute l’équipe du projet, des illustrateurs aux fournisseurs, et je livre un travail prêt à publier ou à imprimer.',
    ],
    clients: 'Clients',
    tools: 'Outils',
    langs: 'Langues',
    langList: ['Portugais', 'Anglais', 'Espagnol', 'Français'],
    formats: 'Modes de collaboration',
    formatList: ['Poste salarié', 'Contrat', 'Freelance au projet'],
    closing: 'Un projet ou un poste ? Parlons-en.',
    waTitle: 'Envoyez-moi un message',
    waName: 'Votre nom',
    waMessage: 'Message',
    waMessagePh: 'Parlez-moi du projet ou du poste',
    waSend: 'Envoyer par WhatsApp',
    waSendMail: 'Envoyer par e-mail',
    waSendBoth: 'Envoyer par les deux',
    mailSubject: 'Message depuis le portfolio',
    cvDownload: 'Télécharger le CV',
    waGreeting: (n) => `Bonjour Bruna ! ${n ? `Je suis ${n}. ` : ''}J’ai vu votre portfolio.`,
    email: 'E-mail',
    copy: 'copier',
    copied: 'copié',
    cv: 'CV',
    cvAsk: 'demander par e-mail',
    cvSubject: 'Demande de CV',
  },
};

/* ------------------------------------------------------------------ */
/* Projetos: fichas dos 8 selecionados                                  */
/* Estrutura (Kramon): manchete com o ponto principal primeiro, depois  */
/* o problema, o que eu fiz e o impacto/uso. Só fatos confirmados nos   */
/* dados do portfólio ou em fonte pública (ver resumo na conversa).     */
/* ------------------------------------------------------------------ */
export interface ProjectCopy {
  kind: string;
  role: string;
  /** Manchete: o ponto principal em uma frase. */
  headline: string;
  problem: string;
  solution: string;
  impact: string;
}

export const projectCopy: Record<string, Record<Lang, ProjectCopy>> = {
  'comecando-albertina': {
    pt: {
      kind: 'Livro · capa, caixa e miolo',
      role: 'Projeto gráfico completo',
      headline: 'Um romance sobre os anos 90 que virou objeto da época.',
      problem: '“Começando Albertina”, romance de Deise Abreu Pacheco pela Editacuja, fala de uma vida no armário nos anos 90. Uma capa comum não carregaria a década.',
      solution: 'Levei a fita cassete para a capa e a caixa: as lombadas viraram etiquetas de fita. No miolo, aberturas limpas e respiro para o texto. Fiz capa, caixa, contracapa e miolo.',
      impact: 'O leitor reconhece a década antes da primeira linha. O livro está no catálogo da Editacuja.',
    },
    en: {
      kind: 'Book · cover, slipcase, interior',
      role: 'Full book design',
      headline: 'A novel about the 90s, turned into an object from that decade.',
      problem: '“Começando Albertina”, a novel by Deise Abreu Pacheco published by Editacuja, is about life in the closet in the 90s. A standard cover would not carry the era.',
      solution: 'I brought the cassette tape to the cover and slipcase: the spines became tape labels. Inside, clean openings and room for the text. I designed the cover, slipcase, back cover and interior.',
      impact: 'Readers recognise the decade before the first line. The book is in Editacuja’s catalogue.',
    },
    es: {
      kind: 'Libro · cubierta, estuche e interiores',
      role: 'Proyecto gráfico completo',
      headline: 'Una novela sobre los años 90 convertida en un objeto de la época.',
      problem: '“Começando Albertina”, novela de Deise Abreu Pacheco publicada por Editacuja, habla de una vida en el armario en los años 90. Una cubierta común no transmitiría la década.',
      solution: 'Llevé el casete a la cubierta y al estuche: los lomos se convirtieron en etiquetas de cinta. En el interior, aperturas limpias y aire para el texto. Diseñé cubierta, estuche, contracubierta e interiores.',
      impact: 'El lector reconoce la década antes de la primera línea. El libro está en el catálogo de Editacuja.',
    },
    fr: {
      kind: 'Livre · couverture, coffret, intérieur',
      role: 'Conception graphique complète',
      headline: 'Un roman sur les années 90, devenu un objet de cette époque.',
      problem: '« Começando Albertina », roman de Deise Abreu Pacheco publié par Editacuja, raconte une vie dans le placard dans les années 90. Une couverture classique ne porterait pas la décennie.',
      solution: 'J’ai fait entrer la cassette audio dans la couverture et le coffret : les dos sont devenus des étiquettes de cassette. À l’intérieur, des ouvertures épurées et de l’air pour le texte. J’ai conçu couverture, coffret, quatrième et intérieur.',
      impact: 'Le lecteur reconnaît la décennie avant la première ligne. Le livre fait partie du catalogue d’Editacuja.',
    },
  },

  poliedro: {
    pt: {
      kind: 'Livros didáticos · pré-vestibular',
      role: 'Edição de arte e diagramação',
      headline: 'Material claro e sem tropeços para o aluno na fase mais tensa dos estudos.',
      problem: 'Quem se prepara para o vestibular já tem pressão de sobra. A Poliedro precisava de coleções inteiras de exatas, com fórmulas, gráficos, exercícios e gabaritos, para vários vestibulares ao mesmo tempo, sem que o material virasse mais um obstáculo.',
      solution: 'Apliquei o mesmo padrão de grid, hierarquia e estilos em todas as páginas, para o aluno achar cada coisa sempre no mesmo lugar. Fluxo de arte em WoodWing, fórmulas em MathType e Mathtools e acompanhamento de colaboradores externos. Uma página é composição; centenas são sistema.',
      impact: 'Cadernos, apostilas, gabaritos comentados e coletâneas que alunos usam para estudar para ENEM, ITA, UERJ, EPCAR, ESPCEX e Colégio Naval. O mesmo método está nos livros do PNLD da Editora do Brasil (2023–2026), sob contrato.',
    },
    en: {
      kind: 'Textbooks · exam prep',
      role: 'Art editing and layout',
      headline: 'Clear, frictionless material for students at the most stressful stage of their studies.',
      problem: 'Students preparing for university entrance exams are under enough pressure. Poliedro needed entire STEM series, with formulas, charts, exercises and answer keys, for several exams at once, without the material becoming one more obstacle.',
      solution: 'I applied the same grid, hierarchy and style system to every page, so students always find each element in the same place. Art workflow in WoodWing, formulas in MathType and Mathtools, and coordination of external contributors. One page is composition; hundreds are a system.',
      impact: 'Workbooks, course packs, annotated answer keys and compilations that students use to prepare for ENEM, ITA, UERJ, EPCAR, ESPCEX and Colégio Naval. The same method is in Editora do Brasil’s PNLD textbooks (2023–2026), under contract.',
    },
    es: {
      kind: 'Libros de texto · preuniversitario',
      role: 'Edición de arte y maquetación',
      headline: 'Material claro y sin tropiezos para el alumno en la etapa más tensa de sus estudios.',
      problem: 'Quien se prepara para el examen de ingreso ya tiene presión de sobra. Poliedro necesitaba colecciones enteras de ciencias exactas, con fórmulas, gráficos, ejercicios y solucionarios, para varios exámenes a la vez, sin que el material fuera un obstáculo más.',
      solution: 'Apliqué el mismo sistema de retícula, jerarquía y estilos en todas las páginas, para que el alumno encuentre cada cosa siempre en el mismo lugar. Flujo de arte en WoodWing, fórmulas en MathType y Mathtools y coordinación de colaboradores externos. Una página es composición; cientos son un sistema.',
      impact: 'Cuadernos, apuntes, solucionarios comentados y recopilaciones que los alumnos usan para preparar ENEM, ITA, UERJ, EPCAR, ESPCEX y Colégio Naval. El mismo método está en los libros PNLD de Editora do Brasil (2023–2026), bajo contrato.',
    },
    fr: {
      kind: 'Manuels scolaires · préparation aux concours',
      role: 'Direction artistique et mise en page',
      headline: 'Un support clair et sans accroc pour l’élève, au moment le plus tendu de ses études.',
      problem: 'Préparer un concours d’entrée met déjà assez de pression. Poliedro avait besoin de collections entières de sciences, avec formules, graphiques, exercices et corrigés, pour plusieurs concours à la fois, sans que le support devienne un obstacle de plus.',
      solution: 'J’ai appliqué la même grille, la même hiérarchie et les mêmes styles sur toutes les pages, pour que l’élève trouve chaque élément toujours au même endroit. Flux graphique dans WoodWing, formules dans MathType et Mathtools, suivi de collaborateurs externes. Une page, c’est de la composition ; des centaines, c’est un système.',
      impact: 'Cahiers, polycopiés, corrigés commentés et recueils que les élèves utilisent pour préparer l’ENEM, l’ITA, l’UERJ, l’EPCAR, l’ESPCEX et le Colégio Naval. La même méthode se retrouve dans les manuels PNLD d’Editora do Brasil (2023–2026), sous contrat.',
    },
  },

  'mentalidades-matematicas': {
    pt: {
      kind: 'Relatório anual · design de informação',
      role: 'Diagramação · cliente recorrente',
      headline: 'Um relatório cheio de números, feito para ser lido na tela.',
      problem: 'O Mentalidades Matemáticas, programa do Instituto Sidarta que forma professores de matemática, precisava mostrar um ano de ações: participantes, alcance e parcerias. Os números tinham que ser fáceis de entender.',
      solution: 'Formato paisagem para leitura em tela, números-chave em destaque, fotos das ações ao lado dos dados e uma cor para cada capítulo.',
      impact: 'Relatórios de atividades de 2024 (31 páginas) e 2025, que registram o que o programa fez em cada ano. O cliente voltou para a segunda edição.',
    },
    en: {
      kind: 'Annual report · information design',
      role: 'Layout · recurring client',
      headline: 'A report full of numbers, designed to be read on screen.',
      problem: 'Mentalidades Matemáticas, an Instituto Sidarta programme that trains maths teachers, needed to show a year of work: participants, reach and partnerships. The numbers had to be easy to understand.',
      solution: 'Landscape format for on-screen reading, key figures set large, photos of the programmes next to the data and one colour per chapter.',
      impact: 'Activity reports for 2024 (31 pages) and 2025, recording what the programme did each year. The client came back for the second edition.',
    },
    es: {
      kind: 'Informe anual · diseño de información',
      role: 'Maquetación · cliente recurrente',
      headline: 'Un informe lleno de cifras, pensado para leerse en pantalla.',
      problem: 'Mentalidades Matemáticas, programa del Instituto Sidarta que forma a docentes de matemáticas, necesitaba mostrar un año de trabajo: participantes, alcance y alianzas. Las cifras tenían que entenderse fácilmente.',
      solution: 'Formato apaisado para leer en pantalla, cifras clave destacadas, fotos de las acciones junto a los datos y un color por capítulo.',
      impact: 'Informes de actividades de 2024 (31 páginas) y 2025, que registran lo que hizo el programa cada año. El cliente volvió para la segunda edición.',
    },
    fr: {
      kind: 'Rapport annuel · design d’information',
      role: 'Mise en page · client récurrent',
      headline: 'Un rapport plein de chiffres, conçu pour être lu à l’écran.',
      problem: 'Mentalidades Matemáticas, programme de l’Instituto Sidarta qui forme des enseignants de mathématiques, devait présenter une année d’actions : participants, portée et partenariats. Les chiffres devaient se comprendre facilement.',
      solution: 'Format paysage pour la lecture à l’écran, chiffres clés mis en avant, photos des actions à côté des données et une couleur par chapitre.',
      impact: 'Rapports d’activité 2024 (31 pages) et 2025, qui retracent ce que le programme a fait chaque année. Le client est revenu pour la deuxième édition.',
    },
  },

  'yoyo-books': {
    pt: {
      kind: 'Livros infantis · livro-brinquedo',
      role: 'Diagramação',
      headline: 'Livros-brinquedo em português, com arquivos que respeitam faca, aba e mãos pequenas.',
      problem: 'A Yoyo Books faz livros para a primeira infância com abas, texturas e peças de madeira. Cada página tem faca, vinco e área de manuseio, e um texto no lugar errado some atrás de uma aba.',
      solution: 'Diagramei as edições em português de várias coleções, ajustando o texto a cada faca, aba e área de manuseio, e entreguei os arquivos prontos para impressão.',
      impact: 'Coleções “Levante a aba”, toque e sinta, livros com quebra-cabeça de madeira, “Minha caneta secreta” e “Resolva, apague e refaça”. Crianças pequenas leem com os pais enquanto treinam a visão e a coordenação das mãos.',
    },
    en: {
      kind: 'Children’s books · novelty',
      role: 'Layout',
      headline: 'Novelty books in Portuguese, with files built around dielines, flaps and small hands.',
      problem: 'Yoyo Books makes early-years books with flaps, textures and wooden pieces. Every page has dielines, folds and handling areas, and text in the wrong place disappears behind a flap.',
      solution: 'I laid out the Portuguese editions of several collections, fitting the text to each dieline, flap and handling area, and delivered print-ready files.',
      impact: 'Lift-the-flap, touch-and-feel, wooden-puzzle, secret-pen and wipe-clean collections. Young children read them with their parents while building visual and fine motor skills.',
    },
    es: {
      kind: 'Libros infantiles · libro-juguete',
      role: 'Maquetación',
      headline: 'Libros-juguete en portugués, con archivos que respetan troquel, solapa y manos pequeñas.',
      problem: 'Yoyo Books hace libros para la primera infancia con solapas, texturas y piezas de madera. Cada página tiene troquel, plegado y zona de manipulación, y un texto mal colocado desaparece detrás de una solapa.',
      solution: 'Maqueté las ediciones en portugués de varias colecciones, ajustando el texto a cada troquel, solapa y zona de manipulación, y entregué los archivos listos para imprenta.',
      impact: 'Colecciones de solapas, de tocar y sentir, con rompecabezas de madera, con bolígrafo secreto y de escribir y borrar. Los niños pequeños las leen con sus padres mientras desarrollan habilidades visuales y motoras.',
    },
    fr: {
      kind: 'Livres jeunesse · livres animés',
      role: 'Mise en page',
      headline: 'Des livres animés en portugais, avec des fichiers pensés pour la découpe, les rabats et les petites mains.',
      problem: 'Yoyo Books publie des livres pour la petite enfance avec rabats, textures et pièces en bois. Chaque page a sa découpe, son rainage et sa zone de manipulation, et un texte mal placé disparaît sous un rabat.',
      solution: 'J’ai mis en page les éditions portugaises de plusieurs collections en adaptant le texte à chaque découpe, rabat et zone de manipulation, puis livré des fichiers prêts à imprimer.',
      impact: 'Collections à rabats, à toucher, avec puzzle en bois, avec stylo secret et effaçables. Les tout-petits les lisent avec leurs parents tout en développant leur vue et leur motricité fine.',
    },
  },

  'josapar-tio-joao': {
    pt: {
      kind: 'Livreto de marca · receitas',
      role: 'Capa, guardas e diagramação',
      headline: 'Um livreto de receitas que abre o apetite e vende o produto na mesma página.',
      problem: 'A Josapar queria um livreto de receitas para o arroz Tio João. Ele tinha que dar vontade de cozinhar e ser fácil de seguir.',
      solution: 'Foto sangrada na página da esquerda. Na direita, a receita com título vertical, ingredientes e preparo em hierarquia clara e a embalagem do produto em cada receita. Fiz capa, guardas, contracapa e as 30 páginas.',
      impact: 'Cada receita mostra o prato e o produto juntos, então o livreto ensina a usar o arroz enquanto reforça a marca.',
    },
    en: {
      kind: 'Brand booklet · recipes',
      role: 'Cover, endpapers and layout',
      headline: 'A recipe booklet that whets the appetite and sells the product on the same page.',
      problem: 'Josapar wanted a recipe booklet for Tio João rice. It had to make people want to cook and be easy to follow.',
      solution: 'A full-bleed photo on the left page. On the right, the recipe with a vertical title, a clear hierarchy for ingredients and method, and the product pack on every recipe. I designed the cover, endpapers, back cover and all 30 pages.',
      impact: 'Every recipe shows the dish and the product together, so the booklet teaches how to use the rice while reinforcing the brand.',
    },
    es: {
      kind: 'Cuadernillo de marca · recetas',
      role: 'Cubierta, guardas y maquetación',
      headline: 'Un recetario que abre el apetito y vende el producto en la misma página.',
      problem: 'Josapar quería un recetario para el arroz Tio João. Tenía que dar ganas de cocinar y ser fácil de seguir.',
      solution: 'Foto a sangre en la página izquierda. A la derecha, la receta con título vertical, ingredientes y preparación con jerarquía clara y el envase del producto en cada receta. Diseñé cubierta, guardas, contracubierta y las 30 páginas.',
      impact: 'Cada receta muestra el plato y el producto juntos, así el recetario enseña a usar el arroz mientras refuerza la marca.',
    },
    fr: {
      kind: 'Livret de marque · recettes',
      role: 'Couverture, pages de garde et mise en page',
      headline: 'Un livret de recettes qui donne faim et vend le produit sur la même page.',
      problem: 'Josapar voulait un livret de recettes pour le riz Tio João. Il devait donner envie de cuisiner et rester facile à suivre.',
      solution: 'Une photo à fond perdu en page de gauche. À droite, la recette avec un titre vertical, ingrédients et préparation clairement hiérarchisés, et le paquet du produit sur chaque recette. J’ai conçu couverture, pages de garde, quatrième et les 30 pages.',
      impact: 'Chaque recette montre le plat et le produit ensemble : le livret apprend à cuisiner le riz tout en renforçant la marque.',
    },
  },

  explorum: {
    pt: {
      kind: 'Material didático · programação para crianças',
      role: 'Diagramação · cliente recorrente',
      headline: 'Programação explicada de um jeito que criança do fundamental entende e quer fazer.',
      problem: 'A Explorum ensina alunos do Ensino Fundamental 1 e 2 a programar com um kit criativo e reciclável, com Arduino e outros componentes. O material de apoio precisava tornar esse conteúdo simples e divertido para quem nunca programou.',
      solution: 'Organizei o conteúdo em infográficos, quadros e listas numeradas em faixas de cor, para que cada passo caiba num bloco curto e fácil de seguir.',
      impact: 'O material acompanha o kit em sala de aula: o aluno lê, monta e programa. A Explorum voltou a me contratar.',
    },
    en: {
      kind: 'Teaching material · coding for kids',
      role: 'Layout · recurring client',
      headline: 'Coding explained in a way primary and middle school children understand and want to try.',
      problem: 'Explorum teaches primary and middle school students to code with a creative, recyclable kit that includes an Arduino and other components. The support material had to make this simple and fun for children who had never coded.',
      solution: 'I organised the content into infographics, boxes and numbered lists in coloured bands, so each step fits in a short block that is easy to follow.',
      impact: 'The material goes with the kit in class: students read, build and code. Explorum hired me again.',
    },
    es: {
      kind: 'Material didáctico · programación para niños',
      role: 'Maquetación · cliente recurrente',
      headline: 'Programación explicada de forma que un niño de primaria la entiende y quiere probarla.',
      problem: 'Explorum enseña a programar a alumnos de primaria y secundaria básica con un kit creativo y reciclable, con Arduino y otros componentes. El material de apoyo tenía que volver ese contenido sencillo y divertido para quien nunca había programado.',
      solution: 'Ordené el contenido en infografías, cuadros y listas numeradas en franjas de color, para que cada paso quepa en un bloque corto y fácil de seguir.',
      impact: 'El material acompaña el kit en el aula: el alumno lee, monta y programa. Explorum volvió a contratarme.',
    },
    fr: {
      kind: 'Support pédagogique · programmation pour enfants',
      role: 'Mise en page · client récurrent',
      headline: 'La programmation expliquée pour que des écoliers la comprennent et aient envie d’essayer.',
      problem: 'Explorum apprend à programmer aux élèves du primaire et du collège avec un kit créatif et recyclable, comprenant un Arduino et d’autres composants. Le support devait rendre ce contenu simple et ludique pour des enfants qui n’avaient jamais programmé.',
      solution: 'J’ai organisé le contenu en infographies, encadrés et listes numérotées sur bandes de couleur, pour que chaque étape tienne dans un bloc court et facile à suivre.',
      impact: 'Le support accompagne le kit en classe : l’élève lit, monte et programme. Explorum a refait appel à moi.',
    },
  },

  'comodines-transmedia': {
    pt: {
      kind: 'Jogo editorial · livro + cartas',
      role: 'Design gráfico',
      headline: 'Um jogo de cartas que ensina a contar histórias, a partir de Cem Anos de Solidão.',
      problem: 'Os Comodines ensinam storytelling transmídia em forma de jogo, usando “Cem Anos de Solidão”, de García Márquez, como base. O projeto, feito com MinTIC e Proexport Colômbia, precisava ser fácil de jogar e em espanhol.',
      solution: 'Desenhei o kit em caixa: um livro-guia e um baralho de cartas pensados para serem usados juntos, com as regras e o jogo no mesmo sistema visual.',
      impact: 'Quem joga monta narrativas em grupo e aprende storytelling na prática. É um projeto internacional, com meu crédito de design na ficha técnica.',
    },
    en: {
      kind: 'Editorial game · book + cards',
      role: 'Graphic design',
      headline: 'A card game that teaches storytelling, built on One Hundred Years of Solitude.',
      problem: 'Los Comodines teach transmedia storytelling as a game, using García Márquez’s “One Hundred Years of Solitude” as the base. The project, made with MinTIC and Proexport Colombia, had to be easy to play and in Spanish.',
      solution: 'I designed the boxed kit: a guidebook and a card deck made to be used together, with rules and game in one visual system.',
      impact: 'Players build stories as a group and learn storytelling by doing it. An international project, with my design credit on the colophon.',
    },
    es: {
      kind: 'Juego editorial · libro + cartas',
      role: 'Diseño gráfico',
      headline: 'Un juego de cartas que enseña a contar historias a partir de Cien años de soledad.',
      problem: 'Los Comodines enseñan storytelling transmedia en forma de juego, con “Cien años de soledad”, de García Márquez, como base. El proyecto, hecho con MinTIC y Proexport Colombia, tenía que ser fácil de jugar y en español.',
      solution: 'Diseñé el kit en caja: un libro guía y una baraja de cartas pensados para usarse juntos, con reglas y juego en un mismo sistema visual.',
      impact: 'Quien juega arma narrativas en grupo y aprende storytelling en la práctica. Es un proyecto internacional, con mi crédito de diseño en la ficha técnica.',
    },
    fr: {
      kind: 'Jeu éditorial · livre + cartes',
      role: 'Design graphique',
      headline: 'Un jeu de cartes qui apprend à raconter des histoires, à partir de Cent ans de solitude.',
      problem: 'Los Comodines enseignent le storytelling transmédia sous forme de jeu, à partir de « Cent ans de solitude » de García Márquez. Le projet, réalisé avec le MinTIC et Proexport Colombie, devait être simple à jouer et en espagnol.',
      solution: 'J’ai conçu le coffret : un livre-guide et un jeu de cartes faits pour être utilisés ensemble, avec règles et jeu dans un même système visuel.',
      impact: 'Les joueurs construisent des récits en groupe et apprennent le storytelling en pratiquant. Un projet international, avec mon crédit de design dans l’ours.',
    },
  },

  'poemas-miudinhos': {
    pt: {
      kind: 'Livro infantil · capa e miolo',
      role: 'Design de capa e miolo',
      headline: 'Um livro de poemas que vira oficina de instrumentos musicais com material reaproveitado.',
      problem: '“Poemas Miudinhos”, de Neusa Sorrenti, com ilustrações de Gabriela Gil, conta histórias em verso e ensina as crianças a fazer instrumentos musicais com materiais reaproveitados. O livro precisava funcionar como leitura e como passo a passo.',
      solution: 'Fiz a capa e o miolo para a editora Caramelo, dando espaço ao ritmo dos versos, às ilustrações e às instruções de cada instrumento.',
      impact: 'A criança lê o poema, constrói o instrumento e brinca com o ritmo, como pede o subtítulo “para brincar e ritmar”.',
    },
    en: {
      kind: 'Children’s book · cover and interior',
      role: 'Cover and interior design',
      headline: 'A poetry book that becomes a workshop for making musical instruments from reused materials.',
      problem: '“Poemas Miudinhos”, by Neusa Sorrenti and illustrated by Gabriela Gil, tells stories in verse and teaches children to make musical instruments from reused materials. The book had to work both as reading and as a step-by-step guide.',
      solution: 'I designed the cover and interior for the publisher Caramelo, giving room to the rhythm of the verses, the illustrations and the instructions for each instrument.',
      impact: 'Children read the poem, build the instrument and play with the rhythm, as the subtitle “to play and keep the rhythm” suggests.',
    },
    es: {
      kind: 'Libro infantil · cubierta e interiores',
      role: 'Diseño de cubierta e interiores',
      headline: 'Un libro de poemas que se convierte en taller de instrumentos musicales con materiales reutilizados.',
      problem: '“Poemas Miudinhos”, de Neusa Sorrenti, con ilustraciones de Gabriela Gil, cuenta historias en verso y enseña a los niños a hacer instrumentos musicales con materiales reutilizados. El libro tenía que funcionar como lectura y como paso a paso.',
      solution: 'Diseñé la cubierta y los interiores para la editorial Caramelo, dando espacio al ritmo de los versos, a las ilustraciones y a las instrucciones de cada instrumento.',
      impact: 'El niño lee el poema, construye el instrumento y juega con el ritmo, como propone el subtítulo “para jugar y llevar el ritmo”.',
    },
    fr: {
      kind: 'Livre jeunesse · couverture et intérieur',
      role: 'Conception de la couverture et de l’intérieur',
      headline: 'Un recueil de poèmes qui devient un atelier d’instruments de musique en matériaux de récupération.',
      problem: '« Poemas Miudinhos », de Neusa Sorrenti, illustré par Gabriela Gil, raconte des histoires en vers et apprend aux enfants à fabriquer des instruments de musique avec des matériaux de récupération. Le livre devait fonctionner comme lecture et comme pas-à-pas.',
      solution: 'J’ai conçu la couverture et l’intérieur pour l’éditeur Caramelo, en laissant de la place au rythme des vers, aux illustrations et aux instructions de chaque instrument.',
      impact: 'L’enfant lit le poème, fabrique l’instrument et joue avec le rythme, comme le propose le sous-titre « pour jouer et rythmer ».',
    },
  },
  'shell-team': {
    pt: {
      kind: 'Site e UX/UI · academia de jiu-jitsu',
      role: 'UX/UI, design e construção do site',
      headline: 'Um site para uma academia de jiu-jitsu que fala com adultos, pais e crianças, e ainda vende um livro.',
      problem: 'A Shell Team, em Florianópolis, tem turmas de adultos e kids e um livro infantil próprio, O Cinturão de Ouro. O site precisava levar à aula experimental, divertir as crianças e abrir a pré-venda do livro.',
      solution: 'Desenhei e construí três frentes com uma mesma marca: o site da academia, com foto de treino e tipografia de cartaz; a área Shell Kids, ilustrada com a personagem do livro, com jogos, brincadeiras e desenhos para colorir; e a página de pré-venda do livro.',
      impact: 'Quem entrou no site só para comprar o livro acabou procurando aula experimental, e a procura foi grande. Por isso, a área Kids vai crescer: vai virar um ponto de contato com as famílias, com sugestões de atividades para as férias escolares.',
    },
    en: {
      kind: 'Website and UX/UI · jiu-jitsu gym',
      role: 'UX/UI, site design and build',
      headline: 'A website for a jiu-jitsu gym that speaks to adults, parents and kids, and sells a book too.',
      problem: 'Shell Team, in Florianópolis, runs adult and kids’ classes and has its own children’s book, O Cinturão de Ouro. The site had to lead to a trial class, entertain children and open the book’s pre-sale.',
      solution: 'I designed and built three fronts under one brand: the gym site, with training photography and poster typography; the Shell Kids area, illustrated with the book’s character, with games, activities and colouring pages; and the book’s pre-sale page.',
      impact: 'People who came to the site only to buy the book ended up looking for a trial class, and demand was high. Because of that, the Kids area will grow into a point of contact with families, with activity ideas for the school holidays.',
    },
    es: {
      kind: 'Sitio web y UX/UI · academia de jiu-jitsu',
      role: 'UX/UI, diseño y desarrollo del sitio',
      headline: 'Un sitio para una academia de jiu-jitsu que habla con adultos, padres y niños, y además vende un libro.',
      problem: 'Shell Team, en Florianópolis, tiene clases para adultos y niños y su propio libro infantil, O Cinturão de Ouro. El sitio tenía que llevar a la clase de prueba, entretener a los niños y abrir la preventa del libro.',
      solution: 'Diseñé y desarrollé tres frentes con una misma marca: el sitio de la academia, con fotos de entrenamiento y tipografía de cartel; el área Shell Kids, ilustrada con la protagonista del libro, con juegos, actividades y dibujos para colorear; y la página de preventa del libro.',
      impact: 'Quien entró al sitio solo para comprar el libro terminó buscando una clase de prueba, y la demanda fue grande. Por eso, el área Kids va a crecer: será un punto de contacto con las familias, con ideas de actividades para las vacaciones escolares.',
    },
    fr: {
      kind: 'Site web et UX/UI · club de jiu-jitsu',
      role: 'UX/UI, design et développement du site',
      headline: 'Un site pour un club de jiu-jitsu qui parle aux adultes, aux parents et aux enfants, et qui vend aussi un livre.',
      problem: 'Shell Team, à Florianópolis, propose des cours adultes et enfants et publie son propre livre jeunesse, O Cinturão de Ouro. Le site devait mener au cours d’essai, amuser les enfants et ouvrir la prévente du livre.',
      solution: 'J’ai conçu et développé trois volets sous une même marque : le site du club, avec photos d’entraînement et typographie d’affiche ; l’espace Shell Kids, illustré avec l’héroïne du livre, avec jeux, activités et coloriages ; et la page de prévente du livre.',
      impact: 'Les visiteurs venus seulement pour acheter le livre ont fini par chercher un cours d’essai, et la demande a été forte. L’espace Kids va donc s’agrandir pour devenir un point de contact avec les familles, avec des idées d’activités pour les vacances scolaires.',
    },
  },
};
