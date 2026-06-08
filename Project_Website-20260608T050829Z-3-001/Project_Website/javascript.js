// Global variables to store data
let games = [];
let genres = [];
let platforms = [];
let fullGameData = [];

// Configuration
const link = "http://localhost:8500";

// Initialize the application
function init() {
    $.ajaxSetup({async: false});
    
    try {
        // Load all games
        let route = "/games";
        games = $.getJSON(link + route).responseJSON;
        
        // Load full game data with genre information
        route = "/full";
        fullGameData = $.getJSON(link + route).responseJSON;
        
        // Generate initial cards display (only on genre and platform pages)
        generateCards(fullGameData);
        
    } catch (error) {
        showError("Failed to load data from server.");
    }
}

// Filter games by genre (client-side filtering)
function filterByGenre(genreName) {
    let filteredGames;
    
    if (genreName === 'all') {
        filteredGames = fullGameData;
    } else {
        filteredGames = fullGameData.filter(game => game.genre_name === genreName);
    }
    
    generateCards(filteredGames);
    updateFilterButtons('genre', genreName);
}

// Filter games by platform (client-side filtering)
function filterByPlatform(platformName) {
    let filteredGames;
    
    if (platformName === 'all') {
        filteredGames = fullGameData;
    } else {
        filteredGames = fullGameData.filter(game => game.platform === platformName);
    }
    
    generateCards(filteredGames);
    updateFilterButtons('platform', platformName);
}

// Generate game cards from data
function generateCards(gameData) {
    const container = document.getElementById('cards-container');
    
    if (!container) {
        console.log("No cards container found - probably on home page");
        return;
    }
    
    // Hide loading indicator
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
    
    if (!gameData || gameData.length === 0) {
        container.innerHTML = '<div class="error">No games found matching your criteria.</div>';
        return;
    }
    
    const cardsHTML = gameData.map(game => createGameCard(game)).join('');
    container.innerHTML = cardsHTML;
    
    console.log("Generated cards for", gameData.length, "games");
}

// Create individual game card HTML
function createGameCard(game) {
	console.log("Creating card for game:", game.title, "Raw game data:", game);
    const rating = parseFloat(game.rating) || 0;
    const stars = '★'.repeat(Math.floor(rating / 2)) + '☆'.repeat(5 - Math.floor(rating / 2));
    const price = parseFloat(game.price) || 0;
    const priceDisplay = price === 0 ? 'Free' : `$${price.toFixed(2)}`;
    const priceClass = price === 0 ? 'free-game' : '';
    const genreName = game.genre_name || 'Unknown';
	
	// Debug platform data
    console.log("Platform data for", game.title + ":");
    console.log("- game.platform:", game.platform);
    console.log("- game.platform_id:", game.platform_id);
    console.log("- All game properties:", Object.keys(game));
    
    return `
        <div class="game-card">
            <div class="card-header">
                <div>
                    <div class="game-title">${game.title || 'Unknown Title'}</div>
                    <div class="game-rating">
                        <span class="rating-stars">${stars}</span>
                        <span class="rating-number">${rating}/10</span>
                    </div>
                </div>
                <div class="game-genre">${genreName}</div>
            </div>
            
            <div class="game-details">
                <div class="detail-item">
                    <span class="detail-label">Platform</span>
                    <span class="detail-value">${game.platform || 'Unknown'}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Platform ID</span>
                    <span class="detail-value">${game.platform_id || 'Unknown'}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Release Year</span>
                    <span class="detail-value">${game.release_year || 'Unknown'}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Developer</span>
                    <span class="detail-value">${game.developer || 'Unknown'}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Publisher</span>
                    <span class="detail-value">${game.publisher || 'Unknown'}</span>
                </div>
            </div>
            
            <div class="game-price ${priceClass}">${priceDisplay}</div>
            
            <div class="game-description">${game.description || 'No description available.'}</div>
        </div>
    `;
}

// Update filter button states
function updateFilterButtons(filterType, activeFilter) {
    const buttons = document.querySelectorAll('.filter-btn');
    
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Find and activate the clicked button
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

// Show error message
function showError(message) {
    const container = document.getElementById('cards-container');
    if (container) {
        container.innerHTML = `<div class="error">${message}</div>`;
    }
    
    // Hide loading indicator
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
    
    console.error(message);
}

// Export functions for global access
window.filterByGenre = filterByGenre;
window.filterByPlatform = filterByPlatform;

// Initialize the application
init();