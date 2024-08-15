import req from './request'

export const apiUser = {
    login:form=>req.get('',form),
    logout:()=>req.get('',)
}

export async function uploadImage(){
    const blob = await convertToBinary(e.file)
    const result = await req.get('/user/file/upload',{size:e.file.size})
    if(result.code){
        const response = await fetch(result.data.presigned_url, {
            method: 'PUT',
            headers: { "Content-Type": "image/png" },
            body: blob
        });
        if(response.status == 200){
            return {code:1,data:result.data}
        }else{
            return {code:0}
        }
    }
    return true
}