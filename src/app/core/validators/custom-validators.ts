import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom Validators
 * مجموعة من المدققات المخصصة للنماذج
 */

/**
 * مدقق رقم الهاتف المصري
 * يقبل: 01xxxxxxxxx أو +201xxxxxxxxx
 */
export function egyptianPhoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const phoneRegex = /^((\+?20)|0)?1[0125][0-9]{8}$/;
    const valid = phoneRegex.test(control.value.replace(/\s/g, ''));

    return valid ? null : { egyptianPhone: { value: control.value } };
  };
}

/**
 * مدقق الرقم القومي المصري
 * يجب أن يكون 14 رقماً
 */
export function egyptianNationalIdValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const idRegex = /^[0-9]{14}$/;
    const valid = idRegex.test(control.value);

    return valid ? null : { egyptianNationalId: { value: control.value } };
  };
}

/**
 * مدقق تطابق كلمات المرور
 */
export function passwordMatchValidator(
  passwordField: string,
  confirmPasswordField: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(passwordField);
    const confirmPassword = control.get(confirmPasswordField);

    if (!password || !confirmPassword) {
      return null;
    }

    if (confirmPassword.value === '') {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      const errors = confirmPassword.errors;
      if (errors) {
        delete errors['passwordMismatch'];
        confirmPassword.setErrors(
          Object.keys(errors).length > 0 ? errors : null
        );
      }
      return null;
    }
  };
}

/**
 * مدقق قوة كلمة المرور
 * يجب أن تحتوي على حرف كبير، حرف صغير، رقم، وحرف خاص
 */
export function strongPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(control.value);
    const hasLowerCase = /[a-z]/.test(control.value);
    const hasNumber = /[0-9]/.test(control.value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);
    const isLengthValid = control.value.length >= 8;

    const valid =
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar &&
      isLengthValid;

    if (!valid) {
      return {
        strongPassword: {
          hasUpperCase,
          hasLowerCase,
          hasNumber,
          hasSpecialChar,
          isLengthValid,
        },
      };
    }

    return null;
  };
}

/**
 * مدقق النطاق (من - إلى)
 */
export function rangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const value = parseFloat(control.value);

    if (isNaN(value)) {
      return { range: { message: 'يجب إدخال رقم صحيح' } };
    }

    if (value < min || value > max) {
      return { range: { min, max, actual: value } };
    }

    return null;
  };
}

/**
 * مدقق حجم الملف
 */
export function fileSizeValidator(maxSizeInMB: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value as File;

    if (!file) {
      return null;
    }

    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    if (file.size > maxSizeInBytes) {
      return {
        fileSize: {
          maxSize: maxSizeInMB,
          actualSize: (file.size / 1024 / 1024).toFixed(2),
        },
      };
    }

    return null;
  };
}

/**
 * مدقق نوع الملف
 */
export function fileTypeValidator(allowedTypes: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value as File;

    if (!file) {
      return null;
    }

    if (!allowedTypes.includes(file.type)) {
      return { fileType: { allowedTypes, actualType: file.type } };
    }

    return null;
  };
}

/**
 * مدقق التاريخ المستقبلي
 */
export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const inputDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (inputDate < today) {
      return { futureDate: { message: 'يجب أن يكون التاريخ في المستقبل' } };
    }

    return null;
  };
}

/**
 * مدقق URL
 */
export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const urlRegex =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    const valid = urlRegex.test(control.value);

    return valid ? null : { url: { value: control.value } };
  };
}
