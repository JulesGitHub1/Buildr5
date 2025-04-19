document.addEventListener('DOMContentLoaded', () => {
    // Building images data structure with conditional navigation
    const buildings = [
        {
            id: 1,
            src: 'images/building1.svg',
            // If user likes this building, show building 2, if dislikes, show building 3
            nextIfLiked: 2,
            nextIfDisliked: 3
        },
        {
            id: 2,
            src: 'images/building2.svg',
            nextIfLiked: 4,
            nextIfDisliked: 5
        },
        {
            id: 3,
            src: 'images/building3.svg',
            nextIfLiked: 5,
            nextIfDisliked: 4
        },
        {
            id: 4,
            src: 'images/building4.svg',
            nextIfLiked: 6,
            nextIfDisliked: 7
        },
        {
            id: 5,
            src: 'images/building5.svg',
            nextIfLiked: 7,
            nextIfDisliked: 6
        },
        {
            id: 6,
            src: 'images/building6.svg',
            nextIfLiked: 8,
            nextIfDisliked: 9
        },
        {
            id: 7,
            src: 'images/building7.svg',
            nextIfLiked: 9,
            nextIfDisliked: 8
        },
        {
            id: 8,
            src: 'images/building8.svg',
            nextIfLiked: 1, // Loop back to the beginning
            nextIfDisliked: 1
        },
        {
            id: 9,
            src: 'images/building9.svg',
            nextIfLiked: 1, // Loop back to the beginning
            nextIfDisliked: 1
        }
    ];

    const swipeContainer = document.querySelector('.swipe-container');
    let currentBuildingIndex = 0;
    let startY = 0;
    let currentY = 0;
    let isSwiping = false;
    
    // Get references to the swipe indicators
    const likeIndicator = document.querySelector('.like-indicator');
    const dislikeIndicator = document.querySelector('.dislike-indicator');

    // Function to create a new card
    function createCard(building) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.id = building.id;
        
        const img = document.createElement('img');
        img.src = building.src;
        img.alt = 'Building';
        
        card.appendChild(img);
        return card;
    }

    // Function to load the current building
    function loadCurrentBuilding() {
        const currentBuilding = buildings[currentBuildingIndex];
        const card = createCard(currentBuilding);
        swipeContainer.appendChild(card);
        
        // Set up touch event listeners for the new card
        setupCardEvents(card);
    }

    // Function to handle swipe completion
    function completeSwipe(card, isLiked) {
        const currentBuilding = buildings[currentBuildingIndex];
        
        // Determine the next building based on the swipe direction
        const nextBuildingId = isLiked ? currentBuilding.nextIfLiked : currentBuilding.nextIfDisliked;
        
        // Find the index of the next building
        const nextBuildingIndex = buildings.findIndex(b => b.id === nextBuildingId);
        
        if (nextBuildingIndex !== -1) {
            currentBuildingIndex = nextBuildingIndex;
        } else {
            // If not found, just go to the next in sequence or loop back
            currentBuildingIndex = (currentBuildingIndex + 1) % buildings.length;
        }
        
        // Remove the card after animation completes
        setTimeout(() => {
            card.remove();
            loadCurrentBuilding();
        }, 300);
    }

    // Function to set up touch and mouse events for a card
    function setupCardEvents(card) {
        // Touch Events for mobile
        card.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            isSwiping = true;
            card.classList.add('swiping');
        });
        
        card.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            
            currentY = e.touches[0].clientY;
            const deltaY = currentY - startY;
            
            updateCardPosition(card, deltaY);
        });
        
        card.addEventListener('touchend', (e) => {
            if (!isSwiping) return;
            
            finishSwipe(card);
        });
        
        card.addEventListener('touchcancel', (e) => {
            if (!isSwiping) return;
            
            isSwiping = false;
            card.classList.remove('swiping');
            card.style.transform = '';
            card.classList.remove('show-like', 'show-dislike');
        });
        
        // Mouse Events for desktop testing
        card.addEventListener('mousedown', (e) => {
            startY = e.clientY;
            isSwiping = true;
            card.classList.add('swiping');
        });
        
        card.addEventListener('mousemove', (e) => {
            if (!isSwiping) return;
            
            currentY = e.clientY;
            const deltaY = currentY - startY;
            
            updateCardPosition(card, deltaY);
        });
        
        card.addEventListener('mouseup', (e) => {
            if (!isSwiping) return;
            
            finishSwipe(card);
        });
        
        card.addEventListener('mouseleave', (e) => {
            if (!isSwiping) return;
            
            finishSwipe(card);
        });
    }
    
    // Update card position during swipe
    function updateCardPosition(card, deltaY) {
        // Apply transform to the card
        card.style.transform = `translateY(${deltaY}px)`;
        
        // Show appropriate indicator based on swipe direction
        if (deltaY < -50) {
            card.classList.add('show-like');
            card.classList.remove('show-dislike');
        } else if (deltaY > 50) {
            card.classList.add('show-dislike');
            card.classList.remove('show-like');
        } else {
            card.classList.remove('show-like', 'show-dislike');
        }
    }
    
    // Finish the swipe action
    function finishSwipe(card) {
        isSwiping = false;
        card.classList.remove('swiping');
        
        const deltaY = currentY - startY;
        
        // Determine if the swipe was significant enough
        if (Math.abs(deltaY) > 100) {
            const isLiked = deltaY < 0; // Swipe up is like
            
            if (isLiked) {
                card.classList.add('swipe-up');
            } else {
                card.classList.add('swipe-down');
            }
            
            completeSwipe(card, isLiked);
        } else {
            // Not a significant swipe, reset the card position
            card.style.transform = '';
            card.classList.remove('show-like', 'show-dislike');
        }
    }

    // Initialize by loading the first building
    loadCurrentBuilding();
});
