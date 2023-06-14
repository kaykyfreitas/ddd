export type NotificationErrorProps = {
  message: string;
  context: string;
}

export default class Notification {

  private _errors: NotificationErrorProps[] = [];

  get errors(): NotificationErrorProps[] {
    return this._errors;
  }

  addError(error: NotificationErrorProps) {
    this._errors.push(error);
  }

  messages(context?: string): string {
    return this._errors
      .filter(err => (context != null ? err.context === context : true))
      .map(err => `${err.context}: ${err.message}`)
      .join(', ');
  }

  hasErrors(): boolean {
    return this._errors.length > 0;
  }

}