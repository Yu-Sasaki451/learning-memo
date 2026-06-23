function normalizeCodeText(text) {
  const lines = text
    .replace(/\t/g, '    ')
    .replace(/^\s*\n/, '')
    .replace(/\s+$/, '')
    .split('\n');

  const contentLines = lines.filter((line) => line.trim() !== '');
  if (contentLines.length === 0) return '';

  const minIndent = Math.min(
    ...contentLines.map((line) => line.match(/^ */)[0].length)
  );

  return lines.map((line) => line.slice(minIndent)).join('\n');
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('pre code').forEach((code) => {
    code.textContent = normalizeCodeText(code.textContent);
  });
});

function findCodeForButton(button) {
  const unit = button.closest('.copy-unit');
  if (unit) return unit.querySelector('code');

  const block = button.closest('.code-block');
  if (!block) return null;

  const codes = [...block.querySelectorAll('pre code')];
  return codes.find((code) =>
    button.compareDocumentPosition(code) & Node.DOCUMENT_POSITION_FOLLOWING
  ) || codes[0] || null;
}

document.addEventListener('click', async (e) => {
  const button = e.target.closest('.copy-btn');
  if (!button) return;

  const code = findCodeForButton(button);
  if (!code) return;

  const text = normalizeCodeText(code.textContent);

  try {
    await navigator.clipboard.writeText(text);

    const original = button.textContent;
    button.textContent = 'Copied!';
    button.disabled = true;

    setTimeout(() => {
      button.textContent = original;
      button.disabled = false;
    }, 1200);
  } catch (err) {
    window.prompt('コピーできない場合は手動でコピーしてください:', text);
  }
});
