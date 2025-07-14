import { environment } from '../environments/environment';

export class BaseService {
    protected BASE_URL: string = environment.apiUrl;
}
