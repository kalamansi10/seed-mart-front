import { useEffect, useState } from "react";
import useInput from "../hooks/useInput";
import useSelectOptions from "../hooks/useSelectOptions";
import useCookiesAndHeaders from "../hooks/useCookiesAndHeaders";
import "./address-dialog.css";

export default function AddAddressDialog({
  addAddressDialog,
  fetchShippingAddresses,
  updatedAddress,
}) {
  const { getHeader } = useCookiesAndHeaders();

  // Input states for submission
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);
  const [isMainAddress, setIsMainAddress] = useState(true);

  // Custom input input hook
  const contactName = useInput("text", "Contact name");
  const contactNumber = useInput("tel", "Contact number");
  const streetAddress = useInput("text", "Street address");

  // Custom select input hook
  const regionSelect = useSelectOptions(
    regions.map((region) => region.name),
    "Region"
  );
  const provinceSelect = useSelectOptions(
    provinces.map((province) => province.name),
    "Municipality"
  );
  const citySelect = useSelectOptions(
    cities.map((city) => city.name),
    "City"
  );
  const barangaySelect = useSelectOptions(
    barangays.map((barangay) => barangay.name),
    "Barangay"
  );

  // List regions
  useEffect(() => {
    fetchPSGC(setRegions, "regions");
  }, []);

  // List provinces for selected region
  useEffect(() => {
    let selectedRegion = regions.find(
      (region) => region.name == regionSelect.value
    );
    if (!selectedRegion) {
      return;
    } else if (selectedRegion.name == "NCR") {
      setProvinces([{ name: "Metro Manila" }]);
    } else {
      fetchPSGC(setProvinces, "/regions/" + selectedRegion.code + "/provinces");
    }
  }, [regionSelect.value]);

  // List cities for selected province
  useEffect(() => {
    let selectedProvince = provinces.find(
      (province) => province.name == provinceSelect.value
    );
    if (!selectedProvince) {
      return;
    } else if (selectedProvince.name == "Metro Manila") {
      fetchPSGC(setCities, "/regions/130000000/cities");
    } else {
      fetchPSGC(setCities, "/provinces/" + selectedProvince.code + "/cities");
    }
  }, [provinceSelect.value]);

  // List barangays for selected city
  useEffect(() => {
    let selectedCity = cities.find((city) => city.name == citySelect.value);
    if (!selectedCity) return;
    fetchPSGC(setBarangays, "/cities/" + selectedCity.code + "/barangays");
  }, [citySelect.value]);

  // Form fill for updating existing address
  useEffect(() => {
    const {
      contact_name,
      contact_number,
      street_address,
      barangay,
      city,
      province,
      region,
      is_main,
    } = updatedAddress || {};

    contactName.setValue(contact_name || "");
    contactNumber.setValue(contact_number || "");
    streetAddress.setValue(street_address || "");
    barangaySelect.setValue(barangay || "");
    citySelect.setValue(city || "");
    provinceSelect.setValue(province || "");
    regionSelect.setValue(region || "");
    setIsMainAddress(is_main || true);
  }, [updatedAddress]);

  // PSGC API
  async function fetchPSGC(setState, endpoint) {
    try {
      const response = await fetch(`https://psgc.gitlab.io/api/${endpoint}`);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setState(data);
    } catch (error) {
      console.error(error.message);
    }
  }

  // Address submit action
  async function handleAddressForm(e) {
    e.preventDefault();

    const httpMethod = updatedAddress.id ? "PUT" : "POST";
    const endPoint = updatedAddress.id
      ? "update-shipping-address"
      : "add-shipping-address";

    const addressBody = {
      contact_name: contactName.value,
      contact_number: contactNumber.value,
      street_address: streetAddress.value,
      barangay: barangaySelect.value,
      city: citySelect.value,
      province: provinceSelect.value,
      region: regionSelect.value,
      is_main: isMainAddress,
      ...(updatedAddress.id && { id: updatedAddress.id }), // Add id if exists
    };

    const response = await fetch(
      `/api/v1/${endPoint}`,
      getHeader(httpMethod, { shipping_address: addressBody })
    );

    if (response.ok) {
      await fetchShippingAddresses();
      addAddressDialog.close();
    } else {
      console.error("Failed to fetch data");
    }
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
              value={updatedAddress.id ? "Update" : "Add"}
            />
          </form>
        </div>
      </dialog>
    </>
  );
}
