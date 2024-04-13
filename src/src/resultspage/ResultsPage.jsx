import ItemsDisplay from "../itemsdisplay/ItemsDisplay";
import SearchFilter from "./SearchFilter";

export default function App() {
  return (
    <>
      <div className="flex-row justify-center">
        <div className="results-page flex-row justify-center">
          <SearchFilter />
          <div className="items-display">
            <ItemsDisplay />
          </div>
        </div>
      </div>
    </>
  );
}
