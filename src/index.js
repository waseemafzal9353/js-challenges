// Capitalizing first letter of each string in array

let names = ["waseem", "afzal"]
// Easy Method
const capitalizeEasyString = (names) =>{
    return names.map((name)=>name.charAt(0).toUpperCase() + name.slice(1))
}
// rounded way

const capitalizeHardString = (names) =>{
    const nameCap = names.map((name)=>{
        const nameArray = [...name];
        for (let index = 0; index < nameArray.length; index++) {
            if(index === 0) nameArray[index] = nameArray[index].toUpperCase();
            return nameArray.join("")
        }
    })
    return nameCap;
}
console.log(capitalizeEasyString(names))
console.log(capitalizeHardString(names))