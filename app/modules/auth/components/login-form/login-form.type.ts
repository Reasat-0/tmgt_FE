export interface LoginFormProps {
  loading: boolean;
  onSubmit: (e: SubmitEvent) => void;
  onSwitchTab: () => void;
  showPassword: boolean;
  onTogglePassword: () => void;
}
