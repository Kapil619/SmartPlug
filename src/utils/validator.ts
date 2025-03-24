export const validateEmail = (email: string): boolean => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

export const validatePassword = (password: string): boolean => {
    return password.length >= 6;
};

export const validateSpecialCode = (code: string): boolean => {
    const re = /^\d{10}$/;
    return re.test(code);
};

export const validateName = (name: string): boolean => {
    return name.length >= 2;
};