export function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 3000);
}

export function validateInput(text) {
    if (!text.trim()) return false;
    if (text.length > 1000) return false;
    return true;
} 