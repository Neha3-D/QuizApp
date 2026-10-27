// get all questions and answer

// To communicate with backend and frontend we can use =>
// fetch: built in js function 
// axios: external js library

// feature                       fetch                             Axios
// availability  =>          built into js                   install package
// JSON response =>          .use json()                     automatically parses json res

// getting the data from backend

import axios from "axios";

async function fetchQuestionsApi(handleResponse, handleError, setLoading){
    setLoading(true);
    try{

        const baseUrl = process.env.REACT_APP_API_URL
        const endpoint = "/v1/questions"
        const url = `${baseUrl}${endpoint}`

        const response = await axios.get(url)
        handleResponse(response.data)

    }catch(error){
        handleError(error.rseponse?.data?.message || "Unknown error occured")
    }
    finally{
        setLoading(false)
    }
}

export default fetchQuestionsApi;

