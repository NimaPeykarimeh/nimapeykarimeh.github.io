document.addEventListener('DOMContentLoaded', () => {
    // ... (existing smooth scrolling and other initial logic) ...

    // Data for Itch.io Games
    const itchGames = [
        {
            imgSrc: "https://img.itch.zone/aW1nLzIwNDMyODQ1LnBuZw==/315x250%23c/qg7DDU.png",
            altText: "Cosmic Blast",
            title: "Cosmic Blast",
            genre: "Shooter | Play in browser",
            link: "https://nimapeykarimeh.itch.io/cosmic-blast"
        },
        {
            imgSrc: "https://img.itch.zone/aW1nLzE2MjMxNzA3LmpwZw==/315x250%23c/9pSXy0.jpg",
            altText: "Unity Defender",
            title: "Unity Defender",
            genre: "Shooter | Windows download",
            link: "https://nimapeykarimeh.itch.io/unity-defender"
        },
        {
            imgSrc: "https://img.itch.zone/aW1nLzE2MzI0NDUxLmdpZg==/315x250%23cm/MUw%2BGU.gif",
            altText: "Zombie Alien",
            title: "Zombie Alien",
            genre: "Windows download",
            link: "https://nimapeykarimeh.itch.io/zombie-alien"
        },
        {
            imgSrc: "https://img.itch.zone/aW1nLzE3MzI1OTU4LnBuZw==/315x250%23c/eGnihc.png",
            altText: "Catastrophy",
            title: "Catastrophy",
            genre: "Simulation | Windows download",
            link: "https://alren54.itch.io/catastrophy"
        },
        {
            imgSrc: "https://img.itch.zone/aW1nLzk1OTc4ODcucG5n/315x250%23c/BFnw8q.png",
            altText: "Sticky Dice",
            title: "Sticky Dice",
            genre: "Puzzle | Play in browser | Windows download",
            link: "https://nimapeykarimeh.itch.io/sticky-dice"
        },
        {
            imgSrc: "https://img.itch.zone/aW1nLzE1OTQyNzk5LnBuZw==/315x250%23c/B8oGk9.png",
            altText: "İskir",
            title: "İskir",
            genre: "Survival | Windows download",
            link: "https://kollessisopod.itch.io/iskir"
        }
    ];

    // Data for Unity Assets
    const myUnityAssets = [
        {
            imageSrc: "https://assetstorev1-prd-cdn.unity3d.com/key-image/598fe0d0-9534-4feb-9b28-97f61624bdcf.webp",
            title: "Quick Prefab Painter",
            description: "A fast and easy-to-use tool for painting prefabs in your Unity scenes.",
            assetUrl: "https://assetstore.unity.com/packages/slug/315001"
        },
        {
            imageSrc: "https://assetstorev1-prd-cdn.unity3d.com/key-image/088ba073-04bc-4f6c-b971-72a0a2a5a324.webp",
            title: "Complete Flashlight System",
            description: "A modular and customizable flashlight system for Unity with battery management and effects.",
            assetUrl: "https://assetstore.unity.com/packages/slug/327109"
        },
        {
            imageSrc: "https://assetstorev1-prd-cdn.unity3d.com/key-image/a331e081-fc11-48a0-8b0b-127c259a3121.webp",
            title: "Ultimate 2D Platformer Toolkit",
            description: "A comprehensive 2D platformer framework with smooth movement, enemies, pickups, and more.",
            assetUrl: "https://assetstore.unity.com/packages/slug/328245"
        }
    ];

    // Data for Steam Games
    const steamGamesData = [
        {
            title: "Penny for Your Potion",
            logoSrc: "media/Logo.png", // Assuming this is a local path to your logo
            description: "A cozy yet mysterious potion-making simulation game. Serve whimsical customers, uncover secrets, and build your own magical potion shop.",
            steamUrl: "https://store.steampowered.com/app/3560010/Penny_for_Your_Potion/",
            media: [
                {
                    type: 'video',
                    url: 'https://www.youtube.com/embed/EnvD3vXdlyI', // YouTube embed URL
                    thumbnail: 'https://img.youtube.com/vi/EnvD3vXdlyI/hqdefault.jpg', // Thumbnail for the video
                    altText: 'Penny for Your Potion Trailer'
                },
                {
                    type: 'image',
                    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3560010/11c7b4e9d0b726edf7e217a726e0bff80076e504/ss_11c7b4e9d0b726edf7e217a726e0bff80076e504.600x338.jpg?t=1753465831',
                    thumbnail: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3560010/11c7b4e9d0b726edf7e217a726e0bff80076e504/ss_11c7b4e9d0b726edf7e217a726e0bff80076e504.600x338.jpg?t=1753465831',
                    altText: 'Penny for Your Potion Screenshot 1'
                },
                {
                    type: 'image',
                    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3560010/a4e4f2267d9b6d840a04385ee914234acff0feda/ss_a4e4f2267d9b6d840a04385ee914234acff0feda.600x338.jpg?t=1753465831',
                    thumbnail: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3560010/a4e4f2267d9b6d840a04385ee914234acff0feda/ss_a4e4f2267d9b6d840a04385ee914234acff0feda.600x338.jpg?t=1753465831',
                    altText: 'Penny for Your Potion Screenshot 2'
                }
            ]
        }
        // You can add more Steam games here if you want to expand this section later
    ];

    // Function to generate Itch.io Games HTML
    function generateItchGames() {
        const container = document.getElementById('itch-games-container');
        if (!container) {
            console.error("Itch.io games container not found! Check your HTML ID.");
            return;
        }

        let htmlContent = '';
        itchGames.forEach(game => {
            htmlContent += `
                <div class="grid-item card">
                    <a href="${game.link}" target="_blank" rel="noopener noreferrer">
                        <img src="${game.imgSrc}" alt="${game.altText}" class="game-image" />
                        <h3 class="game-title">${game.title}</h3>
                    </a>
                    <p class="game-description">${game.genre}</p>
                    <a href="${game.link}" class="button" target="_blank" rel="noopener noreferrer">Play on Itch.io</a>
                </div>
            `;
        });
        container.innerHTML = htmlContent;
    }

    // Function to generate Unity Asset Cards
    function generateUnityAssetCards() {
        const gridContainer = document.querySelector('.grid-container');
        if (!gridContainer) {
            console.error('The element with class "grid-container" was not found.');
            return;
        }

        gridContainer.innerHTML = ''; // Clear any existing content

        myUnityAssets.forEach(asset => {
            const cardHtml = `
                <div class="grid-item card">
                    <img src="${asset.imageSrc}" alt="${asset.title}" class="asset-image">
                    <h3 class="asset-title">${asset.title}</h3>
                    <p class="asset-description">${asset.description}</p>
                    <a href="${asset.assetUrl}" class="button" target="_blank" rel="noopener noreferrer">View on Asset Store</a>
                </div>
            `;
            gridContainer.innerHTML += cardHtml;
        });
    }

    // Function to generate Steam Games HTML
    function generateSteamGames() {
    const contentArea = document.getElementById('steam-game-content-area');
    if (!contentArea) {
        console.error("Steam game content area not found! Please add <div id='steam-game-content-area'></div> inside your Steam section's container.");
        return;
    }

    const gameData = steamGamesData[0];

    if (!gameData) {
        console.warn("No Steam game data available to generate.");
        return;
    }

    let mainMediaHtml = '';
    if (gameData.media[0].type === 'video') {
        mainMediaHtml = `<iframe id="main-video" src="${gameData.media[0].url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    } else {
        mainMediaHtml = `<img id="main-image" src="${gameData.media[0].url}" alt="${gameData.media[0].altText}">`;
    }

    const thumbnailsHtml = gameData.media.map((mediaItem, index) => `
        <div class="thumbnail ${index === 0 ? 'active' : ''}" 
             data-type="${mediaItem.type}" 
             data-url="${mediaItem.url}">
            <img src="${mediaItem.thumbnail}" 
                 alt="${mediaItem.altText}">
        </div>
    `).join('');

    const gameHtml = `
    <div class="game-details card full-width-layout">
    <img src="${gameData.logoSrc}" alt="${gameData.title} Logo" class="game-logo">
    
    <div class="game-showcase">
    <div class="main-display">
    ${mainMediaHtml}
    </div>
    <div class="thumbnail-list">
    ${thumbnailsHtml}
    </div>
    </div>
    
            <p class="game-description">${gameData.description}</p>
            <a href="${gameData.steamUrl}" class="button" target="_blank" rel="noopener noreferrer">View on Steam</a>
        </div>
    `;

    contentArea.innerHTML = gameHtml;

    // Event Delegation for Thumbnails
    const thumbnailList = contentArea.querySelector('.thumbnail-list');
    if (thumbnailList) {
        thumbnailList.addEventListener('click', (event) => {
            const clickedElement = event.target.closest('.thumbnail');
            if (clickedElement) {
                const type = clickedElement.dataset.type;
                const url = clickedElement.dataset.url;
                updateMainDisplay(type, url, clickedElement);
            }
        });
    }
}


    // Function to update the main display area
    function updateMainDisplay(type, url, clickedElement) { 
        const mainDisplay = document.querySelector('.main-display');
        
        // Remove active class from all thumbnails
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.classList.remove('active');
        });

        // Add active class to the clicked thumbnail
        if (clickedElement) { 
            clickedElement.classList.add('active');
        }

        // Clear existing content
        mainDisplay.innerHTML = '';

        if (type === 'video') {
            const iframe = document.createElement('iframe');
            iframe.src = url;
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', '');
            mainDisplay.appendChild(iframe);
        } else if (type === 'image') {
            const img = document.createElement('img');
            img.src = url;
            img.setAttribute('alt', 'Game Screenshot');
            mainDisplay.appendChild(img);
        }
    }

    // Call all generation functions when the DOM is ready
    generateItchGames();
    generateUnityAssetCards();
    generateSteamGames(); // Call the new function here
});
