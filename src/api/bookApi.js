import axiosClient from "./axiosClient";

const bookApi = {
    getAll(params) {
        const url = '/api/v1/books';
        return axiosClient.get(url, { params })
    },

    get(id) {
        const url = '/api/v1/books/${id}';
        return axiosClient.get(url);

    },

    add(data) {
        const url = '/api/v1/books';
        return axiosClient.post(url, data);
    },

    update(data) {
        const url = '/api/v1/books/${data.id}';
        return axiosClient.patch(url, data);
    },

    remove(id) {
        const url = '/api/v1/books/${id}';
        return axiosClient.delete(url);
    },
}

export default bookApi;