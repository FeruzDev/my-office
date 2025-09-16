export const API_PATH = "http://84.54.118.39:8444/";

export const TOKEN_NAME = "app-electricity-token"

export const CONFIG = {
    headers: {
        "Authorization": localStorage.getItem(TOKEN_NAME)
    }
}

export const LANGUAGE = localStorage.getItem("i18nextLng")