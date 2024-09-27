// game.js

let villageName = "Unnamed Village";
let wood = 0;
let gold = 0;
let food = 0;
let vikingCount = 0;
let holyInfluence = "High";

let hutLevel = 1;
let farmLevel = 1;
let goldMineLevel = 1;

// DOM Elements
const woodElement = document.getElementById('wood');
const goldElement = document.getElementById('gold');
const foodElement = document.getElementById('food');
const vikingCountElement = document.getElementById('vikingCount');
const holyInfluenceElement = document.getElementById('holyInfluence');
const villageNameElement = document.getElementById('villageName');

// Load saved data from localStorage when the game starts
window.onload = () => {
    loadGame();
};

// Function to save the game state to localStorage
function saveGame() {
    const gameState = {
        villageName,
        wood,
        gold,
        food,
        vikingCount,
        hutLevel,
        farmLevel,
        goldMineLevel
    };
    localStorage.setItem('vikingTycoonSave', JSON.stringify(gameState));
    console.log('Game saved!');
}

// Function to load the game state from localStorage
function loadGame() {
    const savedState = localStorage.getItem('vikingTycoonSave');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        villageName = gameState.villageName || villageName;
        wood = gameState.wood || wood;
        gold = gameState.gold || gold;
        food = gameState.food || food;
        vikingCount = gameState.vikingCount || vikingCount;
        hutLevel = gameState.hutLevel || hutLevel;
        farmLevel = gameState.farmLevel || farmLevel;
        goldMineLevel = gameState.goldMineLevel || goldMineLevel;
        console.log('Game loaded!');
        updateUI();

        // Hide the name input if the village has already been named
        if (villageName !== "Unnamed Village") {
            document.getElementById('villageNameInput').style.display = 'none';
            document.getElementById('setVillageNameButton').style.display = 'none';
        }
    }
}

// Auto-save game every 10 seconds
setInterval(() => {
    saveGame();
}, 10000); // 10 seconds interval for auto-saving

// Function to replenish Viking army
document.getElementById('replenishButton').addEventListener('click', () => {
    if (food >= 10) {
        vikingCount += 5;
        food -= 10;
        updateUI();
    } else {
        alert('Not enough food to replenish Vikings!');
    }
});

// Function to build huts (adds wood resources over time)
document.getElementById('buildHutButton').addEventListener('click', () => {
    if (wood >= 20) {
        setInterval(() => {
            wood += hutLevel; // Increase wood based on hut level
            updateUI();
        }, 1000);
        wood -= 20;
        updateUI();
    } else {
        alert('Not enough wood to build a hut!');
    }
});

// Function to upgrade huts (faster wood gathering)
document.getElementById('upgradeHutButton').addEventListener('click', () => {
    if (gold >= 50) {
        hutLevel += 1;
        gold -= 50;
        alert('Hut upgraded! Faster wood gathering.');
        updateUI();
    } else {
        alert('Not enough gold to upgrade the hut!');
    }
});

// Function to build farms (adds food resources over time)
document.getElementById('buildFarmButton').addEventListener('click', () => {
    if (wood >= 30) {
        setInterval(() => {
            food += farmLevel * 2; // Increase food based on farm level
            updateUI();
        }, 1000);
        wood -= 30;
        updateUI();
    } else {
        alert('Not enough wood to build a farm!');
    }
});

// Function to upgrade farms (faster food gathering)
document.getElementById('upgradeFarmButton').addEventListener('click', () => {
    if (gold >= 50) {
        farmLevel += 1;
        gold -= 50;
        alert('Farm upgraded! Faster food gathering.');
        updateUI();
    } else {
        alert('Not enough gold to upgrade the farm!');
    }
});

// Function to build gold mine (produces gold over time)
document.getElementById('buildGoldMineButton').addEventListener('click', () => {
    if (wood >= 40) {
        setInterval(() => {
            gold += goldMineLevel * 5; // Increase gold based on gold mine level
            updateUI();
        }, 1000);
        wood -= 40;
        updateUI();
    } else {
        alert('Not enough wood to build a gold mine!');
    }
});

// Function to upgrade gold mine (faster gold production)
document.getElementById('upgradeGoldMineButton').addEventListener('click', () => {
    if (gold >= 100) {
        goldMineLevel += 1;
        gold -= 100;
        alert('Gold mine upgraded! Faster gold production.');
        updateUI();
    } else {
        alert('Not enough gold to upgrade the gold mine!');
    }
});

// Small Raid (requires 5 Vikings)
document.getElementById('smallRaidButton').addEventListener('click', () => {
    if (vikingCount >= 5) {
        vikingCount -= 5;
        let raidGold = adjustForHolyInfluence(Math.floor(Math.random() * 20) + 10);
        let raidWood = adjustForHolyInfluence(Math.floor(Math.random() * 10) + 5);
        gold += raidGold;
        wood += raidWood;
        alert(`Small raid successful! You plundered ${raidGold} gold and ${raidWood} wood.`);
        updateUI();
    } else {
        alert('Not enough Vikings for a small raid!');
    }
});

// Medium Raid (requires 10 Vikings)
document.getElementById('mediumRaidButton').addEventListener('click', () => {
    if (vikingCount >= 10) {
        vikingCount -= 10;
        let raidGold = adjustForHolyInfluence(Math.floor(Math.random() * 50) + 30);
        let raidWood = adjustForHolyInfluence(Math.floor(Math.random() * 30) + 15);
        gold += raidGold;
        wood += raidWood;
        alert(`Medium raid successful! You plundered ${raidGold} gold and ${raidWood} wood.`);
        updateUI();
    } else {
        alert('Not enough Vikings for a medium raid!');
    }
});

// Large Raid (requires 20 Vikings)
document.getElementById('largeRaidButton').addEventListener('click', () => {
    if (vikingCount >= 20) {
        vikingCount -= 20;
        let raidGold = adjustForHolyInfluence(Math.floor(Math.random() * 100) + 50);
        let raidWood = adjustForHolyInfluence(Math.floor(Math.random() * 50) + 25);
        gold += raidGold;
        wood += raidWood;
        alert(`Large raid successful! You plundered ${raidGold} gold and ${raidWood} wood.`);
        updateUI();
    } else {
        alert('Not enough Vikings for a large raid!');
    }
});

// Function to randomly change holy influence
setInterval(() => {
    const influenceLevels = ['High', 'Medium', 'Low'];
    holyInfluence = influenceLevels[Math.floor(Math.random() * influenceLevels.length)];
    updateUI();
}, 10000); // Every 10 seconds

// Modify raid rewards based on holy influence
function adjustForHolyInfluence(resources) {
    if (holyInfluence === 'High') {
        return Math.floor(resources * 0.5); // Half the rewards
    } else if (holyInfluence === 'Medium') {
        return Math.floor(resources * 0.8); // Slightly reduced rewards
    } else {
        return resources; // Full rewards
    }
}

// Function to set village name
document.getElementById('setVillageNameButton').addEventListener('click', () => {
    let newName = document.getElementById('villageNameInput').value;
    if (newName) {
        villageName = newName;
        updateUI();

        // Hide input and button after naming the village
        document.getElementById('villageNameInput').style.display = 'none';
        document.getElementById('setVillageNameButton').style.display = 'none';
    } else {
        alert('Please enter a valid village name.');
    }
});

// Function to update the UI
function updateUI() {
    woodElement.textContent = wood;
    goldElement.textContent = gold;
    foodElement.textContent = food;
    vikingCountElement.textContent = vikingCount;
    holyInfluenceElement.textContent = holyInfluence;
    villageNameElement.textContent = villageName;
    
    // Display gold mine level in the UI if built
    document.getElementById('goldMineLevel').textContent = `Gold Mine Level: ${goldMineLevel}`;
}
