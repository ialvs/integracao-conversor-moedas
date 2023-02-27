import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  redirect(): string {
    return 'Redirecting to Users';
  }
}
