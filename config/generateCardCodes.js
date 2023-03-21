const fs = require('fs');

const cards = fs.readFileSync('card-list.txt', 'utf-8').split(/\r?\n/);

const codeCardNameMap = {};

cards.forEach((card) => {
    const words = card.split(" ");
    let cardCode = words.map((c) => c.charAt(0).toUpperCase).join("");
    
    let currentIndex = 0;
    while (codeCardNameMap[cardCode]){
        currentIndex++;
        if (currentIndex > words[0].length) break;
        if (words.length > 1){
            cardCode = words[0].substring(0, currentIndex).toUpperCase() + words[1].charAt(0).toUpperCase();
        } else {
            cardCode = words[0].substring(0, currentIndex).toUpperCase();
        }
    }
    codeCardNameMap[cardCode] = card;
});


for (let code in codeCardNameMap){
    console.log(`${code}: ${codeCardNameMap[code]}`);
}