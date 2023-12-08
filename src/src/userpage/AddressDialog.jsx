import { useEffect, useState } from 'react';

export default function AddressDialog({ addressDialog, fetchShippingAddresses }) {
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);
  
  const [selectedRegion, setSelectedRegion] = useState()
  const [selectedProvince, setSelectedProvince] = useState()
  const [selectedCity, setSelectedCity] = useState()
  const [selectedBarangay, setSelectedBarangay] = useState()
  const [steetAddress, setSteetAddress] = useState()

  const optionCode = (id) => document.getElementById(id)[document.getElementById(id).selectedIndex].getAttribute('code')

  useEffect(() => {
    fetchPSGC(setRegions, 'regions', '')
  }, []);

  useEffect(() => {
    if (selectedRegion == 'NCR') {
      setProvinces(<option key='130000000' code='130000000' value='Metro Manila'>Metro Manila</option>)
    } else {
      fetchPSGC(setProvinces, 'regions', optionCode('regions') + '/provinces');
    }
    setSelectedProvince('')
    setSelectedCity('')
    setSelectedBarangay('')
  }, [selectedRegion])

  useEffect(() => {
    if (selectedProvince == 'Metro Manila') {
      fetchPSGC(setCities, 'regions', optionCode('regions') + '/cities');
    } else {
      fetchPSGC(setCities, 'provinces', optionCode('provinces') + '/cities');
    }
    setSelectedCity('')
    setSelectedBarangay('')
  }, [selectedProvince])

  useEffect(() => {
    fetchPSGC(setBarangays, 'cities', optionCode('cities') + '/barangays');
    setSelectedBarangay('')
  }, [selectedCity])

  function fetchPSGC(setState, endpoint, code) {
    fetch(`https://psgc.gitlab.io/api/${endpoint}/${code}`)
      .then(response => response.json())
      .then(data => data.sort((a, b) => a.name.localeCompare(b.name)))
      .then(sortedData => mapSelectOptions(sortedData))
      .then(mappedData => setState(mappedData))
  }

  function mapSelectOptions(options) {
    return options.map(item => (
      <option key={item.code} code={item.code} value={item.name}>{item.name}</option>
    ));
  }

  function renderSelectors(label, id, options, getter, setter) {
    return (
      <div className='selector-warpper flex-column'>
        <label htmlFor={id}>{label}: </label>
        <select id={id} onChange={e => setter(e.target.value)} value={getter}>
          <option></option>
          {options}
        </select>
      </div>
    )
  }

  function handleAddressForm() {
    fetch('/api/v1/add-shipping-address', {
      method: 'post',
      'credentials': 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.cookie.split('=')[1]
      },
      body: JSON.stringify({
        'shipping_address': {
          'street_address': steetAddress,
          'barangay': selectedBarangay,
          'city': selectedCity,
          'province': selectedProvince,
          'region': selectedRegion,
          'is_main': true,
        }
      })
    })
    .then(() => {
      fetchShippingAddresses()
      addressDialog.closeDialog()
    })
  }

  return (
    <>
      <dialog ref={addressDialog.dialogRef}>
        <div className='address-dialog'>
          <h1>New Address:</h1>
          {renderSelectors('Region', 'regions', regions, selectedRegion, setSelectedRegion)}
          {renderSelectors('Province', 'provinces', provinces, selectedProvince, setSelectedProvince)}
          {renderSelectors('City', 'cities', cities, selectedCity, setSelectedCity)}
          {renderSelectors('Barangay', 'barangays', barangays, selectedBarangay, setSelectedBarangay)}
          <div className='input-warpper flex-column'>
            <label htmlFor="street-address">Street Address: </label>
            <input type="text" id='street-address' onChange={e => setSteetAddress(e.target.value)} value={steetAddress}/>
          </div>
          <button onClick={handleAddressForm}>Add</button>
        </div>
      </dialog>
    </>
  );
}