export interface ActionError {
  isError: true;
  message: string;
}

export type ActionFunction = (formData: FormData) => Promise<undefined | ActionError>;
