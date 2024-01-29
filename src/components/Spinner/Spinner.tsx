import './Spinner.css';

export const Spinner = () => {
  return (
    <div className="center" data-testid="spinner">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
