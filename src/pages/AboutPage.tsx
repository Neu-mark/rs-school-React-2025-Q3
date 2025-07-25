import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="card text-center">
      <h2 className="text-2xl font-bold mb-4">About the App</h2>
      <p className="mb-4">This app was created as part of a training course.</p>
      <p className="mb-2">
        <strong>Author:</strong> Neumark
      </p>
      <div className="mt-6">
        <a
          href="https://rs.school/react/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          RS School React Course
        </a>
        <Link to="/" className="btn-secondary ml-4">
          Home
        </Link>
      </div>
    </div>
  );
}
