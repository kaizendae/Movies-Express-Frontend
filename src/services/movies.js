import axios from 'axios';

class MovieDataService {
  getAll(page =0, limit = 20) {
    return axios.get(`http://localhost:5000/api/v1/movies?page=${page}&limit=${limit}`);
  }
  get(id) {
    return axios.get(`http://localhost:5000/api/v1/movies/id/${id}`);
  }
  find(query, by = "title", page = 0, limit = 20) {
    return axios.get(`http://localhost:5000/api/v1/movies?${by}=${query}&page=${page}&limit=${limit}`);
  }

  createReview( data) {
    return axios.post(`http://localhost:5000/api/v1/movies/review`, data);
  }

  updateReview(data) {
    return axios.put(`http://localhost:5000/api/v1/movies/review/`, data);
  }

  deleteReview(id, userId) {
    return axios.delete(`http://localhost:5000/api/v1/movies/review`, {data: {review_id: id, user_id: userId}});
  }

  getRating(id) {
    return axios.get(`http://localhost:5000/api/v1/movies/ratings`);
  }
}

export default new MovieDataService();
