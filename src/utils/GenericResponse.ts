export default class GenericResponse {
  private body?: {
    message?: string;
    data?: any;
  };
  constructor(body?: { message?: string; data?: any }) {
    this.body = body;
  }

  getBody() {
    return this.body;
  }
}
