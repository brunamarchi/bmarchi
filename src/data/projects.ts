// Camada de dados — projetos.
// Fontes: CONTENT_BASE.md, Experiência do LinkedIn dela (lida em 2026-09-17),
// imagens já publicadas no Behance dela e PDFs finais de "Portfolio Oficial".
// Não inventar clientes, datas, cargos, números ou resultados. Textos de caso
// descrevem só o que está visível nas peças ou confirmado. Ano não confirmado
// fica sem campo `year` (o site simplesmente não mostra).

import poliedroCover from '../assets/projects/poliedro/cover.jpg';

import albertinaCover from '../assets/projects/comecando-albertina/cover.png';
import albertinaMiolo1 from '../assets/projects/comecando-albertina/miolo-1.jpg';
import albertinaMiolo2 from '../assets/projects/comecando-albertina/miolo-2.jpg';
import albertinaLivro from '../assets/projects/comecando-albertina/livro.jpg';
import albertinaCaixaVerso from '../assets/projects/comecando-albertina/caixa-verso.jpg';

import mentalidadesCapa from '../assets/projects/mentalidades-matematicas/p01.jpg';
import mentalidadesAcoes from '../assets/projects/mentalidades-matematicas/p07.jpg';
import mentalidadesAlcance from '../assets/projects/mentalidades-matematicas/p10.jpg';
import mentalidadesPlataformas from '../assets/projects/mentalidades-matematicas/p23.jpg';

import josaparCapa from '../assets/projects/josapar-tio-joao/p01-capa.jpg';
import josaparSumario from '../assets/projects/josapar-tio-joao/spread-02-03.jpg';
import josaparReceita1 from '../assets/projects/josapar-tio-joao/spread-06-07.jpg';
import josaparReceita2 from '../assets/projects/josapar-tio-joao/spread-14-15.jpg';

import yoyoSecreto from '../assets/projects/yoyo-books/cover-secreto.jpg';
import yoyoGalinhas from '../assets/projects/yoyo-books/cover-galinhas.jpg';
import yoyoNaFazenda from '../assets/projects/yoyo-books/cover-na-fazenda.jpg';
import yoyoAbaGalinha from '../assets/projects/yoyo-books/cover-aba-galinha.jpg';
import yoyoAbaUrso from '../assets/projects/yoyo-books/cover-aba-urso.jpg';
import yoyoResolva from '../assets/projects/yoyo-books/cover-resolva.jpg';

import shellTeamCover from '../assets/projects/shell-team/cover.jpg';
import shellTeamHome from '../assets/projects/shell-team/index.jpg';
import shellTeamLivro from '../assets/projects/shell-team/livro.jpg';

import explorumCover from '../assets/projects/explorum/cover.jpg';
import explorumRoda from '../assets/projects/explorum/p09.jpg';
import explorumLista from '../assets/projects/explorum/p24.jpg';
import explorumInfografico from '../assets/projects/explorum/p49.jpg';
import sustentabilidadeCover from '../assets/projects/sustentabilidade-eureka/cover.jpg';
import sustentabilidadeVolumes from '../assets/projects/sustentabilidade-eureka/volumes.jpg';
import comodinesCover from '../assets/projects/comodines-transmedia/cover.jpg';
import comodinesCartas from '../assets/projects/comodines-transmedia/cartas.jpg';
import poemasCover from '../assets/projects/poemas-miudinhos/cover.png';
import poemasMiolo from '../assets/projects/poemas-miudinhos/miolo.jpg';
import depoisDoTremorCover from '../assets/projects/depois-do-tremor/cover.png';
import carocoCover from '../assets/projects/caroco-de-caminhao/cover.jpg';
import bolanoSpread from '../assets/projects/ensaio-bolano/spread.jpg';
import interculturalFolder from '../assets/projects/intercultural/folder.jpg';
import nativeIlustracao from '../assets/projects/native-boards/ilustracao.jpg';
import nativeCamiseta from '../assets/projects/native-boards/camiseta.jpg';
import nativeCamisetas from '../assets/projects/native-boards/camisetas.jpg';

/** Segmentos do filtro do Arquivo — o que um recrutador procura. */
export type ProjectSegment = 'education' | 'books' | 'institutional' | 'illustration' | 'digital';

export const segments: ProjectSegment[] = ['education', 'books', 'institutional', 'illustration', 'digital'];

export interface ProjectAsset {
  src: string;
  alt: string;
  /** Página dupla / tela larga: ocupa a largura toda na galeria do caso. */
  wide?: boolean;
}

export type Bilingual = { pt: string; en: string };

export interface CaseStudy {
  challenge: Bilingual;
  approach: Bilingual;
  deliverables: Bilingual;
  /** Etiquetas curtas (ex.: vestibulares atendidos). */
  tags?: string[];
  /** Observação curta (ex.: material sob contrato). */
  note?: Bilingual;
  /** Frase de destaque do caso. */
  quote?: Bilingual;
}

export interface PortfolioProject {
  id: string;
  title: string;
  client?: string;
  partner?: string;
  year?: string;
  segment: ProjectSegment;
  /** Tipo de peça, curto e buscável: "Livros didáticos · pré-vestibular". */
  kind: Bilingual;
  role: Bilingual;
  tools?: string[];
  summary: Bilingual;
  link?: string;
  /** Presente = aparece como estudo de caso, em destaque. */
  caseStudy?: CaseStudy;
  assets: ProjectAsset[];
}

export const projects: PortfolioProject[] = [
  // ===================== ESTUDOS DE CASO =====================
  {
    id: 'poliedro',
    title: 'Poliedro Educação',
    client: 'Poliedro Educação',
    year: '2024 — 2026',
    segment: 'education',
    kind: { pt: 'Livros didáticos · pré-vestibular', en: 'Textbooks · exam prep' },
    role: { pt: 'Edição de arte e diagramação', en: 'Art editing and layout' },
    tools: ['InDesign', 'WoodWing', 'MathType', 'Mathtools'],
    summary: {
      pt: 'Cadernos, apostilas, gabaritos comentados e coletâneas para os principais vestibulares do país.',
      en: 'Workbooks, course packs, annotated answer keys and compilations for Brazil’s main entrance exams.',
    },
    caseStudy: {
      challenge: {
        pt: 'Coleções inteiras de exatas — fórmulas, gráficos, exercícios e gabaritos — para vestibulares diferentes, ao mesmo tempo e com prazo de vestibular.',
        en: 'Whole STEM series — formulas, charts, exercises and answer keys — for different entrance exams, in parallel and on exam-season deadlines.',
      },
      approach: {
        pt: 'Edição de arte e diagramação dentro de um sistema: grid, hierarquia e estilos aplicados com consistência em centenas de páginas. Fluxo de arte em WoodWing, fórmulas em MathType e Mathtools, acompanhamento de colaboradores externos.',
        en: 'Art editing and layout within a system: grid, hierarchy and styles applied consistently across hundreds of pages. Art workflow in WoodWing, formulas in MathType and Mathtools, coordinating external contributors.',
      },
      deliverables: {
        pt: 'Cadernos, apostilas, gabaritos comentados, coletâneas de vestibular.',
        en: 'Workbooks, course packs, annotated answer keys, exam compilations.',
      },
      tags: ['ENEM', 'ITA', 'UERJ', 'EPCAR', 'ESPCEX', 'Colégio Naval'],
      quote: { pt: 'Uma página é composição. Centenas são sistema.', en: 'One page is composition. Hundreds are a system.' },
      note: {
        pt: 'O mesmo trabalho de sistema vale para os livros do PNLD (Editora do Brasil, 2023–2026), cujas páginas internas ficam sob contrato.',
        en: 'The same system work applies to PNLD textbooks (Editora do Brasil, 2023–2026), whose interiors are under contract.',
      },
    },
    assets: [
      { src: poliedroCover, alt: 'Cadernos Octa Mais e revisões Poliedro, Ensino Médio e Pré-Vestibular', wide: true },
    ],
  },
  {
    id: 'comecando-albertina',
    title: 'Começando Albertina',
    client: 'Editacuja',
    segment: 'books',
    kind: { pt: 'Livro · capa, caixa e miolo', en: 'Book · cover, slipcase, interior' },
    role: { pt: 'Projeto gráfico completo', en: 'Full book design' },
    summary: {
      pt: 'Capa, caixa e miolo do livro de Deise Abreu Pacheco, com conceito de fita cassete.',
      en: 'Cover, slipcase and interior for Deise Abreu Pacheco’s book, built on a cassette-tape concept.',
    },
    caseStudy: {
      challenge: {
        pt: '“Nossa vida no armário nos anos 90”: um livro de memórias que pedia um objeto com cara da época, não só uma capa.',
        en: '“Our life in the closet in the 90s”: a memoir that called for an object from its era, not just a cover.',
      },
      approach: {
        pt: 'Conceito de fita cassete levado à capa e à caixa — lombadas que viram etiquetas de fita. No miolo, aberturas limpas e muito respiro, para o texto ter o protagonismo.',
        en: 'A cassette-tape concept carried through cover and slipcase — spines that read like tape labels. Inside, clean openings and generous white space so the text leads.',
      },
      deliverables: {
        pt: 'Capa, caixa, contracapa e projeto de miolo.',
        en: 'Cover, slipcase, back cover and interior design.',
      },
    },
    assets: [
      { src: albertinaCover, alt: 'Caixa e capa de "Começando Albertina", com lombadas em forma de fitas cassete', wide: true },
      { src: albertinaMiolo2, alt: 'Página dupla do miolo de "Começando Albertina"' },
      { src: albertinaMiolo1, alt: 'Abertura do miolo de "Começando Albertina"' },
      { src: albertinaLivro, alt: 'Livro "Começando Albertina" fechado, capa com fitas cassete' },
      { src: albertinaCaixaVerso, alt: 'Verso da caixa de "Começando Albertina", editora Editacuja' },
    ],
  },
  {
    id: 'mentalidades-matematicas',
    title: 'Mentalidades Matemáticas',
    client: 'Mentalidades Matemáticas',
    year: '2024 — 2025',
    segment: 'institutional',
    kind: { pt: 'Relatório anual · design de informação', en: 'Annual report · information design' },
    role: { pt: 'Diagramação', en: 'Layout' },
    summary: {
      pt: 'Relatórios de atividades 2024 e 2025. Cliente recorrente.',
      en: 'Activity reports for 2024 and 2025. Recurring client.',
    },
    caseStudy: {
      challenge: {
        pt: 'Um relatório anual cheio de números — participantes, alcance, parcerias — que precisava ser lido, não só arquivado.',
        en: 'An annual report full of numbers — participants, reach, partnerships — that needed to be read, not just filed.',
      },
      approach: {
        pt: 'Formato paisagem para leitura em tela, números grandes em destaque, foto das ações ao lado dos dados e cor para separar os capítulos.',
        en: 'Landscape format for on-screen reading, key numbers set large, photos of the programmes next to the data, and colour to separate chapters.',
      },
      deliverables: {
        pt: 'Relatórios de atividades 2024 e 2025 (31 páginas na edição 2024).',
        en: 'Activity reports for 2024 and 2025 (31 pages in the 2024 edition).',
      },
    },
    assets: [
      { src: mentalidadesCapa, alt: 'Capa do relatório anual 2024 "Nossa Jornada", Mentalidades Matemáticas', wide: true },
      { src: mentalidadesAlcance, alt: 'Página do relatório com números de alcance e participantes em destaque' },
      { src: mentalidadesAcoes, alt: 'Abertura do capítulo "Ações de 2024", com fotografia' },
      { src: mentalidadesPlataformas, alt: 'Página "Plataformas digitais" do relatório, com telas de celular' },
    ],
  },
  {
    id: 'josapar-tio-joao',
    title: 'Arroz Tio João',
    client: 'Josapar',
    year: '2024',
    segment: 'institutional',
    kind: { pt: 'Livreto de marca · receitas', en: 'Brand booklet · recipes' },
    role: { pt: 'Capa, guardas e diagramação', en: 'Cover, endpapers and layout' },
    summary: {
      pt: 'Livreto de receitas “para cozinhar e encantar!” para a marca Tio João.',
      en: 'Recipe booklet for the Tio João rice brand.',
    },
    caseStudy: {
      challenge: {
        pt: 'Um livreto de receitas para uma marca de arroz: apetite primeiro, informação logo em seguida.',
        en: 'A recipe booklet for a rice brand: appetite first, information right after.',
      },
      approach: {
        pt: 'Foto sangrando na página da esquerda, receita na direita com título vertical, ingredientes e preparo em hierarquia clara e a embalagem do produto em cada receita.',
        en: 'Full-bleed photo on the left page, recipe on the right with a vertical title, clear hierarchy for ingredients and method, and the product pack on every recipe.',
      },
      deliverables: {
        pt: 'Capa, guardas, contracapa e diagramação das 30 páginas.',
        en: 'Cover, endpapers, back cover and layout of all 30 pages.',
      },
    },
    assets: [
      { src: josaparReceita1, alt: 'Página dupla do livreto Tio João: foto de arroz de churrasco à esquerda, receita à direita', wide: true },
      { src: josaparCapa, alt: 'Capa do livreto "Arroz Tio João — para cozinhar e encantar!"' },
      { src: josaparSumario, alt: 'Página dupla com sumário e apresentação do livreto Tio João' },
      { src: josaparReceita2, alt: 'Página dupla do livreto Tio João: foto de salada de arroz e receita' },
    ],
  },
  {
    id: 'yoyo-books',
    title: 'Yoyo Books',
    client: 'Yoyo Books',
    year: '2025',
    segment: 'books',
    kind: { pt: 'Livros infantis · livro-brinquedo', en: 'Children’s books · novelty' },
    role: { pt: 'Diagramação', en: 'Layout' },
    summary: {
      pt: 'Coleções infantis em português: abas, toque e sinta, quebra-cabeça de madeira, caneta de tinta invisível.',
      en: 'Children’s collections in Portuguese: lift-the-flap, touch-and-feel, wooden puzzles, invisible-ink pens.',
    },
    caseStudy: {
      challenge: {
        pt: 'Livro-brinquedo para os primeiros leitores: abas, texturas, peças de madeira, caneta de tinta invisível — a página convive com faca, vinco e mãos pequenas.',
        en: 'Novelty books for the youngest readers: flaps, textures, wooden pieces, invisible-ink pens — the page lives alongside dielines, folds and small hands.',
      },
      approach: {
        pt: 'Diagramação das versões em português de várias coleções, respeitando faca, abas e áreas de manuseio, com arquivos finais prontos para impressão.',
        en: 'Layout of the Portuguese editions of several collections, respecting dielines, flaps and handling areas, with print-ready final files.',
      },
      deliverables: {
        pt: 'Coleções “Levante a aba”, toque e sinta, livros com quebra-cabeça, “Minha caneta secreta”, “Resolva, apague e refaça”.',
        en: 'Lift-the-flap, touch-and-feel, puzzle books, secret-pen books and wipe-clean books.',
      },
    },
    assets: [
      { src: yoyoNaFazenda, alt: '"Na Fazenda", livro toque e sinta com quebra-cabeça de madeira' },
      { src: yoyoAbaGalinha, alt: '"Levante a aba e descubra — Fazenda", exemplar impresso' },
      { src: yoyoSecreto, alt: '"Minha Caneta Espiã" e "Minha Caneta Secreta", livros com caneta de tinta invisível' },
      { src: yoyoGalinhas, alt: '"Galinha e seus amigos", primeiro livro e quebra-cabeça de madeira' },
      { src: yoyoAbaUrso, alt: 'Livro de abas "Levante a aba e descubra", exemplar impresso' },
      { src: yoyoResolva, alt: '"Resolva, apague e refaça" — Adição e subtração, e Tabuada' },
    ],
  },
  {
    id: 'shell-team',
    title: 'Shell Team Jiu-Jitsu',
    client: 'Shell Team · Florianópolis',
    year: '2026',
    segment: 'digital',
    kind: { pt: 'Site · academia e livro infantil', en: 'Website · gym and children’s book' },
    role: { pt: 'Design e construção do site', en: 'Site design and build' },
    tools: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    summary: {
      pt: 'Site da academia com aulas, horários, área Shell Kids e pré-venda do livro O Cinturão de Ouro.',
      en: 'Gym website with classes, timetable, a Shell Kids area and a pre-sale page for the book O Cinturão de Ouro.',
    },
    link: 'https://brunamarchi.github.io/shell-team/',
    caseStudy: {
      challenge: {
        pt: 'Uma academia de bairro com turma kids, aulas para mulheres e um livro infantil próprio: o site precisava falar com pais, crianças e adultos ao mesmo tempo.',
        en: 'A neighbourhood gym with a kids’ class, classes for women and its own children’s book: the site had to speak to parents, kids and adults at once.',
      },
      approach: {
        pt: 'A personagem do livro conduz a identidade ilustrada; tipografia de cartaz; grade de horários interativa; área Kids com jogos e desenhos para colorir; página de pré-venda do livro.',
        en: 'The book’s character drives an illustrated identity; poster typography; an interactive timetable; a Kids area with games and colouring pages; a book pre-sale page.',
      },
      deliverables: {
        pt: 'Três frentes no ar: site da academia, área Shell Kids (jogos, brincadeiras e desenhos para colorir) e página de pré-venda do livro. Código aberto no GitHub.',
        en: 'Three live fronts: the gym site, the Shell Kids area (games, activities and colouring pages) and the book pre-sale page. Open source on GitHub.',
      },
    },
    assets: [
      { src: shellTeamCover, alt: 'Área Shell Kids do site: ilustração da mestra de kimono segurando a faixa e o título "Vem brincar no tatame com a Shell!"', wide: true },
      { src: shellTeamHome, alt: 'Página inicial do site Shell Team: foto de treino em preto e branco e o título "Treine jiu-jitsu de verdade"', wide: true },
      { src: shellTeamLivro, alt: 'Página de pré-venda do livro O Cinturão de Ouro, com o livro em 3D e o selo de edição numerada', wide: true },
    ],
  },

  // ===================== ARQUIVO =====================
  {
    id: 'explorum',
    title: 'Explorum — Educação Digital',
    client: 'Explorum',
    year: '2026',
    segment: 'education',
    kind: { pt: 'Guias didáticos digitais', en: 'Digital teaching guides' },
    role: { pt: 'Diagramação', en: 'Layout' },
    summary: {
      pt: 'Cliente recorrente. Guia didático sobre IA na Educação (2026), com infográficos e quadros.',
      en: 'Recurring client. Teaching guide on AI in Education (2026), with infographics and boxes.',
    },
    assets: [
      { src: explorumCover, alt: 'Capas da Coleção Explorum, Livro do Aluno' },
      { src: explorumRoda, alt: 'Página do Guia Explorum com infográfico circular' },
      { src: explorumLista, alt: 'Página do Guia Explorum com lista numerada em faixas coloridas' },
      { src: explorumInfografico, alt: 'Página de anexo do Guia Explorum com infográfico' },
    ],
  },
  {
    id: 'sustentabilidade-eureka',
    title: 'Sustentabilidade — Livro do Educador',
    client: 'Grupo Eureka',
    segment: 'education',
    kind: { pt: 'Capas · coleção didática', en: 'Covers · textbook series' },
    role: { pt: 'Design de capa', en: 'Cover design' },
    summary: {
      pt: 'Capas da coleção em 3 volumes: Educação Infantil, 1º–2º e 3º–5º ano.',
      en: 'Covers for a 3-volume series: early childhood, grades 1–2 and 3–5.',
    },
    assets: [
      { src: sustentabilidadeCover, alt: 'Capas da coleção Sustentabilidade, Grupo Eureka' },
      { src: sustentabilidadeVolumes, alt: 'Os três volumes da coleção Sustentabilidade lado a lado' },
    ],
  },
  {
    id: 'poemas-miudinhos',
    title: 'Poemas Miudinhos',
    client: 'Caramelo',
    segment: 'books',
    kind: { pt: 'Livro infantil · capa e miolo', en: 'Children’s book · cover and interior' },
    role: { pt: 'Design de capa e miolo', en: 'Cover and interior design' },
    summary: {
      pt: 'Poemas de Neusa Sorrenti, ilustrações de Gabriela Gil.',
      en: 'Poems by Neusa Sorrenti, illustrations by Gabriela Gil.',
    },
    assets: [
      { src: poemasCover, alt: 'Capa de "Poemas Miudinhos — para brincar e ritmar", editora Caramelo' },
      { src: poemasMiolo, alt: 'Página dupla do miolo de "Poemas Miudinhos", com ilustração' },
    ],
  },
  {
    id: 'comodines-transmedia',
    title: 'Los Comodines de Transmedia',
    client: 'Editacuja',
    partner: 'MinTIC / Proexport Colômbia',
    segment: 'books',
    kind: { pt: 'Kit editorial · livro + cartas', en: 'Editorial kit · book + cards' },
    role: { pt: 'Design gráfico', en: 'Graphic design' },
    summary: {
      pt: 'Kit em caixa (livro-guia + baralho) sobre transmídia, em espanhol, para a Colômbia. Crédito de design na ficha técnica.',
      en: 'Boxed kit (guidebook + card deck) on transmedia, in Spanish, for Colombia. Design credited on the colophon.',
    },
    assets: [
      { src: comodinesCover, alt: 'Caixa e livro do kit "Los Comodines de Transmedia"' },
      { src: comodinesCartas, alt: 'Cartas do kit "Los Comodines de Transmedia"' },
    ],
  },
  {
    id: 'caroco-de-caminhao',
    title: 'Caroço de Caminhão',
    client: 'Tinta Tela',
    segment: 'books',
    kind: { pt: 'Livro infantil · capa', en: 'Children’s book · cover' },
    role: { pt: 'Projeto gráfico', en: 'Book design' },
    summary: {
      pt: 'Texto de Claudia Mascarenhas, ilustrações de Selma Maria.',
      en: 'Text by Claudia Mascarenhas, illustrations by Selma Maria.',
    },
    assets: [{ src: carocoCover, alt: 'Capa de "Caroço de Caminhão", editora Tinta Tela' }],
  },
  {
    id: 'depois-do-tremor',
    title: 'Depois do Tremor',
    segment: 'books',
    kind: { pt: 'Literatura · capa', en: 'Literary · cover' },
    role: { pt: 'Design de capa', en: 'Cover design' },
    summary: {
      pt: 'Jean Portante, tradução de Maria João Cantinho.',
      en: 'Jean Portante, translated by Maria João Cantinho.',
    },
    assets: [{ src: depoisDoTremorCover, alt: 'Capa de "Depois do Tremor", de Jean Portante' }],
  },
  {
    id: 'ensaio-bolano',
    title: 'Temporalidades da prostituição na obra de Roberto Bolaño',
    segment: 'books',
    kind: { pt: 'Livro acadêmico · miolo', en: 'Academic book · interior' },
    role: { pt: 'Projeto gráfico e diagramação', en: 'Book design and layout' },
    summary: {
      pt: 'Miolo de ensaio acadêmico: aberturas de capítulo numeradas e mancha de texto pensada para leitura longa.',
      en: 'Interior for an academic essay: numbered chapter openings and a text block built for long reading.',
    },
    assets: [{ src: bolanoSpread, alt: 'Página dupla com abertura do capítulo 1 do ensaio sobre Roberto Bolaño' }],
  },
  {
    id: 'intercultural',
    title: 'Work Experience USA',
    client: 'Intercultural',
    segment: 'institutional',
    kind: { pt: 'Folder · intercâmbio', en: 'Brochure · exchange programme' },
    role: { pt: 'Design gráfico', en: 'Graphic design' },
    summary: {
      pt: 'Folder do programa de trabalho nos EUA, com mapa de empregadores e modalidades.',
      en: 'Brochure for a US work-exchange programme, with an employer map and programme options.',
    },
    assets: [{ src: interculturalFolder, alt: 'Folder "Work Experience USA" aberto, com mapa dos Estados Unidos' }],
  },
  {
    id: 'native-boards',
    title: 'Native Boards',
    client: 'Native Boards',
    segment: 'illustration',
    kind: { pt: 'Ilustração · camisetas', en: 'Illustration · apparel' },
    role: { pt: 'Ilustração', en: 'Illustration' },
    summary: {
      pt: 'Ilustração de surfista para estampa de camisetas da marca.',
      en: 'Surfer illustration for the brand’s T-shirt print.',
    },
    assets: [
      { src: nativeIlustracao, alt: 'Ilustração em preto e branco de um surfista' },
      { src: nativeCamiseta, alt: 'Camiseta rosa com a ilustração do surfista, vestida à beira-mar' },
      { src: nativeCamisetas, alt: 'Camisetas rosa e azul com a ilustração do surfista' },
    ],
  },
  {
    id: 'primepork',
    title: 'Prime Pork',
    client: 'Prime Pork',
    year: '2026',
    segment: 'digital',
    kind: { pt: 'App web · controle de estoque', en: 'Web app · inventory' },
    role: { pt: 'Design de interface e construção', en: 'Interface design and build' },
    tools: ['React', 'Tailwind', 'Supabase'],
    summary: {
      pt: 'Sistema mobile-first para um pequeno produtor: estoque, compras, pedidos por cliente e mapa de clientes. Uso interno, com login.',
      en: 'Mobile-first system for a small food producer: stock, purchases, orders per client and a client map. Internal use, behind login.',
    },
    assets: [],
  },

  // --- Sem imagem publicável: lista compacta no fim do Arquivo -------------
  {
    id: 'editora-do-brasil',
    title: 'Editora do Brasil',
    client: 'Editora do Brasil',
    year: '2023 — 2026',
    segment: 'education',
    kind: { pt: 'Livros didáticos · PNLD', en: 'Textbooks · PNLD' },
    role: { pt: 'Edição de arte', en: 'Art editing' },
    summary: {
      pt: 'Edição de arte de livros para o PNLD: fluxo de arte em WoodWing, ilustradores e estúdios externos, projeto gráfico e especificações do edital. Material sob contrato.',
      en: 'Art editing of PNLD textbooks: WoodWing art workflow, external illustrators and studios, design system and tender specs. Under contract.',
    },
    assets: [],
  },
  {
    id: 'ingles-mackenzie',
    title: 'Coleção Inglês Mackenzie',
    partner: 'Lotus Estúdio',
    year: '2025',
    segment: 'education',
    kind: { pt: 'Coleção didática · inglês', en: 'Textbook series · English' },
    role: { pt: 'Diagramação', en: 'Layout' },
    summary: { pt: 'Diagramação de coleção didática de inglês.', en: 'Layout of an English-language textbook series.' },
    assets: [],
  },
];

export const caseStudies = projects.filter((p) => p.caseStudy);
export const archive = projects.filter((p) => !p.caseStudy);

/** Imagens que abrem o site, na capa. */
export const coverImages: ProjectAsset[] = [
  { src: albertinaCover, alt: 'Caixa e capa de "Começando Albertina"' },
  { src: josaparReceita1, alt: 'Página dupla do livreto Arroz Tio João' },
  { src: mentalidadesAlcance, alt: 'Página de dados do relatório Mentalidades Matemáticas' },
  { src: poliedroCover, alt: 'Cadernos Poliedro de pré-vestibular' },
];
