import styles from './Error.module.css';

type ErrorProps = {
  msg: string;
  willRedirect?: boolean;
};

const Error: React.FC<ErrorProps> = ({ msg, willRedirect }) => (
  <div
    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
    role="alert"
  >
    <strong className="font-bold">Ruh roh!</strong>{' '}
    <span
      className={`block sm:inline ${willRedirect && styles.animatedEllipsis}`}
    >
      {msg} {willRedirect && `Redirecting`}
    </span>
  </div>
);

export default Error;
