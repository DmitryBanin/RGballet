export function formatRussianPhone(value) {
  const digits = value.replace(/\D/g, '');
  if (!digits) return '';

  const nationalDigits = (digits[0] === '7' || digits[0] === '8' ? digits.slice(1) : digits).slice(0, 10);
  let formatted = '+7';

  if (nationalDigits.length > 0) formatted += ` ${nationalDigits.slice(0, 3)}`;
  if (nationalDigits.length > 3) formatted += ` ${nationalDigits.slice(3, 6)}`;
  if (nationalDigits.length > 6) formatted += `-${nationalDigits.slice(6, 8)}`;
  if (nationalDigits.length > 8) formatted += `-${nationalDigits.slice(8, 10)}`;

  return formatted;
}

function getCaretPosition(formatted, digitCount) {
  if (digitCount === 0) return Math.min(3, formatted.length);

  let seenDigits = 0;
  for (let index = 3; index < formatted.length; index += 1) {
    if (/\d/.test(formatted[index])) seenDigits += 1;
    if (seenDigits === digitCount) return index + 1;
  }

  return formatted.length;
}

export function setupPhoneMask(input) {
  if (!(input instanceof HTMLInputElement)) return;

  const formatCurrentValue = () => {
    const rawValue = input.value;
    const hasInvalidCharacters = /[^\d+\s()-]/u.test(rawValue);
    const rawDigits = rawValue.replace(/\D/g, '');
    const digitsBeforeCaret = rawValue.slice(0, input.selectionStart ?? rawValue.length).replace(/\D/g, '').length;
    const hasPrefix = rawDigits[0] === '7' || rawDigits[0] === '8';
    const nationalDigitsBeforeCaret = Math.min(10, Math.max(0, digitsBeforeCaret - Number(hasPrefix)));
    const formatted = formatRussianPhone(rawValue);

    if (formatted !== rawValue) {
      input.value = formatted;
      const caretPosition = getCaretPosition(formatted, nationalDigitsBeforeCaret);
      input.setSelectionRange(caretPosition, caretPosition);
    }

    input.setCustomValidity(hasInvalidCharacters ? 'Введите номер цифрами: буквы и посторонние символы недопустимы.' : '');
    if (hasInvalidCharacters) input.reportValidity();
  };

  input.addEventListener('input', (event) => {
    if (!event.isComposing) formatCurrentValue();
  });
  input.addEventListener('compositionend', formatCurrentValue);

  input.addEventListener('blur', () => {
    if (input.value === '+7') input.value = '';
    input.setCustomValidity('');
  });
}
