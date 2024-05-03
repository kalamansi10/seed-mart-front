import { useEffect, useState } from "react";
import useAccountAPI from "../api/useAccountAPI";
import useInput from "../hooks/useInput";
import useSelectOptions from "../hooks/useSelectOptions";
import "./address-dialog.css";

export default function AddAddressDialog({
  addAddressDialog,
  updatedAddress,
  fetchShippingAddressList,
}) {
  const { addShippingAddressList, updateShippingAddressList } = useAccountAPI();

  // Fetched items states
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);
  const [isMainAddress, setIsMainAddress] = useState(true);

  const [addressID, setAddressID] = useState([]);

  // Custom input input hook
  const contactName = useInput("text", "Contact name");
  const contactNumber = useInput("tel", "Contact number");
  const streetAddress = useInput("text", "Street address");

  // Custom select input hook
  const createSelectOptions = (items, placeholder) => {
    return useSelectOptions(
      items.map((item) => item.name),
      placeholder
    );
  };
  const regionSelect = createSelectOptions(regions, "Region");
  const provinceSelect = createSelectOptions(provinces, "Municipality");
  const citySelect = createSelectOptions(cities, "City");
  const barangaySelect = createSelectOptions(barangays, "Barangay");

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
      id,
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
    setAddressID(id || null);
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

    const addressBody = {
      contact_name: contactName.value,
      contact_number: contactNumber.value,
      street_address: streetAddress.value,
      barangay: barangaySelect.value,
      city: citySelect.value,
      province: provinceSelect.value,
      region: regionSelect.value,
      is_main: isMainAddress,
      ...(addressID && { id: addressID }), // Add id if exists
    };

    if (addressID) {
      await updateShippingAddressList(addressBody);
    } else {
      await addShippingAddressList(addressBody);
    }
    fetchShippingAddressList();
    addAddressDialog.close();
  }

  return (
    <>
      <dialog className="address-dialog" ref={addAddressDialog.ref}>
        <form
          className="address-form box-shadow"
          onSubmit={(e) => handleAddressForm(e)}
        >
          <div className="header">
            <h4>New shipping address</h4>
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
            value={updatedAddress.id ? "Update" : "Add"}
          />
        </form>
      </dialog>
    </>
  );
}
