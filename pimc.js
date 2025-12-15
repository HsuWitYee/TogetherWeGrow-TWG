let currentPage = 1;
const parksPerPage = 6;
let filteredParks = []; 
const TRANSITION_DURATION = 500; // 500ms (0.5s) for smooth fading

// --- Initialize Filters & Elements ---
const parkItems = Array.from(document.querySelectorAll('.park-item'));
const parkCardsContainer = document.getElementById('parkCards');
const searchInput = document.querySelector('.search-box input');
const cityButtons = document.querySelectorAll('.city-buttons .btn');

let activeCityFilter = null; 

// --- Set Initial Park Data (City) for Filtering ---
function initializeParkData() {
    const cityMap = {
        'Yangon': ['Kandawgyi Park', 'Hlawga Wildlife Park', 'Maha Bundula Park', 'People’s Park', 'Inya Lake Park', 'Bogyoke Aung San Park', 'Kan Thar Yar Park'],
        'Mandalay': ['City Park'],
        'Mawlamyine': ['Myine Thar Yar Park', 'Ramonnya Park'],
        'Sagaing': ['Alaungdaw Kathapa National Park', 'Shwe Min Wun', 'Happy Life Water Park'],
        'Shan': ['Floating Gardens', 'Hsipaw'],
        'Chin': ['Mount Victoria National Park'],
        'Kachin': ['Khakaborazi National Park', 'Kachin National Manau Park']
    };

    parkItems.forEach(item => {
        const title = item.querySelector('h5').textContent.split(':')[0].trim();
        let city = '';
        
        for (const [cityName, parkTitles] of Object.entries(cityMap)) {
            if (parkTitles.some(parkName => title.startsWith(parkName.split(':')[0].trim()))) {
                city = cityName;
                break;
            }
        }
        item.setAttribute('data-city', city);
    });
}

// --- Main Filtering Function ---
function applyFilters() {
    // 1. Start fade-out effect for all currently visible cards
    parkItems.forEach(item => item.classList.remove('show'));

    // 2. Wait for fade-out transition
    setTimeout(() => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        filteredParks = parkItems.filter(item => {
            const title = item.querySelector('h5').textContent.toLowerCase();
            const city = item.getAttribute('data-city');
            const matchesSearch = title.includes(searchTerm);
            const matchesCity = activeCityFilter === null || city === activeCityFilter;
            return matchesSearch && matchesCity;
        });

        currentPage = 1;
        updateDisplay();
    }, TRANSITION_DURATION);
}

// --- Display & Pagination Update ---
function updateDisplay() {
    const totalPages = Math.ceil(filteredParks.length / parksPerPage);
    
    parkItems.forEach(item => {
        item.style.display = 'none';
        item.classList.remove('show');
    });

    const startIndex = (currentPage - 1) * parksPerPage;
    const endIndex = startIndex + parksPerPage;

    const visibleParks = filteredParks.slice(startIndex, endIndex);

    visibleParks.forEach(item => item.style.display = 'flex');

    setTimeout(() => {
        visibleParks.forEach(item => item.classList.add('show'));
    }, 10);

    // --- CENTER LAST ROW ---
    const itemsPerRow = 3; // desktop
    const remaining = visibleParks.length % itemsPerRow;
    if (remaining === 1 || remaining === 2) {
        parkCardsContainer.style.justifyContent = 'center';
    } else {
        parkCardsContainer.style.justifyContent = 'flex-start';
    }

    // --- Show "No results found" if needed ---
    // --- Show "No results found" and hide pagination if needed ---
    const noResultsDiv = document.getElementById('noResults');
    const paginationContainer = document.querySelector('.pagination');
    if (filteredParks.length === 0) {
        noResultsDiv.style.display = 'block';
        if (paginationContainer) paginationContainer.style.display = 'none'; // hide pagination
    } else {
        noResultsDiv.style.display = 'none';
        if (paginationContainer) paginationContainer.style.display = 'flex'; // show pagination
    }

    updatePagination(totalPages);
}

// --- Pagination Control Functions ---
function updatePagination(totalPages) {
    let pageButtonsHtml = '';
    for (let i = 1; i <= totalPages; i++) {
        const activeClass = i === currentPage ? ' active' : '';
        pageButtonsHtml += `
            <li class="page-item">
                <button class="page-link${activeClass}" onclick="loadPage(${i})">${i}</button>
            </li>
        `;
    }

    const paginationContainer = document.querySelector('.pagination');
    const nextButton = paginationContainer.querySelector('li:last-child');
    paginationContainer.querySelectorAll('.page-item:not(:first-child):not(:last-child)').forEach(btn => btn.remove());
    nextButton.insertAdjacentHTML('beforebegin', pageButtonsHtml);

    paginationContainer.querySelector('li:first-child button').disabled = currentPage === 1;
    paginationContainer.querySelector('li:last-child button').disabled = currentPage === totalPages || totalPages === 0;
}

function loadPage(page) {
    const totalPages = Math.ceil(filteredParks.length / parksPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    updateDisplay();
}

window.loadPage = loadPage;

// --- Event Listeners ---
searchInput.addEventListener('input', applyFilters);

cityButtons.forEach(button => {
    button.addEventListener('click', function() {
        const city = this.textContent.trim();
        cityButtons.forEach(btn => {
            btn.classList.remove('btn-success');
            btn.classList.add('btn-outline-secondary');
        });

        if (city === 'All') {
            activeCityFilter = null;
            this.classList.add('btn-success');
            this.classList.remove('btn-outline-secondary');
        } else {
            activeCityFilter = city;
            this.classList.add('btn-success');
            this.classList.remove('btn-outline-secondary');
        }

        applyFilters();
    });
});

// --- Initial Setup on Load ---
window.onload = () => {
    initializeParkData();

    const allButton = document.querySelector('.city-buttons .btn:first-child');
    if (allButton) {
        allButton.classList.add('btn-success');
        allButton.classList.remove('btn-outline-secondary');
    }

    applyFilters();
};
