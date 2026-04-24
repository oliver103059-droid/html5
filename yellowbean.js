// 猜數字遊戲 (1-100)
(() => {
	const MAX_ATTEMPTS = 7;
	let secret = null;
	let attempts = 0;
	let finished = false;

	const elInput = document.getElementById('guess-input');
	const elGuessBtn = document.getElementById('guess-btn');
	const elRestart = document.getElementById('restart-btn');
	const elFeedback = document.getElementById('feedback');
	const elAttempts = document.getElementById('attempts');
	const elMax = document.getElementById('max');
	const elMaxAttempts = document.getElementById('max-attempts');

	function newGame() {
		secret = Math.floor(Math.random() * 100) + 1;
		attempts = 0;
		finished = false;
		elAttempts.textContent = attempts;
		elMax.textContent = MAX_ATTEMPTS;
		elMaxAttempts.textContent = MAX_ATTEMPTS;
		elFeedback.textContent = '遊戲開始！請輸入一個數字並按「猜」。';
		elInput.disabled = false;
		elGuessBtn.disabled = false;
		elInput.value = '';
		elInput.focus();
		console.log('Secret number (debug):', secret);
	}

	function endGame(message) {
		finished = true;
		elFeedback.textContent = message;
		elInput.disabled = true;
		elGuessBtn.disabled = true;
	}

	function handleGuess() {
		if (finished) return;
		const raw = elInput.value.trim();
		if (!raw) {
			elFeedback.textContent = '請先輸入一個數字。';
			return;
		}
		const n = Number(raw);
		if (!Number.isInteger(n) || n < 1 || n > 100) {
			elFeedback.textContent = '請輸入 1 到 100 的整數。';
			return;
		}

		attempts += 1;
		elAttempts.textContent = attempts;

		if (n === secret) {
			endGame(`恭喜！答案是 ${secret}。你在 ${attempts} 次內猜中！`);
			return;
		}

		if (attempts >= MAX_ATTEMPTS) {
			endGame(`挑戰失敗，次數已用完。正確答案是 ${secret}。`);
			return;
		}

		const diff = Math.abs(n - secret);
		let hint = n < secret ? '太小了' : '太大了';
		if (diff <= 2) hint += ' — 非常接近！';
		else if (diff <= 5) hint += ' — 很接近！';

		elFeedback.textContent = `${hint} 剩下 ${MAX_ATTEMPTS - attempts} 次機會。`;
		elInput.select();
	}

	// events
	elGuessBtn.addEventListener('click', handleGuess);
	elRestart.addEventListener('click', newGame);
	elInput.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') handleGuess();
	});

	// init
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', newGame);
	} else {
		newGame();
	}
})();
