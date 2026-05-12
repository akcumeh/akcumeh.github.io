const PHRASES = [
    'full-stack developer.',
    'TypeScript enthusiast.',
    'side-project builder.',
    'mobile app developer.',
    'developer building with AI.',
    'developer mid-climb.',
];

const TYPE_SPEED    = 65;   // ms per character typed
const DELETE_SPEED  = 35;   // ms per character deleted
const PAUSE_AFTER   = 2200; // ms to hold the completed phrase
const PAUSE_BEFORE  = 500;  // ms gap before typing the next phrase

export function initTyping(): void {
    const target = document.getElementById('typing-target');
    if (!target) return;

    // narrow to non-null for the closure below
    const el = target;

    let phraseIdx = 0;
    let charIdx   = 0;
    let deleting  = false;

    function tick(): void {
        const phrase = PHRASES[phraseIdx];

        if (!deleting) {
            charIdx++;
            el.textContent = phrase.slice(0, charIdx);

            if (charIdx === phrase.length) {
                deleting = true;
                setTimeout(tick, PAUSE_AFTER);
            } else {
                setTimeout(tick, TYPE_SPEED);
            }
        } else {
            charIdx--;
            el.textContent = phrase.slice(0, charIdx);

            if (charIdx === 0) {
                deleting  = false;
                phraseIdx = (phraseIdx + 1) % PHRASES.length;
                setTimeout(tick, PAUSE_BEFORE);
            } else {
                setTimeout(tick, DELETE_SPEED);
            }
        }
    }

    // small initial delay so the page has settled before the first word appears
    setTimeout(tick, 900);
}
