import type { FormEvent } from 'react';
import type { ActionError, ActionFunction } from './actions';
import { useEffect, useState } from 'react';

export interface SubmissionState {
  loading: boolean;
  error: ActionError | null;
}

export type UseFormStateResult = [SubmissionState, (event: FormEvent<HTMLFormElement>) => Promise<void>];

export function useFormState(action: ActionFunction): UseFormStateResult {
  const [state, setState] = useState<SubmissionState>({ loading: false, error: null });
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({ loading: true, error: null });
    const form = event.currentTarget;
    const formData = new FormData(form);
    const result = await action(formData);
    if (result?.isError) {
      setState({ loading: false, error: result });
    } else {
      form.reset();
      setState({ loading: false, error: null });
    }
  };
  return [state, handleSubmit];
}

export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return isClient;
}
