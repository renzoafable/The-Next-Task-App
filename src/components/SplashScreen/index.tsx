import { Spinner } from 'react-bootstrap';

export default function SplashScreen() {
  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
      <Spinner animation="grow" variant="light" />
    </div>
  );
}
