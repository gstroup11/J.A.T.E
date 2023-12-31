const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;
// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome <= 67 from automatically showing the prompt
    event.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = event;
    // Update UI notify the user they can install the PWA
    butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
    // Hide the app provided install promotion
    butInstall.classList.toggle('hidden', true);
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    await deferredPrompt.userChoice;
    // We've used the prompt, and can't use it again, throw it away
    deferredPrompt = null;
});

window.addEventListener('appinstalled', (event) => {
    deferredPrompt = null;
});
