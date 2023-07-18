export class DefaultResponse {
    readonly data: any;
    readonly success: boolean;
    readonly status?: number;
  
    constructor(data, success, status = 400) {
      this.data = data;
      this.success = success;
      this.status = status;
    }
  }