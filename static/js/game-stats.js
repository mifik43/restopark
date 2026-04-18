let gameSessionId = null;
let gameStartTime = Date.now();
let gameName = 'snake';

async function startGameSession() {
    try {
        const res = await fetch('/api/game/start', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({game: gameName})
        });
        const data = await res.json();
        gameSessionId = data.session_id;
    } catch(e) { console.warn('Stat error:', e); }
}

async function endGameSession(score, completed = true) {
    if (!gameSessionId) return;
    const duration = Math.floor((Date.now() - gameStartTime) / 1000);
    try {
        await fetch('/api/game/end', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                session_id: gameSessionId,
                duration: duration,
                score: score,
                completed: completed
            })
        });
    } catch(e) { console.warn('Stat error:', e); }
}

// Вызвать startGameSession() при загрузке игры
// При Game Over вызвать endGameSession(finalScore, true/false)