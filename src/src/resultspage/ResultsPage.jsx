import ItemsDisplay from "../itemsdisplay/ItemsDisplay";
import SearchFilter from "./SearchFilter";
import useDialog from "../hooks/useDialog";

export default function App() {
  const searchFilterDialog = useDialog();
  function handleToggleFiltersSection() {
    const searchFilterDom = document.querySelector("dialog .filters-section");
    const handleOutsideClick = (e) => {
      if (e.clientX < searchFilterDom.getBoundingClientRect().left) {
        searchFilterDialog.close();
      }
    };

    if (searchFilterDialog.status == "closed") {
      searchFilterDialog.show();
      searchFilterDialog.removeListener();
      searchFilterDialog.ref.current.addEventListener(
        "click",
        handleOutsideClick
      );
    } else {
      searchFilterDialog.close();
      searchFilterDialog.ref.current.addEventListener(
        "click",
        handleOutsideClick
      );
    }
  }

  return (
    <>
      <div className="flex-row justify-center full-height">
        <div className="results-page flex-row justify-center">
          <SearchFilter
            handleToggleFiltersSection={handleToggleFiltersSection}
          />
          <dialog ref={searchFilterDialog.ref}>
            <SearchFilter
              handleToggleFiltersSection={handleToggleFiltersSection}
            />
          </dialog>
          <div className="items-display">
            <ItemsDisplay
              handleToggleFiltersSection={handleToggleFiltersSection}
            />
          </div>
        </div>
      </div>
    </>
  );
}
