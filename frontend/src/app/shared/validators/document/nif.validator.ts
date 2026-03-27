import { FormControl } from '@angular/forms';

export function nifValidator(control: FormControl): { [key: string]: boolean } | null {
  const nifRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
  const nifLetters = 'TRWAGMYFPDXBNJZSQVHLCKE';
  const nif = control.value.toUpperCase();
  if (nif.length < 9 || nif.length > 9) {
    return { documentNumber: true };
  }
  if (!nif.match(nifRegex)) {
    return { documentNumber: true };
  }
  if (nif.charAt(8) !== nifLetters.charAt(parseInt(nif, 10) % 23)) {
    return { documentNumber: true };
  }
  return null;
}

export function passportValidator(control: FormControl): { [key: string]: boolean } | null {
  const passportRegex = /^[a-z]{3}[0-9]{6}[a-z]?$/i;
  const passport = control.value.toUpperCase();
  if (!passport.match(passportRegex)) {
    return { documentNumber: true };
  }
  return null;
}
