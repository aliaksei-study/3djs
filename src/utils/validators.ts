
export const requiredField = (value: any) => {
    if(value) {
        return undefined;
    } else {
        return "Field is required";
    }
};