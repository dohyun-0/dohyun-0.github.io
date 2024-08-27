document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById('scramble');
    const phrases = ["student", "programmer", "dohyun"];
    let currentPhraseIndex = 0;
    let currentText = "";
    let typingSpeed = 70; // 타이핑 속도(ms)
    let scrambleSpeed = 30; // 스크램블 속도(ms)
    let eraseSpeed = 70; // 지우기 속도(ms)

    function scrambleText(element, text, index = 0) {
        if (index >= text.length) {
            setTimeout(() => eraseText(element, text), 1000); // 1초 대기 후 지우기 시작
            return;
        }

        let currentChar = text[index];
        let scrambleInterval = setInterval(() => {
            element.innerText = currentText + getRandomChar();
        }, scrambleSpeed);

        setTimeout(() => {
            clearInterval(scrambleInterval);
            currentText += currentChar;
            element.innerText = currentText;
            setTimeout(() => scrambleText(element, text, index + 1), typingSpeed);
        }, scrambleSpeed * 3); // 스크램블 지속 시간
    }

    function eraseText(element, text) {
        let index = text.length - 1;

        function erase() {
            if (index >= 0) {
                currentText = currentText.slice(0, -1);
                element.innerText = currentText;
                index--;
                setTimeout(erase, eraseSpeed);
            } else {
                // 텍스트가 모두 지워지면 다음 문장으로 이동
                currentText = "";
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                setTimeout(() => scrambleText(element, phrases[currentPhraseIndex]), 500); // 0.5초 후 다음 텍스트로
            }
        }

        erase();
    }

    function getRandomChar() {
        const chars = "!<>-_\\/[]{}—=+*^?#________";
        return chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // 애니메이션 시작
    scrambleText(textElement, phrases[currentPhraseIndex]);
});
