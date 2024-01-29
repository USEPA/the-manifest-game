import './Spinner.css';

/**
 * Spinner - a loading spinner
 * https://loading.io/css/
 * @constructor
 */
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
