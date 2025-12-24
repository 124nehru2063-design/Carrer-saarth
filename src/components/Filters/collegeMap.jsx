import React, { useEffect, useRef, useState } from "react";

/* ================= SUBJECTS ================= */
const engineeringSubjects = [
  "BTech Computer Science",
  "BTech Mechanical",
  "BTech Civil",
  "BTech Electrical",
];

const medicalSubjects = ["MBBS", "BDS", "BAMS", "BHMS"];

const getRandomSubject = (type) => {
  const list = type === "engineering" ? engineeringSubjects : medicalSubjects;
  return list[Math.floor(Math.random() * list.length)];
};

/* ================= INDIA DATA ================= */
const indiaData = {
  Maharashtra: {
    Thane: ["Thane", "Kalyan"],
    Palghar: ["Vasai", "Virar"],
  },
  Telangana: {
    Hyderabad: ["Hyderabad"],
  },
};

export default function CollegeMap() {
  const mapRef = useRef(null);
  const map = useRef(null);

  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [collegeType, setCollegeType] = useState("");
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);

  /* ================= INIT MAP ================= */
  useEffect(() => {
    if (!window.google) return;

    map.current = new window.google.maps.Map(mapRef.current, {
      center: { lat: 22.5937, lng: 78.9629 },
      zoom: 5,
    });
  }, []);

  /* ================= SEARCH COLLEGES ================= */
  const searchColleges = () => {
    if (!city || !collegeType) return;

    const service = new window.google.maps.places.PlacesService(map.current);

    const query =
      collegeType === "engineering"
        ? `engineering college in ${city}`
        : `medical college in ${city}`;

    service.textSearch({ query }, (results, status) => {
      if (status !== "OK" || !results) return;

      setColleges(
        results.map((r) => ({
          ...r,
          collegeType,
          subject: getRandomSubject(collegeType),
        }))
      );
    });
  };

  /* ================= VIEW ON MAP ================= */
  const viewOnMap = (college) => {
    setSelectedCollege(college);

    map.current.setCenter(college.geometry.location);
    map.current.setZoom(15);

    new window.google.maps.Marker({
      map: map.current,
      position: college.geometry.location,
    });

    new window.google.maps.InfoWindow({
      content: `<strong>${college.name}</strong><br/>🎓 ${college.subject}`,
    }).open(map.current);
  };

  return (
    <div style={{ fontFamily: "Arial" }}>
      {/* ================= FILTERS ================= */}
      <div style={{ padding: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <select onChange={(e) => setState(e.target.value)}>
          <option value="">Select State</option>
          {Object.keys(indiaData).map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <select onChange={(e) => setDistrict(e.target.value)}>
          <option value="">Select District</option>
          {state &&
            Object.keys(indiaData[state]).map((d) => (
              <option key={d}>{d}</option>
            ))}
        </select>

        <select onChange={(e) => setCity(e.target.value)}>
          <option value="">Select City</option>
          {state &&
            district &&
            indiaData[state][district].map((c) => (
              <option key={c}>{c}</option>
            ))}
        </select>

        <select onChange={(e) => setCollegeType(e.target.value)}>
          <option value="">Select College Type</option>
          <option value="engineering">🎓 Engineering</option>
          <option value="medical">🏥 Medical</option>
        </select>

        <button onClick={searchColleges}>Search</button>
      </div>

      {/* ================= MAP ================= */}
      <div ref={mapRef} style={{ height: "350px", width: "100%" }} />

      {/* ================= RESULTS ================= */}
      <div style={{ padding: 10 }}>
        {colleges.map((c) => (
          <div
            key={c.place_id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 8,
              borderRadius: 6,
            }}
          >
            <strong>{c.name}</strong>
            <br />
            🎓 {c.subject}
            <br />
            <button onClick={() => viewOnMap(c)}>View on Map</button>
          </div>
        ))}
      </div>
    </div>
  );
}
