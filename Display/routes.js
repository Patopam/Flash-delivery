import renderScreen1 from './screens/Qr.js';
import renderScreen2 from './screens/Instructions.js';
import renderScreen3 from './screens/Game.js';
import renderScreen4 from './screens/Winner.js';
import socket from './socket.js';

const router = new Router({
	// check this for more features with Router: https://github.com/Graidenix/vanilla-router
	mode: 'hash',
	page404: (path) => {
		const app = document.getElementById('app');
		app.innerHTML = `<h1>404 - Not Found</h1><p>The page you are looking for does not exist.</p>`;
	},
});

function clearScripts() {
	document.getElementById('app').innerHTML = '';
}

router.add('/', async () => {
	clearScripts();
	renderScreen1();
});

router.add('/Instructions', async () => {
	clearScripts();
	renderScreen2();
});

router.add('/Game', async () => {
	clearScripts();
	renderScreen3();
});

router.add('/Winner', async () => {
	clearScripts();
	renderScreen4();
});


router.check().addUriListener();

// Listen for popstate event to handle browser navigation
window.addEventListener('popstate', () => {
	router.check();
});

document.addEventListener('DOMContentLoaded', () => {
	router.check();
});

router.check();

export { router, socket };
