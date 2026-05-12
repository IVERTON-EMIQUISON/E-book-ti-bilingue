

const words = [
  // ── BASE DE TI ──
  { id:1,  word:'Algoritmo',     cat:'Base de TI',          video:'algoritmo',     def:'Sequência de passos ou instruções lógicas para resolver um problema ou executar uma tarefa.', extra:'Algoritmos estão em todo lugar: receitas de bolo, roteiros de GPS e sistemas de busca na internet.', example:'Para preparar um café, você segue um algoritmo: ferver água, colocar o pó, filtrar e servir.', related:['Programação','Código','Sistema'] },
  { id:2,  word:'Software',      cat:'Base de TI',          video:'software',      def:'Conjunto de programas e instruções que fazem o computador executar tarefas específicas.', extra:'Existem softwares de sistema (como o Windows) e de aplicação (como o Word ou o WhatsApp).', example:'O aplicativo de mensagens no seu celular é um software desenvolvido para facilitar a comunicação.', related:['Hardware','Aplicativo','Código'] },
  { id:3,  word:'Hardware',      cat:'Base de TI',          video:'hardware',      def:'Parte física do computador: tudo que você pode tocar, como teclado, tela, processador e memória.', extra:'Hardware e software trabalham juntos — sem hardware o software não roda, e vice-versa.', example:'O teclado, o mouse e a tela são hardwares de entrada e saída de um computador.', related:['Software','Processador','Interface'] },
  { id:4,  word:'Programação',   cat:'Base de TI',          video:'programacao',   def:'Processo de escrever instruções em uma linguagem que o computador entende para criar programas.', extra:'Existem centenas de linguagens de programação, como Python, JavaScript, Java e C++.', example:'Um programador escreve código em Python para criar um sistema que analisa dados automaticamente.', related:['Código','Algoritmo','Software'] },
  { id:5,  word:'Código',        cat:'Base de TI',          video:'codigo',        def:'Texto escrito em uma linguagem de programação que contém as instruções de um programa.', extra:'O código é como a "receita" de um programa — humanos escrevem e o computador executa.', example:'As linhas escritas em Python para construir um site de vendas formam o código desse site.', related:['Programação','Algoritmo','Bug'] },
  { id:6,  word:'Sistema',       cat:'Base de TI',          video:'sistema',       def:'Conjunto organizado de partes (hardware, software, dados) que trabalham juntas para um objetivo.', extra:'Um sistema operacional como o Android gerencia todos os recursos do celular automaticamente.', example:'O sistema bancário registra todas as transações e mantém o saldo de cada conta atualizado.', related:['Software','Aplicativo','Interface'] },
  { id:7,  word:'Aplicativo',    cat:'Base de TI',          video:'aplicativo',    def:'Programa desenvolvido para realizar tarefas específicas em celulares, tablets ou computadores.', extra:'Apps podem ser gratuitos ou pagos e são distribuídos por lojas como Google Play e App Store.', example:'O WhatsApp é um aplicativo de mensagens instalado em bilhões de celulares no mundo.', related:['Software','Sistema','Interface'] },
  { id:8,  word:'Interface',     cat:'Base de TI',          video:'interface',     def:'Ponto de interação visual entre o usuário e o sistema — telas, botões e menus que vemos e usamos.', extra:'Uma boa interface é intuitiva e acessível, permitindo que qualquer pessoa use o sistema facilmente.', example:'A tela inicial de um aplicativo de banco é a interface pela qual o usuário acessa sua conta.', related:['Usuário','Sistema','Aplicativo'] },
  { id:9,  word:'Usuário',       cat:'Base de TI',          video:'usuario',       def:'Pessoa que utiliza um sistema, aplicativo ou serviço de tecnologia para realizar tarefas.', extra:'O usuário é o foco do design de sistemas — desenvolver pensando nele torna a tecnologia mais útil.', example:'Quando você usa o Instagram para ver fotos, você é o usuário da plataforma.', related:['Interface','Sistema','Aplicativo'] },
  { id:10, word:'Banco de dados', cat:'Base de TI',         video:'banco-de-dados', def:'Sistema organizado para armazenar, gerenciar e recuperar grandes volumes de informações.', extra:'Bancos de dados são usados em praticamente todo sistema digital, desde redes sociais até hospitais.', example:'O histórico de compras de uma loja virtual é armazenado e consultado em um banco de dados.', related:['Sistema','Arquivo','Download'] },
  // ── WEB E SEGURANÇA ──
  { id:11, word:'Rede',          cat:'Web e Segurança',     video:'rede',          def:'Conjunto de computadores e dispositivos conectados entre si para compartilhar dados e recursos.', extra:'As redes podem ser locais (dentro de uma empresa) ou globais (como a própria internet).', example:'Os computadores de uma escola conectados ao mesmo Wi-Fi formam uma rede local.', related:['Internet','Servidor','Página web'] },
  { id:12, word:'Internet',      cat:'Web e Segurança',     video:'internet',      def:'Rede global de computadores interconectados que permite comunicação e compartilhamento de informações.', extra:'A internet conecta bilhões de dispositivos em todo o mundo por cabos, fibras ópticas e Wi-Fi.', example:'Ao enviar um e-mail para alguém em outro país, você usa a infraestrutura da internet.', related:['Rede','Servidor','Página web'] },
  { id:13, word:'Servidor',      cat:'Web e Segurança',     video:'servidor',      def:'Computador potente que armazena dados e fornece serviços a outros computadores (clientes) em rede.', extra:'Servidores ficam ligados 24h por dia para que sites e aplicativos estejam sempre disponíveis.', example:'Quando você acessa um site, seu navegador solicita a página a um servidor que a envia de volta.', related:['Internet','Rede','Página web'] },
  { id:14, word:'Site',          cat:'Web e Segurança',     video:'site',          def:'Conjunto de páginas web relacionadas, acessível por um endereço (URL) na internet.', extra:'Sites podem ser informativos, de comércio, redes sociais, portfólios ou sistemas completos.', example:'A Wikipedia é um site com milhões de artigos acessíveis gratuitamente pela internet.', related:['Página web','Internet','Servidor'] },
  { id:15, word:'Página web',    cat:'Web e Segurança',     video:'pagina-web',    def:'Documento digital acessado pelo navegador, geralmente escrito em HTML, CSS e JavaScript.', extra:'Cada endereço que você visita no navegador é uma página web servida por algum servidor.', example:'A página de resultados do Google que aparece após uma busca é uma página web dinâmica.', related:['Site','Internet','HTML'] },
  { id:16, word:'Login',         cat:'Web e Segurança',     video:'login',         def:'Processo de identificação de um usuário em um sistema por meio de credenciais como e-mail e senha.', extra:'Fazer login prova ao sistema que você é o dono daquela conta, protegendo seus dados.', example:'Ao digitar seu e-mail e senha para entrar no Gmail, você está fazendo login.', related:['Senha','Segurança','Usuário'] },
  { id:17, word:'Senha',         cat:'Web e Segurança',     video:'senha',         def:'Código secreto usado para autenticar um usuário e proteger o acesso a um sistema ou conta.', extra:'Uma senha forte mistura letras maiúsculas, minúsculas, números e símbolos especiais.', example:'Usar "123456" como senha é perigoso — prefira combinações longas e únicas para cada serviço.', related:['Login','Segurança','Criptografia'] },
  { id:18, word:'Segurança',     cat:'Web e Segurança',     video:'seguranca',     def:'Conjunto de práticas e tecnologias para proteger sistemas, dados e usuários contra ataques e acessos não autorizados.', extra:'Segurança digital envolve criptografia, autenticação, firewalls e boas práticas dos usuários.', example:'Ativar a verificação em duas etapas aumenta muito a segurança da sua conta online.', related:['Senha','Login','Criptografia'] },
  { id:19, word:'Teste',         cat:'Web e Segurança',     video:'teste',         def:'Processo de verificar se um sistema ou software funciona corretamente e atende aos requisitos esperados.', extra:'Testes automatizados e manuais são fundamentais para garantir a qualidade de um software.', example:'Antes de lançar um aplicativo, a equipe realiza testes para encontrar e corrigir erros.', related:['Bug','Desenvolvimento','Requisito'] },
  { id:20, word:'Bug',           cat:'Web e Segurança',     video:'bug',           def:'Erro ou falha em um programa de computador que causa um comportamento incorreto ou inesperado.', extra:'O termo "bug" surgiu quando uma mariposa causou um problema em um computador em 1947.', example:'Um bug fez com que o aplicativo fechasse sozinho quando o usuário clicava no botão de salvar.', related:['Teste','Código','Desenvolvimento'] },
  // ── ENGENHARIA E ACESSO ──
  { id:21, word:'Requisito',         cat:'Engenharia e Acesso', video:'requisito',         def:'Descrição formal do que um sistema precisa fazer ou de como deve se comportar para atender às necessidades do usuário.', extra:'Requisitos bem definidos evitam retrabalho e garantem que o sistema entregue o que foi pedido.', example:'O requisito "o usuário deve conseguir redefinir a senha por e-mail" guia o desenvolvimento dessa funcionalidade.', related:['Desenvolvimento','Funcionalidade','Teste'] },
  { id:22, word:'Prototipação',      cat:'Engenharia e Acesso', video:'prototipacao',      def:'Criação de modelos preliminares de um sistema para validar ideias e obter feedback antes do desenvolvimento final.', extra:'Ferramentas como Figma e Adobe XD são muito usadas para criar protótipos de interfaces digitais.', example:'A equipe criou um protótipo clicável do app para mostrar ao cliente antes de escrever uma linha de código.', related:['Desenvolvimento','Requisito','Interface'] },
  { id:23, word:'Desenvolvimento',   cat:'Engenharia e Acesso', video:'desenvolvimento',   def:'Processo de criação de um software, desde a análise de requisitos até a entrega do produto final.', extra:'O desenvolvimento de software envolve planejamento, codificação, testes e manutenção contínua.', example:'O desenvolvimento do novo sistema de matrícula levou seis meses e envolveu uma equipe de cinco pessoas.', related:['Programação','Requisito','Manutenção'] },
  { id:24, word:'Manutenção',        cat:'Engenharia e Acesso', video:'manutencao',        def:'Atividade de corrigir erros, melhorar desempenho e atualizar um software após sua entrega.', extra:'A manutenção representa grande parte do custo total de um sistema ao longo de sua vida útil.', example:'A equipe realiza manutenção mensal no sistema para corrigir bugs e adicionar melhorias solicitadas.', related:['Desenvolvimento','Bug','Funcionalidade'] },
  { id:25, word:'Funcionalidade',    cat:'Engenharia e Acesso', video:'funcionalidade',    def:'Recurso ou capacidade específica que um sistema oferece para atender a uma necessidade do usuário.', extra:'Cada funcionalidade de um sistema deve ser testada separadamente para garantir seu correto funcionamento.', example:'"Enviar mensagem de voz" é uma funcionalidade do WhatsApp que facilita a comunicação.', related:['Requisito','Sistema','Desenvolvimento'] },
  { id:26, word:'Arquivo',           cat:'Engenharia e Acesso', video:'arquivo',           def:'Unidade de armazenamento digital que contém dados como texto, imagem, áudio ou vídeo.', extra:'Arquivos são identificados por extensões como .pdf, .mp4, .jpg, .docx que indicam seu tipo.', example:'O documento salvo no computador como "relatorio.pdf" é um arquivo digital.', related:['Download','Upload','Banco de dados'] },
  { id:27, word:'Upload',            cat:'Engenharia e Acesso', video:'upload',            def:'Processo de enviar um arquivo do seu dispositivo para um servidor ou serviço na internet.', extra:'Fazer upload de uma foto para o Instagram ou de um documento para o Google Drive são exemplos cotidianos.', example:'Ao anexar um arquivo em um e-mail e enviar, você está fazendo upload desse arquivo.', related:['Download','Arquivo','Servidor'] },
  { id:28, word:'Download',          cat:'Engenharia e Acesso', video:'download',          def:'Processo de receber ou salvar um arquivo de um servidor ou serviço da internet para o seu dispositivo.', extra:'A velocidade de download é medida em Mbps e influencia o tempo que leva para baixar arquivos.', example:'Salvar uma música do Spotify para ouvir sem internet é um tipo de download.', related:['Upload','Arquivo','Servidor'] },
  { id:29, word:'QR Code',           cat:'Engenharia e Acesso', video:'qr-code',           def:'Código de barras bidimensional que armazena informações como links, textos ou contatos, lido pela câmera do celular.', extra:'QR Codes são amplamente usados em cardápios digitais, pagamentos via PIX e materiais educativos.', example:'Escanear o QR Code de um cardápio de restaurante abre o menu diretamente no celular.', related:['Internet','Aplicativo','Vídeo em Libras'] },
  { id:30, word:'Vídeo em Libras',   cat:'Engenharia e Acesso', video:'video-em-libras',   def:'Gravação em vídeo onde um intérprete apresenta um conteúdo na Língua Brasileira de Sinais (Libras).', extra:'Vídeos em Libras tornam conteúdos digitais acessíveis à comunidade surda de forma natural e direta.', example:'Este e-book usa vídeos em Libras para explicar cada termo de TI de forma acessível e inclusiva.', related:['QR Code','Acessibilidade','Interface'] },
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
  const videoPlayer = document.getElementById('videoPlayer');
  const videoSource = document.getElementById('videoSource');
  videoSource.src = './videos/' + currentWord.video + '.mp4';
  videoPlayer.load();
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