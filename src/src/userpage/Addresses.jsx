import { useEffect, useState } from 'react'

export default function Addresses({ currentUser }) {
  const [renderAddresses, setRenderAddresses] = useState()
  const [regions, setRegions] = useState()
  const [provinces, setProvinces] = useState()
  const [cities, setCities] = useState()
  const [barangays, setBarangays] = useState()

  useEffect(() => {
    fetch('api/v1/get-get-shipping-addresses', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(shippingAddresses => mapCart(shippingAddresses))
      .then(mappedCart => setCartRender(mappedCart))

    fetchPSGC(setRegions, 'regions', '')
  }, [])

  function fetchPSGC(setState, endPoint, code) {
    fetch('https://psgc.gitlab.io/api/' + endPoint + '/' + code)
      .then(response => response.text())
      .then(data => JSON.parse(data))
      .then(parsedData => parsedData.sort(compareByName))
      .then(sortedData => mapSelectOptions(sortedData))
      .then(mappedOptions => setState(mappedOptions))
  }

  function compareByName(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }  

  function mapSelectOptions(parsedData) {
    return parsedData.map(item => {
      return (
        <option key={item.code} value={item.code} >{item.name}</option>
      )
    })
  }

  function renderShippingAddressForm() {
    return (
      <div>
        <select onChange={e => fetchPSGC(setProvinces, 'regions', e.target.value + '/provinces')} name="Regions" id="region">
          <option>--Select--</option>
          {regions}
        </select>
        <select onChange={e => fetchPSGC(setCities, 'provinces', e.target.value + '/cities')} name="Province" id="province">
          <option>--Select--</option>
          {provinces}
        </select>
        <select onChange={e => fetchPSGC(setBarangays, 'cities', e.target.value + '/barangays')} name="City" id="city">
          <option>--Select--</option>
          {cities}
        </select>
        <select name="Barangay" id="barangay">
          <option>--Select--</option>
          {barangays}
        </select>
      </div>
    )
  }

  return (
    <div>
      {renderShippingAddressForm()}
    </div>
  )
}
