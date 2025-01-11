import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';

export const usePorteriaStore = defineStore('porterias', {
  state: () => ({
    porterias: [],
    errors: {}
  }),
  actions: {
    async fetchPorterias(){
        this.porterias = (await api.get('porterias')).data.data
    },
    async storePorteria(data){
        try {
          let newPorteria = (await api.post('porterias', data)).data.data
          this.porterias.unshift(newPorteria)
          Notify.create('Creado con éxito.')
        }
        catch (error){
          if(error.response){
            this.errors = error.response.data.errors
          }
        }
    },
    async updatePorteria(data){
        try {
          let newPorteria = (await api.post(`porterias/${data.id}`, {...data, _method: 'PUT'})).data.data
        this.porterias = this.porterias.map(porteria => {
            return (porteria.id != newPorteria.id)
                   ? porteria
                   : newPorteria
        })
        Notify.create('Creado con éxito.')
        }
        catch(error){
          if(error.response.data.errors){}
        }
    },
  },
});
