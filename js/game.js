document.addEventListener('DOMContentLoaded', function() {
    // Menu navigation
    const mainMenu = document.getElementById('main-menu');
    const settingsMenu = document.getElementById('settings-menu');
    const personSettingsMenu = document.getElementById('person-settings-menu');
    const audioSettingsMenu = document.getElementById('audio-settings-menu');
    const coopMenu = document.getElementById('coop-menu');
    const inviteMenu = document.getElementById('invite-menu');
    const joinMenu = document.getElementById('join-menu');
    const neighborhoodSelect = document.getElementById('neighborhood-select');
    
    // Neighborhood selection functionality
    const neighborhoods = [
        { name: "bronx", displayName: "Bronx" },
        { name: "chelsea", displayName: "Chelsea" },
        { name: "chinatown", displayName: "Chinatown" },
        { name: "eastvillage", displayName: "East Village" },
        { name: "harlem", displayName: "Harlem" },
        { name: "prospectheights", displayName: "Prospect Heights" },
        { name: "queens", displayName: "Queens" },
        { name: "soho", displayName: "SoHo" },
        { name: "statenisland", displayName: "Staten Island" },
        { name: "uppereast", displayName: "Upper East Side" },
        { name: "upperwest", displayName: "Upper West Side" },
        { name: "westvillage", displayName: "West Village" }
    ];
    
    let currentNeighborhoodIndex = 0;
    const neighborhoodImage = document.getElementById('neighborhood-image');
    const neighborhoodName = document.getElementById('neighborhood-name');
    const prevNeighborhood = document.getElementById('prev-neighborhood');
    const nextNeighborhood = document.getElementById('next-neighborhood');
    const confirmNeighborhood = document.getElementById('confirm-neighborhood');
    const neighborhoodSuccessModal = document.getElementById('neighborhood-success-modal');
    const neighborhoodSuccessOk = document.getElementById('neighborhood-success-ok');
    const selectedNeighborhoodName = document.getElementById('selected-neighborhood-name');
    
    // Function to update the displayed neighborhood
    function updateNeighborhoodDisplay() {
        const neighborhood = neighborhoods[currentNeighborhoodIndex];
        neighborhoodImage.src = `assets/neighborhoods/${neighborhood.name}.png`;
        neighborhoodName.textContent = neighborhood.displayName;
    }
    
    // Navigation buttons
    prevNeighborhood.addEventListener('click', () => {
        currentNeighborhoodIndex = (currentNeighborhoodIndex - 1 + neighborhoods.length) % neighborhoods.length;
        updateNeighborhoodDisplay();
    });
    
    nextNeighborhood.addEventListener('click', () => {
        currentNeighborhoodIndex = (currentNeighborhoodIndex + 1) % neighborhoods.length;
        updateNeighborhoodDisplay();
    });
    
    // Confirm neighborhood selection
    confirmNeighborhood.addEventListener('click', () => {
        const selectedNeighborhood = neighborhoods[currentNeighborhoodIndex];
        
        // Save the selected neighborhood to localStorage
        localStorage.setItem('selectedNeighborhood', selectedNeighborhood.name);
        localStorage.setItem('hasHome', 'true');
        
        // Show loading screen
        showLoading('Creating your loft...');
        
        // Simulate loading delay
        setTimeout(() => {
            hideLoading();
            
            // Update success modal with neighborhood name
            selectedNeighborhoodName.textContent = selectedNeighborhood.displayName;
            
            // Show success modal
            showConfirmation(neighborhoodSuccessModal);
        }, 1500);
    });
    
    // Enter loft button
    document.getElementById('enter-home').addEventListener('click', () => {
        const hasHome = localStorage.getItem('hasHome') === 'true';
        
        if (hasHome) {
            // Get the selected neighborhood
            const selectedNeighborhood = localStorage.getItem('selectedNeighborhood');
            
            // Update the neighborhood view
            document.getElementById('neighborhood-view').src = `assets/neighborhoods/${selectedNeighborhood}.png`;
            
            // Initialize currency values if not already set
            if (!localStorage.getItem('joyAmount')) {
                localStorage.setItem('joyAmount', '100');
            }
            if (!localStorage.getItem('moneyAmount')) {
                localStorage.setItem('moneyAmount', '500');
            }
            
            // Update currency display
            document.querySelector('.joy-value').textContent = localStorage.getItem('joyAmount');
            document.querySelector('.money-value').textContent = localStorage.getItem('moneyAmount');
            
            // Update loft header with user's name and neighborhood
            updateLoftHeader();
            
            // Hide main menu and show loft view
            mainMenu.classList.remove('active');
            document.getElementById('loft-view').classList.add('active');
            
            // Animate character entrance
            animateCharacterEntrance();
        } else {
            // Show neighborhood selection screen
            mainMenu.classList.remove('active');
            neighborhoodSelect.classList.add('active');
            
            // Initialize neighborhood display
            currentNeighborhoodIndex = 0;
            updateNeighborhoodDisplay();
        }
    });
    
    // Function to animate character entrance
    function animateCharacterEntrance() {
        const character = document.getElementById('loft-character');
        const container = document.getElementById('character-container');
        const catContainer = document.getElementById('cat-container');
        
        // Reset position - make it start from further below for a more dramatic entrance
        container.style.transform = 'translateX(-50%) translateX(-15vh) translateY(50px)';
        container.style.opacity = '0';
        
        // Reset cat position - start off-screen to the right
        catContainer.style.transform = 'translateX(50%) translateX(15vh) translateX(100px)';
        catContainer.style.opacity = '0';
        
        // Animate character entrance
        setTimeout(() => {
            container.style.transition = 'transform 1s ease-out, opacity 0.8s ease-in';
            container.style.transform = 'translateX(-50%) translateX(-15vh) translateY(0)';
            container.style.opacity = '1';
            
            // Animate cat entrance after character appears
            setTimeout(() => {
                catContainer.style.transition = 'transform 0.8s ease-out, opacity 0.6s ease-in';
                catContainer.style.transform = 'translateX(50%) translateX(15vh)';
                catContainer.style.opacity = '1';
                
                // Start cat idle animations
                startCatIdleAnimations();
            }, 800);
        }, 500);
    }
    
    // Function to make the cat move occasionally
    function startCatIdleAnimations() {
        const catContainer = document.getElementById('cat-container');
        
        // Set up random movements for the cat
        function catRandomMovement() {
            // Only animate if the loft view is active
            if (!document.getElementById('loft-view').classList.contains('active')) {
                return;
            }
            
            // Random movement type
            const movementType = Math.floor(Math.random() * 3);
            
            // Reset transitions
            catContainer.style.transition = 'transform 0.5s ease-in-out';
            
            switch (movementType) {
                case 0: // Small hop
                    catContainer.style.transform = 'translateX(50%) translateX(15vh) translateY(-5px)';
                    setTimeout(() => {
                        catContainer.style.transform = 'translateX(50%) translateX(15vh)';
                    }, 300);
                    break;
                case 1: // Move slightly left
                    catContainer.style.transform = 'translateX(50%) translateX(15vh) translateX(-10px)';
                    setTimeout(() => {
                        catContainer.style.transform = 'translateX(50%) translateX(15vh)';
                    }, 500);
                    break;
                case 2: // Move slightly right
                    catContainer.style.transform = 'translateX(50%) translateX(15vh) translateX(10px)';
                    setTimeout(() => {
                        catContainer.style.transform = 'translateX(50%) translateX(15vh)';
                    }, 500);
                    break;
            }
            
            // Schedule next movement
            const nextMovementDelay = 3000 + Math.random() * 5000; // 3-8 seconds
            setTimeout(catRandomMovement, nextMovementDelay);
        }
        
        // Start the first movement after a delay
        setTimeout(catRandomMovement, 2000);
    }
    
    // Function to update the loft header with user's name and neighborhood
    function updateLoftHeader() {
        // Get user's name from localStorage or use default
        const userName = localStorage.getItem('personName') || 'Your';
        document.getElementById('user-name').textContent = userName;
        
        // Get neighborhood name and format it for display
        const selectedNeighborhood = localStorage.getItem('selectedNeighborhood');
        let displayName = 'Loft';
        
        // Find the neighborhood display name
        for (const neighborhood of neighborhoods) {
            if (neighborhood.name === selectedNeighborhood) {
                displayName = neighborhood.displayName + ' Loft';
                break;
            }
        }
        
        document.getElementById('neighborhood-display-name').textContent = displayName;
    }
    
    // Neighborhood success modal OK button
    neighborhoodSuccessOk.addEventListener('click', () => {
        hideConfirmation(neighborhoodSuccessModal);
        
        // Show the loft view
        neighborhoodSelect.classList.remove('active');
        const loftView = document.getElementById('loft-view');
        const neighborhoodView = document.getElementById('neighborhood-view');
        const selectedNeighborhood = localStorage.getItem('selectedNeighborhood');
        neighborhoodView.src = `assets/neighborhoods/${selectedNeighborhood}.png`;
        
        // Update loft header
        updateLoftHeader();
        
        loftView.classList.add('active');
        
        // Animate character entrance
        animateCharacterEntrance();
    });
    
    // Back to menu button
    document.getElementById('back-to-menu').addEventListener('click', () => {
        document.getElementById('loft-view').classList.remove('active');
        mainMenu.classList.add('active');
    });
    
    // New Currency help button implementation
    const newHelpBtn = document.getElementById('new-currency-help-btn');
    const newHelpModal = document.getElementById('new-currency-help-modal');
    const newHelpOkBtn = document.getElementById('new-currency-help-ok');
    
    // Direct event handler to show the modal
    newHelpBtn.addEventListener('click', function() {
        // Show the modal directly with DOM manipulation
        newHelpModal.style.display = 'flex';
    });
    
    // Direct event handler to hide the modal
    newHelpOkBtn.addEventListener('click', function() {
        // Hide the modal directly with DOM manipulation
        newHelpModal.style.display = 'none';
    });
    
    // Cat Petting Mini-Game
    const petCatBtn = document.getElementById('pet-cat-btn');
    const catPettingGame = document.getElementById('cat-petting-game');
    const exitPetGame = document.getElementById('exit-pet-game');
    const petSpots = document.querySelectorAll('.pet-spot');
    const petProgress = document.getElementById('pet-progress');
    const petTimerValue = document.getElementById('pet-timer-value');
    const petScoreValue = document.getElementById('pet-score-value');
    
    let gameTimer;
    let gameScore = 0;
    let gameTime = 30;
    let gameActive = false;
    
    // Open the cat petting mini-game
    petCatBtn.addEventListener('click', function() {
        // Reset game state
        gameScore = 0;
        gameTime = 30;
        gameActive = true;
        petProgress.style.width = '0%';
        petTimerValue.textContent = gameTime;
        petScoreValue.textContent = gameScore;
        
        // Show the game modal
        catPettingGame.classList.add('active');
        
        // Start the game timer
        startGameTimer();
        
        // Randomize pet spot positions
        randomizePetSpots();
    });
    
    // Exit the cat petting mini-game
    exitPetGame.addEventListener('click', function() {
        endGame();
    });
    
    // Handle pet spot clicks
    petSpots.forEach(spot => {
        spot.addEventListener('click', function() {
            if (!gameActive) return;
            
            // Increase score
            gameScore += 1;
            petScoreValue.textContent = gameScore;
            
            // Update progress bar (max score of 50 fills the bar)
            const progressPercent = Math.min((gameScore / 50) * 100, 100);
            petProgress.style.width = progressPercent + '%';
            
            // Visual feedback
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                
                // Move the spot to a new position
                randomizeSpotPosition(this);
            }, 100);
            
            // Play a sound (can be added later)
            // playPetSound();
            
            // If progress is 100%, end the game
            if (progressPercent >= 100) {
                endGame();
            }
        });
    });
    
    // Start the game timer
    function startGameTimer() {
        clearInterval(gameTimer);
        gameTimer = setInterval(function() {
            gameTime--;
            petTimerValue.textContent = gameTime;
            
            if (gameTime <= 0) {
                endGame();
            }
        }, 1000);
    }
    
    // End the game
    function endGame() {
        // Stop the timer
        clearInterval(gameTimer);
        gameActive = false;
        
        // Hide the game modal
        catPettingGame.classList.remove('active');
        
        // Award Joy based on score
        if (gameScore > 0) {
            const joyEarned = Math.min(gameScore, 50);
            const currentJoy = parseInt(localStorage.getItem('joyAmount') || '100');
            const newJoy = currentJoy + joyEarned;
            
            // Update localStorage and display
            localStorage.setItem('joyAmount', newJoy.toString());
            document.querySelector('.joy-value').textContent = newJoy;
            
            // Show a notification (can be enhanced later)
            alert(`You earned ${joyEarned} Joy by petting your cat!`);
        }
    }
    
    // Randomize all pet spot positions
    function randomizePetSpots() {
        petSpots.forEach(spot => {
            randomizeSpotPosition(spot);
        });
    }
    
    // Randomize a single pet spot position
    function randomizeSpotPosition(spot) {
        const gameContainer = document.querySelector('.pet-game-container');
        const containerWidth = gameContainer.offsetWidth;
        const containerHeight = gameContainer.offsetHeight;
        
        // Keep spots within safe boundaries
        const maxX = containerWidth - 70;
        const maxY = containerHeight - 120;
        const minX = 20;
        const minY = 20;
        
        const randomX = Math.floor(Math.random() * (maxX - minX)) + minX;
        const randomY = Math.floor(Math.random() * (maxY - minY)) + minY;
        
        spot.style.left = randomX + 'px';
        spot.style.top = randomY + 'px';
    }
    
    // Main menu buttons
    document.getElementById('settings-button').addEventListener('click', () => {
        mainMenu.classList.remove('active');
        settingsMenu.classList.add('active');
    });
    
    // Settings menu navigation
    document.getElementById('back-from-settings').addEventListener('click', () => {
        settingsMenu.classList.remove('active');
        mainMenu.classList.add('active');
    });
    
    document.getElementById('person-button').addEventListener('click', () => {
        settingsMenu.classList.remove('active');
        personSettingsMenu.classList.add('active');
        
        // Load saved name if exists
        const savedName = localStorage.getItem('personName') || '';
        document.getElementById('person-name').value = savedName;
    });
    
    document.getElementById('coop-button').addEventListener('click', () => {
        settingsMenu.classList.remove('active');
        coopMenu.classList.add('active');
    });
    
    document.getElementById('audio-settings-button').addEventListener('click', () => {
        settingsMenu.classList.remove('active');
        audioSettingsMenu.classList.add('active');
    });
    
    // Person settings navigation
    document.getElementById('back-from-person').addEventListener('click', () => {
        personSettingsMenu.classList.remove('active');
        settingsMenu.classList.add('active');
    });
    
    const saveConfirmation = document.getElementById('save-confirmation');
    const saveConfirmationOk = document.getElementById('save-confirmation-ok');
    
    document.getElementById('save-person').addEventListener('click', () => {
        const personName = document.getElementById('person-name').value.trim();
        if (personName) {
            localStorage.setItem('personName', personName);
            // Show custom save confirmation
            showConfirmation(saveConfirmation);
            } else {
            personSettingsMenu.classList.remove('active');
            settingsMenu.classList.add('active');
        }
    });
    
    saveConfirmationOk.addEventListener('click', () => {
        hideConfirmation(saveConfirmation);
        personSettingsMenu.classList.remove('active');
        settingsMenu.classList.add('active');
    });
    
    // Audio settings navigation
    document.getElementById('back-from-audio').addEventListener('click', () => {
        audioSettingsMenu.classList.remove('active');
        settingsMenu.classList.add('active');
    });
    
    // Co-op menu navigation
    document.getElementById('back-from-coop').addEventListener('click', () => {
        coopMenu.classList.remove('active');
        settingsMenu.classList.add('active');
    });
    
    document.getElementById('invite-partner').addEventListener('click', () => {
        coopMenu.classList.remove('active');
        inviteMenu.classList.add('active');
        
        // Generate a random code
        const code = 'DWELL-' + Math.floor(1000 + Math.random() * 9000).toString();
        document.getElementById('invite-code').textContent = code;
    });
    
    // Copy code functionality
    const copyCodeBtn = document.getElementById('copy-code');
    copyCodeBtn.addEventListener('click', () => {
        const code = document.getElementById('invite-code').textContent;
        navigator.clipboard.writeText(code)
            .then(() => {
                // Visual feedback that code was copied
                copyCodeBtn.classList.add('copied');
                
                // Reset after 2 seconds
                setTimeout(() => {
                    copyCodeBtn.classList.remove('copied');
                }, 2000);
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
                alert('Failed to copy code. Please try again.');
            });
    });
    
    document.getElementById('join-home').addEventListener('click', () => {
        coopMenu.classList.remove('active');
        joinMenu.classList.add('active');
    });
    
    // Invite menu navigation
    document.getElementById('back-from-invite').addEventListener('click', () => {
        inviteMenu.classList.remove('active');
        coopMenu.classList.add('active');
    });
    
    // Join menu navigation
    document.getElementById('back-from-join').addEventListener('click', () => {
        joinMenu.classList.remove('active');
        coopMenu.classList.add('active');
    });
    
    // Dev controls
    const devControls = document.getElementById('dev-controls');
    const toggleDevControls = document.getElementById('toggle-dev-controls');
    const devHasPartner = document.getElementById('dev-has-partner');
    const devIsHost = document.getElementById('dev-is-host');
    const devConnectionError = document.getElementById('dev-connection-error');
    const devHomeFull = document.getElementById('dev-home-full');
    const devJoinSuccess = document.getElementById('dev-join-success');
    const devSlowConnection = document.getElementById('dev-slow-connection');
    const resetNeighborhood = document.getElementById('reset-neighborhood');

    toggleDevControls.addEventListener('click', () => {
        devControls.classList.toggle('active');
    });
    
    // Reset neighborhood button
    resetNeighborhood.addEventListener('click', () => {
        localStorage.removeItem('hasHome');
        localStorage.removeItem('selectedNeighborhood');
        localStorage.removeItem('joyAmount');
        localStorage.removeItem('moneyAmount');
        alert('Neighborhood selection has been reset. Click "Enter Loft" to choose a new neighborhood.');
    });

    // Loading overlay functionality
    const loadingOverlay = document.querySelector('.loading-overlay');
    const loadingMessage = document.getElementById('loading-message');

    function showLoading(message) {
        loadingMessage.textContent = message || 'Loading...';
        loadingOverlay.classList.add('active');
    }

    function hideLoading() {
        loadingOverlay.classList.remove('active');
    }

    // Join loft functionality
    const joinSubmit = document.getElementById('join-submit');
    const joinError = document.getElementById('join-error');
    const joinSuccess = document.getElementById('join-success');
    const joinCode = document.getElementById('join-code');
    
    // Join confirmation modal
    const joinConfirmation = document.getElementById('join-confirmation');
    const cancelJoin = document.getElementById('cancel-join');
    const confirmJoin = document.getElementById('confirm-join');
    
    // Success/Failure modals
    const joinSuccessModal = document.getElementById('join-success-modal');
    const joinSuccessOk = document.getElementById('join-success-ok');
    const joinFailureModal = document.getElementById('join-failure-modal');
    const joinFailureOk = document.getElementById('join-failure-ok');
    
    // Error modals
    const homeFullError = document.getElementById('home-full-error');
    const homeFullOk = document.getElementById('home-full-ok');
    const connectionError = document.getElementById('connection-error');
    const connectionErrorOk = document.getElementById('connection-error-ok');

    joinSubmit.addEventListener('click', () => {
        const code = joinCode.value.trim();
        if (!code.match(/^DWELL-[0-9A-Z]{4}$/)) {
            joinError.textContent = 'Invalid code format';
            joinError.classList.add('active');
            return;
        }

        joinError.classList.remove('active');
        // Show join confirmation modal
        showConfirmation(joinConfirmation);
    });
    
    cancelJoin.addEventListener('click', () => {
        hideConfirmation(joinConfirmation);
    });

    confirmJoin.addEventListener('click', async () => {
        hideConfirmation(joinConfirmation);
        showLoading('Connecting to loft');

        // Simulate connection delay based on dev controls
        const code = joinCode.value.trim();
        const delay = devSlowConnection.checked ? 2000 : 500;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        hideLoading();

        // Check for connection error (dev control takes precedence)
        if (devConnectionError.checked) {
            showConfirmation(connectionError);
            return;
        }
        
        // Check if loft is full (dev control takes precedence)
        if (devHomeFull.checked) {
            showConfirmation(homeFullError);
            return;
        }
        
        // Force success if dev control is checked
        if (devJoinSuccess.checked) {
            showConfirmation(joinSuccessModal);
            return;
        }
        
        // Random chance of different outcomes if no dev controls are set
        const randomOutcome = Math.random();
        if (randomOutcome < 0.3) { // 30% chance of loft being full
            showConfirmation(homeFullError);
        } else if (randomOutcome < 0.4) { // 10% chance of connection error
            showConfirmation(connectionError);
        } else { // 60% chance of success
            showConfirmation(joinSuccessModal);
        }
    });
    
    function showJoinSuccess() {
        showConfirmation(joinSuccessModal);
    }
    
    joinSuccessOk.addEventListener('click', () => {
        hideConfirmation(joinSuccessModal);
        
        // Update UI state
        joinMenu.classList.remove('active');
        mainMenu.classList.add('active');
        document.getElementById('coop-status').textContent = 
            'You are sharing a loft with Partner.';
        document.getElementById('invite-partner').style.display = 'none';
        document.getElementById('join-home').style.display = 'none';
        document.getElementById('leave-home').style.display = 'block';

        // Reset join menu state
        joinCode.value = '';
        joinSuccess.classList.remove('active');
    });
    
    joinFailureOk.addEventListener('click', () => {
        hideConfirmation(joinFailureModal);
    });
    
    // Error modal handlers
    homeFullOk.addEventListener('click', () => {
        hideConfirmation(homeFullError);
    });
    
    connectionErrorOk.addEventListener('click', () => {
        hideConfirmation(connectionError);
    });

    // Leave loft confirmation
    const leaveConfirmation = document.getElementById('leave-confirmation');
    const leaveHome = document.getElementById('leave-home');
    const cancelLeave = document.getElementById('cancel-leave');
    const confirmLeave = document.getElementById('confirm-leave');

    leaveHome.addEventListener('click', () => {
        showConfirmation(leaveConfirmation);
    });

    cancelLeave.addEventListener('click', () => {
        hideConfirmation(leaveConfirmation);
    });

    confirmLeave.addEventListener('click', async () => {
        hideConfirmation(leaveConfirmation);
        showLoading('Leaving loft');

        // Simulate leave delay
        const delay = devSlowConnection.checked ? 2000 : 500;
        await new Promise(resolve => setTimeout(resolve, delay));

        // Reset to solo state
        document.getElementById('coop-status').textContent = 'You are currently in a solo loft.';
        document.getElementById('invite-partner').style.display = 'block';
        document.getElementById('join-home').style.display = 'block';
        document.getElementById('leave-home').style.display = 'none';

        hideLoading();
        coopMenu.classList.remove('active');
        mainMenu.classList.add('active');
    });

    // Dev control state management
    devHasPartner.addEventListener('change', function() {
        if (this.checked) {
            document.getElementById('coop-status').textContent = 
                'You are sharing a loft with Partner.';
            document.getElementById('invite-partner').style.display = 'none';
            document.getElementById('join-home').style.display = 'none';
            document.getElementById('leave-home').style.display = 'block';
        } else {
            document.getElementById('coop-status').textContent = 'You are currently in a solo loft.';
            document.getElementById('invite-partner').style.display = 'block';
            document.getElementById('join-home').style.display = 'block';
            document.getElementById('leave-home').style.display = 'none';
        }
    });

    devIsHost.addEventListener('change', function() {
        // This could be used to show/hide host-specific features
        // For now, it's just a state indicator
    });

    // Audio settings functionality
    const masterVolume = document.getElementById('master-volume');
    const musicVolume = document.getElementById('music-volume');
    const sfxVolume = document.getElementById('sfx-volume');
    const muteToggle = document.getElementById('mute-toggle');
    
    // Update volume display values
    function updateVolumeDisplay(slider) {
        slider.nextElementSibling.textContent = slider.value + '%';
    }
    
    masterVolume.addEventListener('input', function() {
        updateVolumeDisplay(this);
    });
    
    musicVolume.addEventListener('input', function() {
        updateVolumeDisplay(this);
    });
    
    sfxVolume.addEventListener('input', function() {
        updateVolumeDisplay(this);
    });
    
    muteToggle.addEventListener('change', function() {
        if (this.checked) {
            // Mute all audio
            masterVolume.disabled = true;
            musicVolume.disabled = true;
            sfxVolume.disabled = true;
        } else {
            // Unmute
            masterVolume.disabled = false;
            musicVolume.disabled = false;
            sfxVolume.disabled = false;
        }
    });
    
    // Button hover sound effect (can be added later)
    const menuButtons = document.querySelectorAll('.menu-button');
    menuButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            // Add hover sound effect here if desired
        });
        button.addEventListener('click', () => {
            // Add click sound effect here if desired
        });
    });

    // Show/hide confirmation dialogs
    function showConfirmation(dialog) {
        dialog.classList.add('active');
    }

    function hideConfirmation(dialog) {
        dialog.classList.remove('active');
    }
}); 