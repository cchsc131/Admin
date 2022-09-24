export function CkEmail(data){
  let fag =  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
  return fag.test(data)?true:false
}
export function CkPwd(data){
  let fag =  /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*]{6,15}$/
  return fag.test(data)?true:false
}