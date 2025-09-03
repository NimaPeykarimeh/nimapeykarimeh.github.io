document.addEventListener('DOMContentLoaded', () => {
    // VS Code Interface Management
    class VSCodeInterface {
        constructor() {
            this.activePanel = 'explorer';
            this.activeFile = 'about';
            this.currentLang = 'en';
            this.init();
        }

        init() {
            this.setupActivityBar();
            this.setupTabs();
            this.setupLanguageSwitcher();
            this.setupMobileNavigation();
            this.loadContent();
            this.initializeParticles();
        }

        setupActivityBar() {
            const activityItems = document.querySelectorAll('.activity-item');
            activityItems.forEach(item => {
                item.addEventListener('click', () => {
                    const panel = item.getAttribute('data-panel');
                    this.switchPanel(panel);
                });
            });
        }

        switchPanel(panelName) {
            // Update activity bar
            document.querySelectorAll('.activity-item').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelector(`[data-panel="${panelName}"]`).classList.add('active');

            // Update panels
            document.querySelectorAll('.panel').forEach(panel => {
                panel.classList.remove('active');
            });
            document.querySelector(`.${panelName}-panel`).classList.add('active');

            this.activePanel = panelName;
        }

        setupTabs() {
            // File tree clicks
            const fileItems = document.querySelectorAll('.file');
            fileItems.forEach(file => {
                file.addEventListener('click', () => {
                    const fileName = file.getAttribute('data-file');
                    this.switchFile(fileName);
                });
            });

            // Tab clicks
            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    if (e.target.classList.contains('tab-close')) {
                        this.closeTab(tab);
                    } else {
                        const fileName = tab.getAttribute('data-file');
                        this.switchFile(fileName);
                    }
                });
            });
        }

        switchFile(fileName) {
            // Update file tree
            document.querySelectorAll('.file').forEach(file => {
                file.classList.remove('active');
            });
            document.querySelector(`[data-file="${fileName}"]`).classList.add('active');

            // Update tabs
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelector(`.tab[data-file="${fileName}"]`).classList.add('active');

            // Update editor content
            document.querySelectorAll('.editor-file').forEach(file => {
                file.classList.remove('active');
            });
            document.querySelector(`.editor-file[data-file="${fileName}"]`).classList.add('active');

            this.activeFile = fileName;
            this.updateStatusBar();
        }

        closeTab(tab) {
            const fileName = tab.getAttribute('data-file');
            tab.remove();
            
            // Also remove the corresponding editor file if needed
            // and switch to another tab if this was the active one
            if (tab.classList.contains('active')) {
                const remainingTabs = document.querySelectorAll('.tab');
                if (remainingTabs.length > 0) {
                    const nextFile = remainingTabs[0].getAttribute('data-file');
                    this.switchFile(nextFile);
                }
            }
        }

        setupLanguageSwitcher() {
            document.getElementById('lang-en').addEventListener('click', () => this.setLanguage('en'));
            document.getElementById('lang-tr').addEventListener('click', () => this.setLanguage('tr'));
        }

        setLanguage(lang) {
            this.currentLang = lang;
            
            // Update language buttons
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.getElementById(`lang-${lang}`).classList.add('active');

            // Update content with i18n
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[lang] && translations[lang][key]) {
                    el.textContent = translations[lang][key];
                }
            });

            // Regenerate dynamic content
            this.loadContent();
        }

        setupMobileNavigation() {
            // Toggle side panel on mobile
            document.querySelectorAll('.activity-item').forEach(item => {
                item.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        const sidePanel = document.querySelector('.side-panel');
                        sidePanel.classList.toggle('mobile-open');
                    }
                });
            });

            // Close side panel when clicking outside on mobile
            document.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    const sidePanel = document.querySelector('.side-panel');
                    const activityBar = document.querySelector('.activity-bar');
                    
                    if (!sidePanel.contains(e.target) && !activityBar.contains(e.target)) {
                        sidePanel.classList.remove('mobile-open');
                    }
                }
            });
        }

        updateStatusBar() {
            const statusItems = {
                'about': { line: 1, col: 1, type: 'Markdown' },
                'steam': { line: 5, col: 20, type: 'JSON' },
                'assets': { line: 8, col: 15, type: 'TypeScript' },
                'itch': { line: 4, col: 10, type: 'JavaScript' }
            };

            const info = statusItems[this.activeFile] || { line: 1, col: 1, type: 'Text' };
            const statusRight = document.querySelector('.status-right');
            const lineColItem = statusRight.querySelector('.status-item');
            lineColItem.textContent = `Ln ${info.line}, Col ${info.col}`;
            lineColItem.nextElementSibling.textContent = info.type;
        }

        loadContent() {
            this.generateSteamGames();
            this.generateUnityAssets();
            this.generateItchGames();
        }

        generateSteamGames() {
            const container = document.getElementById('steam-game-content-area');
            if (!container) return;

            const gameData = steamGamesData[0];
            if (!gameData) return;

            let mainMediaHtml = '';
            if (gameData.media[0].type === 'video') {
                mainMediaHtml = `<iframe src="${gameData.media[0].url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            } else {
                mainMediaHtml = `<img src="${gameData.media[0].url}" alt="${gameData.media[0].altText[this.currentLang]}">`;
            }

            const thumbnailsHtml = gameData.media.map((mediaItem, index) => `
                <div class="thumbnail ${index === 0 ? 'active' : ''}" 
                     data-type="${mediaItem.type}" 
                     data-url="${mediaItem.url}">
                    <img src="${mediaItem.thumbnail}" 
                         alt="${mediaItem.altText[this.currentLang]}">
                </div>
            `).join('');

            const gameHtml = `
                <div class="game-details">
                    <img src="${gameData.logoSrc}" alt="${gameData.title[this.currentLang]} Logo" class="game-logo">
                    
                    <div class="game-showcase">
                        <div class="main-display">
                            ${mainMediaHtml}
                        </div>
                        <div class="thumbnail-list">
                            ${thumbnailsHtml}
                        </div>
                    </div>
                    
                    <p class="game-description">${gameData.description[this.currentLang]}</p>
                    <a href="${gameData.steamUrl}" class="game-button" target="_blank" rel="noopener noreferrer">
                        ${this.currentLang === 'tr' ? 'Steam\'de Görüntüle' : 'View on Steam'}
                    </a>
                </div>
            `;

            container.innerHTML = gameHtml;

            // Setup thumbnail click handlers
            const thumbnailList = container.querySelector('.thumbnail-list');
            if (thumbnailList) {
                thumbnailList.addEventListener('click', (event) => {
                    const thumbnail = event.target.closest('.thumbnail');
                    if (!thumbnail) return;

                    const type = thumbnail.getAttribute('data-type');
                    const url = thumbnail.getAttribute('data-url');
                    this.updateMainDisplay(type, url, thumbnail);
                });
            }
        }

        updateMainDisplay(type, url, clickedElement) {
            const mainDisplay = document.querySelector('.main-display');
            
            // Remove active class from all thumbnails
            document.querySelectorAll('.thumbnail').forEach(thumb => {
                thumb.classList.remove('active');
            });

            // Add active class to clicked thumbnail
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
            } else {
                const img = document.createElement('img');
                img.src = url;
                img.alt = 'Game Screenshot';
                mainDisplay.appendChild(img);
            }
        }

        generateUnityAssets() {
            const container = document.getElementById('unity-assets-container');
            if (!container) return;

            let htmlContent = '';
            myUnityAssets.forEach(asset => {
                const buttonText = asset.isActive ? asset.buttonText[this.currentLang] : asset.buttonText[this.currentLang];
                const buttonClass = asset.isActive ? 'asset-button' : 'asset-button disabled';
                const buttonAttrs = asset.isActive ? `href="${asset.assetUrl}" target="_blank" rel="noopener noreferrer"` : '';

                htmlContent += `
                    <div class="asset-card">
                        <img src="${asset.imageSrc}" alt="${asset.title[this.currentLang]}" class="asset-image">
                        <h3 class="asset-title">${asset.title[this.currentLang]}</h3>
                        <p class="asset-description">${asset.description[this.currentLang]}</p>
                        <a class="${buttonClass}" ${buttonAttrs}>${buttonText}</a>
                    </div>
                `;
            });

            container.innerHTML = htmlContent;
        }

        generateItchGames() {
            const container = document.getElementById('itch-games-container');
            if (!container) return;

            let htmlContent = '';
            itchGames.forEach(game => {
                htmlContent += `
                    <div class="game-card">
                        <a href="${game.link}" target="_blank" rel="noopener noreferrer">
                            <img src="${game.imgSrc}" alt="${game.altText[this.currentLang]}" class="game-image">
                            <h3 class="game-title">${game.title[this.currentLang]}</h3>
                        </a>
                        <p class="game-description">${game.genre[this.currentLang]}</p>
                        <a href="${game.link}" class="game-button" target="_blank" rel="noopener noreferrer">
                            ${this.currentLang === 'tr' ? 'Itch.io\'da Oyna' : 'Play on Itch.io'}
                        </a>
                    </div>
                `;
            });

            container.innerHTML = htmlContent;
        }

        initializeParticles() {
            // Initialize particles for the background (optional)
            if (typeof particlesJS !== 'undefined') {
                // You can add particles to specific sections if desired
                // particlesJS.load('particles-bg', 'particles.json');
            }
        }
    }

    // Data from your original script.js
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
            imageSrc: "https://assetstorev1-prd-cdn.unity3d.com/key-image/a331e081-fc11-48a0-8b0b-127c259a3121.webp",
            title: { en: "Ultimate 2D Platformer Toolkit", tr: "Ultimate 2D Platformer Araç Seti" },
            description: {
                en: "A comprehensive 2D platformer framework with smooth movement, enemies, pickups, and more.",
                tr: "Akıcı hareket, düşmanlar, toplama nesneleri ve daha fazlasını içeren kapsamlı bir 2D platformer altyapısı."
            },
            assetUrl: "https://assetstore.unity.com/packages/slug/328245",
            buttonText: { en: "Coming Soon", tr: "Yakında Geliyor" },
            isActive: false
        }
    ];

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

    const translations = {
        en: {
            nav_about: "about.md",
            nav_steam: "steam-games.json",
            nav_assets: "unity-assets.ts",
            nav_itch: "itch-games.js",
            about_title: "About Me",
            about_intro: "I'm Nima Peykarimeh. I love taking systems apart just to see how they can be built better. Unity is my playground. Sometimes I'm making tools that help other developers work smarter, sometimes I'm experimenting with prototypes that might turn into full games.",
            about_desc: "What fascinates me is how small mechanics can ripple into bigger experiences for players. That's why I focus on modular, reusable systems. They let me experiment, iterate, and find fun in places I didn't expect. My work lives where technical problem-solving meets playful creativity, and that's exactly where I want to be.",
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
            nav_about: "hakkimda.md",
            nav_steam: "steam-oyunlari.json",
            nav_assets: "unity-varliklar.ts",
            nav_itch: "itch-oyunlar.js",
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

    // Initialize the VS Code interface
    new VSCodeInterface();
});
