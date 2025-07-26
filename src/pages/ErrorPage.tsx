import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  let errorMessage: string;
  let errorStatus: number | undefined;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'Unknown error';
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl font-bold text-pokemon-primary">
        {errorStatus || '😢'}
      </h1>
      <p className="text-2xl mt-4">Oops! Something went wrong.</p>
      <p className="text-gray-500 mt-2">
        <i>{errorMessage}</i>
      </p>
      <Link to="/" className="btn-primary mt-8">
        Back to Home
      </Link>
    </div>
  );
}
