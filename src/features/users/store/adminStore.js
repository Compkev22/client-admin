import { create } from "zustand";
import {
  getFields as getFieldsRequest,
  createField as createFieldRequest,
  updateField as _updateFieldRequest,
  deleteField as _deleteFieldRequest,
  getAllReservations as getAllReservationsRequest,
  confirmReservation as confirmReservationRequest,
} from "../../../shared/api";
 
export const useFieldsStore = create((set, get) => ({
  fields: [],
  reservations: [],
  loading: false,
  error: null,
 
  getFields: async () => {
    try {
      set({ loading: true, error: null });
 
      const response = await getFieldsRequest();
 
      set({
        fields: response.data.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al obtener canchas",
        loading: false,
      });
    }
  },
 
  createField: async (formData) => {
    try {
      set({ loading: true, error: null });
 
      const response = await createFieldRequest(formData);
 
      set({
        fields: [response.data.data, ...get().fields],
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Error al crear campo",
      });
    }
  },
  // ...rest of logic
 
  getAllReservations: async () => {
    try {
      set({ loading: true, error: null });
      const response = await getAllReservationsRequest();
      set({
        reservations: response.data.data,
        loading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Error al obtener reservaciones",
        loading: false,
      });
    }
  },
 
  confirmReservation: async (id) => {
    try {
      set({ loading: true, error: null });
      await confirmReservationRequest(id);
      // Refrescar lista después de confirmar
      await get().getAllReservations();
      set({ loading: false });
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Error al confirmar reservación",
        loading: false,
      });
    }
  },

  deleteField: async (id) => {
    try {
      set({ loading: true, error: null });

      // Llamamos a la petición que importaste arriba
      await _deleteFieldRequest(id);

      // Usamos get().fields para obtener las canchas actuales 
      // y filtramos para quitar la que acabamos de eliminar
      set({
        fields: get().fields.filter((field) => field._id !== id),
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al eliminar la cancha",
        loading: false,
      });
    }
  },

  updateField: async (id, formData) => {
    try {
      set({ loading: true, error: null });

      // 1. Hacemos la petición PUT a la API (le pasamos el ID y los datos/imagen)
      const response = await _updateFieldRequest(id, formData);

      // 2. Actualizamos la lista en pantalla
      // Usamos .map() para buscar la cancha vieja por su ID y reemplazarla con la nueva información que nos devuelve el backend
      set({
        fields: get().fields.map((field) =>
          field._id === id ? response.data.data : field
        ),
        loading: false,
      });
      
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al actualizar la cancha",
        loading: false,
      });
      // Lanzamos el error para que el Modal pueda atraparlo y no se cierre si falla
      throw error; 
    }
  },

}));