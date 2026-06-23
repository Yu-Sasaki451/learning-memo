document.addEventListener('click', async (e) => {
  const button = e.target.closest('.copy-btn');
  if (!button) return;

  const block = button.closest('.code-block');
  if (!block) return;

  const code = block.querySelector('code');
  if (!code) return;

  const text = code.innerText;

  try {
    await navigator.clipboard.writeText(text);

    // 一時的に表示変更
    const original = button.textContent;
    button.textContent = 'Copied!';
    button.disabled = true;

    setTimeout(() => {
      button.textContent = original;
      button.disabled = false;
    }, 1200);

  } catch (err) {
    // まれに clipboard API が使えない環境向け
    window.prompt('コピーできない場合は手動でコピーしてください:', text);
  }
});



