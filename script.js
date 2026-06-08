
/* ══════════════════════════════════════════════════════════
   ⚠️  CONFIGURAÇÃO — edite antes de publicar
   ══════════════════════════════════════════════════════════
   API_BASE  → URL do seu API Gateway (sem barra no final)
   Exemplo:  'https://abc123.execute-api.us-east-1.amazonaws.com/prod'

   ADMIN_USERNAME → usuário fixo para o login (padrão: 'admin')
   A SENHA digitada no login vira o Bearer token enviado ao Lambda.
   Deve ser igual à variável ADMIN_SECRET_KEY configurada no Lambda.
   ══════════════════════════════════════════════════════════ */
const API_BASE       = 'https://3thzm3xkzj.execute-api.us-east-1.amazonaws.com/v1/';
const ADMIN_USERNAME = 'iverton'; // Altere para o nome de usuário desejado (padrão: 'admin')
console.log(API_BASE);

/* ═══ STATE ═══ */
let words         = [];
let currentFilter = 'Todos';
let currentSearch = '';
let currentWord   = null;
let authToken     = null; 
let isAdmin       = false;

/* ═══════════════════════════════
   AUTH
═══════════════════════════════ */
function doLogin() {
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;
  const err  = document.getElementById('loginError');

  err.style.display = 'none';
  if (!user || !pass) { showErr('Preencha usuário e senha.'); return; }
  
  // 1. Valida o nome de usuário
  if (user !== ADMIN_USERNAME) { showErr('Usuário inválido.'); return; }
  
  // 2. NOVA VALIDAÇÃO: Bloqueia o acesso logo no front-end se a senha estiver errada
  // Substitua 'iverton2026' caso você mude a senha no futuro
  if (pass !== 'iverton2026') { showErr('Senha de administrador inválida.'); return; }

  function showErr(msg) {
    err.textContent   = '❌ ' + msg;
    err.style.display = 'block';
  }

  // A senha digitada (que agora temos certeza que é 'iverton2026') vira o Token enviado ao Lambda
  authToken = pass;
  isAdmin   = true;
  document.getElementById('adminUserLabel').innerHTML =
  `<img class="user-avatar" src="./img/fotos.png" alt="Foto do usuário"> ${user}`;
  updateNavForAuth();
  showPage('admin');
  loadWords();
  showToast('✅ Login realizado!', 'success');
}

// Permite mostrar ou esconder a senha no campo de login
function togglePasswordVisibility() {
  const passInput = document.getElementById('loginPass');
  const eyeIcon = document.getElementById('eyeIcon');

  if (passInput.type === 'password') {
    // Mostra a senha
    passInput.type = 'text';
    // Altera o desenho do SVG para um olho "cortado" (ocultar)
    eyeIcon.innerHTML = `
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    `;
  } else {
    // Esconde a senha
    passInput.type = 'password';
    // Volta para o SVG do olho aberto
    eyeIcon.innerHTML = `
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    `;
  }
}

function doLogout() {
  authToken = null;
  isAdmin   = false;
  document.getElementById('loginUser').value = '';
  document.getElementById('loginPass').value = '';
  updateNavForAuth();
  showPage('home');
  showToast('👋 Sessão encerrada.', '');
}

function updateNavForAuth() {
  document.getElementById('nav-admin-link').style.display = isAdmin ? 'flex'  : 'none';
  document.getElementById('nav-login-link').style.display = isAdmin ? 'none'  : 'inline';
  document.getElementById('mob-admin').style.display      = isAdmin ? 'block' : 'none';
  document.getElementById('mob-login').style.display      = isAdmin ? 'none'  : 'block';
  document.getElementById('mob-logout').style.display     = isAdmin ? 'block' : 'none';
}

/* ═══════════════════════════════
   API
═══════════════════════════════ */
async function apiFetch(path, options = {}) {
  const hdrs = { 'Content-Type': 'application/json' };
  if (authToken) hdrs['Authorization'] = `Bearer ${authToken}`;
  try {
    const resp = await fetch(API_BASE + path, { ...options, headers: { ...hdrs, ...(options.headers || {}) } });
    const data = await resp.json().catch(() => ({}));
    return { ok: resp.ok, status: resp.status, data };
  } catch {
    return { ok: false, status: 0, data: { message: 'Erro de conexão.' } };
  }
}
async function loadWords() {
  // 1. Faz a chamada real de GET para a rota de listagem da sua API
  const result = await apiFetch('/words', { method: 'GET' });

  if (result.ok) {
    // 2. Armazena os dados que vieram do Lambda
    // Dependendo de como o seu Lambda foi estruturado, ele pode retornar o array direto ou envelopado.
    // Esta linha abaixo é inteligente e aceita os formatos mais comuns de retorno (Array direto, .items ou .words)
    words = Array.isArray(result.data) 
      ? result.data 
      : (result.data.items || result.data.words || result.data.Items || []);

    // 3. Executa as atualizações de tela com os dados da API
    renderGrid();
    if (isAdmin) renderAdminTable();
    updateStats();
  } else {
    // Se a API falhar (CORS, erro 500 no Lambda, etc.)
    console.error('Erro detalhado da API:', result.data);
    showToast('❌ Erro ao buscar dados da API. Verifique o console.', 'error');
    
    // Limpa os skeletons infinitos da tela para não confundir o usuário
    document.getElementById('vocabGrid').innerHTML = '';
    document.getElementById('displayCount').textContent = 'Erro ao carregar';
  }
}

/* ═══════════════════════════════
   HOME
═══════════════════════════════ */
function updateStats() {
  document.getElementById('total-count').textContent = words.length || '—';
  if (isAdmin) {
    document.getElementById('adm-total').textContent     = words.length;
    document.getElementById('adm-com-video').textContent = words.filter(w => w.video).length
    document.getElementById('adm-sem-video').textContent = words.filter(w => !w.video).length
  }
}

function renderGrid() {
  const grid    = document.getElementById('vocabGrid');
  const noRes   = document.getElementById('noResults');
  const countEl = document.getElementById('displayCount');
  const q       = currentSearch.toLowerCase();

  const filtered = words.filter(w =>
    (currentFilter === 'Todos' || w.cat === currentFilter) &&
    (!q || w.word.toLowerCase().includes(q) || w.def.toLowerCase().includes(q))
  );

  countEl.textContent = filtered.length + ' termo' + (filtered.length !== 1 ? 's' : '');
  if (!filtered.length) { grid.innerHTML = ''; noRes.style.display = 'block'; return; }
  noRes.style.display = 'none';

  grid.innerHTML = filtered.map(w => `
    <div class="word-card" onclick="openWord('${w.id}')">
      <div class="card-cat">${escHtml(w.cat)}</div>
      <div class="card-word">${escHtml(w.word)}</div>
      <div class="card-def">${escHtml(w.def)}</div>
      <div class="card-footer">
        <div class="libras-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round">
            <path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2"/>
            <path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2"/>
            <path d="M10 10.5a2 2 0 0 0-2-2 2 2 0 0 0-2 2V17a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-5a2 2 0 0 0-2-2 2 2 0 0 0-2 2"/>
          </svg>
          Libras
        </div>
        <svg class="card-arrow" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
    </div>`).join('');
}
function openWord(id) {
  currentWord = words.find(w => w.id === id);
  if (!currentWord) return;
  
  // Preenche os dados de texto
  document.getElementById('d-cat').textContent   = currentWord.cat     || '';
  document.getElementById('d-word').textContent  = currentWord.word    || '';
  document.getElementById('d-def').textContent   = currentWord.def     || '';
  document.getElementById('d-extra').textContent = currentWord.extra   || '';
  document.getElementById('d-example').textContent = currentWord.example ? `"${currentWord.example}"` : '';
  
  // Renderiza os termos relacionados
  document.getElementById('d-related').innerHTML = (currentWord.related || []).map(r =>
    `<span class="related-chip" onclick="searchRelated('${escAttr(r)}')">${escHtml(r)}</span>`
  ).join('');
  
  // Seleciona os novos elementos do HTML que corrigimos
  const playerArea = document.getElementById('videoPlayerArea');
  const pending    = document.getElementById('videoPending');
  
  if (currentWord.video) {
    pending.style.display = 'none'; // Esconde o "Em breve"
    
    // SE FOR LINK DIRETO (Ex: .mp4 vindo do S3 ou do Mock)
    if (currentWord.video.startsWith('http')) {
      playerArea.innerHTML = `
        <video controls autoplay playsinline style="width:100%; height:100%; object-fit:contain; display:block;">
          <source src="${currentWord.video}" type="video/mp4">
          Seu navegador não suporta a reprodução de vídeos.
        </video>`;
    } else {
      // SE FOR APENAS O ID DO YOUTUBE (Ex: "dQw4w9WgXcQ")
      playerArea.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${currentWord.video}?rel=0&modestbranding=1" 
                style="width:100%; height:100%; border:none; display:block;" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe>`;
    }
  } else {
    // Se o termo não tiver vídeo cadastrado
    playerArea.innerHTML = '';
    pending.style.display = 'flex'; // Mostra a tela de "Em breve"
  }
  
  // Navega para a tela de detalhes sem travar!
  setTab('definicao');
  showPage('detail');
  window.scrollTo(0, 0);
}

function searchRelated(term) {
  document.getElementById('searchInput').value = term;
  currentSearch = term;
  renderGrid();
  showPage('home');
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

function setTab(name) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.remove('active');
    if ((name==='definicao' && b.textContent.includes('Definição')) ||
        (name==='exemplo'   && b.textContent.includes('Exemplo'))   ||
        (name==='libras'    && b.textContent.includes('Libras')))
      b.classList.add('active');
  });
  document.getElementById('tab-' + name).classList.add('active');
}

/* ═══════════════════════════════
   ADMIN TABLE
═══════════════════════════════ */
function renderAdminTable() {
  const q   = (document.getElementById('adminSearch')?.value || '').toLowerCase();
  const cat = document.getElementById('adminCatFilter')?.value || '';

  const filtered = words.filter(w =>
    (!q   || w.word.toLowerCase().includes(q) || w.def.toLowerCase().includes(q)) &&
    (!cat || w.cat === cat)
  );

  const tbody = document.getElementById('adminTbody');
  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="5"><div class="empty-table">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      <p>Nenhum termo encontrado.</p></div></td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(w => `
    <tr>
      <td><span class="tbl-word">${escHtml(w.word)}</span></td>
      <td><span class="tbl-cat">${escHtml(w.cat)}</span></td>
      <td><span class="tbl-def">${escHtml(w.def)}</span></td>
      <td>${w.video
        ? `<span class="yt-badge yes">▶ ${escHtml(w.video)}</span>`
        : `<span class="yt-badge no">— sem vídeo</span>`}</td>
      <td>
        <div class="tbl-actions">
          <button class="btn-edit" onclick="openModal('${w.id}')">✏️ Editar</button>
          <button class="btn-del"  onclick="askDelete('${w.id}','${escAttr(w.word)}')">🗑 Excluir</button>
        </div>
      </td>
    </tr>`).join('');
}

/* ═══════════════════════════════
   MODAL CRUD
═══════════════════════════════ */
function openModal(id = null) {
  document.getElementById('modalTitle').textContent = id ? 'Editar Termo' : 'Novo Termo';
  document.getElementById('editId').value = id || '';
  if (id) {
    const w = words.find(x => x.id === id);
    document.getElementById('fWord').value    = w.word    || '';
    document.getElementById('fCat').value     = w.cat     || '';
    document.getElementById('fVideo').value   = ''; // Vídeo não é editável (upload separado)'';
    document.getElementById('fDef').value     = w.def     || '';
    document.getElementById('fExtra').value   = w.extra   || '';
    document.getElementById('fExample').value = w.example || '';
    document.getElementById('fRelated').value = (w.related || []).join(', ');
  } else {
    ['fWord','fVideo','fDef','fExtra','fExample','fRelated'].forEach(i => document.getElementById(i).value = '');
    document.getElementById('fCat').value = '';
  }
  document.getElementById('wordModal').classList.add('open');
}

function closeModal() { document.getElementById('wordModal').classList.remove('open'); }

async function saveWord() {

  const id      = document.getElementById('editId').value;
  const word    = document.getElementById('fWord').value.trim();
  const cat     = document.getElementById('fCat').value;
  const def     = document.getElementById('fDef').value.trim();
  const extra   = document.getElementById('fExtra').value.trim();
  const example = document.getElementById('fExample').value.trim();
  const videoFile = document.getElementById('fVideo').files[0];

  const related = document.getElementById('fRelated')
    .value
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  if (!word || !cat || !def) {
    showToast('⚠️ Preencha: Termo, Categoria e Definição.', 'error');
    return;
  }

  const btn = document.getElementById('saveBtn');
  btn.disabled = true;
  btn.textContent = 'Enviando...';

  try {
    // Montamos o payload inicial. 
    // Se houver um arquivo de vídeo selecionado, avisamos o Lambda enviando o 'videoType'
    const payload = {
      word,
      cat,
      def,
      extra,
      example,
      related
    };

    if (videoFile) {
      payload.videoType = videoFile.type; // ex: "video/mp4"
    }

    // Passo 1: Salva os dados textuais primeiro no DynamoDB através do Lambda
    const result = await apiFetch(id ? `/words/${id}` : '/words', {
      method: id ? 'PUT' : 'POST',
      body: JSON.stringify(payload)
    });

    if (!result.ok) {
      throw new Error(result.data?.message || 'Erro ao salvar o termo.');
    }

    // Passo 2: Se o Lambda devolveu uma URL assinada (uploadUrl), fazemos o upload direto pro S3
    if (videoFile && result.data?.uploadUrl) {
      btn.textContent = 'Fazendo upload do vídeo de Libras...';
      
      const s3Resp = await fetch(result.data.uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': videoFile.type
        },
        body: videoFile // Envia o arquivo binário bruto
      });

      if (!s3Resp.ok) {
        throw new Error('Termo salvo, mas falhou o envio do vídeo para o S3.');
      }
    }

    closeModal();
    showToast(id ? '✅ Termo atualizado!' : '✅ Termo criado!', 'success');
    await loadWords();

  } catch (err) {
    console.error(err);
    showToast('❌ ' + err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Salvar`;
  }
}

/* ═══════════════════════════════
   DELETE
═══════════════════════════════ */
let _delId = null;
function askDelete(id, name) {
  if (!id || id === 'null' || id === 'undefined') {
    console.error("Erro: ID inválido recebido:", id);
    showToast('❌ Erro: ID do termo não encontrado.', 'error');
    return;
  }

  _delId = id;
  document.getElementById('confirmMsg').textContent = `Deseja excluir o termo "${name}"? Não pode ser desfeito.`;
  document.getElementById('confirmModal').classList.add('open');
  
  document.getElementById('confirmDelBtn').onclick = async () => {

    const id = _delId; // guarda o ID

    closeConfirm(); // pode limpar o _delId agora

    const result = await apiFetch(`/words/${id}`, {
        method: 'DELETE'
    });

    if (result.ok) {
        showToast('🗑 Termo excluído com sucesso!', 'success');
        await loadWords();
    } else {
        showToast('Erro ao excluir.', 'error');
    }
  };
}

function closeConfirm() { document.getElementById('confirmModal').classList.remove('open'); _delId = null; }

/* ═══════════════════════════════
   NAVIGATION
═══════════════════════════════ */
function showPage(page) {
  if (page === 'admin' && !isAdmin) { showPage('login'); return; }

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(page + '-page').classList.add('active');

  const noNav = ['login'];
  document.getElementById('mainNav').style.display    = noNav.includes(page) ? 'none' : 'block';
  document.getElementById('mainFooter').style.display = noNav.includes(page) ? 'none' : 'block';

  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const map = { home:'nav-inicio', detail:'nav-inicio', about:'nav-sobre', access:'nav-access', admin:'nav-admin-link' };
  if (map[page]) document.getElementById(map[page])?.classList.add('active');
}

/* ═══════════════════════════════
   UTILITIES
═══════════════════════════════ */
function speakWord() {
  if (!currentWord || !('speechSynthesis' in window)) return;
  const u = new SpeechSynthesisUtterance(currentWord.word);
  u.lang = 'pt-BR'; u.rate = 0.9;
  window.speechSynthesis.speak(u);
}

function toggleMenu() { document.getElementById('mobileMenu').classList.toggle('open'); }
function changeFontSize(s) { document.body.style.fontSize = s + 'px'; }

let _toastTimer;
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className   = `toast ${type} show`;
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), 3500);
}

function escHtml(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function escAttr(s) { return String(s || '').replace(/'/g,"\\'"); }

/* ═══════════════════════════════
   INIT
═══════════════════════════════ */
updateNavForAuth();
showPage('home');
loadWords();
