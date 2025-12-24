document.addEventListener('DOMContentLoaded', function(){

  // =================== Nutrition ===================
  const nutritionForm = document.getElementById('calcForm');
  if(nutritionForm){
    const nutritionResult = document.getElementById('result');
    nutritionForm.addEventListener('submit', function(e){
      e.preventDefault();
      const age = Number(document.getElementById('age').value);
      const height = Number(document.getElementById('height').value);
      const weight = Number(document.getElementById('weight').value);
      const sex = document.getElementById('sex').value;
      const activity = Number(document.getElementById('activity').value);
      const goal = document.getElementById('goal').value;
      if(!age||!height||!weight) return;

      let bmr = (sex==='м')?10*weight+6.25*height-5*age+5:10*weight+6.25*height-5*age-161;
      const tdee = bmr * [1.2,1.375,1.55,1.725,1.9][activity-1] * (goal==='похудение'?0.85:(goal==='набор'?1.10:1));
      const protein = Math.round(weight*1.8);
      const fat = Math.round(weight*0.8);
      const carbs = Math.round((tdee-(protein*4+fat*9))/4);
      const slowCarbs = Math.round(carbs*0.65);
      const simpleCarbs = carbs - slowCarbs;
      const plantFat = Math.round(fat*0.65);
      const animalFat = fat-plantFat;

      nutritionResult.style.display='block';
      nutritionResult.innerHTML=`<strong>🔥 Суточная норма:</strong> ${Math.round(tdee)} ккал<br>
        🍗 Белки: ${protein} г<br>
        🥑 Жиры: ${fat} г (растительные: ${plantFat} г, животные: ${animalFat} г)<br>
        🍞 Углеводы: ${carbs} г (медленные: ${slowCarbs} г, простые: ${simpleCarbs} г)`;
    });
  }

  // =================== Strength ===================
  const benchForm = document.getElementById('benchForm');
  if(benchForm){
    const benchResult = document.getElementById('benchResult');
    benchForm.addEventListener('submit', function(e){
      e.preventDefault();
      const weight = Number(document.getElementById('benchWeight').value);
      const reps = Number(document.getElementById('benchReps').value);
      if(!weight||!reps||reps<1) return;

      const epley = weight*(1+0.0333*reps);
      const brzycki = weight*36/(37-reps);
      const lombardi = weight*Math.pow(reps,0.10);
      const mayhew = 100*weight/(52.2+41.9*Math.exp(-0.055*reps));
      const oconner = weight*(1+0.025*reps);
      const avg = (epley+brzycki+lombardi+mayhew+oconner)/5;

      benchResult.style.display='block';
      benchResult.innerHTML=`<strong>Средний 1ПМ:</strong> ${avg.toFixed(1)} кг<br><br>
        <table>
          <tr><th>Формула</th><th>Результат (кг)</th></tr>
          <tr><td>Эпли</td><td>${epley.toFixed(1)}</td></tr>
          <tr><td>Бранки</td><td>${brzycki.toFixed(1)}</td></tr>
          <tr><td>Ломбарди</td><td>${lombardi.toFixed(1)}</td></tr>
          <tr><td>Мэйхю</td><td>${mayhew.toFixed(1)}</td></tr>
          <tr><td>О’Коннор</td><td>${oconner.toFixed(1)}</td></tr>
        </table>`;
    });
  }

});
