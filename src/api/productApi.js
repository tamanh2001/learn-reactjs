import axiosClient from "./axiosClient";

const productApi = {
    async getAll(params) {
        // Transform _page to _start
        const newParams = {...params };
        newParams._start = !params._page || params._page <= 1 ?
            0 //nếu page<1 hoặc ko truyền thì mặc định start =0
            :
            (params._page - 1) * (params._limit || 50); //(số trang-1) nhân với limit nếu ko truyền limit thì mặc định là 20 hoặc 50
        // Remove un-needed key
        delete newParams._page; //ko cần page nữa thì xóa đi
        // Fetch product list + count
        const productList = await axiosClient.get('/products', { params: newParams });
        const count = await axiosClient.get('/products/count', { params: newParams });
        // Build response and return
        return { //trả về object
            data: productList,
            pagination: {
                page: params._page,
                limit: params._limit,
                total: count,
            },
        };
    },
    get(id) {
        const url = `/products/${id}`;
        return axiosClient.get(url);

    },
    add(data) {
        const url = '/products';
        return axiosClient.post(url, data);

    },
    update(data) {
        const url = `/products/${data.id}`;
        return axiosClient.patch(url, data);

    },
    remove(id) {
        const url = `/products/${id}`;
        return axiosClient.delete(url);

    },


};
export default productApi;