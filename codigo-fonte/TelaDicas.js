const extraTipIDs = ["6", "7", "8", "9"];
let currentTipIndex = 0; 

const tipsDetails = {
    "1": { title: "Fechar a torneira ao escovar os dentes", text: "Uma torneira aberta gasta em média 12 litros de água em 5 minutos. Ao fechar a torneira, você usa apenas 1 litro, economizando mais de 11 litros por escovação." },
    "2": { title: "Use balde em vez de mangueira", text: "Lavar a calçada ou o carro com a mangueira pode gastar mais de 500 litros de água. Com um balde, esse consumo pode cair para menos de 40 litros." },
    "3": { title: "Reaproveite água da máquina de lavar", text: "A água do enxágue da máquina de lavar é limpa o suficiente para ser usada para lavar quintais, garagens, calçadas ou até mesmo para dar descarga." },
    "4": { title: "Verifique vazamentos regularmente", text: "Um pequeno gotejamento pode desperdiçar mais de 40 litros por dia. Um buraco de 2mm em um cano pode gastar mais de 3.000 litros! Verifique torneiras e o vaso sanitário (jogue cinzas ou borra de café para ver se a água se move)." },
    "5": { title: "Banhos de até 5 minutos", text: "Cada minuto a menos no chuveiro pode economizar de 9 a 25 litros de água. Reduzir um banho de 10 para 5 minutos economiza centenas de litros por semana." },
    "6": { title: "Regue as plantas com o regador", text: "Regar plantas com mangueira desperdiça muita água por evaporação. Use um regador e regue no início da manhã ou no fim da tarde para reduzir a perda de água.", img: "imgs/watering-plants.png", alt: "Planta" },
    "7": { title: "Use a lava-louças apenas quando estiver cheia", text: "Uma lava-louças moderna gasta muito menos água (cerca de 15 litros) do que lavar a mesma quantidade de louça à mão (que pode chegar a 100 litros). Use-a sempre na capacidade máxima.", img: "imgs/dishwasher.png", alt: "Lava-louças" },
    "8": { title: "Lave frutas e vegetais em uma bacia", text: "Deixar a torneira aberta para lavar vegetais gasta muita água. Use uma bacia com água e um pouco de vinagre ou hipoclorito, e depois enxágue rapidamente.", img: "imgs/vegetable.png", alt: "Vegetais" },
    "9": { title: "Colete água da chuva", text: "Instale uma cisterna simples ou use baldes para coletar água da chuva. Essa água é perfeita para regar o jardim e lavar áreas externas, sem usar água potável.", img: "imgs/rainwater.png", alt: "Água da chuva" }
};

function updateProgress() {
    const allTips = document.querySelectorAll('.tip-item');
    const doneTips = document.querySelectorAll('.tip-item.done');
    const totalCount = allTips.length;
    const doneCount = doneTips.length;
    let percentage = 0;
    if (totalCount > 0) { percentage = (doneCount / totalCount) * 100; }
    const progressBarFill = document.querySelector('.progress-bar-fill');
    const progressText = document.getElementById('progress-text');
    if (progressBarFill && progressText) {
        progressBarFill.style.width = percentage + '%';
        progressText.innerText = `${doneCount} de ${totalCount} dicas aplicadas`
    }
}

document.addEventListener('DOMContentLoaded', function() {
    
    const container = document.querySelector('.tips-list-vertical');
    const loadMoreButton = document.querySelector('.more-tips-button');
    const resetButton = document.getElementById('reset-progress-button');
    const tooltip = document.getElementById('tooltip'); 

    if (!container || !tooltip) {
        console.error("ERRO CRÍTICO: Elemento .tips-list-vertical ou #tooltip não foi encontrado no HTML.");
        return; 
    }

    document.querySelectorAll('.tip-item').forEach(item => {
        const tipId = item.getAttribute('data-tip-id');
        if (localStorage.getItem('tip_' + tipId) === 'true') {
            item.classList.add('done');
        }
    });

    container.addEventListener('click', function(event) {
        if (event.target.closest('.info-icon')) {
            return;
        }
        const tipItem = event.target.closest('.tip-item');
        if (tipItem) { 
            tipItem.classList.toggle('done');
            const tipId = tipItem.getAttribute('data-tip-id');
            if (tipItem.classList.contains('done')) {
                localStorage.setItem('tip_' + tipId, 'true');
            } else {
                localStorage.removeItem('tip_' + tipId);
            }
            updateProgress();
        }
    });

    document.addEventListener('mousemove', function(e) {
        let x = e.pageX + 15;
        let y = e.pageY + 15;
        if (tooltip.offsetWidth && (x + tooltip.offsetWidth + 30 > window.innerWidth)) {
            x = e.pageX - tooltip.offsetWidth - 15;
        }
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
    });
    
    container.addEventListener('mouseover', function(event) {
        const infoIcon = event.target.closest('.info-icon');
        if (infoIcon) {
            const tipItem = infoIcon.closest('.tip-item');
            const tipId = tipItem.getAttribute('data-tip-id');
            const details = tipsDetails[tipId];

            if (details) {
                tooltip.innerHTML = `<strong>${details.title}</strong>${details.text}`;
                tooltip.classList.add('active');
            } else {

                console.warn('Detalhes NÃO encontrados para a dica:', tipId);
            }
        }
    });
    
    container.addEventListener('mouseout', function(event) {
        const infoIcon = event.target.closest('.info-icon');
        if (infoIcon) {
            tooltip.classList.remove('active');
        }
    });

    if (loadMoreButton) {
        if (extraTipIDs.length === 0) { loadMoreButton.style.display = 'none'; }
        
        loadMoreButton.addEventListener('click', function() {
            if (currentTipIndex < extraTipIDs.length) {
                const newTipId = extraTipIDs[currentTipIndex]; 
                const tipData = tipsDetails[newTipId];
                
                if (tipData) {
                    const newTip = document.createElement('div');
                    newTip.className = 'tip-item';
                    newTip.setAttribute('data-tip-id', newTipId);
                    newTip.style.opacity = 0;
                    
                
                    newTip.innerHTML = `
                        <span><img width="40" height="40" src="${tipData.img}" alt="${tipData.alt}"></span>
                        <p>${tipData.title}</p> 
                        <span class="info-icon">i</span>
                        <span class="checkmark">&#10003;</span>
                    `;
                    
                    if (localStorage.getItem('tip_' + newTipId) === 'true') {
                        newTip.classList.add('done');
                    }
                    
                    container.appendChild(newTip);
                    setTimeout(() => { newTip.style.opacity = 1; }, 10);
                    currentTipIndex++;
                    updateProgress();
                    
                    if (currentTipIndex >= extraTipIDs.length) {
                        loadMoreButton.style.display = 'none';
                    }
                } else {
                    console.error("Erro: Detalhes não encontrados para o ID de dica extra:", newTipId);
                }
            }
        });
    }

    if (resetButton) {
        resetButton.addEventListener('click', function() {
            if (confirm('Tem certeza que deseja limpar seu progresso?')) {
                document.querySelectorAll('.tip-item.done').forEach(item => {
                    item.classList.remove('done');
                });
                Object.keys(localStorage).forEach(key => {
                    if (key.startsWith('tip_')) {
                        localStorage.removeItem(key);
                    }
                });
                updateProgress();
            }
        });
    }

    updateProgress();
});
