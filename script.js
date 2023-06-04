function updateTotalOil(oilProduced) {
    const totalOilLabel = document.getElementById('totalOilLabel');
    const currentOilProduced = parseFloat(totalOilLabel.innerText.match(/([\d.]+)/)[1]);
    const newTotalOilProduced = currentOilProduced + oilProduced;
    totalOilLabel.innerText = `Total Oil Produced: ${newTotalOilProduced.toFixed(2)} barrels`;
  }
  
  function calculateOil(outputLabel, strap1FeetEntry, strap1InchesEntry, strap2FeetEntry, strap2InchesEntry, tankHeightEntry) {
    const strap1Inches = parseInt(strap1InchesEntry.value);
    const strap2Feet = parseInt(strap2FeetEntry.value);
    const strap2Inches = parseInt(strap2InchesEntry.value);
  
    const tankHeight = parseInt(tankHeightEntry.value);
  
    if (tankHeight === 16) {
      const strap1Barrels = ((parseInt(strap1FeetEntry.value) * 12) + strap1Inches) * 2.80;
      const strap2Barrels = ((strap2Feet * 12) + strap2Inches) * 2.80;
      const oilProduced = strap2Barrels - strap1Barrels;
      outputLabel.innerText = `Oil produced: ${oilProduced.toFixed(2)} barrels`;
      updateTotalOil(oilProduced); // Call updateTotalOil() to update the total oil produced
    } else if (tankHeight === 25) {
      const strap1Barrels = ((parseInt(strap1FeetEntry.value) * 12) + strap1Inches) * 1.67;
      const strap2Barrels = ((strap2Feet * 12) + strap2Inches) * 1.67;
      const oilProduced = strap2Barrels - strap1Barrels;
      outputLabel.innerText = `Oil produced: ${oilProduced.toFixed(2)} barrels`;
      updateTotalOil(oilProduced); // Call updateTotalOil() to update the total oil produced
    } else {
      outputLabel.innerText = "Please enter a valid tank height in feet.";
    }
  }
  
  function createTankInterface(numTanks) {
    const tankInterface = document.getElementById('tankInterface');
  
    const promptWindow = document.createElement('div');
    promptWindow.classList.add('prompt-window');
    promptWindow.innerHTML = `
      <p>How many tanks are at your facility?</p>
      <select id="numTanksSelect">
        ${Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`)}
      </select>
      <button id="okButton">OK</button>
    `;
    tankInterface.appendChild(promptWindow);
  
    const okButton = document.getElementById('okButton');
    okButton.addEventListener('click', () => {
      const numSelected = parseInt(document.getElementById('numTanksSelect').value);
      promptWindow.remove();
  
      for (let i = 0; i < numTanks; i++) {
        const tank = document.createElement('div');
        tank.classList.add('tank');
        if (i < numSelected) {
          tank.innerHTML = `
            <div class="tank-label">Tank ${i + 1}</div>
            <div>
              <label>Strap 1 (feet):</label>
              <input type="text" class="strap1-feet-entry">
            </div>
            <div>
              <label>Strap 1 (inches):</label>
              <input type="text" class="strap1-inches-entry">
            </div>
            <div>
              <label>Strap 2 (feet):</label>
              <input type="text" class="strap2-feet-entry">
            </div>
            <div>
              <label>Strap 2 (inches):</label>
              <input type="text" class="strap2-inches-entry">
            </div>
            <div>
              <label>Tank height (feet):</label>
              <input type="text" class="tank-height-entry">
            </div>
            <div>
              <button class="calculate-button">Calculate</button>
            </div>
            <div class="output-label"></div>
          `;
        } else {
          break;
        }
        tankInterface.appendChild(tank);
      }
  
      const calculateButtons = document.getElementsByClassName('calculate-button');
      for (let i = 0; i < calculateButtons.length; i++) {
        calculateButtons[i].addEventListener('click', () => {
          const tank = calculateButtons[i].parentNode.parentNode;
          const outputLabel = tank.querySelector('.output-label');
          const strap1FeetEntry = tank.querySelector('.strap1-feet-entry');
          const strap1InchesEntry = tank.querySelector('.strap1-inches-entry');
          const strap2FeetEntry = tank.querySelector('.strap2-feet-entry');
          const strap2InchesEntry = tank.querySelector('.strap2-inches-entry');
          const tankHeightEntry = tank.querySelector('.tank-height-entry');
  
          calculateOil(
            outputLabel,
            strap1FeetEntry,
            strap1InchesEntry,
            strap2FeetEntry,
            strap2InchesEntry,
            tankHeightEntry
          );
        });
      }
    });
  }
  
  createTankInterface(9);
  