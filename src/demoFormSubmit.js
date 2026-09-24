// Тестовый режим: проверенная браузером форма не передаёт данные в сеть.
export function setupDemoFormSubmit(form, button) {
  if (!(form instanceof HTMLFormElement) || !(button instanceof HTMLButtonElement)) return;

  const status = form.querySelector('[data-form-demo-status]');
  if (!(status instanceof HTMLElement)) return;

  let hideTimer;

  const showStatus = () => {
    window.clearTimeout(hideTimer);
    status.hidden = false;
    hideTimer = window.setTimeout(() => {
      status.hidden = true;
    }, 4000);
  };

  button.addEventListener('click', () => {
    if (form.reportValidity()) showStatus();
  });

  // На случай отправки клавишей Enter также блокируем переход и сетевой запрос.
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    showStatus();
  });

  return () => {
    window.clearTimeout(hideTimer);
    status.hidden = true;
  };
}
