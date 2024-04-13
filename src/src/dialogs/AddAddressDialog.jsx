import { useEffect, useState } from "react";
import useInput from "../hooks/useInput";
import useSelectOptions from "../hooks/useSelectOptions";
import useCookiesAndHeaders from "../hooks/useCookiesAndHeaders";
import "./address-dialog.css";

export default function AddAddressDialog({
  addAddressDialog,
  fetchShippingAddresses,
}) {
  const { getHeader } = useCookiesAndHeaders();

  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);

  const contactName = useInput("text", "Contact name");
  const contactNumber = useInput("tel", "Contact number");
  const streetAddress = useInput("text", "Street address");
  const regionSelect = useSelectOptions(
    regions.map((region) => region.name),
    "Region",
  );
  const provinceSelect = useSelectOptions(
    provinces.map((province) => province.name),
    "Municipality",
  );
  const citySelect = useSelectOptions(
    cities.map((city) => city.name),
    "City",
  );
  const barangaySelect = useSelectOptions(
    barangays.map((barangay) => barangay.name),
    "Barangay",
  );

  const [isMainAddress, setIsMainAddress] = useState(true);

  useEffect(() => {
    fetchPSGC(setRegions, "regions");
  }, []);

  useEffect(() => {
    let selectedRegion = regions.find(
      (region) => region.name == regionSelect.value,
    );
    if (!selectedRegion) {
      return;
    } else if (selectedRegion.name == "NCR") {
      setProvinces([{ name: "Metro Manila" }]);
    } else {
      fetchPSGC(setProvinces, "/regions/" + selectedRegion.code + "/provinces");
    }
  }, [regionSelect.value]);

  useEffect(() => {
    let selectedProvince = provinces.find(
      (province) => province.name == provinceSelect.value,
    );
    if (!selectedProvince) {
      return;
    } else if (selectedProvince.name == "Metro Manila") {
      fetchPSGC(setCities, "/regions/130000000/cities");
    } else {
      fetchPSGC(setCities, "/provinces/" + selectedProvince.code + "/cities");
    }
  }, [provinceSelect.value]);

  useEffect(() => {
    let selectedCity = cities.find((city) => city.name == citySelect.value);
    if (!selectedCity) return;
    fetchPSGC(setBarangays, "/cities/" + selectedCity.code + "/barangays");
  }, [citySelect.value]);

  function fetchPSGC(setState, endpoint) {
    fetch(`https://psgc.gitlab.io/api/${endpoint}`)
      .then((response) => response.json())
      .then((data) => setState(data));
  }

  function handleAddressForm(e) {
    e.preventDefault();
    fetch(
      "/api/v1/add-shipping-address",
      getHeader("POST", {
        shipping_address: {
          contact_name: contactName.value,
          contact_number: contactNumber.value,
          street_address: streetAddress.value,
          barangay: barangaySelect.value,
          city: citySelect.value,
          province: provinceSelect.value,
          region: regionSelect.value,
          is_main: isMainAddress,
        },
      }),
    ).then(() => {
      fetchShippingAddresses();
      addAddressDialog.close();
    });
  }

  return (
    <>
      <dialog ref={addAddressDialog.ref}>
        <div className="address-dialog box-shadow">
          <form className="address-form">
            <div className="header">
              <h2>Shipping address</h2>
              <p>Please enter your shipping details.</p>
            </div>
            <div className="name input-wrapper">{contactName.input}</div>
            <div className="number input-wrapper">{contactNumber.input}</div>
            <div className="region input-wrapper">{regionSelect.input}</div>
            <div className="province input-wrapper">{provinceSelect.input}</div>
            <div className="city input-wrapper">{citySelect.input}</div>
            <div className="barangay input-wrapper">{barangaySelect.input}</div>
            <div className="street input-wrapper">{streetAddress.input}</div>
            <div className="default-address-checkbox flex-row justify-center">
              <label>
                <input
                  type="checkbox"
                  onChange={(e) => setIsMainAddress(e.target.checked)}
                  checked={isMainAddress}
                />
                &nbsp;&nbsp;Set as default
              </label>
            </div>
            <input
              className="submit-button"
              type="submit"
              onClick={handleAddressForm}
              value="Add"
            />
          </form>
        </div>
      </dialog>
    </>
  );
}
