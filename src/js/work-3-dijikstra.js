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
  console.log(`開始尋找從 ${start} 到 ${end} 的最佳路線`);
  console.log(`成本權重: ${costWeight}, 評分權重: ${ratingWeight}`);

  costWeight = new Decimal(costWeight);
  ratingWeight = new Decimal(ratingWeight);

  const costs = {};
  const parents = {};
  const processed = new Set();

  // 初始化成本表
  for (let spot in spots) {
    costs[spot] = spot === start ? new Decimal(0) : new Decimal(Infinity);
    parents[spot] = null;
  }

  console.log('初始化成本表:', JSON.stringify(costs, (key, value) =>
    value instanceof Decimal ? value.toString() : value, 2));

  function calculateSpotCost(timeCost, spotCost, spotRating) {
    return new Decimal(timeCost)
      .plus(new Decimal(spotCost).times(costWeight))
      .minus(new Decimal(spotRating).times(ratingWeight).times(10));
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

    console.log(`當前處理的景點: ${currentSpot}, 當前成本: ${lowestCost}`);

    if (currentSpot === null || currentSpot === end) break;

    processed.add(currentSpot);

    for (let neighbor in spots[currentSpot].connections) {
      if (processed.has(neighbor)) continue;

      const timeCost = spots[currentSpot].connections[neighbor];
      const spotCost = spots[neighbor].avgCost;
      const spotRating = spots[neighbor].rating;

      const newCost = costs[currentSpot].plus(
        calculateSpotCost(timeCost, spotCost, spotRating)
      );

      console.log(`檢查鄰近景點 ${neighbor}:`);
      console.log(`  時間成本: ${timeCost}, 景點成本: ${spotCost}, 評分: ${spotRating}`);
      console.log(`  新的總成本: ${newCost}`);

      if (newCost.lessThan(costs[neighbor])) {
        costs[neighbor] = newCost;
        parents[neighbor] = currentSpot;
        console.log(`  更新 ${neighbor} 的成本為 ${newCost}`);
      }
    }

    console.log('當前所有景點的成本:');
    for (let spot in costs) {
      console.log(`${spot}: ${costs[spot]}`);
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

  const result = {
    path,
    totalCost: costs[end],
    actualCost,
    averageRating: totalRating.dividedBy(path.length)
  };

  console.log('最終結果:', JSON.stringify(result, (key, value) =>
    value instanceof Decimal ? value.toString() : value, 2));

  return result;
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
