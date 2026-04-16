import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando Seeding do Banco de Dados...');

  const commonPassword = await bcrypt.hash('Paisa@2024!Secure', 10);
  const adminPassword = await bcrypt.hash('Paisa@2024!Secure#Admin#Industrial', 10);

  // 1. Criar Usuários Administrativos
  const users = [
    {
      username: 'admin_paisa',
      name: 'Admin Paisa Master',
      role: 'ADMIN',
      password: adminPassword,
    },
    {
      username: 'secretaria_paisa',
      name: 'Secretaria Paisa',
      role: 'SECRETARIA',
      password: commonPassword,
    },
    {
      username: 'psicologia_paisa',
      name: 'Equipe Psicologia',
      role: 'PSICOLOGA',
      password: commonPassword,
    },
    {
      username: 'gestor_rh_paisa',
      name: 'Gestor RH Paisa',
      role: 'GESTOR_RH',
      password: commonPassword,
    }
  ];

  for (const userData of users) {
    try {
      const user = await prisma.user.upsert({
        where: { username: userData.username },
        update: {
          name: userData.name,
          role: userData.role,
          password: userData.password,
        },
        create: userData,
      });
      console.log(`✅ USUÁRIO PRONTO: ${user.username} (Senha Master Aplicada)`);
    } catch (err) {
      console.error(`❌ Erro ao criar usuário ${userData.username}:`, err);
    }
  }

  // 2. Criar Notícias Iniciais (Se o banco estiver vazio)
  const newsCount = await prisma.news.count();
  if (newsCount === 0) {
    await prisma.news.createMany({
      data: [
        {
          title: "USINA PAISA LIDERA SUSTENTABILIDADE NO NORDESTE",
          slug: "sustentabilidade-paisa-destaque",
          excerpt: "Novas certificações confirmam o compromisso ambiental da unidade.",
          content: "A Usina Paisa atingiu recordes históricos em redução de emissão de carbono...",
          category: "ESG",
          status: "PUBLICO",
          authorName: "Comunicação Paisa",
        },
        {
            title: "TECNOLOGIA NO CAMPO: DRONES E IA NA SAFRA",
            slug: "tecnologia-campo-drones",
            excerpt: "Monitoramento em tempo real aumenta a eficiência da produção.",
            content: "O uso de inteligência artificial aplicada ao monitoramento de pragas...",
            category: "Tecnologia",
            status: "PUBLICO",
            authorName: "TI Paisa",
        }
      ]
    });
    console.log('✅ Notícias iniciais criadas.');
  }

  // 3. Criar Vagas Iniciais
  const jobCount = await prisma.job.count();
  if (jobCount === 0) {
    await prisma.job.createMany({
      data: [
        {
          title: "Operador de Máquinas",
          area: "Operacional",
          location: "Unidade Alagoas",
          type: "CLT - Presencial",
          description: "Operação de colhedoras e tratores de grande porte.",
          status: "PUBLICO"
        },
        {
            title: "Analista de RH",
            area: "Administrativo",
            location: "Escritório Central",
            type: "CLT - Híbrido",
            description: "Gestão de talentos e processos seletivos.",
            status: "PUBLICO"
        }
      ]
    });
    console.log('✅ Vagas iniciais criadas.');
  }

  // 4. Criar Atendimentos Iniciais (Se o banco estiver vazio)
  const consultationCount = await prisma.consultation.count();
  if (consultationCount === 0) {
    await prisma.consultation.createMany({
      data: [
        {
          employeeName: 'Ricardo Silva',
          employeeRegistration: '254585',
          employeeRole: 'Operador de Moagem • Setor A',
          type: 'INDIVIDUAL',
          category: 'PSICOLOGIA',
          status: 'REALIZADO',
          date: new Date('2026-04-10T09:30:00'),
          observation: 'Atendimento de rotina e acompanhamento psicológico.',
        },
        {
          employeeName: 'Ana Maria Oliveira',
          employeeRegistration: '252426',
          employeeRole: 'Administrativo • RH',
          type: 'GRUPO',
          category: 'RH',
          status: 'AGENDADO',
          date: new Date('2026-04-18T14:00:00'),
          observation: 'Integração técnica e operacional - Novos Colaboradores.',
        },
        {
          employeeName: 'Carlos Eduardo Santos',
          employeeRegistration: '258974',
          employeeRole: 'Gerente Operacional',
          type: 'URGENCIA',
          category: 'PSICOLOGIA',
          status: 'PENDENTE',
          date: new Date('2026-04-16T10:00:00'),
          observation: 'Acompanhamento de estresse agudo pós-safra.',
        }
      ]
    });
    console.log('✅ Atendimentos iniciais criados.');
  }

  // 5. Unidades de Trabalho
  const unitCount = await prisma.unit.count();
  if (unitCount === 0) {
    await prisma.unit.createMany({
      data: [
        { name: 'USINA PAISA - MATRIZ', location: 'Penedo, AL', status: 'ATIVO' },
        { name: 'FILIAL ALAGOAS - CAMPO', location: 'Coruripe, AL', status: 'ATIVO' }
      ]
    });
    console.log('✅ Unidades iniciais criadas.');
  }

  // 6. Funcionários (Amostra)
  const employeeCount = await prisma.employee.count();
  if (employeeCount === 0) {
    const unit = await prisma.unit.findFirst();
    if (unit) {
      await prisma.employee.createMany({
        data: [
          {
            name: 'João Carlos Pereira',
            registration: '254001',
            role: 'Operador Especialista',
            unitId: unit.id,
            email: 'joao@paisa.com.br',
            status: 'ATIVO',
            admissionDate: new Date('2022-01-15'),
          },
          {
            name: 'Maria Clara Souza',
            registration: '254002',
            role: 'Analista Administrativo',
            unitId: unit.id,
            email: 'maria@paisa.com.br',
            status: 'ATIVO',
            admissionDate: new Date('2023-06-20'),
          }
        ]
      });
      console.log('✅ Funcionários iniciais criados.');
    }
  }

  console.log('🚀 Seeding finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no Seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
