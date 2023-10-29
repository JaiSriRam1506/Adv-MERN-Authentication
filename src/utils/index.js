export const validateEmail=(email)=>{
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export const shortenText=(text,n)=>{
  if(text && text.length && text.length>n){
      const shotendText=text.substring(0,n).concat("...");
      return shotendText;
  }
  return text;
}