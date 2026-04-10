import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const newsItems = [
    {
      title: "ALAGOA É DESTAQUE NA PRODUÇÃO DE BIOENERGIA DO NORDESTE",
      slug: "alagoas-destaque-bioenergia",
      excerpt: "Com investimentos em novas tecnologias, o estado consolida sua liderança na transição energética.",
      content: "Alagoas vem se consolidando como um dos principais hubs de bioenergia no Nordeste... O setor sucroenergético tem sido fundamental para o desenvolvimento econômico da região, gerando milhares de empregos diretos e indiretos.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600",
      category: "Sustentabilidade",
      status: "PUBLICO",
      authorName: "Redação Paisa",
      tags: "bioenergia, alagoas, sustentabilidade",
      publishedAt: new Date()
    },
    {
      title: "DRONES REVOLUCIONAM O MANEJO DE PRAGAS NOS CANAVIAIS",
      slug: "drones-manejo-pragas",
      excerpt: "Monitoramento aéreo permite redução de até 30% no uso de defensivos agrícolas.",
      content: "A utilização de drones para o sensoriamento remoto e pulverização dirigida está transformando o manejo no campo... Essa tecnologia permite identificar pontos críticos de infestação antes que eles se espalhem por toda a plantação.",
      image: "https://images.unsplash.com/photo-1508197149814-0cc02e8b7f74?auto=format&fit=crop&q=80&w=1600",
      category: "Tecnologia",
      status: "PUBLICO",
      authorName: "Eng. Agrônomo Silva",
      tags: "drones, agrotech, precisao",
      publishedAt: new Date()
    },
    {
      title: "USINA PAISA RECEBE CERTIFICAÇÃO RENOVABIO PELO TERCEIRO ANO",
      slug: "certificacao-renovabio-paisa",
      excerpt: "Reconhecimento valida o compromisso da unidade com a redução de emissões de carbono.",
      content: "A Usina Paisa conquistou novamente a nota máxima na certificação do programa Renovabio... Isso reafirma nossa posição de vanguarda no mercado de créditos de descarbonização (CBIOs).",
      image: "https://images.unsplash.com/photo-1473976192922-8fe22ce98e44?auto=format&fit=crop&q=80&w=1600",
      category: "ESG",
      status: "PUBLICO",
      authorName: "Comunicação Paisa",
      tags: "renovabio, esg, carbono",
      publishedAt: new Date()
    },
    {
      title: "ABERTURA DA SAFRA 22924/25 PROMETE NÚMEROS RECORDE",
      slug: "abertura-safra-2024-25",
      excerpt: "Expectativa é de uma moagem 15% superior ao período anterior devido às condições climáticas favoráveis.",
      content: "O evento oficial de abertura da safra 2024/25 reuniu lideranças do setor em Penedo... Os especialistas apontam que a distribuição de chuvas durante o período vegetativo foi ideal para o desenvolvimento das soqueiras.",
      image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=1600",
      category: "Produção",
      status: "PUBLICO",
      authorName: "Mural Paisa",
      tags: "safra, canadeacucar, producao",
      publishedAt: new Date()
    },
    {
      title: "INVISTA EM TREINAMENTO: O FUTURO DO TRABALHO NO AGRO",
      slug: "treinamento-futuro-agro",
      excerpt: "Operação de maquinário pesado e sistemas inteligentes exige qualificação constante da mão de obra.",
      content: "A capacitação técnica é o maior diferencial competitivo para o profissional do agronegócio moderno... Novas turmas de qualificação serão abertas no SENAI local para atender a demanda das usinas.",
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1600",
      category: "Educação",
      status: "PUBLICO",
      authorName: "RH Paisa",
      tags: "treinamento, carreira, agro",
      publishedAt: new Date()
    }
  ];

  for (const item of newsItems) {
    await prisma.news.create({ data: item });
  }

  console.log('5 news items seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
