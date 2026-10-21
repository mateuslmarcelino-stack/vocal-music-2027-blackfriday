import { SongSample, MonthAvailability } from '../types';

export const SONG_SAMPLES: SongSample[] = [
  {
    id: 'sample-1',
    title: 'Marcha Nupcial + A Thousand Years',
    moment: 'Entrada da Noiva',
    instruments: 'Voz Solista, Violino, Violoncelo & Piano',
    duration: '0:35 demo',
    melodyType: 'march',
    description: 'O momento mais solene e aguardado da celebração. Arrepios e lágrimas garantidos com nossa harmonia orquestral.'
  },
  {
    id: 'sample-2',
    title: 'Pachelbel Canon in D',
    moment: 'Entrada dos Padrinhos & Noivo',
    instruments: 'Quarteto de Cordas & Teclado',
    duration: '0:38 demo',
    melodyType: 'canon',
    description: 'Elegância clássica e acolhedora que prepara a atmosfera e o coração de cada convidado.'
  },
  {
    id: 'sample-3',
    title: 'Hallelujah & Stand By Me',
    moment: 'Votos, Alianças & Bênção',
    instruments: 'Duo Vocal com Violoncelo e Harmonia',
    duration: '0:42 demo',
    melodyType: 'romantic',
    description: 'Sensibilidade acústica intimista que dá destaque total à voz dos noivos e ao compromisso do altar.'
  },
  {
    id: 'sample-4',
    title: 'Viva La Vida / Pra Você Guardei o Amor',
    moment: 'Saída Triunfal dos Recém-Casados',
    instruments: 'Orquestra, Metais Triunfais & Percussão Acústica',
    duration: '0:32 demo',
    melodyType: 'celebration',
    description: 'Explosão de alegria, palmas e celebração com o impacto sonoro e energia contagiante da nossa equipe.'
  }
];

export const MONTHS_2027: MonthAvailability[] = [
  {
    month: 'Janeiro 2027',
    monthIndex: 1,
    season: 'Verão',
    demandStatus: 'Últimas Vagas',
    percentageFilled: 75,
    availableDates: 3,
    note: 'Destino praia e finais de tarde ensolarados'
  },
  {
    month: 'Fevereiro 2027',
    monthIndex: 2,
    season: 'Verão / Pós-Carnaval',
    demandStatus: 'Últimas Vagas',
    percentageFilled: 70,
    availableDates: 4,
    note: 'Casamentos intimistas e ao ar livre'
  },
  {
    month: 'Março 2027',
    monthIndex: 3,
    season: 'Início do Outono',
    demandStatus: 'Alta Procura',
    percentageFilled: 80,
    availableDates: 3,
    note: 'Clima ameno muito procurado para casamentos no campo'
  },
  {
    month: 'Abril 2027',
    monthIndex: 4,
    season: 'Outono',
    demandStatus: 'Alta Procura',
    percentageFilled: 85,
    availableDates: 2,
    note: 'Feriados concorridos e baixa probabilidade de chuva'
  },
  {
    month: 'Maio 2027',
    monthIndex: 5,
    season: 'Mês das Noivas',
    demandStatus: 'Quase Esgotado',
    percentageFilled: 92,
    availableDates: 1,
    note: 'Historicamente o mês mais tradicional do ano'
  },
  {
    month: 'Junho 2027',
    monthIndex: 6,
    season: 'Inverno Aconchegante',
    demandStatus: 'Últimas Vagas',
    percentageFilled: 65,
    availableDates: 4,
    note: 'Lareiras, vinhos e celebrações sofisticadas'
  },
  {
    month: 'Julho 2027',
    monthIndex: 7,
    season: 'Inverno',
    demandStatus: 'Últimas Vagas',
    percentageFilled: 70,
    availableDates: 3,
    note: 'Férias de convidados e casamentos de serra'
  },
  {
    month: 'Agosto 2027',
    monthIndex: 8,
    season: 'Transição Inverno/Primavera',
    demandStatus: 'Últimas Vagas',
    percentageFilled: 75,
    availableDates: 3,
    note: 'Excelente custo-benefício em locais'
  },
  {
    month: 'Setembro 2027',
    monthIndex: 9,
    season: 'Início da Primavera',
    demandStatus: 'Quase Esgotado',
    percentageFilled: 94,
    availableDates: 1,
    note: 'A temporada nobre das flores e casamentos ao ar livre'
  },
  {
    month: 'Outubro 2027',
    monthIndex: 10,
    season: 'Primavera',
    demandStatus: 'Quase Esgotado',
    percentageFilled: 90,
    availableDates: 2,
    note: 'Altíssima concorrência em todos os sábados'
  },
  {
    month: 'Novembro 2027',
    monthIndex: 11,
    season: 'Primavera / Pré-Verão',
    demandStatus: 'Alta Procura',
    percentageFilled: 85,
    availableDates: 2,
    note: 'Feriados prolongados perfeitos para Destination Wedding'
  },
  {
    month: 'Dezembro 2027',
    monthIndex: 12,
    season: 'Festas de Fim de Ano',
    demandStatus: 'Alta Procura',
    percentageFilled: 88,
    availableDates: 2,
    note: 'Clima de celebração e reencontro familiar'
  }
];

export const FAQS = [
  {
    q: 'Por que reservar os músicos do casamento de 2027 já em 2026?',
    a: 'Por dois motivos cruciais: 1) Escassez de agenda: ao contrário de buffets gigantes, a equipe musical titular da Vocal Music e nossa estrutura técnica de som só conseguem estar em um evento por turno para assegurar padrão de excelência de orquestra; 2) Proteção financeira: quem fecha na Black Friday congela a tabela de valores de 2026/2027 sem os reajustes de inflação dos próximos anos, além de receber o desconto e bônus da Black Friday.'
  },
  {
    q: 'Como funciona a live de 12 de Novembro às 20h?',
    a: 'Será um encontro online e exclusivo de cerca de 45 minutos. Vamos mostrar como planejar a trilha sonora perfeita para cada momento (sem erros que arruínem a entrada dos noivos), tocar ao vivo e revelar a condição especial de Black Friday e o pacote com sonorização completa inclusa. As reservas abrirão logo em seguida com prioridade para o Grupo VIP.'
  },
  {
    q: 'O que está incluso na estrutura de sonorização?',
    a: 'Tudo! Levamos caixas de som de alta fidelidade para cerimônia e recepção, microfones sem fio de padrão profissional (para celebrante, votos dos noivos e leituras), mesa de som digital e técnico especializado durante todo o evento. Você não precisa contratar empresa terceira de som nem se preocupar com microfone falhando no momento do sim.'
  },
  {
    q: 'O que o Grupo VIP do WhatsApp tem de diferente?',
    a: 'O grupo é SILENCIOSO e restrito a administradores (sem mensagens invasivas de outros membros ou spam). No grupo você recebe em primeira mão os repertórios mais pedidos, o link exclusivo da live e, mais importante: terá prioridade na abertura das vagas antes do público geral.'
  },
  {
    q: 'E se a data do meu casamento mudar em 2027?',
    a: 'Nossos contratos possuem cláusula flexível de readequação de data para 2027 mediante aviso prévio e disponibilidade de agenda, garantindo tranquilidade total para o casal.'
  },
  {
    q: 'Posso personalizar todas as músicas da cerimônia?',
    a: 'Sim, 100%! Temos uma curadoria especializada com mais de 500 casamentos realizados. Criamos arranjos exclusivos para a música que marcou o primeiro beijo, a canção de infância ou o clássico sagrado que sua família ama.'
  }
];

export const TESTIMONIALS = [
  {
    names: 'Camila & Gabriel',
    venue: 'Espaço Serra do Mar',
    date: 'Casamento Realizado',
    quote: 'A entrada com a marcha e o violino fez até meu pai chorar copiosamente. O som estava impecável, cada palavra dos votos foi ouvida com clareza cristalina por todos os 250 convidados. A Vocal Music foi a melhor escolha do nosso casamento!',
    formation: 'Orquestra com Cordas, Trompete Triunfal e Sonorização Completa'
  },
  {
    names: 'Larissa & Mateus',
    venue: 'Fazenda Santa Bárbara',
    date: 'Casamento Realizado',
    quote: 'Fechamos com bastante antecedência e foi a coisa mais inteligente que fizemos. Ficamos tranquilos sabendo que os melhores músicos e toda a estrutura técnica já estavam reservados só para nós. No dia foi pura magia.',
    formation: 'Voz Solista, Cello, Piano e Sonorização Externa'
  },
  {
    names: 'Beatriz & Rodrigo',
    venue: 'Villa Bisutti',
    date: 'Casamento Realizado',
    quote: 'Quando eles tocaram no momento da nossa saída, o salão inteiro veio abaixo em aplausos. Energia surreal, afinação perfeita e atendimento impecável desde o primeiro dia.',
    formation: 'Sexteto de Cordas & Metais + Som Digital'
  }
];
