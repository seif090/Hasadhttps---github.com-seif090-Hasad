import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

/**
 * SEO Service
 * خدمة لتحسين محركات البحث (SEO)
 */
@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private defaultTitle = 'منصة حصاد - InomTech';
  private defaultDescription =
    'منصة حصاد لتجميع وإدارة الأراضي الزراعية في مصر';
  private defaultKeywords = 'حصاد، زراعة، أراضي، مصر، AgriTech، InomTech';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router
  ) {
    this.initRouterEvents();
  }

  /**
   * تهيئة أحداث Router
   */
  private initRouterEvents(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // يمكن تحديث SEO تلقائياً عند تغيير الصفحة
      });
  }

  /**
   * تعيين عنوان الصفحة
   */
  setTitle(title: string): void {
    const fullTitle = title
      ? `${title} | ${this.defaultTitle}`
      : this.defaultTitle;
    this.titleService.setTitle(fullTitle);
  }

  /**
   * تعيين الوصف
   */
  setDescription(description: string): void {
    this.metaService.updateTag({ name: 'description', content: description });
  }

  /**
   * تعيين الكلمات المفتاحية
   */
  setKeywords(keywords: string): void {
    this.metaService.updateTag({ name: 'keywords', content: keywords });
  }

  /**
   * تعيين Open Graph Tags
   */
  setOpenGraph(data: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
  }): void {
    if (data.title) {
      this.metaService.updateTag({ property: 'og:title', content: data.title });
    }
    if (data.description) {
      this.metaService.updateTag({
        property: 'og:description',
        content: data.description,
      });
    }
    if (data.image) {
      this.metaService.updateTag({ property: 'og:image', content: data.image });
    }
    if (data.url) {
      this.metaService.updateTag({ property: 'og:url', content: data.url });
    }
  }

  /**
   * تعيين Twitter Card Tags
   */
  setTwitterCard(data: {
    title?: string;
    description?: string;
    image?: string;
  }): void {
    this.metaService.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });

    if (data.title) {
      this.metaService.updateTag({
        name: 'twitter:title',
        content: data.title,
      });
    }
    if (data.description) {
      this.metaService.updateTag({
        name: 'twitter:description',
        content: data.description,
      });
    }
    if (data.image) {
      this.metaService.updateTag({
        name: 'twitter:image',
        content: data.image,
      });
    }
  }

  /**
   * تعيين جميع meta tags مرة واحدة
   */
  setPageMeta(data: {
    title: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
  }): void {
    this.setTitle(data.title);

    if (data.description) {
      this.setDescription(data.description);
    } else {
      this.setDescription(this.defaultDescription);
    }

    if (data.keywords) {
      this.setKeywords(data.keywords);
    } else {
      this.setKeywords(this.defaultKeywords);
    }

    this.setOpenGraph({
      title: data.title,
      description: data.description || this.defaultDescription,
      image: data.image,
      url: data.url || window.location.href,
    });

    this.setTwitterCard({
      title: data.title,
      description: data.description || this.defaultDescription,
      image: data.image,
    });
  }

  /**
   * إعادة تعيين إلى القيم الافتراضية
   */
  resetToDefaults(): void {
    this.setTitle('');
    this.setDescription(this.defaultDescription);
    this.setKeywords(this.defaultKeywords);
  }
}
