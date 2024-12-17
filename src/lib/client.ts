class CustomClient {
  private baseURL: string;

  constructor(config: { baseURL: string }) {
    this.baseURL = config.baseURL;
  }

  private async request<T>(
    method: string,
    url: string,
    data?: any,
    headers?: Record<string, string>
  ) {
    const response = await fetch(`${this.baseURL}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw {
        response: {
          status: response.status,
          data: await response.json().catch(() => null),
        },
      };
    }

    const responseData: T = await response.json();
    return { data: responseData, status: response.status };
  }

  async get<T>(url: string, config?: { headers?: Record<string, string> }) {
    return this.request<T>("GET", url, undefined, config?.headers);
  }

  async post<T>(
    url: string,
    data?: any,
    config?: { headers?: Record<string, string> }
  ) {
    return this.request<T>("POST", url, data, config?.headers);
  }

  async put<T>(
    url: string,
    data?: any,
    config?: { headers?: Record<string, string> }
  ) {
    return this.request<T>("PUT", url, data, config?.headers);
  }

  async delete<T>(url: string, config?: { headers?: Record<string, string> }) {
    return this.request<T>("DELETE", url, undefined, config?.headers);
  }

  create(config: { baseURL: string }) {
    return new CustomClient(config);
  }
}

export const fetchClient = new CustomClient({
  baseURL: import.meta.env.BACKEND_URL || "http://localhost:3002",
});
