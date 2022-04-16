import { Button, ButtonProps } from 'react-bootstrap';

type SpinnerButtonProps = ButtonProps & {
  children: React.ReactNode;
  isLoading: boolean;
  onClick?: () => void;
};

export default function SpinnerButton({
  children,
  isLoading,
  onClick,
  ...rest
}: SpinnerButtonProps) {
  return (
    <Button disabled={isLoading} onClick={onClick} {...rest}>
      {isLoading ? 'Loading...' : children}
    </Button>
  );
}
