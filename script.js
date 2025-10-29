document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Data for Itch.io Games (with translations)
    const itchGames = [
        {
            imgSrc: "https://img.itch.zone/aW1nLzIwNDMyODQ1LnBuZw==/315x250%23c/qg7DDU.png",
            altText: { en: "Cosmic Blast", tr: "Cosmic Blast" },
            title: { en: "Cosmic Blast", tr: "Cosmic Blast" },
            genre: { en: "Shooter | Play in browser", tr: "Nişancı | Tarayıcıda Oyna" },
            link: "https://nimapeykarimeh.itch.io/cosmic-blast"
        },
        {
            imgSrc: "https://img.itch.zone/aW1nLzE2MjMxNzA3LmpwZw==/315x250%23c/9pSXy0.jpg",
            altText: { en: "Unity Defender", tr: "Unity Defender" },
            title: { en: "Unity Defender", tr: "Unity Defender" },
            genre: { en: "Shooter | Windows download", tr: "Nişancı | Windows indir" },
            link: "https://nimapeykarimeh.itch.io/unity-defender"
        },
        {
            imgSrc: "https://img.itch.zone/aW1nLzE2MzI0NDUxLmdpZg==/315x250%23cm/MUw%2BGU.gif",
            altText: { en: "Zombie Alien", tr: "Zombie Alien" },
            title: { en: "Zombie Alien", tr: "Zombie Alien" },
            genre: { en: "Windows download", tr: "Windows indir" },
            link: "https://nimapeykarimeh.itch.io/zombie-alien"
        },
        {
            imgSrc: "https://img.itch.zone/aW1nLzE3MzI1OTU4LnBuZw==/315x250%23c/eGnihc.png",
            altText: { en: "Catastrophy", tr: "Catastrophy" },
            title: { en: "Catastrophy", tr: "Catastrophy" },
            genre: { en: "Simulation | Windows download", tr: "Simülasyon | Windows indir" },
            link: "https://alren54.itch.io/catastrophy"
        },
        {
            imgSrc: "https://img.itch.zone/aW1nLzk1OTc4ODcucG5n/315x250%23c/BFnw8q.png",
            altText: { en: "Sticky Dice", tr: "Sticky Dice" },
            title: { en: "Sticky Dice", tr: "Sticky Dice" },
            genre: { en: "Puzzle | Play in browser | Windows download", tr: "Bulmaca | Tarayıcıda Oyna | Windows indir" },
            link: "https://nimapeykarimeh.itch.io/sticky-dice"
        },
        {
            imgSrc: "https://img.itch.zone/aW1nLzE1OTQyNzk5LnBuZw==/315x250%23c/B8oGk9.png",
            altText: { en: "İskir", tr: "İskir" },
            title: { en: "İskir", tr: "İskir" },
            genre: { en: "Survival | Windows download", tr: "Hayatta Kalma | Windows indir" },
            link: "https://kollessisopod.itch.io/iskir"
        }
    ];

    // Data for Unity Assets (with translations)
    const myUnityAssets = [
        {
            imageSrc: "https://assetstorev1-prd-cdn.unity3d.com/key-image/598fe0d0-9534-4feb-9b28-97f61624bdcf.webp",
            title: { en: "Quick Prefab Painter", tr: "Hızlı Prefab Boyama" },
            description: {
                en: "A fast and easy-to-use tool for painting prefabs in your Unity scenes.",
                tr: "Unity sahnelerinizde prefabları hızlıca boyamak için kolay bir araç."
            },
            assetUrl: "https://assetstore.unity.com/packages/slug/315001",
            buttonText: { en: "View on Asset Store", tr: "Asset Store'da Görüntüle" },
            isActive: true
        },
        {
            imageSrc: "https://assetstorev1-prd-cdn.unity3d.com/key-image/088ba073-04bc-4f6c-b971-72a0a2a5a324.webp",
            title: { en: "Complete Flashlight System", tr: "Tam Fener Sistemi" },
            description: {
                en: "A modular and customizable flashlight system for Unity with battery management and effects.",
                tr: "Pil yönetimi ve efektlerle modüler, özelleştirilebilir bir Unity fener sistemi."
            },
            assetUrl: "https://assetstore.unity.com/packages/slug/327109",
            buttonText: { en: "View on Asset Store", tr: "Asset Store'da Görüntüle" },
            isActive: true
        },
        {
            imageSrc: "https://assetstorev1-prd-cdn.unity3d.com/key-image/790f7a80-fef7-4998-9fd7-8962895de0e9.jpg",
            title: { en: "Prefab Brush Pro", tr: "Prefab Brush Pro" },
            description: {
                en: "Paint prefabs directly in your Unity scene. Build environments in minutes with full creative control.",
                tr: "Prefab Brush Pro ile Unity'de prefabları sahneye kolayca boyayın. Ortamları dakikalar içinde oluşturun, tam kontrol sizde olsun."
            },
            assetUrl: "https://assetstore.unity.com/packages/slug/332936",
            buttonText: { en: "View on Asset Store", tr: "Asset Store'da Görüntüle" },
            isActive: true
        },
        {
            imageSrc: "https://assetstorev1-prd-cdn.unity3d.com/key-image/a331e081-fc11-48a0-8b0b-127c259a3121.webp",
            title: { en: "Ultimate 2D Platformer Toolkit", tr: "Ultimate 2D Platformer Araç Seti" },
            description: {
                en: "A comprehensive 2D platformer framework with smooth movement.",
                tr: "Akıcı hareket ve daha fazlasını içeren kapsamlı bir 2D platformer altyapısı."
            },
            assetUrl: "https://assetstore.unity.com/packages/slug/328245",
            buttonText: { en: "Coming Soon", tr: "Yakında Geliyor" },
            isActive: false
        }
    ];

    // Data for Steam Games (with translations)
    const steamGamesData = [
        {
            title: { 
                en: "Penny for Your Potion", 
                tr: "İksirine Bir Kuruş" 
            },
            logoSrc: "media/Logo.png",
            description: {
                en: "Welcome to Penny for Your Potion! Customize your shop, manage your garden and brew potions for your customers to discover new ingredients, recipes and secrets in this medieval management game. Build the store of your dreams, grow your reputation and become the greatest alchemist in history!",
                tr: "Penny for Your Potion'a hoş geldiniz! Dükkanınızı özelleştirin, bahçenizi yönetin ve müşterileriniz için iksirler hazırlayarak yeni malzemeler, tarifler ve sırlar keşfedin. Hayalinizdeki mağazayı kurun, itibarınızı artırın ve tarihin en büyük simyacısı olun!"
            },
            steamUrl: "https://store.steampowered.com/app/3560010/Penny_for_Your_Potion/",
            media: [
                {
                    type: 'video',
                    url: 'https://www.youtube.com/embed/EnvD3vXdlyI',
                    thumbnail: 'https://img.youtube.com/vi/EnvD3vXdlyI/hqdefault.jpg',
                    altText: { en: 'Penny for Your Potion Trailer', tr: 'Penny for Your Potion Fragman' }
                },
                {
                    type: 'image',
                    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3560010/11c7b4e9d0b726edf7e217a726e0bff80076e504/ss_11c7b4e9d0b726edf7e217a726e0bff80076e504.1920x1080.jpg?t=1753465831',
                    thumbnail: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3560010/11c7b4e9d0b726edf7e217a726e0bff80076e504/ss_11c7b4e9d0b726edf7e217a726e0bff80076e504.600x338.jpg?t=1753465831',
                    altText: { en: 'Penny for Your Potion Screenshot 1', tr: 'Penny for Your Potion Ekran Görüntüsü 1' }
                },
                {
                    type: 'image',
                    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3560010/a4e4f2267d9b6d840a04385ee914234acff0feda/ss_a4e4f2267d9b6d840a04385ee914234acff0feda.1920x1080.jpg?t=1753465831',
                    thumbnail: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3560010/a4e4f2267d9b6d840a04385ee914234acff0feda/ss_a4e4f2267d9b6d840a04385ee914234acff0feda.600x338.jpg?t=1753465831',
                    altText: { en: 'Penny for Your Potion Screenshot 2', tr: 'Penny for Your Potion Ekran Görüntüsü 2' }
                },
                {
                    type: 'image',
                    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3560010/6428be39415ddd6a744ae9b20650f37e872920d6/ss_6428be39415ddd6a744ae9b20650f37e872920d6.1920x1080.jpg?t=1753465831',
                    thumbnail: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3560010/6428be39415ddd6a744ae9b20650f37e872920d6/ss_6428be39415ddd6a744ae9b20650f37e872920d6.600x338.jpg?t=1753465831',
                    altText: { en: 'Penny for Your Potion Screenshot 3', tr: 'Penny for Your Potion Ekran Görüntüsü 3' }
                }
            ]
        }
    ];

    // Track current language
    let currentLang = 'en';

    // Function to generate Itch.io Games HTML
    function generateItchGames(lang = currentLang) {
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
                        <img src="${game.imgSrc}" alt="${game.altText[lang]}" class="game-image" />
                        <h3 class="game-title">${game.title[lang]}</h3>
                    </a>
                    <p class="game-description">${game.genre[lang]}</p>
                    <a href="${game.link}" class="button" target="_blank" rel="noopener noreferrer">${lang === 'tr' ? 'Itch.io\'da Oyna' : 'Play on Itch.io'}</a>
                </div>
            `;
        });
        container.innerHTML = htmlContent;
    }

    // Function to generate Unity Asset Cards
    function generateUnityAssetCards(lang = currentLang) {
        const gridContainer = document.querySelector('.grid-container');
        if (!gridContainer) {
            console.error('The element with class "grid-container" was not found.');
            return;
        }

        gridContainer.innerHTML = ''; // Clear any existing content

        myUnityAssets.forEach(asset => {
            const buttonAttributes = asset.isActive
                ? `href="${asset.assetUrl}" target="_blank" rel="noopener noreferrer"`
                : '';
            const buttonClass = asset.isActive ? 'button' : 'button disabled';

            const cardHtml = `
                <div class="grid-item card">
                    <img src="${asset.imageSrc}" alt="${asset.title[lang]}" class="asset-image">
                    <h3 class="asset-title">${asset.title[lang]}</h3>
                    <p class="asset-description">${asset.description[lang]}</p>
                    <a class="${buttonClass}" ${buttonAttributes}>${asset.buttonText[lang]}</a>
                </div>
            `;
            gridContainer.innerHTML += cardHtml;
        });
    }

    // Function to generate Steam Games HTML
    function generateSteamGames(lang = currentLang) {
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
            mainMediaHtml = `<img id="main-image" src="${gameData.media[0].url}" alt="${gameData.media[0].altText[lang]}">`;
        }

        const thumbnailsHtml = gameData.media.map((mediaItem, index) => `
            <div class="thumbnail ${index === 0 ? 'active' : ''}" 
                 data-type="${mediaItem.type}" 
                 data-url="${mediaItem.url}">
                <img src="${mediaItem.thumbnail}" 
                     alt="${mediaItem.altText[lang]}">
            </div>
        `).join('');

        const gameHtml = `
        <div class="game-details card full-width-layout">
        <img src="${gameData.logoSrc}" alt="${gameData.title[lang]} Logo" class="game-logo">
        
        <div class="game-showcase">
        <div class="main-display">
        ${mainMediaHtml}
        </div>
        <div class="thumbnail-list">
        ${thumbnailsHtml}
        
        </div>
        </div>
        
                <p class="game-description">${gameData.description[lang]}</p> 
                <a href="${gameData.steamUrl}" class="button" target="_blank" rel="noopener noreferrer">${lang === 'tr' ? 'Steam\'de Görüntüle' : 'View on Steam'}</a>
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
                    updateMainDisplay(type, url, clickedElement, lang);
                }
            });
        }
    }

    // Function to update the main display area
    function updateMainDisplay(type, url, clickedElement, lang = currentLang) { 
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

    // i18n for static text
    const translations = {
        en: {
            nav_reel: "Developer Reel",
            nav_about: "About Me",
            nav_steam: "Steam Games",
            nav_assets: "Unity Assets",
            nav_itch: "Itch.io Games",
            reel_title: "Developer Reel",
            about_title: "About Me",
            about_intro: "I’m Nima Peykarimeh. I love taking systems apart just to see how they can be built better. Unity is my playground. Sometimes I’m making tools that help other developers work smarter, sometimes I’m experimenting with prototypes that might turn into full games.",
            about_desc: "What fascinates me is how small mechanics can ripple into bigger experiences for players. That’s why I focus on modular, reusable systems. They let me experiment, iterate, and find fun in places I didn’t expect. My work lives where technical problem-solving meets playful creativity, and that’s exactly where I want to be.",
            steam_title: "Available on Steam",
            assets_title: "Asset Store Creations",
            itch_title: "Itch.io Games",
            
            // Stats
            stat_experience: "5",
            stat_experience_label: "Years experience with Unity",
            stat_assets: "3",
            stat_assets_label: "Tools on the Unity Asset Store",
            stat_games: "10+",
            stat_games_label: "Playable Games & Prototypes",
            
            // Skills
            skills_title: "Core Expertise",
            skill_unity: "Unity Engine",
            skill_csharp: "C# Programming",
            skill_architecture: "System Architecture",
            skill_gamedesign: "Game Design",
            skill_tools: "Tool Development",
            skill_platforms: "Multi-Platform"
        },
        tr: {
            nav_reel: "Geliştirici Videosu",
            nav_about: "Hakkımda",
            nav_steam: "Steam Oyunları",
            nav_assets: "Unity Varlıkları",
            nav_itch: "Itch.io Oyunları",
            reel_title: "Geliştirici Videosu",
            about_title: "Hakkımda",
            about_intro: "Ben Nima Peykarimeh. Sistemleri söküp, daha iyi nasıl inşa edilebileceklerini görmekten hoşlanıyorum. Unity benim oyun alanım. Bazen diğer geliştiricilerin daha akıllıca çalışmalarına yardımcı olan araçlar yapıyorum, bazen de tam bir oyuna dönüşebilecek prototiplerle denemeler yapıyorum.",
            about_desc: "Beni en çok heyecanlandıran şey, küçük mekaniklerin oyun deneyimini nasıl büyük ölçüde değiştirebileceğini görmek. Bu yüzden modüler ve tekrar kullanılabilir sistemler tasarlamayı tercih ediyorum. Böylece deniyor, değiştiriyor ve beklemediğim yerlerde eğlenceli sonuçlar keşfedebiliyorum. İşim teknik çözüm üretmekle yaratıcı fikirleri bir araya getirmek arasında, tam olarak orada olmayı seviyorum.",
            steam_title: "Steam'de Yayında",
            assets_title: "Asset Store Ürünlerim",
            itch_title: "Itch.io Oyunlarım",
            // Stats
            stat_experience: "5",
            stat_experience_label: "Yıl Unity deneyimi",
            stat_assets: "3",
            stat_assets_label: "Unity Asset Store aracı",
            stat_games: "10+",
            stat_games_label: "Oynanabilir Oyun ve Prototip",
            // Skills
            skills_title: "Temel Uzmanlık Alanları",
            skill_unity: "Unity Motoru",
            skill_csharp: "C# Programlama",
            skill_architecture: "Sistem Mimarisi",
            skill_gamedesign: "Oyun Tasarımı",
            skill_tools: "Araç Geliştirme",
            skill_platforms: "Çoklu Platform"
        }
    };

    function setLanguage(lang) {
        currentLang = lang;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
        // Optionally, update button styles to show active language
        document.getElementById('lang-en').classList.toggle('active', lang === 'en');
        document.getElementById('lang-tr').classList.toggle('active', lang === 'tr');

        // Regenerate dynamic content
        generateItchGames(lang);
        generateUnityAssetCards(lang);
        generateSteamGames(lang);
    }

    // Language button event listeners
    document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
    document.getElementById('lang-tr').addEventListener('click', () => setLanguage('tr'));

    // Set default language and generate content
    setLanguage('en');

    // Particles.js initialization
    particlesJS.load('particles-unity-assets', 'particles.json');
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('particles.js loaded - callback');
    });

    // Hamburger menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    menuToggle.addEventListener('pointerdown', () => {
        navLinks.classList.toggle('open');
        document.body.classList.toggle('menu-open', navLinks.classList.contains('open'));
    });

    // Optional: Close menu when a link is clicked (for better UX)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            document.body.classList.remove('menu-open');
        });
    });
    // // Optional: Close menu when clicking outside the panel
    // document.addEventListener('click', (e) => {
    //     if (
    //         navLinks.classList.contains('open') &&
    //         !navLinks.contains(e.target) &&
    //         e.target !== menuToggle
    //     ) {
    //         navLinks.classList.remove('open');
    //         document.body.classList.remove('menu-open');
    //     }
    // });
});
