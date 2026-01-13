import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

/**
 * مكون تسجيل الدخول
 * يسمح للمستخدمين بتسجيل الدخول إلى النظام
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  returnUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // إنشاء نموذج تسجيل الدخول
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // الحصول على رابط العودة
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'] || '/farmer/dashboard';
  }

  /**
   * إرسال نموذج تسجيل الدخول
   */
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        // تحديد الصفحة الرئيسية حسب دور المستخدم
        const dashboardUrl =
          response.user.role === 'farmer'
            ? '/farmer/dashboard'
            : '/company/dashboard';
        this.router.navigate([
          this.returnUrl === '/farmer/dashboard'
            ? dashboardUrl
            : this.returnUrl,
        ]);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
        console.error('خطأ في تسجيل الدخول:', error);
      },
    });
  }

  /**
   * التحقق من وجود خطأ في حقل معين
   */
  hasError(field: string, error: string): boolean {
    const control = this.loginForm.get(field);
    return !!(
      control &&
      control.hasError(error) &&
      (control.dirty || control.touched)
    );
  }
}
