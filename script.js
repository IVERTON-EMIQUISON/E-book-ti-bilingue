const words = [
  { id:1, word:'Algoritmo', cat:'Fundamentos', def:'Conjunto finito de instruções bem definidas para resolver um problema.', extra:'Algoritmos estão presentes em aplicativos, sites, jogos e em diversas tecnologias do dia a dia.', example:'Um algoritmo de busca encontra a palavra "gato" em um dicionário consultando as páginas em ordem alfabética.', related:['Lógica de Programação','Fluxograma','Estrutura de Dados'] },
  { id:2, word:'API', cat:'Redes', def:'Interface que permite que dois sistemas de software se comuniquem entre si trocando dados.', extra:'APIs são usadas por aplicativos para acessar serviços externos, como mapas, pagamentos e redes sociais.', example:'Quando você faz login com o Google em outro site, esse site usa a API do Google para verificar sua identidade.', related:['REST','JSON','Servidor'] },
  { id:3, word:'Banco de Dados', cat:'Dados', def:'Sistema organizado para armazenar, gerenciar e recuperar informações de forma eficiente.', extra:'Bancos de dados são usados em praticamente todo sistema digital, desde redes sociais até sistemas hospitalares.', example:'O histórico de compras de uma loja virtual é armazenado em um banco de dados.', related:['SQL','Tabela','Registro'] },
  { id:4, word:'Bug', cat:'Engenharia', def:'Erro ou falha em um programa de computador que causa um comportamento incorreto ou inesperado.', extra:'O termo "bug" surgiu quando uma mariposa causou um problema em um computador em 1947.', example:'Um bug fez com que o aplicativo fechasse sozinho quando o usuário clicava no botão de salvar.', related:['Depuração','Teste de Software','Código'] },
  { id:5, word:'Cloud Computing', cat:'Redes', def:'Modelo de entrega de serviços de computação pela internet, como servidores, armazenamento e softwares.', extra:'Serviços como Google Drive e iCloud são exemplos de computação em nuvem usados no dia a dia.', example:'Em vez de salvar fotos no celular, você as envia para a nuvem e acessa de qualquer dispositivo.', related:['Servidor','Internet','Armazenamento'] },
  { id:6, word:'Código-fonte', cat:'Fundamentos', def:'Conjunto de instruções escritas por programadores em uma linguagem de programação para criar um software.', extra:'O código-fonte é como a "receita" de um programa — humanos escrevem, e o computador executa.', example:'As linhas de Python que constroem um site de vendas formam o código-fonte desse site.', related:['Linguagem de Programação','Compilador','Programação'] },
  { id:7, word:'Compilador', cat:'Fundamentos', def:'Programa que traduz o código-fonte escrito por humanos para linguagem de máquina que o computador entende.', extra:'Sem compiladores, seria muito difícil criar programas — teríamos que escrever diretamente em zeros e uns.', example:'O compilador do C++ transforma o código que o programador escreveu em um arquivo executável (.exe).', related:['Código-fonte','Interpretador','Linguagem de Programação'] },
  { id:8, word:'Criptografia', cat:'Redes', def:'Técnica de proteger informações convertendo dados legíveis em um formato codificado ilegível sem a chave correta.', extra:'Mensagens do WhatsApp usam criptografia de ponta a ponta para que só remetente e destinatário as leiam.', example:'Quando você compra online, a criptografia protege o número do seu cartão de crédito durante o envio.', related:['Segurança','Chave','HTTPS'] },
  { id:9, word:'Deploy', cat:'Engenharia', def:'Processo de disponibilizar um software desenvolvido para uso em um ambiente de produção acessível aos usuários.', extra:'Fazer o deploy é o momento em que o código sai do ambiente de testes e entra em funcionamento real.', example:'Após corrigir todos os bugs, a equipe fez o deploy do novo aplicativo na loja de apps.', related:['Pipeline','Ambiente','CI/CD'] },
  { id:10, word:'Estrutura de Dados', cat:'Fundamentos', def:'Forma organizada de armazenar e gerenciar dados em um computador para acessá-los e modificá-los eficientemente.', extra:'Filas, pilhas e listas encadeadas são exemplos de estruturas de dados usadas em programas.', example:'Uma lista de contatos no celular usa uma estrutura de dados para organizar nomes e telefones.', related:['Algoritmo','Array','Pilha'] },
  { id:11, word:'Framework', cat:'Engenharia', def:'Conjunto de ferramentas e bibliotecas que fornece uma base estruturada para o desenvolvimento de software.', extra:'React, Django e Spring são exemplos de frameworks populares que aceleram o desenvolvimento de sistemas.', example:'Um desenvolvedor usou o framework Django para criar um site de blog em poucas horas.', related:['Biblioteca','React','Desenvolvimento'] },
  { id:12, word:'Git', cat:'Engenharia', def:'Sistema de controle de versão que registra e gerencia as alterações no código de um projeto ao longo do tempo.', extra:'O Git permite que várias pessoas trabalhem no mesmo projeto sem sobrescrever o trabalho umas das outras.', example:'Ao perceber que uma nova funcionalidade causou problemas, a equipe usou o Git para voltar à versão anterior.', related:['Repositório','Commit','Branch'] },
  { id:13, word:'Hardware', cat:'Fundamentos', def:'Componentes físicos de um sistema computacional, como processador, memória, placa-mãe e teclado.', extra:'Hardware e software trabalham juntos: sem hardware o software não funciona, e sem software o hardware não tem utilidade.', example:'O teclado, o mouse e a tela são hardwares de entrada e saída de um computador.', related:['Software','Processador','Memória'] },
  { id:14, word:'HTML', cat:'Redes', def:'Linguagem de marcação usada para estruturar e definir o conteúdo de páginas na internet.', extra:'HTML, CSS e JavaScript são as três tecnologias fundamentais da web que trabalham juntas para criar sites.', example:'O título, os parágrafos e as imagens desta página são definidos usando HTML.', related:['CSS','JavaScript','Navegador'] },
  { id:15, word:'HTTP', cat:'Redes', def:'Protocolo de comunicação usado para transferir dados entre navegadores e servidores na internet.', extra:'O HTTPS é a versão segura do HTTP, com criptografia, indicado pelo cadeado no navegador.', example:'Quando você digita um endereço no navegador, ele usa HTTP para pedir a página ao servidor.', related:['HTTPS','API','Servidor'] },
  { id:16, word:'Inteligência Artificial', cat:'IA', def:'Ramo da computação que desenvolve sistemas capazes de realizar tarefas que normalmente exigem inteligência humana.', extra:'IA está presente em assistentes de voz, recomendações de filmes, carros autônomos e diagnósticos médicos.', example:'O sistema de recomendação do Netflix usa inteligência artificial para sugerir séries com base no seu histórico.', related:['Machine Learning','Rede Neural','Dados'] },
  { id:17, word:'Interface', cat:'Fundamentos', def:'Ponto de interação entre o usuário e um sistema, ou entre dois sistemas distintos.', extra:'Uma boa interface é intuitiva e acessível, permitindo que qualquer pessoa use o sistema sem dificuldade.', example:'A tela inicial de um aplicativo de banco é a interface pela qual o usuário acessa sua conta.', related:['UX','UI','API'] },
  { id:18, word:'Internet', cat:'Redes', def:'Rede global de computadores interconectados que permite a comunicação e o compartilhamento de informações.', extra:'A internet conecta bilhões de dispositivos em todo o mundo por meio de cabos, fibras ópticas e sinais sem fio.', example:'Ao enviar um e-mail para alguém em outro país, você usa a infraestrutura da internet.', related:['Rede','Servidor','Protocolo'] },
  { id:19, word:'JSON', cat:'Dados', def:'Formato leve de troca de dados baseado em texto, fácil de ler por humanos e de processar por máquinas.', extra:'JSON é amplamente usado em APIs para enviar e receber informações entre aplicações web e servidores.', example:'Quando um aplicativo consulta a previsão do tempo, o servidor responde com dados em formato JSON.', related:['API','XML','Servidor'] },
  { id:20, word:'Machine Learning', cat:'IA', def:'Subcampo da IA que permite que sistemas aprendam e melhorem com a experiência sem serem explicitamente programados.', extra:'Algoritmos de Machine Learning identificam padrões em grandes volumes de dados para fazer previsões.', example:'Um filtro de spam aprende com os e-mails que você marca como indesejados para bloquear mensagens parecidas.', related:['Inteligência Artificial','Rede Neural','Dataset'] },
  { id:21, word:'Memória RAM', cat:'Hardware', def:'Tipo de memória temporária do computador usada para armazenar dados que estão sendo usados no momento.', extra:'Quanto mais RAM um computador tem, mais programas ele consegue executar ao mesmo tempo sem lentidão.', example:'Abrir muitas abas no navegador consome muita memória RAM, deixando o computador mais lento.', related:['Hardware','Processador','Armazenamento'] },
  { id:22, word:'Metodologia Ágil', cat:'Engenharia', def:'Conjunto de práticas de desenvolvimento de software baseadas em ciclos curtos, colaboração e entrega contínua.', extra:'Scrum e Kanban são as metodologias ágeis mais populares usadas em times de desenvolvimento de software.', example:'A equipe usou metodologia ágil para entregar novas funcionalidades ao cliente a cada duas semanas.', related:['Scrum','Sprint','Backlog'] },
  { id:23, word:'Nuvem', cat:'Redes', def:'Metáfora para a internet ou para os servidores remotos que armazenam, gerenciam e processam dados.', extra:'Armazenar arquivos na nuvem significa que eles ficam em servidores de empresas como Google ou Amazon.', example:'Você pode acessar seus documentos do Google Drive de qualquer dispositivo pois eles estão na nuvem.', related:['Cloud Computing','Servidor','Armazenamento'] },
  { id:24, word:'Programação', cat:'Fundamentos', def:'Processo de escrever instruções em uma linguagem que o computador entende para resolver problemas ou criar aplicações.', extra:'Existem centenas de linguagens de programação, cada uma com características adequadas para diferentes contextos.', example:'Um programador escreve código em Python para criar um sistema que analisa dados de vendas automaticamente.', related:['Algoritmo','Código-fonte','Linguagem'] },
  { id:25, word:'Protocolo', cat:'Redes', def:'Conjunto de regras que define como os dados são transmitidos e recebidos em uma rede de computadores.', extra:'HTTP, TCP/IP e FTP são exemplos de protocolos que garantem a comunicação entre dispositivos na internet.', example:'Quando dois computadores se comunicam, eles seguem um protocolo para garantir que os dados cheguem corretamente.', related:['HTTP','TCP/IP','Rede'] },
  { id:26, word:'Rede Neural', cat:'IA', def:'Modelo computacional inspirado no cérebro humano, composto por camadas de nós interconectados que processam dados.', extra:'Redes neurais profundas (deep learning) são usadas para reconhecimento de voz, imagem e tradução automática.', example:'O sistema de reconhecimento facial do celular usa uma rede neural para identificar seu rosto.', related:['Machine Learning','Inteligência Artificial','Deep Learning'] },
  { id:27, word:'Servidor', cat:'Redes', def:'Computador ou programa que fornece serviços, dados ou recursos a outros computadores (clientes) em uma rede.', extra:'Servidores ficam ligados 24 horas por dia para garantir que sites e aplicativos estejam sempre disponíveis.', example:'Quando você acessa um site, seu navegador solicita a página a um servidor que a envia de volta.', related:['Cliente','Nuvem','HTTP'] },
  { id:28, word:'Software', cat:'Fundamentos', def:'Conjunto de programas, instruções e dados que controlam o funcionamento de um computador.', extra:'Software de sistema (como o Windows) e software de aplicação (como o Word) são as duas grandes categorias.', example:'O aplicativo de mensagens no seu celular é um software desenvolvido para facilitar a comunicação.', related:['Hardware','Programa','Sistema Operacional'] },
  { id:29, word:'SQL', cat:'Dados', def:'Linguagem padrão para consultar, inserir, atualizar e deletar dados em bancos de dados relacionais.', extra:'SQL é uma das linguagens mais usadas no mundo e é essencial para qualquer profissional que trabalha com dados.', example:'Um analista usa SQL para consultar quantos clientes fizeram compras acima de R$ 100 no último mês.', related:['Banco de Dados','Tabela','MySQL'] },
  { id:30, word:'UX Design', cat:'Engenharia', def:'Processo de projetar produtos digitais focado na experiência, usabilidade e satisfação do usuário final.', extra:'Um bom UX Design torna o uso de aplicativos intuitivo e agradável, reduzindo erros e aumentando a satisfação.', example:'O designer de UX testou o aplicativo com usuários reais para identificar botões confusos e simplificar a navegação.', related:['Interface','UI Design','Prototipagem'] },
];

let currentFilter = 'Todos';
let currentSearch = '';
let currentWord = null;

function getCatColor(cat) {
  const map = { 'Fundamentos':'teal', 'Redes':'blue', 'Engenharia':'navy', 'Dados':'amber', 'IA':'purple', 'Hardware':'gray' };
  return map[cat] || 'teal';
}

function renderGrid() {
  const grid = document.getElementById('vocabGrid');
  const noRes = document.getElementById('noResults');
  const countEl = document.getElementById('displayCount');
  const filtered = words.filter(w => {
    const matchCat = currentFilter === 'Todos' || w.cat === currentFilter;
    const matchSearch = w.word.toLowerCase().includes(currentSearch.toLowerCase()) || w.def.toLowerCase().includes(currentSearch.toLowerCase());
    return matchCat && matchSearch;
  });
  countEl.textContent = filtered.length + ' termo' + (filtered.length !== 1 ? 's' : '');
  if (filtered.length === 0) { grid.innerHTML = ''; noRes.style.display = 'block'; return; }
  noRes.style.display = 'none';
  grid.innerHTML = filtered.map(w => `
    <div class="word-card" onclick="openWord(${w.id})">
      <div class="card-cat">${w.cat}</div>
      <div class="card-word">${w.word}</div>
      <div class="card-def">${w.def}</div>
      <div class="card-footer">
        <div class="libras-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2"/><path d="M10 10.5a2 2 0 0 0-2-2 2 2 0 0 0-2 2V17a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-5a2 2 0 0 0-2-2 2 2 0 0 0-2 2"/></svg>
          Libras
        </div>
        <svg class="card-arrow" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
    </div>
  `).join('');
}

function openWord(id) {
  currentWord = words.find(w => w.id === id);
  if (!currentWord) return;
  document.getElementById('d-cat').textContent = currentWord.cat;
  document.getElementById('d-word').textContent = currentWord.word;
  document.getElementById('d-def').textContent = currentWord.def;
  document.getElementById('d-extra').textContent = currentWord.extra;
  document.getElementById('d-example').textContent = '"' + currentWord.example + '"';
  document.getElementById('d-related').innerHTML = currentWord.related.map(r =>
    `<span class="related-chip" onclick="searchRelated('${r}')">${r}</span>`
  ).join('');
  setTab('definicao', document.querySelector('.tab-btn'));
  showPage('detail');
  window.scrollTo(0, 0);
}

function searchRelated(term) {
  showPage('home');
  document.getElementById('searchInput').value = term;
  currentSearch = term;
  renderGrid();
}

function setFilter(cat, el) {
  currentFilter = cat;
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  renderGrid();
}

function filterWords() {
  currentSearch = document.getElementById('searchInput').value;
  renderGrid();
}

function setTab(name, btn) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  document.querySelectorAll('.tab-btn').forEach(b => {
    if ((name === 'definicao' && b.textContent.includes('Definição')) ||
        (name === 'exemplo' && b.textContent.includes('Exemplo')) ||
        (name === 'libras' && b.textContent.includes('Libras'))) {
      b.classList.add('active');
    }
  });
}

function showPage(page) {
  ['home-page','detail-page','about-page','access-page'].forEach(p => {
    document.getElementById(p).style.display = 'none';
  });
  document.getElementById(page + '-page').style.display = 'block';
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  if (page === 'home') document.getElementById('nav-inicio').classList.add('active');
  if (page === 'about') document.getElementById('nav-sobre').classList.add('active');
  if (page === 'access') document.getElementById('nav-access').classList.add('active');
}

function speakWord() {
  if (!currentWord) return;
  if ('speechSynthesis' in window) {
    const utt = new SpeechSynthesisUtterance(currentWord.word);
    utt.lang = 'pt-BR'; utt.rate = 0.9;
    window.speechSynthesis.speak(utt);
  }
}

function openVideo() {
  if (!currentWord) return;
  alert('🎬 Vídeo em Libras para: "' + currentWord.word + '"\n\nAqui seria exibido o player com o vídeo em Libras gravado para este termo.\n\n(Substitua este alert pelo seu link de vídeo real)');
}

function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

function changeFontSize(size) {
  document.body.style.fontSize = size + 'px';
}

document.getElementById('total-count').textContent = words.length;
renderGrid();
showPage('home');
