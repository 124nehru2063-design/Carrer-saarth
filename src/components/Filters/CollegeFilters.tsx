import React from "react";

type Props = {
  states: string[];
  districts: string[];
  selectedState: string;
  selectedDistrict: string;
  onStateChange: (s: string) => void;
  onDistrictChange: (d: string) => void;
};

const CollegeFilters: React.FC<Props> = ({ states, districts, selectedState, selectedDistrict, onStateChange, onDistrictChange }) => {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <div>
        <label style={{ display: "block", marginBottom: 6 }}>State</label>
        <select value={selectedState} onChange={(e) => onStateChange(e.target.value)}>
          <option value="">All</option>
          {states.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ display: "block", marginBottom: 6 }}>District</label>
        <select value={selectedDistrict} onChange={(e) => onDistrictChange(e.target.value)}>
          <option value="">All</option>
          {districts.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CollegeFilters;
