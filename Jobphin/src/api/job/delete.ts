import { ApiService } from '@/api';

export const deleteJob = async (id: string) => {
  const data = await ApiService.axios.instance
    .delete(`/jobs/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      throw error;
    });
  return data;
};
