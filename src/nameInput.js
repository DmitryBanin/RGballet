export function formatName(value) {
  const cleaned = value
    .replace(/\s+/gu, ' ')
    .replace(/[^\p{L}\p{M} -]/gu, '')
    .replace(/ {2,}/g, ' ')
    .replace(/-{2,}/g, '-')
    .replace(/^[ -]+/g, '');

  return cleaned.replace(/(^|[ -])(\p{L})/gu, (_, separator, letter) => {
    return separator + letter.toLocaleUpperCase('ru-RU');
  });
}

export function setupNameInput(input) {
  if (!(input instanceof HTMLInputElement)) return;

  const formatCurrentValue = () => {
    const hasInvalidCharacters = /[^\p{L}\p{M}\s-]/u.test(input.value);
    const caretPosition = input.selectionStart ?? input.value.length;
    const formatted = formatName(input.value);

    if (formatted !== input.value) {
      const formattedCaretPosition = formatName(input.value.slice(0, caretPosition)).length;
      input.value = formatted;
      input.setSelectionRange(formattedCaretPosition, formattedCaretPosition);
    }

    input.setCustomValidity(hasInvalidCharacters ? 'В имени допустимы только буквы, пробелы и дефис.' : '');
    if (hasInvalidCharacters) input.reportValidity();
  };

  input.addEventListener('input', (event) => {
    if (!event.isComposing) formatCurrentValue();
  });
  input.addEventListener('compositionend', formatCurrentValue);
  input.addEventListener('blur', () => {
    input.value = formatName(input.value).replace(/[ -]+$/g, '');
    input.setCustomValidity('');
  });
}
