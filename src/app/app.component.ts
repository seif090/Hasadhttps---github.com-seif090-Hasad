import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from './core/services/loading.service';

/**
 * المكون الجذر للتطبيق
 * يحتوي على router-outlet لعرض المكونات المختلفة
 * يعرض مؤشر التحميل والإشعارات بشكل عام
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'منصة حصاد - InomTech';
  isLoading$!: Observable<boolean>;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.isLoading$ = this.loadingService.loading$;
  }
}
