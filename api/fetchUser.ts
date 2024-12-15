
export const fetchUser = async() => {
    try{
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        return data;
    }catch{
        console.log("error in data fetching")
    }       
}