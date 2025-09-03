document.addEventListener('DOMContentLoaded', () => {
    // Unity Editor Interface Management
    class UnityEditorInterface {
        constructor() {
            this.activeScene = 'about';
            this.currentLang = 'en';
            this.selectedTool = 'hand';
            this.init();
        }

        init() {
            this.setupHierarchy();
            this.setupTabs();
            this.setupToolbar();
            this.setupLanguageSwitcher();
            this.setupPlayControls();
            this.setupResponsiveNavigation();
            this.loadContent();
            this.updateInspector();
            this.addConsoleMessages();
        }

        setupHierarchy() {
            const hierarchyItems = document.querySelectorAll('.hierarchy-item[data-scene]');
            hierarchyItems.forEach(item => {
                item.addEventListener('click', () => {
                    const scene = item.getAttribute('data-scene');
                    this.switchScene(scene);
                });
            });

            // Handle hierarchy expand/collapse
            const expandableItems = document.querySelectorAll('.hierarchy-item.expanded');
            expandableItems.forEach(item => {
                const chevron = item.querySelector('i:first-child');
                if (chevron) {
                    chevron.addEventListener('click', (e) => {
                        e.stopPropagation();
                        item.classList.toggle('expanded');
                        const children = item.nextElementSibling;
                        if (children && children.classList.contains('hierarchy-children')) {
                            children.style.display = item.classList.contains('expanded') ? 'block' : 'none';
                        }
                    });
                }
            });
        }

        setupTabs() {
            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    if (e.target.classList.contains('tab-close')) {
                        this.closeTab(tab);
                    } else {
                        const scene = tab.getAttribute('data-scene');
                        this.switchScene(scene);
                    }
                });
            });
        }

        setupToolbar() {
            const toolBtns = document.querySelectorAll('.tool-btn');
            toolBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const tool = btn.getAttribute('data-tool');
                    this.selectTool(tool);
                });
            });

            // Play controls
            const playBtn = document.querySelector('.play-btn');
            const pauseBtn = document.querySelector('.pause-btn');
            const stepBtn = document.querySelector('.step-btn');

            playBtn.addEventListener('click', () => this.togglePlayMode());
            pauseBtn.addEventListener('click', () => this.pauseGame());
            stepBtn.addEventListener('click', () => this.stepFrame());
        }

        setupLanguageSwitcher() {
            document.getElementById('lang-en').addEventListener('click', () => this.setLanguage('en'));
            document.getElementById('lang-tr').addEventListener('click', () => this.setLanguage('tr'));
        }

        setupPlayControls() {
            // Add visual feedback for play controls
            const playControls = document.querySelectorAll('.play-btn, .pause-btn, .step-btn');
            playControls.forEach(control => {
                control.addEventListener('click', () => {
                    control.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        control.style.transform = 'scale(1)';
                    }, 100);
                });
            });
        }

        setupResponsiveNavigation() {
            // Handle window resizing
            window.addEventListener('resize', () => {
                this.adjustLayout();
            });
        }

        switchScene(sceneName) {
            // Update hierarchy selection
            document.querySelectorAll('.hierarchy-item').forEach(item => {
                item.classList.remove('selected');
            });
            document.querySelector(`[data-scene="${sceneName}"]`).classList.add('selected');

            // Update tabs
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelector(`.tab[data-scene="${sceneName}"]`).classList.add('active');

            // Update scene views
            document.querySelectorAll('.scene-view').forEach(view => {
                view.classList.remove('active');
            });
            document.querySelector(`.scene-view[data-scene="${sceneName}"]`).classList.add('active');

            // Update inspector
            document.querySelectorAll('.inspector-object').forEach(obj => {
                obj.classList.remove('active');
            });
            document.querySelector(`.inspector-object[data-scene="${sceneName}"]`).classList.add('active');

            this.activeScene = sceneName;
            this.addConsoleMessage(`Scene "${sceneName}" loaded successfully.`, 'info');
        }

        closeTab(tab) {
            const scene = tab.getAttribute('data-scene');
            tab.remove();
            
            // Switch to another tab if this was active
            if (tab.classList.contains('active')) {
                const remainingTabs = document.querySelectorAll('.tab');
                if (remainingTabs.length > 0) {
                    const nextScene = remainingTabs[0].getAttribute('data-scene');
                    this.switchScene(nextScene);
                }
            }
        }

        selectTool(toolName) {
            // Update tool selection
            document.querySelectorAll('.tool-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector(`[data-tool="${toolName}"]`).classList.add('active');

            this.selectedTool = toolName;
            this.addConsoleMessage(`${toolName.charAt(0).toUpperCase() + toolName.slice(1)} tool selected.`, 'info');
        }

        togglePlayMode() {
            const playBtn = document.querySelector('.play-btn');
            playBtn.classList.toggle('active');
            
            if (playBtn.classList.contains('active')) {
                this.addConsoleMessage('Entering Play Mode...', 'info');
                playBtn.style.color = 'var(--unity-green)';
            } else {
                this.addConsoleMessage('Exiting Play Mode...', 'info');
                playBtn.style.color = '';
            }
        }

        pauseGame() {
            this.addConsoleMessage('Game paused.', 'info');
        }

        stepFrame() {
            this.addConsoleMessage('Stepping one frame...', 'info');
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
            this.addConsoleMessage(`Language switched to ${lang.toUpperCase()}.`, 'info');
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
                <div class="game-details-3d">
                    <img src="${gameData.logoSrc}" alt="${gameData.title[this.currentLang]} Logo" class="game-logo-3d">
                    
                    <div class="game-showcase">
                        <div class="main-display">
                            ${mainMediaHtml}
                        </div>
                        <div class="thumbnail-list">
                            ${thumbnailsHtml}
                        </div>
                    </div>
                    
                    <p class="game-description-3d">${gameData.description[this.currentLang]}</p>
                    <a href="${gameData.steamUrl}" class="game-button-3d" target="_blank" rel="noopener noreferrer">
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

            this.addConsoleMessage(`Media updated: ${type}`, 'info');
        }

        generateUnityAssets() {
            const container = document.getElementById('unity-assets-container');
            if (!container) return;

            let htmlContent = '';
            myUnityAssets.forEach(asset => {
                const buttonText = asset.buttonText[this.currentLang];
                const buttonClass = asset.isActive ? 'asset-button-3d' : 'asset-button-3d disabled';
                const buttonAttrs = asset.isActive ? `href="${asset.assetUrl}" target="_blank" rel="noopener noreferrer"` : '';

                htmlContent += `
                    <div class="asset-card-3d">
                        <img src="${asset.imageSrc}" alt="${asset.title[this.currentLang]}" class="asset-image-3d">
                        <h3 class="asset-title-3d">${asset.title[this.currentLang]}</h3>
                        <p class="asset-description-3d">${asset.description[this.currentLang]}</p>
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
                    <div class="game-card-3d">
                        <a href="${game.link}" target="_blank" rel="noopener noreferrer">
                            <img src="${game.imgSrc}" alt="${game.altText[this.currentLang]}" class="game-image-3d">
                            <h3 class="game-title-3d">${game.title[this.currentLang]}</h3>
                        </a>
                        <p class="game-description-3d">${game.genre[this.currentLang]}</p>
                        <a href="${game.link}" class="game-button-3d" target="_blank" rel="noopener noreferrer">
                            ${this.currentLang === 'tr' ? 'Itch.io\'da Oyna' : 'Play on Itch.io'}
                        </a>
                    </div>
                `;
            });

            container.innerHTML = htmlContent;
        }

        updateInspector() {
            // Inspector content is already structured in HTML
            // This method can be extended for dynamic inspector updates
        }

        addConsoleMessages() {
            // Add initial console messages
            setTimeout(() => {
                this.addConsoleMessage('Unity Editor initialized successfully.', 'info');
            }, 500);

            setTimeout(() => {
                this.addConsoleMessage('Portfolio assets loaded.', 'info');
            }, 1000);

            setTimeout(() => {
                this.addConsoleMessage('All systems ready.', 'info');
            }, 1500);
        }

        addConsoleMessage(message, type = 'info') {
            const consoleContent = document.querySelector('.console-content');
            if (!consoleContent) return;

            const time = new Date().toLocaleTimeString('en-US', { 
                hour12: false, 
                minute: '2-digit', 
                second: '2-digit' 
            });

            const logEntry = document.createElement('div');
            logEntry.className = `console-log ${type}`;
            
            let icon;
            switch(type) {
                case 'warning':
                    icon = 'fas fa-exclamation-triangle';
                    break;
                case 'error':
                    icon = 'fas fa-times-circle';
                    break;
                default:
                    icon = 'fas fa-info-circle';
            }

            logEntry.innerHTML = `
                <i class="${icon}"></i>
                <span class="log-message">${message}</span>
                <span class="log-time">${time}</span>
            `;

            consoleContent.appendChild(logEntry);
            consoleContent.scrollTop = consoleContent.scrollHeight;

            // Update console button counts
            this.updateConsoleCount(type);
        }

        updateConsoleCount(type) {
            const consoleBtn = document.querySelector(`.console-btn .fa-${type === 'info' ? 'info-circle' : type === 'warning' ? 'exclamation-triangle' : 'times-circle'}`);
            if (consoleBtn) {
                const countSpan = consoleBtn.parentElement.querySelector('span');
                if (countSpan) {
                    const currentCount = parseInt(countSpan.textContent) || 0;
                    countSpan.textContent = currentCount + 1;
                }
            }
        }

        adjustLayout() {
            // Handle responsive layout adjustments
            const width = window.innerWidth;
            
            if (width <= 768) {
                // Mobile layout adjustments
                this.addConsoleMessage('Switched to mobile layout.', 'info');
            } else if (width <= 1200) {
                // Tablet layout adjustments
                this.addConsoleMessage('Switched to tablet layout.', 'info');
            } else {
                // Desktop layout
                this.addConsoleMessage('Switched to desktop layout.', 'info');
            }
        }
    }

    // Data from your original script.js (same as before)
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
            nav_about: "About",
            nav_steam: "Steam Games",
            nav_assets: "Unity Assets",
            nav_itch: "Itch.io Games",
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
            nav_about: "Hakkımda",
            nav_steam: "Steam Oyunları",
            nav_assets: "Unity Varlıkları",
            nav_itch: "Itch.io Oyunları",
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

    // Initialize the Unity Editor interface
    new UnityEditorInterface();
});
