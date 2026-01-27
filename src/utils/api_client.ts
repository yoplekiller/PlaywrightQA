import { APIRequestContext } from '@playwright/test';

export class ApiClient {
    private baseUrl: string;

    constructor(private apiContext: APIRequestContext, baseUrl?: string) {
        this.baseUrl = baseUrl || 'https://api.themoviedb.org/3';
    }


    async get(endpoint: string, params?: Record<string, string>) {
        const response = await this.apiContext.get(`${this.baseUrl}/${endpoint}`, {
            params:{
                api_key: process.env.TMDB_API_KEY || '',
                ...params,
            }
        });
        return response;
    }

    async post(endpoint: string, data?: any, jsonData?: any, headers?: Record<string, string>) {
        let requestData = data;
        let requestHeaders = headers || {};

        if (jsonData !== undefined) {
            requestData = JSON.stringify(jsonData);
            requestHeaders = {
                ...requestHeaders,
                'Content-Type': 'application/json',
            };
        }

        const response = await this.apiContext.post(`${this.baseUrl}/${endpoint}`, {
            data: requestData,
            headers: requestHeaders,
        });
        return response;
    }

    async put(endpoint: string, data?: any,  headers?: Record<string, string>) {
        const response = await this.apiContext.put(`${this.baseUrl}/${endpoint}`, {
            data,
            headers,
        });
        return response;
    }


    async delete(endpoint: string, headers?: Record<string, string>) {
      const response = await this.apiContext.delete(`${this.baseUrl}/${endpoint}`, {
          headers,
      });
      return response;
  }
}
