interface ErrorMsgProps {
  message?: string;
}

/**
 * ErrorMsg displays a simple error message and a link to file a ticket.
 */
export const ErrorMsg = ({ message }: ErrorMsgProps) => {
  const issueURL = import.meta.env.VITE_ISSUE_URL;

  return (
    <div className="flex h-full w-full justify-center align-middle">
      <div className="my-5 flex h-1/4 w-1/2 justify-center rounded-2xl bg-red-900">
        <div className="p-2">
          <h1 className="my-2 text-center text-3xl font-bold text-white">
            {message ?? 'An error occurred'}
          </h1>
          <h2 className="text-center text-xl font-semibold text-white">
            We would appreciate your feedback.
          </h2>
          {issueURL && (
            <p className="text-center">
              <a href={issueURL} className="underline decoration-blue-100 decoration-1">
                file a ticket
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
