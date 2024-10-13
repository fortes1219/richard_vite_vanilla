import Decimal from 'decimal.js';

// 旅遊景點數據
const tourismSpots = {
  '台北101': { 
      avgCost: 500, 
      rating: 4.5, 
      connections: { '故宮博物院': 30, '象山': 20, '西門町': 25 }
  },
  '故宮博物院': { 
      avgCost: 350, 
      rating: 4.7, 
      connections: { '台北101': 30, '陽明山': 40, '西門町': 35 }
  },
  '象山': { 
      avgCost: 100, 
      rating: 4.3, 
      connections: { '台北101': 20, '西門町': 30, '龍山寺': 35 }
  },
  '西門町': { 
      avgCost: 600, 
      rating: 4.2, 
      connections: { '台北101': 25, '故宮博物院': 35, '象山': 30, '龍山寺': 15 }
  },
  '龍山寺': { 
      avgCost: 50, 
      rating: 4.6, 
      connections: { '西門町': 15, '象山': 35 }
  },
  '陽明山': { 
      avgCost: 200, 
      rating: 4.4, 
      connections: { '故宮博物院': 40 }
  }
};

// 生成景點按鈕
function generateSpotButtons() {
  const container = document.getElementById('spots-container');
  for (let spot in tourismSpots) {
      const button = document.createElement('button');
      button.textContent = `${spot} (成本: ${tourismSpots[spot].avgCost}, 評分: ${tourismSpots[spot].rating})`;
      button.className = 'spot-button';
      button.onclick = () => selectSpot(button, spot);
      container.appendChild(button);
  }
}

let selectedSpots = [];

function selectSpot(button, spot) {
  if (selectedSpots.includes(spot)) {
      selectedSpots = selectedSpots.filter(s => s !== spot);
      button.classList.remove('selected');
  } else if (selectedSpots.length < 2) {
      selectedSpots.push(spot);
      button.classList.add('selected');
  }

  updateButtonStates();
}

function updateButtonStates() {
  document.getElementById('calculate-route').disabled = selectedSpots.length !== 2;
  document.getElementById('clear-selection').disabled = selectedSpots.length === 0;
}

function clearSelection() {
  selectedSpots = [];
  document.querySelectorAll('.spot-button').forEach(button => {
      button.classList.remove('selected');
  });
  document.getElementById('result').innerHTML = '';
  updateButtonStates();
}

// TODO: 實現 findBestTravelRoute 函數
function findBestTravelRoute(spots, start, end, costWeight = 0.7, ratingWeight = 0.3) {
  costWeight = new Decimal(costWeight);
  ratingWeight = new Decimal(ratingWeight);

  const costs = {};
  const parents = {};
  const processed = new Set();

  for (let spot in spots) {
      costs[spot] = new Decimal(spot === start ? 0 : Infinity);
      parents[spot] = null;
  }

  while (true) {
      let currentSpot = null;
      let lowestCost = new Decimal(Infinity);

      // 找出未處理節點中成本最低的節點
      for (let spot in costs) {
          if (!processed.has(spot) && costs[spot].lessThan(lowestCost)) {
              lowestCost = costs[spot];
              currentSpot = spot;
          }
      }

      if (currentSpot === null || currentSpot === end) break;

      processed.add(currentSpot);

      for (let neighbor in spots[currentSpot].connections) {
          if (processed.has(neighbor)) continue;

          const timeCost = new Decimal(spots[currentSpot].connections[neighbor]);
          const spotCost = new Decimal(spots[neighbor].avgCost);
          const spotRating = new Decimal(spots[neighbor].rating);
          
          const newCost = costs[currentSpot]
              .plus(timeCost)
              .plus(spotCost.times(costWeight))
              .minus(spotRating.times(ratingWeight).times(100));

          if (newCost.lessThan(costs[neighbor])) {
              costs[neighbor] = newCost;
              parents[neighbor] = currentSpot;
          }
      }
  }

  if (costs[end].equals(Infinity)) return null;

  // 重建路徑
  const path = [];
  let current = end;
  while (current) {
      path.unshift(current);
      current = parents[current];
  }

  // 計算實際成本和平均評分
  let actualCost = new Decimal(0);
  let totalRating = new Decimal(0);
  for (let spot of path) {
      actualCost = actualCost.plus(spots[spot].avgCost);
      totalRating = totalRating.plus(spots[spot].rating);
  }

  return {
      path,
      totalCost: costs[end],
      actualCost,
      averageRating: totalRating.dividedBy(path.length)
  };
}

function calculateAndDisplayRoute() {
  const [start, end] = selectedSpots;
  const result = findBestTravelRoute(tourismSpots, start, end);
  displayResult(result);
}

function displayResult(result) {
  const resultDiv = document.getElementById('result');
  if (result) {
      resultDiv.innerHTML = `
          <p>最佳路線: ${result.path.join(' -> ')}</p>
          <p>綜合成本指標: ${result.totalCost.toFixed(2)}</p>
          <p>預估總花費: ${result.actualCost.toFixed(2)} NTD</p>
          <p>平均評分: ${result.averageRating.toFixed(2)}</p>
      `;
  } else {
      resultDiv.innerHTML = '<p>沒有找到可行的路線</p>';
  }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  generateSpotButtons();
  document.getElementById('calculate-route').addEventListener('click', calculateAndDisplayRoute);
  document.getElementById('clear-selection').addEventListener('click', clearSelection);
  updateButtonStates();
});
