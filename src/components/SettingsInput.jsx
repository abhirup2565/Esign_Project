
const SettingsInput=({label,value,onChange})=>{
    return(
        <div className="settings-input-container">
          <label className="settings-label">{label}:</label>
          <input
            className="settings-input"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required
          />
        </div>
    )
}
export default SettingsInput