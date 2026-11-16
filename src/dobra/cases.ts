import type { Lang } from './copy';

/* ------------------------------------------------------------------ */
/* Case completo (segunda camada de leitura da ficha de projeto).       */
/* A ficha curta em copy.ts responde em 30 segundos; aqui fica o        */
/* raciocínio: processo, descoberta, decisões e aprendizados.           */
/* Prime Pork: fatos conferidos no repositório e confirmados pela       */
/* Bruna em 2026-11-16. Sem números da empresa (dados privados do       */
/* cliente); as telas usam dados fictícios.                             */
/* ------------------------------------------------------------------ */
export interface CaseSection {
  title: string;
  /** parágrafos corridos */
  body?: string[];
  /** lista simples (numerada quando `ordered`) */
  items?: string[];
  ordered?: boolean;
  /** itens com rótulo: recurso, entrega, etapa */
  entries?: { label: string; text: string; meta?: string }[];
  /** grupos com lista curta (ex.: Negócio, Usuário, Time) */
  groups?: { label: string; items: string[] }[];
}

export interface LongCase {
  open: string;
  close: string;
  note: string;
  sections: CaseSection[];
}

const primeporkPt: LongCase = {
  open: 'Ler o case completo',
  close: 'Fechar o case',
  note: 'As telas mostram dados fictícios. Os dados da operação são privados e não aparecem neste case.',
  sections: [
    {
      title: 'Contexto',
      body: [
        'A Prime Pork é uma distribuidora de torresmo de rolo sediada em São Paulo, que atende principalmente bares da cidade. Toda a gestão operacional, de clientes e pedidos a estoque, produção e prazos de pagamento, era feita em planilhas de Excel mantidas pela equipe.',
        'Em conversa com a diretoria, três limites ficaram claros: a planilha não sinaliza exceções, não garante integridade nem atualização dos dados entre quem a edita, e exige interpretação manual a cada decisão.',
      ],
    },
    {
      title: 'Desafio',
      body: [
        'A premissa era substituir a planilha preservando integralmente os dados e as regras de cálculo que a empresa já praticava. Não havia equipe de tecnologia nem infraestrutura própria, o que restringiu a arquitetura a serviços gerenciados, sem backend dedicado.',
        'O uso principal era no celular, durante a operação, com consulta analítica eventual no desktop. A diretoria foi explícita quanto ao que não queria: reaprender o próprio negócio em outro vocabulário ou em outra lógica de estoque.',
      ],
    },
    {
      title: 'Meu papel',
      body: [
        'Conduzi o projeto de ponta a ponta: levantamento com a diretoria, análise da planilha, modelagem de dados, definição das regras de alerta, arquitetura de informação, identidade visual, interface e publicação.',
        'A implementação foi feita com Claude Code. As decisões de produto, de modelagem e de interface foram minhas, validadas em uso a cada iteração. A diretoria atuou como fonte das regras de negócio e como validadora dos resultados contra o controle original.',
      ],
    },
    {
      title: 'Solução',
      body: ['Os quatro recursos centrais derivam de atritos levantados com a diretoria ou identificados na análise da planilha.'],
      entries: [
        {
          label: 'Alertas de estoque',
          text: 'O painel sinaliza saldo abaixo do mínimo definido pela empresa, saldo insuficiente para a demanda já comprometida e proximidade de ruptura, projetada pelo ritmo recente de vendas.',
        },
        {
          label: 'Recebíveis por cliente',
          text: 'Prazo e preço são atributos do cliente. Cada pedido herda essas condições, gera o próprio vencimento e compõe a posição financeira daquele cliente e a da empresa.',
        },
        {
          label: 'Previsão de recompra',
          text: 'O intervalo médio entre pedidos funciona como estimativa do consumo de cada bar. A partir dele o sistema projeta a próxima compra e sinaliza quem está perto de ficar sem produto e quem já deveria ter pedido.',
        },
        {
          label: 'Leitura territorial da carteira',
          text: 'O mapa distribui os clientes pela cidade com o estado de recompra de cada um, o que expõe a concentração da operação e as regiões ainda não atendidas.',
        },
      ],
    },
    {
      title: 'Resultados',
      entries: [
        { label: 'Gestão por exceção', text: 'A diretoria deixa de percorrer o registro em busca de problemas; o painel apresenta o que exige ação.' },
        { label: 'Antecipação de ruptura', text: 'A reposição passa a ser decidida pela projeção de consumo, não pela constatação da falta.' },
        { label: 'Inadimplência visível', text: 'Valores vencidos ganham destaque próprio na tela inicial, distintos do contas a receber corrente.' },
        { label: 'Território como dado', text: 'A cobertura da operação, antes implícita em uma lista de endereços, torna-se visível e passa a orientar a prospecção.' },
      ],
    },
    {
      title: 'Processo',
      ordered: true,
      entries: [
        { label: 'Levantar o contexto com a diretoria', text: 'Entendi como o controle era operado e onde falhava.', meta: 'Conversas diretas com a diretoria' },
        { label: 'Analisar a planilha como especificação', text: 'Tratei cada aba e cada fórmula como regra de negócio a preservar.', meta: 'Ferramentas: Excel' },
        { label: 'Modelar os dados', text: 'Converti as abas em entidades relacionadas, com restrições de integridade.', meta: 'Ferramentas: Supabase (Postgres)' },
        { label: 'Projetar e publicar uma primeira versão', text: 'Validei arquitetura de informação e fluxo no celular com dados de demonstração.', meta: 'Ferramentas: Pinterest (referências), Claude Code, React, Tailwind, GitHub Pages' },
        { label: 'Migrar a base real', text: 'A importação foi feita por script, sem transcrição manual.', meta: 'Ferramentas: SQL' },
        { label: 'Reconciliar com o controle original', text: 'Confrontei o sistema com a planilha e revisei as regras divergentes.', meta: 'Ferramentas: Excel, navegador' },
      ],
    },
    {
      title: 'Descoberta',
      body: [
        'A investigação combinou conversas com a diretoria e análise das planilhas em uso. Não houve pesquisa com amostra ampla: é um sistema interno, com poucos usuários e acesso direto a quem decide.',
        'O achado central foi que a empresa não tinha um problema de falta de dado, e sim de dado inerte. Isso estabeleceu o critério que orientou o restante do projeto: nenhum campo novo para a equipe preencher; todo alerta deveria ser derivado do que já era registrado.',
      ],
    },
    {
      title: 'Atritos e insights',
      ordered: true,
      items: [
        'Ausência de sinalização: estoque crítico, pagamento vencido e cliente inativo só eram percebidos por consulta ativa.',
        'Integridade e sincronia dos dados dependiam da disciplina de quem editava a planilha.',
        'Pedidos, estoque e produção eram registros isolados, sem relação estrutural entre si.',
        'O modelo convencional de estoque (compras menos vendas) divergia do método de apuração praticado pela empresa.',
        'O prazo de pagamento, expresso em dias corridos a partir do pedido, era ambíguo fora do contexto de quem o lançou.',
        'A nomenclatura inicial do sistema (“venda”) não correspondia à da operação (“pedido”).',
      ],
    },
    {
      title: 'Entregas',
      entries: [
        {
          label: 'Modelo de dados',
          text: 'As abas foram convertidas em entidades relacionadas: clientes, pedidos, compras de matéria-prima, livro de estoque, produção diária e configurações. A integridade passou a ser garantida pelo banco, com chaves estrangeiras, restrições de domínio, acesso autenticado e trilha de autoria e data em cada registro.',
          meta: 'Atritos 2 e 3',
        },
        {
          label: 'Estado derivado',
          text: 'A decisão de modelagem mais relevante foi não persistir nenhum status que dependa do tempo. “Atrasado” é calculado na leitura, a partir do vencimento e da data corrente; a previsão de recompra, a partir do histórico de pedidos. Gravar o status e atualizá-lo reintroduziria o problema original: um dado que envelhece sem que ninguém perceba.',
          meta: 'Atritos 1 e 2',
        },
        {
          label: 'Painel',
          text: 'A hierarquia da tela inicial foi organizada por necessidade de ação, não por módulo do sistema. Atalhos de navegação duplicados saíram em favor de indicadores de estoque, financeiro e carteira. O limite mínimo de estoque é parametrizável pela própria diretoria.',
          meta: 'Atrito 1',
        },
        {
          label: 'Estoque',
          text: 'A primeira versão adotava o modelo convencional e não reconciliava com a planilha. Optei por reproduzir o método da empresa: partir do último saldo apurado e ajustar por produção finalizada e pedidos entregues. Abri mão de um modelo mais completo em troca de um número que a diretoria reconhece e em que confia.',
          meta: 'Atrito 4',
        },
        {
          label: 'Recebíveis',
          text: 'As condições comerciais deixaram de ser anotação e passaram a ser regra: o prazo cadastrado no cliente determina o vencimento de cada pedido no momento do registro. A posição financeira é apresentada em três estados, pago, previsto e atrasado, sendo o último sempre derivado da data corrente.',
          meta: 'Atritos 1, 5 e 6',
        },
        {
          label: 'Ficha do cliente',
          text: 'Reúne condições comerciais, histórico de pedidos e os indicadores de comportamento: data e volume da última compra e intervalo médio entre compras. Optei por inferir o consumo a partir do histórico em vez de pedir à equipe uma estimativa por cliente. A limitação é conhecida: a previsão só existe a partir do segundo pedido e pressupõe regularidade.',
          meta: 'Atrito 1',
        },
        {
          label: 'Mapa',
          text: 'Os endereços são geocodificados no cadastro, e a carteira é apresentada sobre a cidade com a mesma codificação de cor dos demais indicadores. A visão serve a dois usos: priorizar contato e rota entre clientes próximos da recompra, e identificar onde a empresa ainda não tem presença.',
          meta: 'Atrito 1',
        },
      ],
    },
    {
      title: 'Impacto',
      groups: [
        {
          label: 'Negócio',
          items: [
            'Reposição de matéria-prima planejada pela projeção de consumo, com menor exposição a ruptura.',
            'Cobrança orientada por vencimento, com efeito direto sobre o ciclo de caixa.',
            'Retenção e prospecção tratadas de forma preventiva, pelo desvio de comportamento de cada cliente e pela cobertura da cidade.',
          ],
        },
        {
          label: 'Usuário',
          items: [
            'A diretoria decide a partir de exceções sinalizadas, sem leitura interpretativa de abas.',
            'A equipe opera sobre uma base única e consistente.',
            'A adoção não exigiu mudança de vocabulário nem de raciocínio de apuração.',
          ],
        },
        {
          label: 'Time',
          items: [
            'Parâmetros de negócio são ajustados pela própria diretoria, sem intervenção técnica.',
            'A publicação é automatizada, o que permite evolução contínua sem interromper o uso.',
          ],
        },
      ],
    },
    {
      title: 'Aprendizados',
      items: [
        'Em sistemas que substituem um controle existente, o artefato legado é a especificação. Ter começado pela interface custou o retrabalho do modelo de estoque.',
        'Fidelidade ao modelo mental do usuário pode valer mais que correção técnica. O método da empresa era menos completo e era o único em que ela confiava.',
        'Estado que depende de tempo deve ser derivado, não armazenado.',
        'O mapa mostra onde a empresa está, e a ausência indica onde não está. O passo seguinte é registrar potenciais clientes como entidade própria e enviar os alertas por notificação diária; ambos ficaram fora do escopo entregue.',
      ],
    },
  ],
};

const primeporkEn: LongCase = {
  open: 'Read the full case study',
  close: 'Close the case study',
  note: 'Screens show fictitious data. The company’s operating data is private and does not appear in this case study.',
  sections: [
    {
      title: 'Context',
      body: [
        'Prime Pork is a São Paulo–based distributor of rolled pork crackling (torresmo de rolo), serving mainly the city’s bars. All operations, from clients and orders to stock, production and payment terms, were managed in Excel spreadsheets kept by the team.',
        'Talking to the directors made three limits clear: a spreadsheet does not flag exceptions, does not guarantee data integrity or freshness across the people editing it, and demands manual interpretation for every decision.',
      ],
    },
    {
      title: 'Challenge',
      body: [
        'The premise was to replace the spreadsheet while fully preserving the data and the calculation rules the company already used. There was no technology team and no infrastructure of its own, which limited the architecture to managed services with no dedicated backend.',
        'Primary use was on mobile, during operations, with occasional analytical use on desktop. The directors were explicit about what they did not want: to relearn their own business in a different vocabulary or a different stock logic.',
      ],
    },
    {
      title: 'My role',
      body: [
        'I led the project end to end: discovery with the directors, spreadsheet analysis, data modelling, alert rules, information architecture, visual identity, interface and release.',
        'Implementation was done with Claude Code. Product, modelling and interface decisions were mine, validated in use at every iteration. The directors were the source of the business rules and validated the results against the original records.',
      ],
    },
    {
      title: 'Solution',
      body: ['The four core features come from friction points raised by the directors or found in the spreadsheet analysis.'],
      entries: [
        {
          label: 'Stock alerts',
          text: 'The dashboard flags stock below the minimum set by the company, stock that does not cover committed demand, and an approaching stock-out projected from the recent sales rate.',
        },
        {
          label: 'Receivables per client',
          text: 'Payment term and price are attributes of the client. Each order inherits them, generates its own due date and feeds that client’s and the company’s financial position.',
        },
        {
          label: 'Reorder forecast',
          text: 'The average interval between orders works as an estimate of each bar’s consumption. From it the system projects the next purchase and flags who is about to run out and who should already have ordered.',
        },
        {
          label: 'Territorial view of the client base',
          text: 'The map places clients across the city with each one’s reorder state, exposing where the operation is concentrated and which areas are not yet served.',
        },
      ],
    },
    {
      title: 'Results',
      entries: [
        { label: 'Management by exception', text: 'The directors no longer scan records looking for problems; the dashboard shows what needs action.' },
        { label: 'Stock-outs anticipated', text: 'Replenishment is decided by projected consumption, not by noticing the shortage.' },
        { label: 'Overdue payments visible', text: 'Overdue amounts get their own place on the home screen, separate from receivables still within term.' },
        { label: 'Territory as data', text: 'Coverage, once implicit in a list of addresses, becomes visible and starts to guide prospecting.' },
      ],
    },
    {
      title: 'Process',
      ordered: true,
      entries: [
        { label: 'Gather context with the directors', text: 'I learned how the records were run and where they failed.', meta: 'Direct conversations with the directors' },
        { label: 'Read the spreadsheet as a specification', text: 'I treated every tab and formula as a business rule to preserve.', meta: 'Tools: Excel' },
        { label: 'Model the data', text: 'I turned the tabs into related entities with integrity constraints.', meta: 'Tools: Supabase (Postgres)' },
        { label: 'Design and release a first version', text: 'I validated the information architecture and the mobile flow with demo data.', meta: 'Tools: Pinterest (references), Claude Code, React, Tailwind, GitHub Pages' },
        { label: 'Migrate the real data', text: 'The import was scripted, with no manual transcription.', meta: 'Tools: SQL' },
        { label: 'Reconcile with the original records', text: 'I checked the system against the spreadsheet and revised the rules that diverged.', meta: 'Tools: Excel, browser' },
      ],
    },
    {
      title: 'Discovery',
      body: [
        'Research combined conversations with the directors and analysis of the spreadsheets in use. There was no broad-sample research: this is an internal system with few users and direct access to the decision-makers.',
        'The central finding was that the company did not lack data; its data was inert. That set the criterion for the rest of the project: no new field for the team to fill in, and every alert derived from what was already being recorded.',
      ],
    },
    {
      title: 'Friction and insights',
      ordered: true,
      items: [
        'No signalling: critical stock, overdue payments and inactive clients were only noticed when someone went looking.',
        'Data integrity and synchronisation depended on the discipline of whoever edited the spreadsheet.',
        'Orders, stock and production were isolated records with no structural relationship.',
        'The conventional stock model (purchases minus sales) diverged from the method the company actually used.',
        'The payment term, expressed in calendar days from the order date, was ambiguous outside the context of whoever entered it.',
        'The system’s initial wording (“sale”) did not match the operation’s (“order”).',
      ],
    },
    {
      title: 'Deliverables',
      entries: [
        {
          label: 'Data model',
          text: 'The tabs became related entities: clients, orders, raw-material purchases, stock ledger, daily production and settings. Integrity is now enforced by the database, with foreign keys, domain constraints, authenticated access and an author-and-date trail on every record.',
          meta: 'Friction 2 and 3',
        },
        {
          label: 'Derived state',
          text: 'The most consequential modelling decision was not to persist any status that depends on time. “Overdue” is computed on read from the due date and today’s date; the reorder forecast, from order history. Storing and updating the status would bring back the original problem: data that ages without anyone noticing.',
          meta: 'Friction 1 and 2',
        },
        {
          label: 'Dashboard',
          text: 'The home screen hierarchy is organised by need for action, not by system module. Duplicate navigation shortcuts gave way to stock, financial and client indicators. The minimum stock threshold is set by the directors themselves.',
          meta: 'Friction 1',
        },
        {
          label: 'Stock',
          text: 'The first version used the conventional model and did not reconcile with the spreadsheet. I chose to reproduce the company’s method: start from the last counted balance and adjust for finished production and delivered orders. I traded a more complete model for a number the directors recognise and trust.',
          meta: 'Friction 4',
        },
        {
          label: 'Receivables',
          text: 'Commercial terms stopped being a note and became a rule: the term registered for the client sets each order’s due date at entry. The financial position is shown in three states, paid, expected and overdue, the last always derived from today’s date.',
          meta: 'Friction 1, 5 and 6',
        },
        {
          label: 'Client record',
          text: 'It brings together commercial terms, order history and behaviour indicators: date and volume of the last purchase and average interval between purchases. I chose to infer consumption from history rather than ask the team for an estimate per client. The limitation is known: the forecast only exists from the second order on and assumes regularity.',
          meta: 'Friction 1',
        },
        {
          label: 'Map',
          text: 'Addresses are geocoded at registration, and the client base is shown over the city with the same colour coding as the other indicators. The view serves two uses: prioritising contact and routes among clients close to reordering, and identifying where the company is not yet present.',
          meta: 'Friction 1',
        },
      ],
    },
    {
      title: 'Impact',
      groups: [
        {
          label: 'Business',
          items: [
            'Raw-material replenishment planned from projected consumption, with less exposure to stock-outs.',
            'Collection driven by due dates, with a direct effect on the cash cycle.',
            'Retention and prospecting handled preventively, from each client’s deviation in behaviour and from city coverage.',
          ],
        },
        {
          label: 'User',
          items: [
            'The directors decide from flagged exceptions, without interpreting tabs.',
            'The team works on a single, consistent base.',
            'Adoption required no change of vocabulary or of stock reasoning.',
          ],
        },
        {
          label: 'Team',
          items: [
            'Business parameters are adjusted by the directors, with no technical intervention.',
            'Releases are automated, allowing continuous evolution without interrupting use.',
          ],
        },
      ],
    },
    {
      title: 'Learnings',
      items: [
        'In systems that replace an existing control, the legacy artefact is the specification. Starting from the interface cost a rework of the stock model.',
        'Fidelity to the user’s mental model can be worth more than technical correctness. The company’s method was less complete, and it was the only one it trusted.',
        'State that depends on time should be derived, not stored.',
        'The map shows where the company is, and absence shows where it is not. The next step is to register prospects as their own entity and to send alerts as a daily notification; both stayed outside the delivered scope.',
      ],
    },
  ],
};

export const longCases: Record<string, Partial<Record<Lang, LongCase>>> = {
  primepork: { pt: primeporkPt, en: primeporkEn },
};

/** es e fr usam o texto em inglês até terem tradução própria. */
export function longCaseFor(id: string, lang: Lang): LongCase | undefined {
  const byLang = longCases[id];
  return byLang?.[lang] ?? byLang?.en;
}
