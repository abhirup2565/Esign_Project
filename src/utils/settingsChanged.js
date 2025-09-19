const settingsChanged=(clientId,clientSecret,productInstanceId)=>{
    if(clientId!==localStorage.getItem("x-client-id") || clientSecret!==localStorage.getItem("x-client-secret") ||productInstanceId!==localStorage.getItem("x-product-instance-id"))
    {
      return true;
    }
  }
export default settingsChanged