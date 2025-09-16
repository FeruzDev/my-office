export const getRoleName = (name, t) => {
    return t ? name === "ROLE_WORKER" ? t("role-worker") : name === "ROLE_ADMIN" ? t("role-admin") : name === "ROLE_DIRECTOR" ? t("role-director") : name === "ROLE_OPERATOR" ? t("role-operator") : name === "ROLE_DRIVER" ? t("role-driver") : name
        :
        name === "ROLE_WORKER" ? "Ishchi Xodim" : name === "ROLE_ADMIN" ? "Adminstrator" : name === "ROLE_DIRECTOR" ? "Direktor" : name === "ROLE_OPERATOR" ? "Operator" : name === "ROLE_DRIVER" ? "Haydovchi" : name
}

export const formatDate = (date) => {
    return date.substring(8) + "." + date.substring(5, 7) + "." + date.substring(0, 4);
}

export const getCurrencyName = (id) => {
    return id === 1 ? "so'm" : id === 2 ? "$" : id === 3 ? "₽" : id === 4 ? "€" : id
}

export const beautifyNumber = number => {
    if (number) {
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")
    } else {
        return  number
    }
}

export const beautifyPhoneNUmber = phone => {
    if (phone){
        return "+" + phone.substring(1, 4) + " " + phone.substring(4, 6) + " " + phone.substring(6, 9) + " " + phone.substring(9, 11) + " " + phone.substring(11)
    } else {
        return phone;
    }
}

export const getAmountInSum = (amount) => {
    return amount / 100;
}