<template>
  <!--begin::Row-->
  <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
    <div class="col-xl-3 mt-10 justify-content-center">
      <KTNewTargetModal></KTNewTargetModal>

      <button
        class="btn btn-sm fw-bold btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#modal_form_dynamic"
        @click="getData"
      >
        Dynamic Form
      </button>
    </div>

    <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
      <!--begin::Col-->
      <div class="col-xl-4">
        <MixedWidget5
          widget-classes="card-xl-stretch mb-xl-8 h-md-100"
          chart-color="primary"
          chart-height="150"
        ></MixedWidget5>
      </div>
      <!--end::Col-->

      <!--begin::Col-->
      <div class="col-xl-8">
        <Widget10 className="h-md-100" />
      </div>
      <!--end::Col-->
    </div>

    <!--begin::Col-->
    <div class="col-xl-6">
      <ChartsWidget1
        widget-classes="card-xl-stretch mb-xl-8"
        :height="400"
      ></ChartsWidget1>
    </div>

    <!--end::Col-->
  </div>

  <!--end::Row-->
</template>

<script>
import { getAssetPath } from "@/core/helpers/assets";
import ChartsWidget1 from "@/components/widgets/charts/Widget1.vue";
import Widget10 from "@/components/dashboard-default-widgets/Widget10.vue";
import MixedWidget5 from "@/components/widgets/mixed/Widget5.vue";
import { defineComponent } from "vue";
import KTNewTargetModal from "@/components/modals/forms/NewTargetModal.vue";
import { getIllustrationsPath } from "@/core/helpers/assets";
import { storeToRefs } from "pinia";
import { useDynamicFormStore } from "@/stores/DynamicForm";

export default defineComponent({
  name: "main-dashboard",
  components: {
    ChartsWidget1,
    Widget10,
    MixedWidget5,
    KTNewTargetModal,
  },
  setup() {
    const dynamic = useDynamicFormStore();

    const { dynamicForm } = storeToRefs(dynamic);

    const getData = async () => {
      await dynamic.getDynamicForm();
      console.log(dynamicForm);
    };
    return {
      getData,
      getAssetPath,
      getIllustrationsPath,
    };
  },
});
</script>

<style lang="scss" scoped></style>
