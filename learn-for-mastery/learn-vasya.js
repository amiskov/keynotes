function randomInt(min, max) {
    // min and max are included
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

const schoolParts = [
    '😕',
    '🤯',
    '💩',
    '👍'
];

const univerParts = [
    '😕',
    '🤯',
    '💩',
    '🍺',
    '👩',
    '👍'
];

const coursesParts = [
    '🤯',
    '🤯',
    '💩',
    '💩',
    '👍'
];

const tmpl = () => `
    <div class="learning-percents">0%</div>
    <div class="learning-bar"></div>
`;

function learnVasya(progressElementId, progressParts) {
    const STEPS = 10;
    let count = 0;
    const el = document.getElementById(progressElementId);

    el.innerHTML = tmpl();
    const bar = el.getElementsByClassName('learning-bar')[0]
    const percents = el.getElementsByClassName('learning-percents')[0]
    const totals = el.getElementsByClassName('learning-totals')[0]
    bar.innerHTML = '';

    const timer = setInterval(() => {
        bar.innerHTML += progressParts[randomInt(0, progressParts.length - 1)];
        count++;
        percents.innerHTML = (count / STEPS * 100) + '%';

        if (count == STEPS) {
            clearInterval(timer);
            percents.innerHTML = "🏆 обучение завершено";
        }
    }, 300);
}

const emojiStringToArray = (str) => {
    split = str.split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/);
    arr = [];
    for (var i = 0; i < split.length; i++) {
        char = split[i]
        if (char !== "") {
            arr.push(char);
        }
    }
    return arr;
};

function totalProgress(totalsId) {
    const bars = document.querySelectorAll('.learning-bar');
    let totalStr = '';
    for (let bar of bars) {
        totalStr += bar.innerHTML;
    }

    const totals = emojiStringToArray(totalStr);
    const fails = totals.filter(part => part != '👍');
    const failPercents = parseInt(fails.length / totals.length * 100);

    const failParts = fails.reduce(function(acc, cur) {
        if(acc.indexOf(cur) == -1) {
            acc.push(cur);
        }
        return acc;
    }, [])

    document.getElementById(totalsId).innerHTML = `
    <table><tr>
        <td>👍</td><td>${100 - failPercents}%</td></tr>
        <tr><td>${failParts.join('')}</td><td>${failPercents}% (потрачено)</td>
        </tr>
    `;
}