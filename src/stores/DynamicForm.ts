import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";

export interface DynamicForm {
  id: number;
  type: number;
  name: string;
  placeHolder: null | string;
  values: string[] | null;
}

export interface Chart {
  id?: number;
  name: string;
  avg?: number[];
}

export const useDynamicFormStore = defineStore("form", {
  state: () => ({
    dynamicForm: [] as DynamicForm[],
    chartData: [] as Chart[],
    responseDynamicForm: 0 as number,
  }),
  actions: {
    async getDynamicForm() {
      try {
        const response = await ApiService.get("GetDynamicFields");
        this.dynamicForm = response.data;
        console.log(this.dynamicForm);
      } catch (error: any) {
        if (error.response) {
          console.error(error.response);
        } else {
          console.error(error);
        }
      }
    },
    async getChartData() {
      try {
        const response = await ApiService.get("GetStats");
        this.chartData = response.data;
        console.log(this.chartData);
      } catch (error: any) {
        if (error.response) {
          console.error(error.response);
        } else {
          console.error(error);
        }
      }
    },
    async sendDynamicFormData(data: any) {
      try {
        const response = await ApiService.post("SaveDynamicFields", data);
        console.log(response);
        this.responseDynamicForm = response.status;
      } catch (error: any) {
        if (error.response) {
          console.error(error.response);
        } else {
          console.error(error);
        }
      }
    },
    $reset() {
      this.dynamicForm = [];
    },
  },
});
