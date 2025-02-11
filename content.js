(async function() {
  console.log("CRM Map Overlay Extension Loaded");

  // Fetch data from API
  const data = await fetchData();

  // Find existing map element
  const mapElement = document.getElementById('map');
  if (!mapElement) {
    console.error("Map element not found.");
    return;
  }

  // Initialize Google Map
  const map = new google.maps.Map(mapElement, {
    zoom: 12,
    center: { lat: 37.7749, lng: -122.4194 }, // Default center (San Francisco)
    mapTypeId: 'roadmap'
  });

  // Add markers for each property
  data.forEach(item => {
    const marker = new google.maps.Marker({
      position: { lat: item.latitude, lng: item.longitude },
      map: map,
      title: item.name
    });

    const infowindow = new google.maps.InfoWindow({
      content: `<div><strong>${item.name}</strong><br>${item.description}</div>`
    });

    marker.addListener('click', () => {
      infowindow.open(map, marker);
    });
  });

  async function fetchData() {
    try {
      const response = await fetch('https://your-api-endpoint.com/data');
      if (!response.ok) throw new Error("Network response was not ok");
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
})();
