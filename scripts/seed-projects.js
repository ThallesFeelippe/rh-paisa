const http = require('http');

const projects = [
  {
    title: 'Natal Solidário Usina Paisa',
    location: 'Penedo, AL',
    date: 'Dezembro 2023',
    description: 'Campanha anual de distribuição de cestas básicas e brinquedos para as comunidades do entorno da usina, beneficiando mais de 500 famílias.',
    images: ['https://images.unsplash.com/photo-1543269664-76bc3997d9ea?auto=format&fit=crop&q=80&w=800']
  },
  {
    title: 'Dia de Campo Escolar',
    location: 'Unidade Industrial',
    date: 'Outubro 2023',
    description: 'Programa de educação ambiental onde alunos da rede pública visitam nossas instalações para aprender sobre o ciclo da cana e energia limpa.',
    images: ['https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800']
  },
  {
    title: 'Copa Usina Paisa de Integração',
    location: 'Arena Central',
    date: 'Junho 2023',
    description: 'Torneio esportivo que reúne times de colaboradores e membros da comunidade em um final de semana de esporte e lazer.',
    images: ['https://images.unsplash.com/photo-1552667466-07770ae110d0?auto=format&fit=crop&q=80&w=800']
  }
];

async function seed() {
  console.log('🚀 Iniciando seed de projetos...');

  for (const project of projects) {
    const data = JSON.stringify(project);
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/admin/projects',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = http.request(options, (res) => {
      if (res.statusCode === 200) {
        console.log(`✅ Projeto "${project.title}" criado com sucesso!`);
      } else {
        console.log(`❌ Erro ao criar "${project.title}": ${res.statusCode}`);
      }
    });

    req.on('error', (e) => {
      console.error(`❌ Erro de conexão: ${e.message}. Certifique-se que o servidor (npm run dev) está rodando.`);
    });

    req.write(data);
    req.end();
  }
}

seed();
