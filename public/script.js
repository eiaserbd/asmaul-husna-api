const API_BASE_URL = '/api';

let allNames = [];
let currentLanguage = 'english';

const languageLabels = {
    english: 'English',
    bangla: 'Bangla',
    urdu: 'Urdu',
    indonesian: 'Indonesia'
};

const namesGrid = document.getElementById('namesGrid');
const loadingDiv = document.getElementById('loading');
const searchInput = document.getElementById('searchInput');
const randomBtn = document.getElementById('randomBtn');
const audioPlayer = document.getElementById('audioPlayer');
const heroCount = document.getElementById('heroCount');
const heroEndpoint = document.getElementById('heroEndpoint');
const quickStartCode = document.getElementById('quickStartCode');
const baseEndpointCode = document.getElementById('baseEndpointCode');
const requestExamples = document.getElementById('requestExamples');
const activeLanguageLabel = document.getElementById('activeLanguageLabel');
const resultCountLabel = document.getElementById('resultCountLabel');

setEndpointExamples();
setLanguageLabel();

document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
        if (btn.dataset.lang === currentLanguage) return;

        document.querySelectorAll('.lang-btn').forEach((button) => button.classList.remove('active'));
        btn.classList.add('active');
        currentLanguage = btn.dataset.lang;
        setLanguageLabel();
        await fetchNames();
    });
});

searchInput.addEventListener('input', () => {
    renderNames();
});

randomBtn.addEventListener('click', () => {
    if (!allNames.length) return;
    const randomIndex = Math.floor(Math.random() * allNames.length);
    showNameDetail(allNames[randomIndex]);
});

async function fetchNames() {
    try {
        loadingDiv.style.display = 'block';
        namesGrid.innerHTML = '';

        const response = await fetch(`${API_BASE_URL}/asmaul-husna?lang=${currentLanguage}`);
        if (!response.ok) throw new Error('API request failed');

        const data = await response.json();
        allNames = data.results || [];
        heroCount.textContent = `${data.count || allNames.length} Names`;
        loadingDiv.style.display = 'none';
        renderNames();
    } catch (error) {
        console.error('Error fetching names:', error);
        loadingDiv.innerHTML = '<p style="color:#ffd8d8">Failed to load names. Please check your API connection.</p>';
    }
}

function renderNames() {
    if (!allNames.length) {
        namesGrid.innerHTML = '';
        resultCountLabel.textContent = '0';
        return;
    }

    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredNames = searchTerm
        ? allNames.filter((name) => (
            name.name?.transliteration?.toLowerCase().includes(searchTerm) ||
            name.name?.arabic?.includes(searchTerm) ||
            name.name?.translated?.toLowerCase().includes(searchTerm) ||
            name.meaning?.toLowerCase().includes(searchTerm)
        ))
        : allNames;

    resultCountLabel.textContent = String(filteredNames.length);

    if (!filteredNames.length) {
        namesGrid.innerHTML = '<div class="no-results">No names matched your search.</div>';
        return;
    }

    namesGrid.innerHTML = filteredNames.map((name) => `
        <article class="name-card" data-number="${name.number}">
            <div class="name-number">No. ${name.number}</div>
            <div class="name-arabic">${name.name.arabic}</div>
            <div class="name-transliteration">${name.name.transliteration}</div>
            <div class="name-translated">${name.name.translated}</div>
            <div class="name-meaning">${name.meaning || ''}</div>
            ${name.audio_url ? `<button class="audio-btn" data-audio="${name.audio_url}">Listen</button>` : ''}
        </article>
    `).join('');

    attachCardEvents();
}

function attachCardEvents() {
    document.querySelectorAll('.audio-btn').forEach((btn) => {
        btn.addEventListener('click', (event) => {
            event.stopPropagation();
            playAudio(btn.dataset.audio);
        });
    });

    document.querySelectorAll('.name-card').forEach((card) => {
        card.addEventListener('click', () => {
            const number = Number(card.dataset.number);
            const selectedName = allNames.find((name) => name.number === number);
            if (selectedName) showNameDetail(selectedName);
        });
    });
}

function showNameDetail(name) {
    const existingModal = document.getElementById('nameModal');
    if (existingModal) existingModal.remove();

    const modalHtml = `
        <div id="nameModal" class="modal">
            <div class="modal-content">
                <span class="close" aria-label="Close modal">&times;</span>
                <div class="modal-number">No. ${name.number}</div>
                <div class="modal-arabic">${name.name.arabic}</div>
                <div class="modal-transliteration">${name.name.transliteration}</div>
                <div class="modal-translated">${name.name.translated}</div>
                <div class="modal-meaning">${name.meaning || ''}</div>
                <div class="modal-details">
                    <h4>Details</h4>
                    <p>${escapeHtml(name.details || name.meaning || '')}</p>
                </div>
                ${name.audio_url ? `<button class="audio-btn modal-audio" data-audio="${name.audio_url}">Listen to recitation</button>` : ''}
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const modal = document.getElementById('nameModal');
    const closeBtn = modal.querySelector('.close');
    const modalAudio = modal.querySelector('.modal-audio');

    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (event) => {
        if (event.target === modal) modal.remove();
    });

    if (modalAudio) {
        modalAudio.addEventListener('click', () => playAudio(modalAudio.dataset.audio));
    }
}

function playAudio(audioUrl) {
    if (!audioUrl) return;
    audioPlayer.src = audioUrl;
    audioPlayer.play();
}

function setLanguageLabel() {
    activeLanguageLabel.textContent = languageLabels[currentLanguage];
}

function setEndpointExamples() {
    const origin = window.location.origin || '';
    const endpoint = `${origin}/api/asmaul-husna`;

    heroEndpoint.textContent = '/api/asmaul-husna';
    quickStartCode.textContent = `GET ${endpoint}?lang=english`;
    baseEndpointCode.textContent = endpoint;
    requestExamples.textContent = [
        `GET ${endpoint}?id=1`,
        `GET ${endpoint}?search=mercy`,
        `GET ${endpoint}?random=true&lang=urdu`,
        `GET ${origin}/api/details?id=3&lang=english`
    ].join('\n');
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

fetchNames();
