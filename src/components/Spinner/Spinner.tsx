import './Spinner.css';

export const Spinner = () => {
  return (
    <div className="center">
      <div data-testid="spinner" className="loader" />
    </div>
  );
};
