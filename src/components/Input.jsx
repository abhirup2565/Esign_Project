
const Input=({divClass,labelClass,label,inputClass,type,value,onChange,style})=>{
    return(
        <div className={divClass}>
          <label className={labelClass}>{label}:</label>
          <input
            className={inputClass}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={style}
            required
          />
        </div>
    )
}
export default Input