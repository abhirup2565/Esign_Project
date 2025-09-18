const Error = ({errors})=>{
    return(
        <>
        {errors.length > 0 && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <h4>Error:</h4>
          <p>{errors[0]}</p>
        </div>
      )}
      </>
    )
}
export default Error 