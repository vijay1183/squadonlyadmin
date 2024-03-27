import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Pipe({
  name: 'sanitizer'
})
export class SanitizerPipe implements PipeTransform {
  constructor(
    private readonly sanitizer: DomSanitizer
  ) {
  }
  transform(value: string): any {
    return this.sanitizeUrl(value);
  }
  private sanitizeUrl(url: string): string | null {
    return this.sanitizer.sanitize(SecurityContext.URL, url);
  }
}
